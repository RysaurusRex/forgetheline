import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

const steps = [
  {
    number: "1",
    title: "Purchase Access",
    description: "Choose your plan and get instant portal access. The Portal plan gives you full access to all tools.",
  },
  {
    number: "2",
    title: "Complete Your Profile",
    description: "Fill out your client profile with your target roles, agencies, and background. This helps us tailor our tools to you.",
  },
  {
    number: "3",
    title: "Use Our Tools",
    description: "Access the Resume Analyzer, Interview Simulator, Disqualifier Scanner, and Strategy Engine. Copy prompts to ChatGPT or Claude for AI-powered guidance.",
  },
  {
    number: "4",
    title: "Track Your Progress",
    description: "Save your outputs, log results, and monitor your progress toward landing your dream law enforcement job.",
  },
]

const tools = [
  {
    title: "Resume Analyzer",
    description: "Get expert analysis of your resume for law enforcement positions. Identify strengths, weaknesses, and keywords to add.",
  },
  {
    title: "Interview Simulator",
    description: "Practice with realistic law enforcement interview questions and model answers.",
  },
  {
    title: "Disqualifier Scanner",
    description: "Identify potential background check issues before they become problems. Get mitigation strategies.",
  },
  {
    title: "Strategy Engine",
    description: "Build a personalized 90-day roadmap to your dream law enforcement career.",
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold">Forge the Line</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground">How It Works</Link>
            <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/pricing">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <h1 className="text-4xl font-bold">How It Works</h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Get step-by-step guidance to land your dream law enforcement job
            </p>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <div className="grid gap-8">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Our Tools</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tools.map((tool) => (
                <Card key={tool.title}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto text-center max-w-2xl">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="mt-4 text-muted-foreground">
              Join hundreds of candidates who have successfully prepared for law enforcement careers.
            </p>
            <div className="mt-8">
              <Link href="/pricing">
                <Button size="lg">View Pricing</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 Forge the Line. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}