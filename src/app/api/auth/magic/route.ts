import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createResetToken, verifyResetToken } from "@/lib/magic-token"
import { sendMagicLinkEmail } from "@/lib/email"

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const token = await createResetToken(user.id)
  const resetUrl = `${process.env.NEXTAUTH_URL}/login?magic=${token}`

  await sendMagicLinkEmail(email, resetUrl)

  return NextResponse.json({ success: true, message: "Magic link sent" })
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token")

  if (!token) {
    return NextResponse.json({ error: "Token required" }, { status: 400 })
  }

  const userId = await verifyResetToken(token)

  if (!userId) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json({ email: user.email, name: user.name })
}