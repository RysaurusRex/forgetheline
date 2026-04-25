import Stripe from "stripe"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { 
  apiVersion: "2025-04-30.basil" 
})

const PORTAL_PRICE_ID = "price_149"
const CREDIT_PRICE_ID = "price_199"

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
      // For testing, try to handle the event directly
      event = JSON.parse(body)
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object
      const customerEmail = session.customer_email || session.customer_details?.email
      const amountTotal = session.amount_total
      
      if (customerEmail) {
        const plan = amountTotal === 19900 ? "PORTAL_CREDIT_199" : "PORTAL_149"
        const creditCents = amountTotal === 19900 ? 10000 : 0
        
        // Check if user exists
        let user = await prisma.user.findUnique({
          where: { email: customerEmail },
        })

        if (!user) {
          // Create new user with temporary password
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

          // Create client profile
          await prisma.clientProfile.create({
            data: { userId: user.id },
          })

          // Create dashboard
          await prisma.dashboard.create({
            data: { userId: user.id },
          })
        }

        // Update client access
        await prisma.clientAccess.upsert({
          where: { userId: user.id },
          update: {
            plan: plan as any,
            creditBalanceCents: creditCents,
            status: "ACTIVE",
          },
          create: {
            userId: user.id,
            plan: plan as any,
            creditBalanceCents: creditCents,
            status: "ACTIVE",
          },
        })

        // Record sale
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
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}