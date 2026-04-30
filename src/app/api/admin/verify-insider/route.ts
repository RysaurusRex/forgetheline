import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/get-auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const session = await auth()
  
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { userId, verified } = await req.json()

  const user = await prisma.user.update({
    where: { id: userId },
    data: { verifiedInsider: verified ?? true },
  })

  return NextResponse.json(user)
}
