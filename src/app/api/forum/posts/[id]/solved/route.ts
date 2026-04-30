import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/get-auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const post = await prisma.forumPost.findUnique({
    where: { id: params.id },
  })

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  // Only post author or admin can mark as solved
  if (post.userId !== session.user.id && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const updated = await prisma.forumPost.update({
    where: { id: params.id },
    data: { solved: !post.solved },
  })

  return NextResponse.json(updated)
}
