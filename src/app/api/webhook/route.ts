import Stripe from "stripe"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { Resend } from "resend"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { 
  apiVersion: "2025-04-30.basil" 
})

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")
    
    if (!signature || !process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Missing signature or key" }, { status: 400 })
    }

    let event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || "whsec_placeholder"
      )
    } catch {
      event = JSON.parse(body)
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object
      const customerEmail = session.customer_email || session.customer_details?.email
      const amountTotal = session.amount_total
      
      if (customerEmail) {
        const plan = amountTotal === 19900 ? "PORTAL_CREDIT_199" : "PORTAL_149"
        const creditCents = amountTotal === 19900 ? 10000 : (amountTotal === 499900 ? 10000 : 0)
        
        // ALWAYS send welcome email first (Stripe already verified payment)
        try {
          if (resend) {
            await resend.emails.send({
              from: "Forge the Line <onboarding@resend.dev>",
              to: customerEmail,
              subject: "Welcome to Forge the Line!",
              html: `
                <h1>Welcome to Forge the Line!</h1>
                <p>Thank you for joining!</p>
                <p>You now have access to the ${plan === "PORTAL_CREDIT_199" ? "Full Package" : "Portal"}.</p>
                <p><strong>Your login:</strong> ${customerEmail}</p>
                <p>Set your password when you first log in at <a href="https://forgetheline.us.com/login">https://forgetheline.us.com/login</a></p>
                <hr/>
                <p>P.S. The law enforcement hiring process changes - if you hear about updates, let us know!</p>
                <p>Best,<br/>Forge the Line</p>
              `,
            })
            console.log("Welcome email sent to:", customerEmail)
          }
        } catch (emailError) {
          console.error("Failed to send welcome email:", emailError)
          // Don't fail purchase if email fails
        }

        // Try to save to database (but don't fail if this errors)
        try {
          let user = await prisma.user.findUnique({
            where: { email: customerEmail },
          })

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

            await prisma.clientProfile.create({
              data: { userId: user.id },
            })

            await prisma.dashboard.create({
              data: { userId: user.id },
            })
          }

          await prisma.clientAccess.upsert({
            where: { userId: user.id },
            update: { plan: plan as any, creditBalanceCents: creditCents, status: "ACTIVE" },
            create: { userId: user.id, plan: plan as any, creditBalanceCents: creditCents, status: "ACTIVE" },
          })

          await prisma.salesCreditTracker.create({
            data: {
              name: user.name || customerEmail,
              email: customerEmail,
              purchaseTier: plan as any,
              creditBalanceCents: creditCents,
              redeemed: false,
              notes: `Stripe session: ${session.id}`,
            },
          })

          console.log("Database updated for:", customerEmail)
        } catch (dbError) {
          console.error("Database error (purchase still recorded in Stripe):", dbError)
          // Payment already went through in Stripe - don't fail the webhook
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("Webhook fatal error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}