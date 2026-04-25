import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/get-auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const postId = searchParams.get("postId")

  if (!postId) {
    return NextResponse.json({ error: "Post ID required" }, { status: 400 })
  }

  const comments = await prisma.forumComment.findMany({
    where: { postId },
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
    orderBy: { createdAt: "asc" },
  })

  return NextResponse.json(comments)
}

export async function POST(req: NextRequest) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { postId, content } = await req.json()

  const comment = await prisma.forumComment.create({
    data: {
      postId,
      userId: session.user.id,
      content,
    },
  })

  return NextResponse.json(comment)
}