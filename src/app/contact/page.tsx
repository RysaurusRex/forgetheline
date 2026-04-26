export const dynamic = 'force-dynamic'

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, CheckCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    if (!name || !email || !message) {
      setError("All fields are required")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) throw new Error("Failed to send")

      setSubmitted(true)
    } catch (err) {
      setError("Something went wrong. Please try again or email us directly.")
    }
    
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="border-b bg-card">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <a href="/" className="text-xl font-bold">Forge the Line</a>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <nav className="flex items-center gap-4">
                <a href="/" className="text-sm text-muted-foreground hover:text-foreground">Home</a>
                <a href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
              <p className="text-muted-foreground mb-4">
                Thank you for reaching out. We'll get back to you within 24-48 hours.
              </p>
              <a href="/">
                <Button>Back to Home</Button>
              </a>
            </CardContent>
          </Card>
        </main>

        <footer className="border-t py-6 px-4">
          <div className="container mx-auto text-center text-sm text-muted-foreground">
            © 2025 Forge the Line
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
<header className="border-b bg-card">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <a href="/" className="text-xl font-bold">Forge the Line</a>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <nav className="flex items-center gap-4">
                <a href="/" className="text-sm text-muted-foreground hover:text-foreground">Home</a>
                <a href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-center mb-12">
            Have questions? We'd love to hear from you.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>
                    We're here to help with any questions about Forge the Line.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Email</div>
                      <a href="mailto:forgetheline@gmail.com" className="text-sm text-muted-foreground hover:text-primary">
                        forgetheline@gmail.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Common Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• How do the tools work?</p>
                  <p>• What payment methods do you accept?</p>
                  <p>• How long do I have access?</p>
                  <p>• Can I get a refund?</p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Question about pricing..." required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="How can we help?" rows={5} required />
                  </div>

                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2025 Forge the Line
        </div>
      </footer>
    </div>
  )
}