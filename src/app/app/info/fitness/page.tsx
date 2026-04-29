"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dumbbell, Clock, Calendar, Lightbulb, CheckCircle } from "lucide-react"

// Agency-specific fitness test data based on research
const AGENCY_FITNESS: Record<string, {
  testName: string
  events: Array<{ name: string; requirement: string; agencyStandard: string }>
  trainingWeeks: number
  insiderTip: string
}> = {
  fbi: {
    testName: "Cooper Standards",
    events: [
      { name: "1.5 Mile Run", requirement: "< 14:30", agencyStandard: "FBI: < 14:30 (age 37-41)" },
      { name: "Push-ups (1 min)", requirement: "25+", agencyStandard: "FBI: 25-34 (by age)" },
      { name: "Sit-ups (1 min)", requirement: "35+", agencyStandard: "FBI: 35-44 (by age)" },
      { name: "300m Sprint", requirement: "< 58s", agencyStandard: "FBI: < 58s (all ages)" },
    ],
    trainingWeeks: 8,
    insiderTip: "Insider: 'FBI fitness is pass/fail. Score higher to show you're ready for FLETC. Run < 13:30 to be competitive.'",
  },
  dea: {
    testName: "DEA Physical Task Test",
    events: [
      { name: "1.5 Mile Run", requirement: "< 15:00", agencyStandard: "DEA: < 15:00" },
      { name: "Push-ups", requirement: "20+", agencyStandard: "DEA: 20+ (untimed)" },
      { name: "Sit-ups", requirement: "25+", agencyStandard: "DEA: 25+ (untimed)" },
      { name: "Agility Course", requirement: "Pass", agencyStandard: "DEA: Obstacle course" },
    ],
    trainingWeeks: 8,
    insiderTip: "Insider: 'DEA is more about completing than speed. Focus on consistency. Agility course tests real-world movement.'",
  },
  local: {
    testName: "PAT (Physical Abilities Test)",
    events: [
      { name: "1.5 Mile Run", requirement: "< 16:30", agencyStandard: "Local PD: < 16:30 (varies by dept)" },
      { name: "Push-ups", requirement: "20+", agencyStandard: "Local PD: 20+ (1 minute)" },
      { name: "Sit-ups", requirement: "25+", agencyStandard: "Local PD: 25+ (1 minute)" },
      { name: "Bench Press", requirement: "75% body weight", agencyStandard: "Some depts require bench press" },
    ],
    trainingWeeks: 6,
    insiderTip: "Insider: '68% of Gen Z want fitness prep tools. Local PD tests vary - check YOUR department's exact standards.'",
  },
}

// 8-week training plan
const TRAINING_PLAN = [
  { week: 1, run: "3x week @ 15:30 pace", pushups: "3 sets of 15", situps: "3 sets of 20", focus: "Build base" },
  { week: 2, run: "3x week @ 15:00 pace", pushups: "3 sets of 18", situps: "3 sets of 25", focus: "Increase volume" },
  { week: 3, run: "4x week @ 14:45 pace", pushups: "4 sets of 20", situps: "4 sets of 28", focus: "Add intervals" },
  { week: 4, run: "4x week @ 14:30 pace", pushups: "4 sets of 22", situps: "4 sets of 30", focus: "Hit target pace" },
  { week: 5, run: "5x week @ 14:00 pace", pushups: "5 sets of 25", situps: "5 sets of 35", focus: "Build endurance" },
  { week: 6, run: "5x week @ 13:45 pace", pushups: "5 sets of 28", situps: "5 sets of 38", focus: "Track progress" },
  { week: 7, run: "5x week @ 13:30 pace", pushups: "5 sets of 30", situps: "5 sets of 40", focus: "Peak performance" },
  { week: 8, run: "Test day: < 14:30", pushups: "Test day: 30+", situps: "Test day: 40+", focus: "CRUSH IT!" },
]

export default function FitnessPage() {
  const [agency, setAgency] = useState<keyof typeof AGENCY_FITNESS>("fbi"))
  const [pushupPR, setPushupPR] = useState(""))
  const [runTime, setRunTime] = useState(""))
  const [currentWeek, setCurrentWeek] = useState(1))

  const fitness = AGENCY_FITNESS[agency]
  const training = TRAINING_PLAN[currentWeek - 1])

  const calculateProgress = () => {
    let progress = 0
    if (pushupPR) progress += 33
    if (runTime) progress += 33
    if (currentWeek > 1) progress += 34
    return Math.min(100, progress)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="mb-8 text-2xl font-bold">Fitness Standards & Prep</h1>

      <div className="space-y-6">
        {/* Agency Selector */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Agency-Specific Fitness Test</CardTitle>
                <CardDescription>Each agency uses different standards</CardDescription>
              </div>
              <select
                value={agency}
                onChange={(e) => setAgency(e.target.value as keyof typeof AGENCY_FITNESS)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="fbi">FBI - Cooper Standards</option>
                <option value="dea">DEA - Physical Task Test</option>
                <option value="local">Local PD - PAT</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700 flex items-start gap-2">
                <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span><strong>Insider Tip:</strong> {fitness.insiderTip}</span>
              </p>
            </div>

            <h3 className="mb-3 font-semibold">Test: {fitness.testName}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left font-medium">Event</th>
                    <th className="pb-2 text-left font-medium">Requirement</th>
                    <th className="pb-2 text-left font-medium">Agency Standard</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {fitness.events.map((event, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2">{event.name}</td>
                      <td className="py-2 font-medium">{event.requirement}</td>
                      <td className="py-2 text-xs">{event.agencyStandard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Progress Tracking */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5" />
              <CardTitle>Track Your Progress</CardTitle>
            </div>
            <CardDescription>Log your current PRs to see your readiness</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={calculateProgress()} className="mb-6" />
            
            <div className="grid gap-4 sm:grid-cols-2 mb-6">
              <div>
                <label className="text-sm font-medium">Current Push-up PR</label>
                <Input
                  type="number"
                  placeholder="e.g., 25"
                  value={pushupPR}
                  onChange={(e) => setPushupPR(e.target.value)}
                  className="mt-1"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Target: {fitness.events.find(e => e.name.includes("Push"))?.requirement}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Current 1.5 Mile Time</label>
                <Input
                  type="text"
                  placeholder="mm:ss (e.g., 14:30)"
                  value={runTime}
                  onChange={(e) => setRunTime(e.target.value)}
                  className="mt-1"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Target: {fitness.events.find(e => e.name.includes("Mile"))?.requirement}
                </p>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Readiness Check
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  {pushupPR && parseInt(pushupPR) >= 25 ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                  )}
                  Push-ups: {pushupPR ? `${pushupPR} reps` : "Not logged"}
                </li>
                <li className="flex items-center gap-2">
                  {runTime && (() => {
                    const [mins, secs] = runTime.split(":").map(Number)
                    const totalSeconds = mins * 60 + secs
                    return totalSeconds <= 870 // 14:30
                  })() ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                  )}
                  Run: {runTime ? runTime : "Not logged"}
                </li>
                <li className="flex items-center gap-2">
                  {currentWeek >= 8 ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                  )}
                  Training: Week {currentWeek} of 8
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 8-Week Training Plan */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <CardTitle>8-Week Training Plan</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
                  disabled={currentWeek === 1}
                >
                  ← Prev
                </Button>
                <span className="text-sm font-medium">Week {currentWeek}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentWeek(Math.min(8, currentWeek + 1))}
                  disabled={currentWeek === 8}
                >
                  Next →
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium text-sm mb-1">Run</div>
                <div className="text-sm text-muted-foreground">{training.run}</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium text-sm mb-1">Push-ups</div>
                <div className="text-sm text-muted-foreground">{training.pushups}</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium text-sm mb-1">Sit-ups</div>
                <div className="text-sm text-muted-foreground">{training.situps}</div>
              </div>
              <div className="p-3 bg-muted rounded-lg border-2 border-primary">
                <div className="font-medium text-sm mb-1">Focus</div>
                <div className="text-sm font-medium text-primary">{training.focus}</div>
              </div>
            </div>

            {/* Week selector dots */}
            <div className="flex gap-2 justify-center">
              {TRAINING_PLAN.map((week, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentWeek(week.week)}
                  className={`h-3 w-3 rounded-full transition-colors ${
                    currentWeek === week.week
                      ? "bg-primary"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  title={`Week ${week.week}: ${week.focus}`}
                />
              ))}
            </div>

            <p className="mt-4 text-xs text-muted-foreground text-center">
              💡 Gen Z research: "68% want fitness prep tools" - Police1 (2025)
            </p>
          </CardContent>
        </Card>

        {/* Training Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Training Recommendations</CardTitle>
            <CardDescription>Based on insider research and best practices</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Start {fitness.trainingWeeks}+ weeks before your test date</li>
              <li>Focus on progressive overload - don't jump into max effort</li>
              <li>Include interval training for the run (sprints, fartleks)</li>
              <li>Practice the test events under timed conditions</li>
              <li>Rest 48-72 hours before the actual test</li>
              <li>Test day: Arrive early, warm up properly, stay hydrated</li>
            </ul>
          </CardContent>
        </Card>

        {/* Gen Z Reality Check */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <p className="text-sm text-yellow-800">
              <strong>Gen Z Reality Check (2026 Research):</strong> "77% of Gen Z prioritize work-life balance, 
              but 68% want fitness prep tools. They expect agencies to provide clear standards AND training 
              plans - not just 'show up and pass.'" - Police1 & NeoGov
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
