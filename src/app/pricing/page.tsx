"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

// Subscription links (Stripe Dashboard -> Products -> Subscription products)
const SUB_BASIC_LINK = "https://buy.stripe.com/9B6eVdaFG6tM200g497g403"
const SUB_PLUS_LINK = "https://buy.stripe.com/28EcN5dRS5pIcEEdW17g405"
const SUB_PRO_LINK = "https://buy.stripe.com/9B6bJ14hi7xQ7kkdW17g404"

const subscriptionPlans = [
  {
    name: "Free",
    price: "$0",
    period: "/forever",
    link: "#",
    description: "Try before you buy",
    features: [
      "1 Interview Question",
      "Fitness Standards Guide",
      "Veterans Preference Guide",
      "Community forum access",
      "Upgrade anytime",
    ],
    highlight: false,
    type: "free",
  },
  {
    name: "Basic",
    price: "$19.99",
    period: "/month",
    link: SUB_BASIC_LINK,
    description: "Portal access",
    features: [
      "All tool pages",
      "Results log",
      "Client profile",
      "Community forum access",
      "Cancel anytime",
    ],
    highlight: false,
    type: "subscription",
  },
  {
    name: "Plus",
    price: "$29.99",
    period: "/month",
    link: SUB_PLUS_LINK,
    description: "Portal + credit",
    features: [
      "Everything in Basic",
      "$50/month coaching credit",
      "Priority support",
      "New content drops",
      "Cancel anytime",
    ],
    highlight: true,
    type: "subscription",
  },
  {
    name: "Pro",
    price: "$49.99",
    period: "/month",
    link: SUB_PRO_LINK,
    description: "Full access",
    features: [
      "Everything in Plus",
      "$100/month coaching credit",
      "1-on-1 monthly call",
      "Early access to new features",
      "Cancel anytime",
    ],
    highlight: false,
    type: "subscription",
  },
]

export default function PricingPage() {
  const handleBuy = (link: string) => {
    if (link && link !== "#") {
      window.location.href = link
    } else if (link === "#") {
      alert("Free tier - no payment required! Sign up for an account to get started.")
    } else {
      alert("Payment link not ready. Email forgetheline@gmail.com to purchase.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold">Forge the Line</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground">How It Works</Link>
            <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Pricing</h1>
          <p className="mt-4 text-muted-foreground">
            Choose your plan to access Forge the Line
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-center mb-6">Monthly Subscription</h2>
          <p className="text-center text-muted-foreground mb-6">
            Pay monthly, cancel anytime. Get ongoing access and credit every month.
          </p>
          <div className="grid gap-6 md:grid-cols-4 max-w-7xl mx-auto">
            {subscriptionPlans.map((plan) => (
              <Card 
                key={plan.name} 
                className={plan.highlight ? "border-primary shadow-lg relative" : plan.type === "free" ? "border-green-200 shadow-lg relative" : "relative"}
              >
                {plan.highlight && (
                  <Badge className="absolute -top-3 right-4" variant="default">
                    Popular
                  </Badge>
                )}
                {plan.type === "free" && (
                  <Badge className="absolute -top-3 left-4 bg-green-500" variant="default">
                    FREE
                  </Badge>
                )}
                {plan.type !== "free" && (
                  <Badge className="absolute -top-3 right-4 bg-blue-500" variant="default">
                    Insider Approved
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold mb-4">
                    {plan.price}<span className="text-xl font-normal">{plan.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <svg
                          className="mr-2 h-4 w-4 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full`} 
                    variant={plan.highlight ? "default" : plan.type === "free" ? "default" : "outline"}
                    onClick={() => handleBuy(plan.link)}
                  >
                    {plan.type === "free" ? "Start Free" : plan.name === "Basic" ? "Get Started" : plan.name === "Plus" ? "Go Pro" : "Go Premium"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 p-8 bg-muted/50 rounded-xl text-center">
          <h3 className="text-xl font-bold mb-4">Need a Custom Plan?</h3>
          <p className="text-muted-foreground mb-4">
            Contact us for enterprise pricing or special circumstances.
          </p>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
