import Stripe from "stripe"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { Resend } from "resend"
import { createResetToken } from "@/lib/magic-token"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-04-30.basil"
})

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

function getPlanFromPriceId(priceId: string): { plan: string; creditCents: number } {
  // Map Stripe price IDs to plans (update these with actual Stripe price IDs)
  const priceMap: Record<string, { plan: string; creditCents: number }> = {
    [process.env.NEXT_PUBLIC_PRICE_BASIC || ""]: { plan: "PORTAL_149", creditCents: 0 },
    [process.env.NEXT_PUBLIC_PRICE_PLUS || ""]: { plan: "PORTAL_CREDIT_199", creditCents: 10000 },
    [process.env.NEXT_PUBLIC_PRICE_PRO || ""]: { plan: "PORTAL_CREDIT_199", creditCents: 10000 },
  }
  return priceMap[priceId] || { plan: "PORTAL_149", creditCents: 0 }
}

async function ensureUser(customerEmail: string, customerId: string) {
  let user = await prisma.user.findUnique({ where: { email: customerEmail } })

  if (!user) {
    const tempPassword = Math.random().toString(36).slice(-8)
    const hashedPassword = await hash(tempPassword, 12)

    user = await prisma.user.create({
      data: {
        email: customerEmail,
        name: customerEmail.split("@")[0],
        password: hashedPassword,
        role: "CLIENT",
      },
    })

    await prisma.clientProfile.create({ data: { userId: user.id } })
    await prisma.dashboard.create({ data: { userId: user.id } })
  }

  return user
}

async function sendWelcomeEmail(customerEmail: string, plan: string, token: string) {
  if (!resend) return

  try {
    await resend.emails.send({
      from: "Forge the Line <onboarding@resend.dev>",
      to: customerEmail,
      subject: "Welcome to Forge the Line!",
      html: `
        <h1>Welcome to Forge the Line!</h1>
        <p>Thank you for subscribing!</p>
        <p>You now have access to the ${plan === "PORTAL_CREDIT_199" ? "Plus/Pro" : "Basic"} plan.</p>
        <p><strong>Your login email:</strong> ${customerEmail}</p>
        <p>Click below to set your password (link expires in 1 hour):</p>
        <p><a href="https://forgetheline.us.com/set-password?token=${token}" style="display:inline-block;padding:12px 24px;background-color:#000;color:#fff;text-decoration:none;border-radius:6px;">Set My Password</a></p>
        <p>Or copy this link: https://forgetheline.us.com/set-password?token=${token}</p>
        <hr/>
        <p>P.S. The law enforcement hiring process changes - if you hear about updates, let us know!</p>
        <p>Best,<br/>Forge the Line</p>
      `,
    })
    console.log("Welcome email sent to:", customerEmail)
  } catch (error) {
    console.error("Failed to send welcome email:", error)
  }
}
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")

    if (!signature || !process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Missing signature or key" }, { status: 400 })
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || "whsec_placeholder"
    )

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const customerEmail = session.customer_email || session.customer_details?.email
        const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id
        const subscriptionId = typeof session.subscription === "string" ? session.subscription : null

        if (customerEmail && customerId) {
          const user = await ensureUser(customerEmail, customerId)
          const { plan, creditCents } = getPlanFromPriceId(session.metadata?.priceId as string || "")

          // Create password setup token
          const setupToken = createResetToken(user.id)

          await sendWelcomeEmail(customerEmail, plan, setupToken)

          await prisma.clientAccess.upsert({
            where: { userId: user.id },
            update: {
              plan: plan as any,
              creditBalanceCents: creditCents,
              status: "ACTIVE",
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              subscriptionStatus: "active",
              cancelAtPeriodEnd: false,
            },
            create: {
              userId: user.id,
              plan: plan as any,
              creditBalanceCents: creditCents,
              status: "ACTIVE",
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              subscriptionStatus: "active",
            },
          })

          await prisma.salesCreditTracker.create({
            data: {
              name: user.name || customerEmail,
              email: customerEmail,
              purchaseTier: plan as any,
              creditBalanceCents: creditCents,
              redeemed: false,
              notes: `Stripe subscription: ${subscriptionId}`,
            },
          })
        }
        break
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id

        if (customerId) {
          const clientAccess = await prisma.clientAccess.findFirst({
            where: { stripeCustomerId: customerId },
            include: { user: true },
          })

          if (clientAccess) {
            await prisma.clientAccess.update({
              where: { id: clientAccess.id },
              data: {
                status: "ACTIVE",
                subscriptionStatus: "active",
                currentPeriodEnd: new Date(invoice.lines.data[0]?.period?.end * 1000 || Date.now()),
              },
            })
          }
        }
        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id

        if (customerId) {
          await prisma.clientAccess.updateMany({
            where: { stripeCustomerId: customerId },
            data: {
              subscriptionStatus: subscription.status,
              cancelAtPeriodEnd: subscription.cancel_at_period_end,
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              status: subscription.status === "active" ? "ACTIVE" : "PAUSED",
            },
          })
        }
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id

        if (customerId) {
          await prisma.clientAccess.updateMany({
            where: { stripeCustomerId: customerId },
            data: {
              subscriptionStatus: "canceled",
              status: "PAUSED",
              cancelAtPeriodEnd: false,
            },
          })
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("Webhook fatal error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}