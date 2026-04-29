"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react"

// Timeline data based on insider research
const AGENCY_TIMELINES: Record<string, {
  name: string
  totalMonths: string
  stages: Array<{ name: string; duration: string; percentage: number; tip: string }>
}> = {
  fbi: {
    name: "FBI",
    totalMonths: "12-18 months",
    stages: [
      { name: "Application & Review", duration: "2-4 weeks", percentage: 10, tip: "Insider: 'Apply in September for best chances. Phase 1 hiring.'" },
      { name: "Phase I Testing (Written + PT)", duration: "4-6 weeks", percentage: 20, tip: "Insider: 'Schedule PT test early. Don't wait for the deadline.'" },
      { name: "Phase II (Interview)", duration: "6-8 weeks", percentage: 35, tip: "Insider: 'This is the Oral Board. 3+ agents grill you. Prepare STAR stories.'" },
      { name: "Background Investigation", duration: "6-9 months", percentage: 60, tip: "Insider: 'Longest stage. They interview everyone you've ever met. Be patient.'" },
      { name: "Polygraph & Medical", duration: "2-3 months", percentage: 80, tip: "Insider: 'Poly is pass/fail. Don't overthink it. Medical is strict.'" },
      { name: "Final Offer & EOD", duration: "2-4 weeks", percentage: 100, tip: "Insider: 'FLETC starts January, April, July, October. Plan accordingly.'" },
    ],
  },
  dea: {
    name: "DEA",
    totalMonths: "6-12 months",
    stages: [
      { name: "Application & Assessment", duration: "2-3 weeks", percentage: 10, tip: "Insider: 'DEA uses PACE assessment. Practice logical reasoning questions.'" },
      { name: "Physical Task Test (PTT)", duration: "2-4 weeks", percentage: 20, tip: "Insider: 'PTT is more than running. Obstacle course, dummy drag, wall climb.'" },
      { name: "Interview & Background", duration: "3-6 months", percentage: 50, tip: "Insider: 'DEA background is thorough but faster than FBI. Stay responsive.'" },
      { name: "Polygraph & Medical", duration: "1-2 months", percentage: 75, tip: "Insider: 'DEA poly is straightforward. Don't volunteer extra info.'" },
      { name: "Final Offer & Academy", duration: "2-4 weeks", percentage: 100, tip: "Insider: 'Quantico academy is 18 weeks. Mentally prepare.'" },
    ],
  },
  local: {
    name: "Local PD",
    totalMonths: "3-6 months",
    stages: [
      { name: "Written Exam (POST/CEB)", duration: "1-2 weeks", percentage: 15, tip: "Insider: 'Study guides help. 70% pass rate typically. Don't wing it.'" },
      { name: "Physical Agility Test", duration: "1-2 weeks", percentage: 25, tip: "Insider: 'PAT varies by dept. Check YOUR department's exact standards.'" },
      { name: "Oral Board Interview", duration: "2-4 weeks", percentage: 40, tip: "Insider: '3-5 panelists. Answer directly. Don't ramble. Show community commitment.'" },
      { name: "Background Investigation", duration: "1-3 months", percentage: 70, tip: "Insider: 'Local backgrounds are faster but still thorough. Be honest.'" },
      { name: "Medical & Psych Evaluation", duration: "2-4 weeks", percentage: 90, tip: "Insider: 'Psych test is multiple choice. Answer consistently, not perfectly.'" },
      { name: "Academy Start", duration: "1-2 weeks", percentage: 100, tip: "Insider: 'Many depts run academies 2x/year. Ask when the next one starts.'" },
    ],
  },
}

// Background complexity multipliers
const BACKGROUND_MULTIPLIERS = {
  clean: { label: "Clean Record", multiplier: 1.0, description: "No issues, stable history" },
  some_issues: { label: "Some Issues", multiplier: 1.3, description: "Minor traffic, debt, job changes" },
  complex: { label: "Complex Background", multiplier: 1.6, description: "International travel, prior drug use, financial issues" },
}

export default function TimelinePage() {
  const [agency, setAgency] = useState("fbi")
  const [background, setBackground] = useState("clean")
  const [veteran, setVeteran] = useState(false)
  const [showTimeline, setShowTimeline] = useState(false)

  const timeline = AGENCY_TIMELINES[agency]
  const multiplier = BACKGROUND_MULTIPLIERS[background as keyof typeof BACKGROUND_MULTIPLIERS].multiplier
  const veteranBoost = veteran ? 0.9 : 1.0 // Veterans move slightly faster

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
      <h1 className="mb-8 text-2xl font-bold">Hiring Timeline Calculator</h1>

      <div className="space-y-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Calculate Your Timeline</CardTitle>
            <CardDescription>
              Based on insider research from actual hires. Timelines vary by background complexity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3 mb-6">
              <div>
                <label className="text-sm font-medium">Agency</label>
                <select
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="fbi">FBI</option>
                  <option value="dea">DEA</option>
                  <option value="local">Local PD</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Background Complexity</label>
                <select
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="clean">Clean Record</option>
                  <option value="some_issues">Some Issues</option>
                  <option value="complex">Complex Background</option>
                </select>
                <p className="mt-1 text-xs text-muted-foreground">
                  {BACKGROUND_MULTIPLIERS[background as keyof typeof BACKGROUND_MULTIPLIERS].description}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Veterans Preference</label>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="veteran"
                    checked={veteran}
                    onChange={(e) => setVeteran(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="veteran" className="text-sm">
                    I'm a veteran
                  </label>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Veterans may move faster in federal process
                </p>
              </div>
            </div>

            <Button onClick={() => setShowTimeline(true)} className="w-full">
              Calculate My Timeline
            </Button>
          </CardContent>
        </Card>

        {/* Timeline Results */}
        {showTimeline && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{timeline.name} Hiring Timeline</CardTitle>
                  <CardDescription>
                    Estimated total: <strong>{calculateTotal()}</strong>
                    {veteran && <Badge className="ml-2">Veterans Preference</Badge>}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  <Clock className="h-4 w-4 mr-1" />
                  {calculateTotal()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.stages.map((stage, i) => (
                  <div key={i} className="relative pl-8 pb-4 border-l-2 border-muted last:border-l-0">
                    <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary" />
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{stage.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {calculateDuration(stage.duration)}
                        </p>
                        <p className="mt-1 text-xs text-blue-600 flex items-start gap-1">
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

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Insider Reality Check:</strong> "Timelines are estimates. FBI can take 2+ years if background 
                  is complex. Local PD can hire in 90 days if they're desperate. Your mileage may vary."
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Comparison Table */}
        <Card>
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
                <tbody className="text-muted-foreground">
                  {Object.entries(AGENCY_TIMELINES).map(([key, val]) => (
                    <tr key={key} className="border-b">
                      <td className="py-2 font-medium">{val.name}</td>
                      <td className="py-2">{val.totalMonths}</td>
                      <td className="py-2">{val.stages[0].duration}</td>
                      <td className="py-2">{val.stages[3]?.duration || val.stages[2].duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Gen Z Reality Check */}
        <Card className="border-blue-200 bg-blue-50">
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
