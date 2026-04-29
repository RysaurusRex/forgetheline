"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dumbbell, Clock, Calendar, Lightbulb, CheckCircle, Home, ChevronRight, ArrowRight, Trophy } from "lucide-react"

// Agency-specific fitness test data
const AGENCY_FITNESS: Record<string, {
  testName: string
  events: Array<{ name: string; requirement: string; agencyStandard: string }>
  trainingWeeks: number
  insiderTip: string
  color: string
}> = {
  fbi: {
    testName: "Cooper Standards",
    color: "blue",
    events: [
      { name: "1.5 Mile Run", requirement: "< 14:30", agencyStandard: "FBI: < 14:30 (age 37-41)" },
      { name: "Push-ups (1 min)", requirement: "25+", agencyStandard: "FBI: 25-34 (by age)" },
      { name: "Sit-ups (1 min)", requirement: "35+", agencyStandard: "FBI: 35-44 (by age)" },
      { name: "300m Sprint", requirement: "< 58s", agencyStandard: "FBI: < 58s (all ages)" },
    ],
    trainingWeeks: 8,
    insiderTip: "Score higher to show you're ready for FLETC. Run < 13:30 to be competitive.",
  },
  dea: {
    testName: "DEA Physical Task Test",
    color: "green",
    events: [
      { name: "1.5 Mile Run", requirement: "< 15:00", agencyStandard: "DEA: < 15:00" },
      { name: "Push-ups", requirement: "20+", agencyStandard: "DEA: 20+ (untimed)" },
      { name: "Sit-ups", requirement: "25+", agencyStandard: "DEA: 25+ (untimed)" },
      { name: "Agility Course", requirement: "Pass", agencyStandard: "DEA: Obstacle course" },
    ],
    trainingWeeks: 8,
    insiderTip: "DEA is more about completing than speed. Focus on consistency. Agility course tests real-world movement.",
  },
  local: {
    testName: "PAT (Physical Abilities Test)",
    color: "slate",
    events: [
      { name: "1.5 Mile Run", requirement: "< 16:30", agencyStandard: "Local PD: < 16:30 (varies)" },
      { name: "Push-ups", requirement: "20+", agencyStandard: "Local PD: 20+ (1 minute)" },
      { name: "Sit-ups", requirement: "25+", agencyStandard: "Local PD: 25+ (1 minute)" },
      { name: "Bench Press", requirement: "75% body weight", agencyStandard: "Some depts require bench" },
    ],
    trainingWeeks: 6,
    insiderTip: "68% of Gen Z want fitness prep tools. Check YOUR department's exact standards.",
  },
}

// 8-week training plan
const TRAINING_PLAN = [
  { week: 1, run: "3x week @ 15:30 pace", pushups: "3 sets of 15", situps: "3 sets of 20", focus: "Build base", difficulty: 1 },
  { week: 2, run: "3x week @ 15:00 pace", pushups: "3 sets of 18", situps: "3 sets of 25", focus: "Increase volume", difficulty: 2 },
  { week: 3, run: "4x week @ 14:45 pace", pushups: "4 sets of 20", situps: "4 sets of 28", focus: "Add intervals", difficulty: 2 },
  { week: 4, run: "4x week @ 14:30 pace", pushups: "4 sets of 22", situps: "4 sets of 30", focus: "Hit target pace", difficulty: 3 },
  { week: 5, run: "5x week @ 14:00 pace", pushups: "5 sets of 25", situps: "5 sets of 35", focus: "Build endurance", difficulty: 3 },
  { week: 6, run: "5x week @ 13:45 pace", pushups: "5 sets of 28", situps: "5 sets of 38", focus: "Track progress", difficulty: 4 },
  { week: 7, run: "5x week @ 13:30 pace", pushups: "5 sets of 30", situps: "5 sets of 40", focus: "Peak performance", difficulty: 4 },
  { week: 8, run: "Test day: < 14:30", pushups: "Test day: 30+", situps: "Test day: 40+", focus: "CRUSH IT!", difficulty: 5 },
]

const DIFFICULTY_COLORS: Record<number, string> = {
  1: "bg-green-500",
  2: "bg-green-400",
  3: "bg-yellow-500",
  4: "bg-orange-500",
  5: "bg-red-500",
}

export default function FitnessPage() {
  const [agency, setAgency] = useState<keyof typeof AGENCY_FITNESS>("fbi")
  const [pushupPR, setPushupPR] = useState("")
  const [runTime, setRunTime] = useState("")
  const [currentWeek, setCurrentWeek] = useState(1)

  const fitness = AGENCY_FITNESS[agency]
  const training = TRAINING_PLAN[currentWeek - 1]

  const calculateProgress = () => {
    let progress = 0
    if (pushupPR) progress += 33
    if (runTime) progress += 33
    if (currentWeek > 1) progress += 34
    return Math.min(100, progress)
  }

  const getProgressColor = (progress: number) => {
    if (progress < 33) return "bg-red-500"
    if (progress < 66) return "bg-yellow-500"
    return "bg-green-500"
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
        <span className="text-foreground">Fitness Standards</span>
      </div>

      <h1 className="mb-2 text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
        Fitness Standards & Prep
      </h1>

      <div className="space-y-6">
        {/* Agency Selector */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5" />
                  Agency-Specific Fitness Test
                </CardTitle>
                <CardDescription>Each agency uses different standards</CardDescription>
              </div>
              <select
                value={agency}
                onChange={(e) => setAgency(e.target.value as keyof typeof AGENCY_FITNESS)}
                className="px-4 py-2 border-2 rounded-lg text-sm bg-background hover:border-primary/50 transition-colors"
              >
                <option value="fbi">FBI - Cooper Standards</option>
                <option value="dea">DEA - Physical Task Test</option>
                <option value="local">Local PD - PAT</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className={`mb-4 p-4 bg-${fitness.color}-50 rounded-xl border border-${fitness.color}-200`}>
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <Lightbulb className={`h-4 w-4 mt-0.5 flex-shrink-0 text-${fitness.color}-600`} />
                <span><strong>Insider Tip:</strong> {fitness.insiderTip}</span>
              </p>
            </div>

            <h3 className="mb-3 font-semibold text-lg">Test: {fitness.testName}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left font-medium">Event</th>
                    <th className="pb-2 text-left font-medium">Requirement</th>
                    <th className="pb-2 text-left font-medium">Agency Standard</th>
                  </tr>
                </thead>
                <tbody>
                  {fitness.events.map((event, i) => (
                    <tr key={i} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="py-3 font-medium">{event.name}</td>
                      <td className="py-3">
                        <Badge variant="outline" className="font-bold">{event.requirement}</Badge>
                      </td>
                      <td className="py-3 text-xs text-muted-foreground">{event.agencyStandard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Progress Tracking with Visual Circle */}
        <Card className="hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Dumbbell className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle>Track Your Progress</CardTitle>
                <CardDescription>Log your current PRs to see your readiness</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Visual Progress Circle */}
            <div className="flex justify-center mb-6">
              <div className="relative h-32 w-32">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50" cy="50" r="45"
                    fill="none"
                    stroke={calculateProgress() < 33 ? "#ef4444" : calculateProgress() < 66 ? "#eab308" : "#22c55e"}
                    strokeWidth="8"
                    strokeDasharray={`${calculateProgress() * 2.83} 283`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    className="transition-all duration-500"
                  />
                  <text x="50" y="50" textAnchor="middle" dy=".3em" className="text-2xl font-bold">
                    {calculateProgress()}%
                  </text>
                </svg>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mb-6">
              <div className="p-4 bg-muted/50 rounded-xl hover:shadow-md transition-shadow">
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
              <div className="p-4 bg-muted/50 rounded-xl hover:shadow-md transition-shadow">
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

            {/* Readiness Checklist */}
            <div className="p-4 bg-gradient-to-br from-muted/50 to-muted rounded-xl">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Readiness Check
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded hover:bg-background transition-colors">
                  {pushupPR && parseInt(pushupPR) >= 25 ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                  )}
                  <span className="text-sm">Push-ups: {pushupPR ? `${pushupPR} reps` : "Not logged"} (Target: 25+)</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded hover:bg-background transition-colors">
                  {runTime && (() => {
                    const [mins, secs] = runTime.split(":").map(Number)
                    const totalSeconds = mins * 60 + secs
                    return totalSeconds <= 870
                  })() ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                  )}
                  <span className="text-sm">Run: {runTime ? runTime : "Not logged"} (Target: &lt; 14:30)</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded hover:bg-background transition-colors">
                  {currentWeek >= 8 ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                  )}
                  <span className="text-sm">Training: Week {currentWeek} of 8</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 8-Week Training Plan with Visual Timeline */}
        <Card className="hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>8-Week Training Plan</CardTitle>
                  <CardDescription>Progressive overload for peak performance</CardDescription>
                </div>
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
                <Badge variant="outline" className="text-sm px-3 py-1">
                  Week {currentWeek}
                </Badge>
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
            {/* Week Timeline Visual */}
            <div className="mb-6 p-4 bg-muted/30 rounded-xl overflow-x-auto">
              <div className="flex gap-1 min-w-max">
                {TRAINING_PLAN.map((week, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentWeek(week.week)}
                    className={`relative px-3 py-2 rounded-lg text-xs transition-all ${
                      currentWeek === week.week
                        ? "bg-primary text-white shadow-md scale-105"
                        : "bg-background hover:bg-muted"
                    }`}
                  >
                    {week.week}
                    {currentWeek === week.week && (
                      <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-2 h-1 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all"
                  style={{ width: `${(currentWeek / 8) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Week Details */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              <div className="p-4 bg-muted/50 rounded-xl hover:shadow-md transition-all">
                <div className="font-medium text-sm mb-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Run
                </div>
                <div className="text-sm">{training.run}</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-xl hover:shadow-md transition-all">
                <div className="font-medium text-sm mb-1 flex items-center gap-1">
                  <Dumbbell className="h-3 w-3" />
                  Push-ups
                </div>
                <div className="text-sm">{training.pushups}</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-xl hover:shadow-md transition-all">
                <div className="font-medium text-sm mb-1 flex items-center gap-1">
                  <Dumbbell className="h-3 w-3" />
                  Sit-ups
                </div>
                <div className="text-sm">{training.situps}</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border-2 border-primary hover:shadow-md transition-all">
                <div className="font-medium text-sm mb-1">Focus</div>
                <div className="text-sm font-bold text-primary">{training.focus}</div>
                <div className={`mt-2 h-1 rounded-full ${DIFFICULTY_COLORS[training.difficulty]}`} />
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              💡 Gen Z research: "68% want fitness prep tools" - Police1 (2025)
            </p>
          </CardContent>
        </Card>

        {/* Training Recommendations */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Training Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <p className="text-sm">✅ Start {fitness.trainingWeeks}+ weeks before test</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <p className="text-sm">✅ Progressive overload - don't jump to max</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <p className="text-sm">✅ Include interval training (sprints)</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <p className="text-sm">✅ Practice under timed conditions</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <p className="text-sm">✅ Rest 48-72 hrs before test</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <p className="text-sm">✅ Arrive early, warm up, hydrate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gen Z Reality Check */}
        <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <p className="text-sm text-yellow-800">
              <strong>Gen Z Reality Check (2026):</strong> "77% of Gen Z prioritize work-life balance, 
              but 68% want fitness prep tools. They expect agencies to provide clear standards AND training 
              plans - not just 'show up and pass.'" - Police1 & NeoGov
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
