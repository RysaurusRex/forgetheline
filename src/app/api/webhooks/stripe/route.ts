import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message)
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const email = session.customer_details?.email
    const name = session.customer_details?.name

    if (email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email,
            name: name || email.split("@")[0],
            password: "",
            role: "CLIENT",
          },
        })

        await prisma.clientAccess.create({
          data: {
            userId: (await prisma.user.findUnique({ where: { email } }))!.id,
            plan: "PORTAL",
          },
        })

        console.log(`Created new user from Stripe payment: ${email}`)
      }
    }
  }

  return NextResponse.json({ received: true })
}