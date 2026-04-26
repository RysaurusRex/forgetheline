import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const email = formData.get("email") as string

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      )
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email },
    })

    // Create user if new
    if (!user) {
      const tempPassword = Math.random().toString(36).slice(-8)
      const hashedPassword = await hash(tempPassword, 12)

      user = await prisma.user.create({
        data: {
          email,
          name: email.split("@")[0],
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

      await prisma.clientAccess.create({
        data: {
          userId: user.id,
          plan: "FREE_GUIDE",
          status: "ACTIVE",
        },
      })
    }

    // Record the signup
    await prisma.salesCreditTracker.create({
      data: {
        name: user.name || email,
        email,
        purchaseTier: "FREE_GUIDE",
        creditBalanceCents: 0,
        redeemed: false,
        notes: "Free guide signup",
      },
    })

    return NextResponse.redirect(new URL("/free-guide-success", request.url))
  } catch (error) {
    console.error("Subscribe error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}