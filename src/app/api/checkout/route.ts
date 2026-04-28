import Stripe from "stripe"
import { NextRequest, NextResponse } from "next/server"

const stripeSecret = process.env.STRIPE_SECRET_KEY

const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: "2025-04-30.basil" }) : null

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { priceId, customerEmail, successUrl, cancelUrl } = body

    // Create checkout session for subscription
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || "https://forgetheline.us.com/app/dashboard?payment=success",
      cancel_url: cancelUrl || "https://forgetheline.us.com/pricing?payment=cancelled",
      customer_email: customerEmail,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("Stripe error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}