"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, CheckCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export const dynamic = 'force-dynamic'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    const { firstName, lastName, email, subject, message } = form
    
    if (!firstName || !lastName || !email || !message) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    const name = `${firstName} ${lastName}`.trim()

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, subject }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to send")
      }

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
    }
    
    setLoading(false)
  }

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="border-b bg-card">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
             <a href="/" className="flex items-center gap-3">
               <img src="/logo.png" alt="Forge the Line" className="h-10 w-auto" />
               <span className="text-xl font-bold">Forge the Line</span>
             </a>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
              <p className="text-muted-foreground mb-4">
                Thank you! We'll be in touch within 24-48 hours.
              </p>
              <a href="/">
                <Button>Back to Home</Button>
              </a>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="/" className="text-xl font-bold">Forge the Line</a>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-center mb-12">
            Have questions? The law enforcement profession and hiring is always changing - if you have an idea to make this site better or know of a major change in hiring, let us know!
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>We're here to help.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <a href="mailto:forgetheline@gmail.com">forgetheline@gmail.com</a>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First name *</Label>
                      <Input 
                        value={form.firstName}
                        onChange={(e) => updateField("firstName", e.target.value)}
                        placeholder="John"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Last name *</Label>
                      <Input 
                        value={form.lastName}
                        onChange={(e) => updateField("lastName", e.target.value)}
                        placeholder="Doe"
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input 
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="john@example.com"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Input 
                      value={form.subject}
                      onChange={(e) => updateField("subject", e.target.value)}
                      placeholder="Question about..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Message *</Label>
                    <Textarea 
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="How can we help?"
                      rows={5}
                      required 
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
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