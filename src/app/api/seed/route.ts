import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function seed() {
  const hashedPassword = await hash("admin123", 12)

  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@forgetheline.com" },
  })

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: "admin@forgetheline.com",
        name: "Admin",
        password: hashedPassword,
        role: "ADMIN",
      },
    })
    console.log("Admin user created!")
  } else {
    console.log("Admin user already exists")
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get("secret")

  if (secret !== "FORGE_SEED_2024") {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 })
  }

  try {
    await seed()
    return NextResponse.json({ success: true, message: "Seeded!" })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}