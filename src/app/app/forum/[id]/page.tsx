"use client"

import { useState, useEffect, use } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MessageSquare, Clock, User, Send } from "lucide-react"
import Link from "next/link"

interface Comment {
  id: string
  content: string
  createdAt: string
  user: {
    name: string | null
    email: string
  }
}

interface Post {
  id: string
  title: string
  content: string
  category: string
  pinned: boolean
  createdAt: string
  user: {
    name: string | null
    email: string
  }
}

export default function ForumPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: session } = useSession()
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    const res = await fetch(`/api/forum/posts`)
    const posts = await res.json()
    const found = posts.find((p: Post) => p.id === id)
    if (found) {
      setPost(found)
      fetchComments()
    }
    setLoading(false)
  }

  const fetchComments = async () => {
    const res = await fetch(`/api/forum/comments?postId=${id}`)
    const data = await res.json()
    setComments(data)
  }

  const handleComment = async () => {
    if (!session || !newComment.trim()) return
    
    setSubmitting(true)
    await fetch("/api/forum/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: id, content: newComment }),
    })
    
    setNewComment("")
    fetchComments()
    setSubmitting(false)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  if (loading || !post) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/app/forum">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Forum
        </Button>
      </Link>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">{post.title}</CardTitle>
          <CardDescription>
            {post.category} · {post.user.name || post.user.email} · {formatDate(post.createdAt)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{post.content}</p>
        </CardContent>
      </Card>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comments ({comments.length})
        </h2>

        {comments.length === 0 ? (
          <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {comment.user.name || comment.user.email}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {session ? (
        <Card>
          <CardHeader>
            <CardTitle>Add a Comment</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={4}
              className="mb-4"
            />
            <Button onClick={handleComment} disabled={submitting || !newComment.trim()}>
              <Send className="h-4 w-4 mr-2" />
              {submitting ? "Posting..." : "Post Comment"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">Sign in to comment</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}