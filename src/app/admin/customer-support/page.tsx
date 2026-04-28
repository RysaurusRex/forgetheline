"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface UserResult {
  id: string
  email: string
  role: string
}

export default function CustomerSupportPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ setupLink?: string; error?: string } | null>(null)
  const [promoteEmail, setPromoteEmail] = useState("")
  const [promoteResult, setPromoteResult] = useState<{ message?: string; error?: string } | null>(null)
  const [promoteLoading, setPromoteLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch("/api/admin/create-setup-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, createIfMissing: true }),
      })

      const data = await res.json()

      if (res.ok) {
        setResult({ setupLink: data.setupLink })
      } else {
        setResult({ error: data.error || "Something went wrong" })
      }
    } catch {
      setResult({ error: "Something went wrong" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Customer Support</h1>

      <Card>
        <CardHeader>
          <CardTitle>Generate Password Setup Link</CardTitle>
          <CardDescription>
            For customers who paid but didn't receive a setup link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="customer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Generating..." : "Generate Link"}
            </Button>
          </form>

          {result?.setupLink && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm font-medium text-green-800 mb-2">Setup Link:</p>
              <code className="text-xs break-all text-green-700">{result.setupLink}</code>
              <p className="text-xs text-green-600 mt-2">
                Send this link to the customer. Expires in 1 hour.
              </p>
            </div>
          )}

          {result?.error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700">{result.error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Promote User to Admin</CardTitle>
          <CardDescription>
            Give admin access to a user by email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={async (e) => {
            e.preventDefault()
            setPromoteLoading(true)
            setPromoteResult(null)
            try {
              const res = await fetch("/api/admin/promote-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: promoteEmail }),
              })
              const data = await res.json()
              if (res.ok) {
                setPromoteResult({ message: data.message })
                setPromoteEmail("")
              } else {
                setPromoteResult({ error: data.error || "Something went wrong" })
              }
            } catch {
              setPromoteResult({ error: "Something went wrong" })
            } finally {
              setPromoteLoading(false)
            }
          }} className="space-y-4">
            <Input
              type="email"
              placeholder="user@example.com"
              value={promoteEmail}
              onChange={(e) => setPromoteEmail(e.target.value)}
              required
            />
            <Button type="submit" disabled={promoteLoading}>
              {promoteLoading ? "Promoting..." : "Promote to Admin"}
            </Button>
          </form>

          {promoteResult?.message && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-700">{promoteResult.message}</p>
            </div>
          )}

          {promoteResult?.error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700">{promoteResult.error}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
