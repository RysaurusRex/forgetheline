"use client"

import { Suspense, useState, useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [magicLoading, setMagicLoading] = useState(false)
  const [magicSent, setMagicSent] = useState(false)

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/app/home")
    }
  }, [status, router])

  useEffect(() => {
    const magicToken = searchParams.get("magic")
    if (magicToken) {
      handleMagicLogin(magicToken)
    }
  }, [searchParams])

  const handleMagicLogin = async (token: string) => {
    setLoading(true)
    const res = await fetch(`/api/auth/magic?token=${token}`)
    const data = await res.json()
    
    if (res.ok && data.email) {
      const result = await signIn("credentials", {
        email: data.email,
        password: "MAGIC_LOGIN",
        redirect: false,
      })
      
      if (!result?.error) {
        router.push("/app/home")
      }
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid email or password")
    }
    setLoading(false)
  }

  const handleMagicLink = async () => {
    if (!email) {
      setError("Enter your email first")
      return
    }
    
    setMagicLoading(true)
    setError("")
    
    const res = await fetch("/api/auth/magic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
    
    if (res.ok) {
      setMagicSent(true)
    } else {
      setError("Could not send magic link. Try password login.")
    }
    
    setMagicLoading(false)
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Forge the Line</h1>
          <p className="mt-2 text-muted-foreground">Sign in to your portal</p>
        </div>

        {magicSent ? (
          <Card>
            <CardHeader>
              <CardTitle>Check Your Email</CardTitle>
              <CardDescription>
                We sent a login link to {email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setMagicSent(false)
                  setEmail("")
                }}
              >
                Back to Login
              </Button>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={handleMagicLink}
              disabled={magicLoading}
            >
              {magicLoading ? "Sending..." : "Send Magic Link"}
            </Button>
          </form>
        )}

        <div className="text-center text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}