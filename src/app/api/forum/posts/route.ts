import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/get-auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  
  const posts = await prisma.forumPost.findMany({
    include: {
      user: {
        select: { name: true, email: true },
      },
      _count: {
        select: { comments: true },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { title, content, category } = await req.json()

  const post = await prisma.forumPost.create({
    data: {
      userId: session.user.id,
      title,
      content,
      category,
    },
  })

  return NextResponse.json(post)
}