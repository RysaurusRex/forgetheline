import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, MessageSquare, AlertTriangle, Lightbulb, Shield, TrendingUp, ChevronRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const features = [
  {
    title: "Resume Analyzer",
    description: "Optimize your resume to stand out to law enforcement hiring managers",
    icon: FileText,
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "Interview Simulator",
    description: "Practice with realistic questions modeled after actual hiring interviews",
    icon: MessageSquare,
    color: "bg-emerald-500 hover:bg-emerald-600",
  },
  {
    title: "Disqualifier Scanner",
    description: "Identify issues that could derail your application before they do",
    icon: AlertTriangle,
    color: "bg-amber-500 hover:bg-amber-600",
  },
  {
    title: "Strategy Engine",
    description: "Build a personalized roadmap based on your goals and timeline",
    icon: Lightbulb,
    color: "bg-violet-500 hover:bg-violet-600",
  },
]

const stats = [
  { value: "500+", label: "Clients Helped" },
  { value: "85%", label: "Success Rate" },
  { value: "50+", label: "Agencies Covered" },
  { value: "24/7", label: "Access Available" },
]

const testimonials = [
  {
    quote: "The Resume Analyzer helped me land an interview with the FBI. I used the prompts and got feedback from a real federal agent. Landed an offer.",
    name: "Michael T.",
    role: "FBI Special Agent - Hired",
  },
  {
    quote: "Went from 3 failed interviews to an offer in 3 months. The Strategy Engine and Interview Simulator are the real deal. My background got flagged and I fixed it before it killed my chances.",
    name: "Sarah K.",
    role: "DEA Special Agent - Hired",
  },
  {
    quote: "The disqualifier scan caught a 10-year-old drug charge I forgot about. Fixed it before applying. Also got the job.",
    name: "James R.",
    role: "Police Officer - Hired",
  },
  {
    quote: "I've been on the hiring side. These tools would have saved me hours of time. Wish I had this 10 years ago when I started.",
    name: "Lt. Rodriguez (Ret.)",
    role: "Former PD Training Commander",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">Forge the Line</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              How It Works
            </Link>
            <Link href="/faq" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-slate-600">Sign In</Button>
            </Link>
            <Link href="/pricing">
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-r from-blue-100/50 via-blue-50/30 to-violet-100/50 rounded-full blur-3xl" />
        <div className="container mx-auto text-center max-w-4xl relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-8 shadow-sm">
            <TrendingUp className="h-4 w-4" />
            Trusted by 500+ candidates
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-tight">
            Land Your Dream<br />
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 bg-clip-text text-transparent">
              Law Enforcement Job
            </span>
          </h1>
          <p className="mt-8 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Private client portal for acing the written exam, interview, and background investigation. 
            Get personalized tools and guidance from law enforcement hiring experts.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link href="/pricing">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/25 gap-2 px-8">
                Start Preparing <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="px-8 border-slate-300 text-slate-700 hover:bg-slate-50">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-slate-100 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-blue-50/50">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25 mb-8">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Why I Built Forge the Line</h2>
          <blockquote className="text-lg md:text-xl text-slate-600 leading-relaxed space-y-4">
            <p>"I know the law enforcement hiring process because I've lived it. After going through the grueling process of applying to local, state, and federal agencies - and eventually getting hired by both a Sheriff's Office and federal law enforcement - I realized there had to be a better way. There wasn't. So I built one.</p>
            <p>The hiring process varies wildly between local, state, and federal - but they're all equally lengthy and confusing. That's why Forge the Line exists: to give candidates the guidance I wish I'd had."</p>
          </blockquote>
          <div className="mt-8 font-bold text-slate-900">- James, Founder</div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Tools That Work</h2>
            <p className="mt-4 text-slate-600 text-lg">Everything you need to land your dream job</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="group border-slate-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="pt-8">
                  <div className={`h-14 w-14 rounded-2xl ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-all duration-300`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">What Clients Say</h2>
            <p className="mt-4 text-slate-600 text-lg">Real results from real candidates</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="border-slate-200 hover:shadow-lg transition-shadow bg-white">
                <CardContent className="pt-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-2xl" />
        <div className="container mx-auto text-center max-w-2xl relative">
          <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mt-4 text-blue-100 text-lg">
            Join hundreds of candidates who have successfully prepared for law enforcement careers.
          </p>
          <div className="mt-10">
            <Link href="/pricing">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 shadow-xl px-10 text-base">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 px-4 bg-slate-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-slate-400" />
            <div className="text-sm text-slate-500">
              © 2025 Forge the Line. All rights reserved.
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">FAQ</Link>
            <Link href="/contact" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Contact</Link>
            <Link href="/privacy" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}