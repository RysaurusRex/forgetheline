import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, MessageSquare, AlertTriangle, Lightbulb, Shield, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const tools = [
  {
    title: "Resume Analyzer",
    description: "Optimize your resume to stand out to law enforcement hiring managers",
    icon: FileText,
    color: "bg-blue-500 hover:bg-blue-600",
    href: "/app/tools/resume-analyzer",
  },
  {
    title: "Interview Simulator",
    description: "Practice with realistic questions modeled after actual hiring interviews",
    icon: MessageSquare,
    color: "bg-emerald-500 hover:bg-emerald-600",
    href: "/app/tools/interview-simulator",
  },
  {
    title: "Disqualifier Scanner",
    description: "Identify issues that could derail your application before they do",
    icon: AlertTriangle,
    color: "bg-amber-500 hover:bg-amber-600",
    href: "/app/tools/disqualifier-scanner",
  },
  {
    title: "Strategy Engine",
    description: "Build a personalized roadmap based on your goals and timeline",
    icon: Lightbulb,
    color: "bg-violet-500 hover:bg-violet-600",
    href: "/app/tools/strategy-engine",
  },
  {
    title: "Polygraph Masterclass",
    description: "What really happens, how to prepare, why deception = automatic DQ",
    icon: Shield,
    color: "bg-red-500 hover:bg-red-600",
    href: "/app/tools/polygraph-masterclass",
  },
  {
    title: "Medical Waiver Guide",
    description: "Blood pressure, vision, past conditions - what needs a waiver",
    icon: Shield,
    color: "bg-teal-500 hover:bg-teal-600",
    href: "/app/tools/medical-waiver",
  },
]

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">All Tools</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Evidence-based tools with insider knowledge from federal hiring processes and 2026 LE research
        </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link key={tool.title} href={tool.href}>
            <Card className="group border-slate-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 bg-white h-full">
              <CardContent className="pt-8">
                <div className={`h-14 w-14 rounded-2xl ${tool.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-all duration-300`}>
                  <tool.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{tool.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{tool.description}</p>
                <div className="flex items-center mt-4 text-sm text-blue-600 font-medium">
                  Open Tool <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-8 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-2xl font-bold mb-4">New: Insider Reality Checks</h3>
        <p className="mb-6 text-slate-600">
          We've added Polygraph Masterclass and Medical Waiver Guide based on extensive insider research from federal hiring processes and 2026 LE research.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Button asChild>
            <Link href="/app/tools/polygraph-masterclass">Polygraph Truth</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/app/tools/medical-waiver">Medical Waivers</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
