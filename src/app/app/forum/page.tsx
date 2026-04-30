"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Plus, Pin, User, Clock, Search } from "lucide-react"
import Link from "next/link"

const CATEGORIES = [
  "General",
  "FBI",
  "DEA", 
  "HSI",
  "ATF",
  "CBP",
  "Local PD",
  "Resume Help",
  "Interview Tips",
  "Background Check",
  "Physical Test",
  "Career Advice",
]

const AGENCY_COLORS: Record<string, string> = {
  "FBI": "border-blue-500 bg-blue-50",
  "DEA": "border-green-500 bg-green-50",
  "HSI": "border-red-500 bg-red-50",
  "ATF": "border-orange-500 bg-orange-50",
  "CBP": "border-sky-500 bg-sky-50",
  "Local PD": "border-slate-500 bg-slate-50",
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
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:w-1/3"
        />
        <select
          className="rounded-md border bg-background px-3 py-2 text-sm md:w-48"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
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
        {filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No posts found. Try a different search or category.</p>
            </CardContent>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Link key={post.id} href={`/app/forum/${post.id}`}>
              <Card className={`cursor-pointer hover:shadow-md transition-shadow ${
                post.pinned ? "border-primary" : 
                AGENCY_COLORS[post.category] ? AGENCY_COLORS[post.category] :
                "border-border"
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {post.pinned && <Pin className="h-4 w-4 text-primary" />}
                        {post.title}
                        {AGENCY_COLORS[post.category] && (
                          <span className="text-xs px-2 py-1 rounded bg-white/50 font-medium">
                            {post.category}
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {formatDate(post.createdAt)} · {post.user.name || post.user.email}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      {post._count.comments}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap text-muted-foreground">{post.content.substring(0, 200)}...</p>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}