"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

const faqs = [
  {
    question: "What is Forge the Line?",
    answer: "Forge the Line is a private client portal that helps candidates prepare for law enforcement positions at local, state, and federal levels."
  },
  {
    question: "How do the tools work?",
    answer: "Each tool provides prompts for AI. Copy to ChatGPT or Claude, add your info, save the responses."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards through Stripe."
  },
  {
    question: "How long do I have access?",
    answer: "Lifetime access once purchased."
  },
  {
    question: "Is my information secure?",
    answer: "Absolutely. Your data is stored securely and never shared."
  },
  {
    question: "How do I contact support?",
    answer: "Email forgetheline@gmail.com or use the contact form."
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Forge the Line" className="h-10 w-auto" />
            <span className="text-xl font-bold">Forge the Line</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <nav className="flex items-center gap-4">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Home</Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-center mb-12">
            Find answers to common questions about Forge the Line
          </p>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i}>
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                >
                  <CardTitle className="flex items-center justify-between text-lg">
                    {faq.question}
                    {openIndex === i ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </CardTitle>
                </CardHeader>
                {openIndex === i && (
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Link href="/contact">
              <Button>Contact Us</Button>
            </Link>
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