"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Plus, Pin, User, Clock } from "lucide-react"

const CATEGORIES = [
  "General",
  "Resume Help",
  "Interview Tips",
  "Background Check",
  "Physical Test",
  "Career Advice",
]

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
  _count: {
    comments: number
  }
}

export default function ForumPage() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "General" })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const res = await fetch("/api/forum/posts")
    const data = await res.json()
    setPosts(data)
    setLoading(false)
  }

  const handleSubmit = async () => {
    if (!session) return
    
    setSubmitting(true)
    const res = await fetch("/api/forum/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })

    if (res.ok) {
      setShowForm(false)
      setNewPost({ title: "", content: "", category: "General" })
      fetchPosts()
    }
    setSubmitting(false)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            Community Forum
          </h1>
          <p className="text-muted-foreground">
            Connect with others on their law enforcement journey
          </p>
        </div>
        {session && (
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        )}
      </div>

      {showForm && session && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="What's your question or topic?"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <select
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                value={newPost.category}
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Share details, tips, or questions..."
                rows={5}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Posting..." : "Post"}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!session && (
        <Card className="mb-8">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">
              Sign in to create posts and comment
            </p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No posts yet. Be the first to post!</p>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Link key={post.id} href={`/app/forum/${post.id}`}>
              <Card className={post.pinned ? "border-primary cursor-pointer hover:shadow-md transition-shadow" : "cursor-pointer hover:shadow-md transition-shadow"}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {post.pinned && <Pin className="h-4 w-4 text-primary" />}
                        {post.title}
                      </CardTitle>
                      <CardDescription>
                        {post.category} · {post.user.name || post.user.email} · {formatDate(post.createdAt)}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      {post._count.comments}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap">{post.content.substring(0, 200)}...</p>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}