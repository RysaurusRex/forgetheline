import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createResetToken } from "@/lib/magic-token"
import { hash } from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { email, createIfMissing } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 })
    }

    let user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      if (!createIfMissing) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      // Create user with a random password
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
    }

    const token = createResetToken(user.id)
    const setupLink = `https://forgetheline.us.com/set-password?token=${token}`

    return NextResponse.json({ setupLink })
  } catch (error: any) {
    console.error("Create setup link error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
