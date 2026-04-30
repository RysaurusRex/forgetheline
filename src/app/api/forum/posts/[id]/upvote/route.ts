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

  const updated = await prisma.forumPost.update({
    where: { id: params.id },
    data: { upvotes: post.upvotes + 1 },
  })

  return NextResponse.json(updated)
}
