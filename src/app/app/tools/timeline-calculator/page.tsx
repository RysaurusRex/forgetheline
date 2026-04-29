"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, CheckCircle, AlertCircle, ChevronRight, Home, ArrowRight } from "lucide-react"

// Timeline data
const AGENCY_TIMELINES: Record<string, {
  name: string
  totalMonths: string
  stages: Array<{ name: string; duration: string; percentage: number; tip: string; color: string }>
}> = {
  fbi: {
    name: "FBI",
    totalMonths: "12-18 months",
    stages: [
      { name: "Application", duration: "2-4 weeks", percentage: 10, tip: "Apply in September for best chances.", color: "bg-blue-500" },
      { name: "Phase I Test", duration: "4-6 weeks", percentage: 20, tip: "Schedule PT test early.", color: "bg-blue-500" },
      { name: "Phase II Interview", duration: "6-8 weeks", percentage: 35, tip: "Oral Board. Prepare STAR stories.", color: "bg-blue-500" },
      { name: "Background", duration: "6-9 months", percentage: 60, tip: "Longest stage. Be patient.", color: "bg-blue-500" },
      { name: "Poly & Medical", duration: "2-3 months", percentage: 80, tip: "Poly is pass/fail. Don't overthink.", color: "bg-blue-500" },
      { name: "Final Offer", duration: "2-4 weeks", percentage: 100, tip: "FLETC starts Jan/Apr/Jul/Oct.", color: "bg-blue-500" },
    ],
  },
  dea: {
    name: "DEA",
    totalMonths: "6-12 months",
    stages: [
      { name: "Application", duration: "2-3 weeks", percentage: 10, tip: "DEA uses PACE assessment.", color: "bg-green-500" },
      { name: "PTT Test", duration: "2-4 weeks", percentage: 20, tip: "Obstacle course, dummy drag, wall climb.", color: "bg-green-500" },
      { name: "Interview & BG", duration: "3-6 months", percentage: 50, tip: "Background faster than FBI.", color: "bg-green-500" },
      { name: "Poly & Medical", duration: "1-2 months", percentage: 75, tip: "Don't volunteer extra info.", color: "bg-green-500" },
      { name: "Academy", duration: "2-4 weeks", percentage: 100, tip: "Quantico academy is 18 weeks.", color: "bg-green-500" },
    ],
  },
  local: {
    name: "Local PD",
    totalMonths: "3-6 months",
    stages: [
      { name: "Written Exam", duration: "1-2 weeks", percentage: 15, tip: "Study guides help. 70% pass rate.", color: "bg-slate-500" },
      { name: "Physical Agility", duration: "1-2 weeks", percentage: 25, tip: "PAT varies by dept. Check standards.", color: "bg-slate-500" },
      { name: "Oral Board", duration: "2-4 weeks", percentage: 40, tip: "3-5 panelists. Answer directly.", color: "bg-slate-500" },
      { name: "Background", duration: "1-3 months", percentage: 70, tip: "Faster but still thorough.", color: "bg-slate-500" },
      { name: "Medical & Psych", duration: "2-4 weeks", percentage: 90, tip: "Answer consistently, not perfectly.", color: "bg-slate-500" },
      { name: "Academy", duration: "1-2 weeks", percentage: 100, tip: "Many depts run academies 2x/year.", color: "bg-slate-500" },
    ],
  },
}

const BACKGROUND_MULTIPLIERS = {
  clean: { label: "Clean Record", multiplier: 1.0, color: "bg-green-100 text-green-800", description: "No issues, stable history" },
  some_issues: { label: "Some Issues", multiplier: 1.3, color: "bg-yellow-100 text-yellow-800", description: "Minor traffic, debt, job changes" },
  complex: { label: "Complex Background", multiplier: 1.6, color: "bg-red-100 text-red-800", description: "International travel, drug use, financial issues" },
}

export default function TimelinePage() {
  const [agency, setAgency] = useState("fbi")
  const [background, setBackground] = useState("clean")
  const [veteran, setVeteran] = useState(false)
  const [showTimeline, setShowTimeline] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)

  const timeline = AGENCY_TIMELINES[agency]
  const multiplier = BACKGROUND_MULTIPLIERS[background as keyof typeof BACKGROUND_MULTIPLIERS].multiplier
  const veteranBoost = veteran ? 0.9 : 1.0

  const calculateDuration = (duration: string) => {
    const match = duration.match(/(\d+)-(\d+)/)
    if (!match) return duration
    const min = Math.round(parseInt(match[1]) * multiplier * veteranBoost)
    const max = Math.round(parseInt(match[2]) * multiplier * veteranBoost)
    return `${min}-${max} ${duration.includes("week") ? "weeks" : "months"}`
  }

  const calculateTotal = () => {
    const months = timeline.totalMonths
    const match = months.match(/(\d+)-(\d+)/)
    if (!match) return months
    const min = Math.round(parseInt(match[1]) * multiplier * veteranBoost)
    const max = Math.round(parseInt(match[2]) * multiplier * veteranBoost)
    return `${min}-${max} months`
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/app/tools" className="hover:text-foreground flex items-center gap-1">
          <Home className="h-3 w-3" />
          Tools
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Timeline Calculator</span>
      </div>

      <h1 className="mb-2 text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
        Hiring Timeline Calculator
      </h1>
      <p className="mb-8 text-muted-foreground">
        Based on insider research from actual hires. See exactly how long your process will take.
      </p>

      <div className="space-y-6">
        {/* Input Form */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Calculate Your Timeline
            </CardTitle>
            <CardDescription>
              Timelines vary by background complexity. Be honest for accurate estimates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Agency</label>
                <select
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-background hover:border-primary/50 transition-colors"
                >
                  <option value="fbi">FBI</option>
                  <option value="dea">DEA</option>
                  <option value="local">Local PD</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Background Complexity</label>
                <select
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-background hover:border-primary/50 transition-colors"
                >
                  <option value="clean">Clean Record</option>
                  <option value="some_issues">Some Issues</option>
                  <option value="complex">Complex Background</option>
                </select>
                <Badge className={`text-xs ${BACKGROUND_MULTIPLIERS[background as keyof typeof BACKGROUND_MULTIPLIERS].color}`}>
                  {BACKGROUND_MULTIPLIERS[background as keyof typeof BACKGROUND_MULTIPLIERS].description}
                </Badge>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Veterans Preference</label>
                <div className="flex items-center gap-2 p-3 border rounded-lg hover:border-primary/50 transition-colors">
                  <input
                    type="checkbox"
                    id="veteran"
                    checked={veteran}
                    onChange={(e) => setVeteran(e.target.checked)}
                    className="rounded h-4 w-4"
                  />
                  <label htmlFor="veteran" className="text-sm cursor-pointer">
                    I'm a veteran
                  </label>
                </div>
                {veteran && (
                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Faster processing
                  </Badge>
                )}
              </div>
            </div>

            <Button onClick={() => setShowTimeline(true)} className="w-full text-lg py-6 hover:scale-[1.02] transition-transform">
              Calculate My Timeline
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Timeline Results */}
        {showTimeline && (
          <Card className="hover:shadow-xl transition-shadow overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{timeline.name} Hiring Timeline</CardTitle>
                  <CardDescription className="text-base mt-1">
                    Estimated total: <strong className="text-foreground text-lg">{calculateTotal()}</strong>
                    {veteran && <Badge className="ml-2 bg-blue-100 text-blue-800">Veterans Preference</Badge>}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  <Clock className="h-4 w-4 mr-2" />
                  {calculateTotal()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Visual Timeline Bar */}
              <div className="mb-8 p-4 bg-muted/50 rounded-xl">
                <div className="relative h-2 bg-gray-200 rounded-full mb-4">
                  {timeline.stages.map((stage, i) => (
                    <div
                      key={i}
                      className={`absolute top-0 h-full rounded-full transition-all ${stage.color} ${i === 0 ? "rounded-l-full" : ""} ${i === timeline.stages.length - 1 ? "rounded-r-full" : ""}`}
                      style={{ left: `${i === 0 ? 0 : timeline.stages[i-1].percentage}%`, width: `${stage.percentage - (i === 0 ? 0 : timeline.stages[i-1].percentage)}%` }}
                    />
                  ))}
                  {/* Current stage marker */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 bg-white border-4 border-primary rounded-full shadow-lg animate-pulse"
                    style={{ left: `${timeline.stages[currentStage].percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  {timeline.stages.map((stage, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentStage(i)}
                      className={`text-center max-w-[80px] transition-all ${currentStage === i ? "text-primary font-bold" : "hover:text-foreground"}`}
                    >
                      <div className={`h-1 w-full mb-1 rounded ${currentStage === i ? "bg-primary" : "bg-gray-300"}`} />
                      {stage.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stage Details */}
              <div className="space-y-3">
                {timeline.stages.map((stage, i) => (
                  <div
                    key={i}
                    onClick={() => setCurrentStage(i)}
                    className={`relative pl-8 pb-4 border-l-2 cursor-pointer hover:bg-muted/30 rounded-r-lg p-3 transition-all ${
                      i === currentStage ? "border-primary bg-primary/5" : "border-muted"
                    }`}
                  >
                    <div className={`absolute left-[-9px] top-3 h-4 w-4 rounded-full border-2 transition-all ${
                      i === currentStage ? "bg-primary border-primary" : "bg-background border-muted"
                    }`} />
                    {i === currentStage && (
                      <Badge className="absolute -top-2 right-2 bg-primary text-white">
                        You are here
                      </Badge>
                    )}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{stage.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {calculateDuration(stage.duration)}
                        </p>
                        <p className="mt-2 text-xs text-blue-600 flex items-start gap-1">
                          <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          {stage.tip}
                        </p>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {stage.percentage}%
                      </Badge>
                    </div>
                    <Progress value={stage.percentage} className="mt-2 h-1" />
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Insider Reality Check:</strong> "Timelines are estimates. FBI can take 2+ years if background 
                  is complex. Local PD can hire in 90 days if they're desperate. Your mileage may vary."
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Comparison Table */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Agency Comparison</CardTitle>
            <CardDescription>How long each agency typically takes (clean record)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left font-medium">Agency</th>
                    <th className="pb-2 text-left font-medium">Total Time</th>
                    <th className="pb-2 text-left font-medium">Fastest Stage</th>
                    <th className="pb-2 text-left font-medium">Longest Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(AGENCY_TIMELINES).map(([key, val]) => (
                    <tr key={key} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 font-medium">{val.name}</td>
                      <td className="py-3">{val.totalMonths}</td>
                      <td className="py-3 text-muted-foreground">{val.stages[0].duration}</td>
                      <td className="py-3 text-muted-foreground">{val.stages[3]?.duration || val.stages[2].duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Gen Z Reality Check */}
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-800">
              <strong>Gen Z Reality Check (2026 Research):</strong> "44% of Gen Z demand salary transparency, 
              but timeline transparency is just as important. They want to know: 'When will I start?' before 
              they apply. Agencies that provide clear timelines get more quality applicants." - Police1
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
