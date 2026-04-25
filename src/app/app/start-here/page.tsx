import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  FileText,
  MessageSquare,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  HelpCircle,
} from "lucide-react"

const toolFlow = [
  { href: "/app/tools/resume-analyzer", label: "1. Resume Analyzer", icon: FileText },
  { href: "/app/tools/interview-simulator", label: "2. Interview Simulator", icon: MessageSquare },
  { href: "/app/tools/disqualifier-scanner", label: "3. Disqualifier Scanner", icon: AlertTriangle },
  { href: "/app/tools/strategy-engine", label: "4. Strategy Engine", icon: Lightbulb },
]

const hiringStages = [
  "Not started - Just exploring",
  "Applied to one or more positions",
  "Written exam passed",
  "Physical exam (PFT) passed",
  "Background investigation in progress",
  "Interview scheduled",
  "Final selection / Offer pending",
  "In academy / Recently hired",
]

export default function StartHerePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Start Here</h1>

      <div className="mb-8 rounded-lg border p-6">
        <h2 className="mb-4 text-lg font-semibold">Welcome</h2>
        <p className="text-muted-foreground">
          This portal gives you tools to prepare for law enforcement careers.
          Follow the recommended order below for best results.
        </p>
      </div>

      <div className="mb-8 rounded-lg border p-6">
        <h2 className="mb-4 text-lg font-semibold">What This Portal Does</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
            <span>Analyze your resume for law enforcement roles</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
            <span>Practice interview questions with AI</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
            <span>Identify disqualifiers before the background check</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
            <span>Build a 90-day strategy to land your dream job</span>
          </li>
        </ul>
      </div>

      <div className="mb-8 rounded-lg border p-6">
        <h2 className="mb-4 text-lg font-semibold">Recommended Order</h2>
        <div className="space-y-3">
          {toolFlow.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-secondary"
            >
              <tool.icon className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{tool.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-8 rounded-lg border p-6">
        <h2 className="mb-4 text-lg font-semibold">30-Second Checklist</h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>Have a clean, updated resume</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>Know your target agencies</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>Research the hiring process</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>Prepare for the written exam</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>Start a fitness routine</span>
          </li>
        </ul>
      </div>

      <div className="mb-8 rounded-lg border p-6">
        <h2 className="mb-4 text-lg font-semibold">Where Are You Right Now?</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {hiringStages.map((stage) => (
            <div
              key={stage}
              className="rounded-md bg-muted px-4 py-2 text-sm"
            >
              {stage}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Support
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Need more help?</h3>
            <p className="text-sm text-muted-foreground">
              Email: forgetheline@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}