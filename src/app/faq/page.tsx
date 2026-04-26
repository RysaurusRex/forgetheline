"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const faqs = [
  {
    question: "What is Forge the Line?",
    answer: "Forge the Line is a private client portal that helps candidates prepare for law enforcement positions at local, state, and federal levels. We provide tools for resume optimization, interview practice, background screening, and strategic planning."
  },
  {
    question: "How do the tools work?",
    answer: "Each tool is designed around law enforcement hiring requirements. Copy our prompts to ChatGPT or Claude, add your information, and save the AI responses. The Resume Analyzer checks for relevant fit, the Interview Simulator provides realistic questions, and the Disqualifier Scanner identifies potential red flags."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards through Stripe. You can purchase Portal access ($149) or Portal plus $100 coaching credit ($199)."
  },
  {
    question: "How long do I have access?",
    answer: "Lifetime access! Once purchased, you have unlimited access to the portal and all tools. Your saved outputs and results are stored indefinitely."
  },
  {
    question: "Can I use the coaching credit immediately?",
    answer: "Yes, the $100 coaching credit can be used immediately after purchase. Visit the Coaching page to book your session."
  },
  {
    question: "What if I don't get the job?",
    answer: "Many factors are beyond our control. We focus on maximizing your preparation - resume optimization, interview skills, and identifying/disclosing issues before the background check. Our tools give you the best chance of success."
  },
  {
    question: "Is my information secure?",
    answer: "Absolutely. Your data is stored securely in our database and never shared. Each client has isolated data - no one else can see your information."
  },
  {
    question: "How do I contact support?",
    answer: "Email us at forgetheline@gmail.com or use the contact form. We typically respond within 24-48 hours."
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0)