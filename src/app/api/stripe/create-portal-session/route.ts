import Stripe from "stripe"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-04-30.basil"
})

export async function POST(request: NextRequest) {
  try {
    let userId: string | null = null

    const contentType = request.headers.get("content-type") || ""
    if (contentType.includes("application/json")) {
      const body = await request.json()
      userId = body.userId
    } else {
      const formData = await request.formData()
      userId = formData.get("userId") as string
    }

    if (!userId) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 })
    }

    const clientAccess = await prisma.clientAccess.findUnique({
      where: { userId },
    })

    if (!clientAccess?.stripeCustomerId) {
      return NextResponse.json({ error: "No Stripe customer found" }, { status: 404 })
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: clientAccess.stripeCustomerId,
      return_url: "https://forgetheline.us.com/app/settings",
    })

    if (contentType.includes("application/json")) {
      return NextResponse.json({ url: session.url })
    } else {
      return NextResponse.redirect(session.url)
    }
  } catch (error: any) {
    console.error("Portal session error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
