import Link from "next/link"
import { auth } from "@/lib/get-auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import {
  FileText,
  MessageSquare,
  AlertTriangle,
  Lightbulb,
  ClipboardList,
  Dumbbell,
  TestTube,
  Briefcase,
  GraduationCap,
  Users,
} from "lucide-react"

const toolPages = [
  { href: "/app/tools/resume-analyzer", label: "Resume Analyzer", icon: FileText },
  { href: "/app/tools/interview-simulator", label: "Interview Simulator", icon: MessageSquare },
  { href: "/app/tools/disqualifier-scanner", label: "Disqualifier Scanner", icon: AlertTriangle },
  { href: "/app/tools/strategy-engine", label: "Strategy Engine", icon: Lightbulb },
]

const infoPages = [
  { href: "/app/info/initial-testing", label: "Initial Testing", icon: TestTube },
  { href: "/app/info/fitness", label: "Fitness Standards", icon: Dumbbell },
  { href: "/app/info/processing-clearances", label: "Processing & Clearances", icon: ClipboardList },
  { href: "/app/info/offers-academy-probation", label: "Offers & Academy", icon: GraduationCap },
]

async function getRecentResults(userId: string) {
  return prisma.resultsLogEntry.findMany({
    where: { userId },
    orderBy: { date: "desc" },
    take: 5,
  })
}

export default async function HomePage() {
  const session = await auth()
  const user = session?.user

  let recentResults: any[] = []
  if (user?.id) {
    recentResults = await getRecentResults(user.id)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 rounded-lg border bg-card p-6">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Private portal home.</h2>
        </div>
        <p className="mt-2 text-muted-foreground">
          Support:{" "}
          <a href="mailto:forgetheline@gmail.com" className="text-primary hover:underline">
            forgetheline@gmail.com
          </a>
        </p>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold">Start Here - Tool Flow</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {toolPages.map((tool, index) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-secondary"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                {index + 1}
              </span>
              <tool.icon className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{tool.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold">Info Pages</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {infoPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-secondary"
            >
              <page.icon className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{page.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-8 rounded-lg border p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Results Log</h3>
          <Link href="/app/results">
            <Button>Add new result</Button>
          </Link>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          Log your scores and key takeaways here. One row per session.
        </p>
        {recentResults.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left font-medium">Date</th>
                  <th className="pb-2 text-left font-medium">Tool</th>
                  <th className="pb-2 text-left font-medium">Score</th>
                  <th className="pb-2 text-left font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {recentResults.map((result) => (
                  <tr key={result.id} className="border-b">
                    <td className="py-2">{new Date(result.date).toLocaleDateString()}</td>
                    <td className="py-2">{result.tool}</td>
                    <td className="py-2">{result.score ?? "-"}</td>
                    <td className="py-2">{result.notes?.slice(0, 50) || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No results yet.</p>
        )}
      </div>

      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Coaching</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Get 1-on-1 coaching to accelerate your preparation.
        </p>
        <Link href="/app/coaching">
          <Button variant="outline">View Coaching Options</Button>
        </Link>
      </div>
    </div>
  )
}