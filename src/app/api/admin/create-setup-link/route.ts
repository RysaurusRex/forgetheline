import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createResetToken } from "@/lib/magic-token"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const token = createResetToken(user.id)
    const setupLink = `https://forgetheline.us.com/set-password?token=${token}`

    return NextResponse.json({ setupLink })
  } catch (error: any) {
    console.error("Create setup link error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
