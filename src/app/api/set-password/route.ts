import { NextRequest, NextResponse } from "next/server"
import { verifyResetToken } from "@/lib/magic-token"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json({ error: "Missing token or password" }, { status: 400 })
    }

    const userId = await verifyResetToken(token)

    if (!userId) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })
    }

    const hashedPassword = await hash(password, 12)

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Set password error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
