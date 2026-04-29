"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  DollarSign, MapPin, Clock, Users, Shield, AlertTriangle, 
  CheckCircle, Star, Building, Scale, Trophy, ChevronRight, Home
} from "lucide-react"

// Agency color themes
const AGENCY_COLORS: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  fbi: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-900", badge: "bg-blue-100 text-blue-800" },
  dea: { bg: "bg-green-50", border: "border-green-200", text: "text-green-900", badge: "bg-green-100 text-green-800" },
  atf: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-900", badge: "bg-orange-100 text-orange-800" },
  cbp: { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-900", badge: "bg-sky-100 text-sky-800" },
  local: { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-900", badge: "bg-slate-100 text-slate-800" },
}

// Comprehensive agency data
const AGENCIES = {
  fbi: {
    name: "FBI",
    type: "Federal",
    mission: "Protect the American people and uphold the Constitution",
    color: "blue",
    pay: { entry: "GL-10: $66,693 - $95,654", top: "GS-13: $120,285 - $156,371", note: "Plus 25% LEAP", rank: 2 },
    requirements: { age: "23-36 (veterans up to 40)", education: "Bachelor's degree required", experience: "No experience required", citizenship: "US citizen", clearance: "Top Secret" },
    locations: { total: "56 Field Offices, 350+ Resident Agencies", major: "All 50 states + territories", international: "60+ Legal Attaché offices" },
    workLife: { hours: "50-60/week", schedule: "Rotating shifts", travel: "Frequent", balance: 2, balanceLabel: "Challenging" },
    culture: { vibe: "Professional, mission-driven", diversity: "35% female agents", promotion: "GS-10 → GS-13 in 5-7 years" },
    veterans: "5 or 10-point preference",
    disqualifiers: ["Felony convictions", "Recent drug use (3 yrs)", "Defaulted loans", "Poor credit"],
    hiring: { timeline: "12-18 months", difficulty: "Highly competitive (5%)", phases: "Phase I → Phase II → Background → Poly → Medical", rank: 5 },
    insiderTips: [
      "Apply at 23 if possible. Older applicants struggle more with PT.",
      "FBI loves advanced degrees. Master's = GS-10 start pay.",
      "Choose field office wisely. NYC competitive, rural needs people.",
      "FLETC training is 21 weeks in Glynco, GA. Prepare mentally.",
    ],
  },
  dea: {
    name: "DEA",
    type: "Federal",
    mission: "Enforce controlled substances laws and reduce drug supply",
    color: "green",
    pay: { entry: "GL-7/9: $52,560 - $73,375", top: "GS-13: $120,285 - $156,371", note: "Plus 25% LEAP", rank: 3 },
    requirements: { age: "21-36 (veterans up to 40)", education: "Bachelor's OR experience", experience: "3 years specialized accepted", citizenship: "US citizen", clearance: "Top Secret" },
    locations: { total: "241 Domestic, 92 Foreign Offices", major: "All 50 states + major cities", international: "92 offices in 68 countries" },
    workLife: { hours: "50-60/week", schedule: "Shift work", travel: "Moderate", balance: 2, balanceLabel: "Challenging" },
    culture: { vibe: "Tactical, high-intensity", diversity: "20% female agents", promotion: "GS-7 → GS-13 in 6-8 years" },
    veterans: "5 or 10-point preference",
    disqualifiers: ["Felony convictions", "Past drug use", "Failed polygraph", "Poor driving record"],
    hiring: { timeline: "6-12 months", difficulty: "Competitive (10-15%)", phases: "Assessment → PTT → Interview → Background → Poly", rank: 4 },
    insiderTips: [
      "DEA Academy is 18 weeks at Quantico. Very physical.",
      "DEA values Special Ops background. Rangers, SEALs do well.",
      "Undercover work is common. Consider family impact.",
      "DEA has the best equipment. You'll have what you need.",
    ],
  },
  atf: {
    name: "ATF",
    type: "Federal",
    mission: "Protect communities from violent criminals and illegal firearms",
    color: "orange",
    pay: { entry: "GL-7/9: $52,560 - $73,375", top: "GS-13: $120,285 - $156,371", note: "Plus 25% LEAP", rank: 3 },
    requirements: { age: "21-36 (veterans up to 40)", education: "Bachelor's OR experience", experience: "Firearms/explosives valuable", citizenship: "US citizen", clearance: "Top Secret" },
    locations: { total: "25 Field Divisions, 150+ offices", major: "Major cities, task forces", international: "Limited attaches" },
    workLife: { hours: "45-55/week", schedule: "More regular than FBI/DEA", travel: "Moderate", balance: 3, balanceLabel: "Moderate" },
    culture: { vibe: "Technical, specialized", diversity: "25% female agents", promotion: "Slower but less competitive" },
    veterans: "5 or 10-point, loves military police/EOD",
    disqualifiers: ["Felony convictions", "Domestic violence", "Recent marijuana", "Poor credit"],
    hiring: { timeline: "6-12 months", difficulty: "Moderate (15-20%)", phases: "Written → Physical → Interview → Background → Poly", rank: 2 },
    insiderTips: [
      "ATF loves prior military police, EOD, firearms instructors.",
      "ATF Academy is 12 weeks at FLETC. Easier than Quantico.",
      "Explosives experience = fast track. They need those skills.",
      "ATF does task force work. You'll work with locals daily.",
    ],
  },
  cbp: {
    name: "CBP / Border Patrol",
    type: "Federal",
    mission: "Protect borders, prevent terrorism, enforce customs laws",
    color: "sky",
    pay: { entry: "GL-7/9: $52,560 - $73,375 (BP-9: $61,620+)", top: "GS-13: $120,285 - $156,371", note: "Plus 25% LEAP + $30k bonus", rank: 4 },
    requirements: { age: "21-40 (veterans exempt)", education: "Bachelor's OR experience", experience: "1 year specialized for GL-9", citizenship: "US citizen", clearance: "Secret (not Top Secret)" },
    locations: { total: "170+ Border Patrol Stations, 328 Ports", major: "Border states: TX, CA, AZ, NM", international: "Pre-clearance at foreign airports" },
    workLife: { hours: "50-60/week", schedule: "24/7/365, night shifts", travel: "Minimal", balance: 2, balanceLabel: "Challenging" },
    culture: { vibe: "Paramilitary, rugged", diversity: "30% Hispanic, 15% female", promotion: "Fast due to turnover" },
    veterans: "5 or 10-point, AGE LIMIT WAIVED",
    disqualifiers: ["Felony convictions", "Past drug use", "Failed polygraph", "Poor driving"],
    hiring: { timeline: "3-6 months", difficulty: "Moderate (30%, high turnover)", phases: "Exam → Physical → Interview → Background → Medical", rank: 1 },
    insiderTips: [
      "CBP offers $30k bonus for hard-to-fill locations. Take it.",
      "Border Patrol Academy is 6 months in Artesia, NM. Isolated but doable.",
      "San Diego competitive. Rural Texas sectors need people NOW.",
      "Veterans: Age limit doesn't apply. Apply up to 40+ with preference.",
    ],
  },
  local: {
    name: "Local Police Department",
    type: "Local",
    mission: "Serve and protect local communities, enforce local/state laws",
    color: "slate",
  },
  hsi: {
    name: "HSI",
    type: "Federal",
    mission: "Prevent terrorist and criminal activities, investigate immigration/cyber crimes",
    color: "red",
  },
  uspis: {
    name: "USPIS",
    type: "Federal",
    mission: "Protect the U.S. mail system from criminal misuse, investigate postal crimes",
    color: "darkblue",
  },
  atf: {
    name: "ATF",
    type: "Federal",
    mission: "Protect communities from violent criminals, firearms trafficking, arson",
    color: "orange",
  },
  cbp: {
    name: "CBP / Border Patrol",
    type: "Federal",
    mission: "Protect borders, prevent terrorism, enforce customs laws",
    color: "sky",
  },
    pay: { entry: "$45,000 - $65,000 (varies)", top: "$85,000 - $130,000 (with OT)", note: "Metro pays more, rural less", rank: 5 },
    requirements: { age: "21+ (no upper limit)", education: "High school diploma (some need 60 credits)", experience: "None required, military preferred", citizenship: "US citizen OR legal resident", clearance: "Background only, no clearance" },
    locations: { total: "18,000+ agencies in US", major: "Every city, county, town", international: "None" },
    workLife: { hours: "40-50/week", schedule: "Rotating shifts", travel: "None, patrol assigned area", balance: 3, balanceLabel: "Moderate" },
    culture: { vibe: "Community-focused, paramilitary", diversity: "Varies by department", promotion: "Based on civil service exam" },
    veterans: "5-10 point on exams",
    disqualifiers: ["Felony convictions", "Domestic violence", "Recent drug use", "Failed polygraph (if used)"],
    hiring: { timeline: "3-6 months", difficulty: "Varies (metro competitive)", phases: "Written → Physical → Oral Board → Background → Medical/Psych", rank: 1 },
    insiderTips: [
      "Check YOUR department's contract. Pay/benefits vary HUGE.",
      "Small depts: Do everything. Big depts: Specialized units.",
      "Ask about take-home car policy. Some depts give them.",
      "Veterans get 5-10 points on written. Ask HR about this.",
    ],
  },
}

const COMPARISON_CATEGORIES = [
  { key: "pay", label: "Pay", icon: DollarSign },
  { key: "requirements", label: "Requirements", icon: CheckCircle },
  { key: "locations", label: "Locations", icon: MapPin },
  { key: "workLife", label: "Work-Life", icon: Clock },
  { key: "culture", label: "Culture", icon: Users },
  { key: "hiring", label: "Hiring", icon: Shield },
]

// Helper to get winner for a category
const getWinner = (agencies: string[], category: string) => {
  const selected = agencies.map(k => AGENCIES[k as keyof typeof AGENCIES])
  if (category === "pay") {
    const sorted = selected.sort((a, b) => a.pay.rank - b.pay.rank)
    return sorted[0].name
  }
  if (category === "hiring") {
    const sorted = selected.sort((a, b) => a.hiring.rank - b.hiring.rank)
    return sorted[0].name
  }
  if (category === "workLife") {
    const sorted = selected.sort((a, b) => b.workLife.balance - a.workLife.balance)
    return sorted[0].name
  }
  return null
}

export default function AgencyComparisonPage() {
  const [selectedAgencies, setSelectedAgencies] = useState<string[]>(["fbi", "dea"])
  const [comparisonView, setComparisonView] = useState<"sideBySide" | "table">("sideBySide")

  const toggleAgency = (agencyKey: string) => {
    if (selectedAgencies.includes(agencyKey)) {
      setSelectedAgencies(selectedAgencies.filter(a => a !== agencyKey))
    } else if (selectedAgencies.length < 3) {
      setSelectedAgencies([...selectedAgencies, agencyKey])
    }
  }

  const renderBalanceMeter = (balance: number, label: string) => (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{balance}/5</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all ${balance >= 3 ? "bg-green-500" : balance >= 2 ? "bg-yellow-500" : "bg-red-500"}`}
          style={{ width: `${balance * 20}%` }}
        />
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/app/tools" className="hover:text-foreground flex items-center gap-1">
          <Home className="h-3 w-3" />
          Tools
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Agency Comparison</span>
      </div>

      <h1 className="mb-2 text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Agency Comparison Tool
      </h1>
      <p className="mb-8 text-muted-foreground">
        Compare federal and local law enforcement agencies side-by-side. Based on OPM data, agency websites, and insider research.
      </p>

      {/* Agency Selector */}
      <Card className="mb-6 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Select Agencies to Compare (max 3)
          </CardTitle>
          <CardDescription>Choose 2-3 agencies to see detailed comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.entries(AGENCIES).map(([key, agency]) => {
              const colors = AGENCY_COLORS[key]
              const isSelected = selectedAgencies.includes(key)
              return (
                <button
                  key={key}
                  onClick={() => toggleAgency(key)}
                  className={`p-4 border-2 rounded-xl text-left transition-all hover:scale-105 ${
                    isSelected
                      ? `${colors.border} ${colors.bg} shadow-md`
                      : "border-muted hover:border-primary/50"
                  } ${selectedAgencies.length >= 3 && !isSelected ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="font-bold text-lg mb-1">{agency.name}</div>
                  <Badge variant={agency.type === "Federal" ? "default" : "secondary"} className="text-xs">
                    {agency.type}
                  </Badge>
                  {isSelected && (
                    <Badge className={`mt-2 ${colors.badge}`}>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Selected
                    </Badge>
                  )}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {selectedAgencies.length >= 2 && (
        <>
          {/* View Toggle */}
          <div className="flex justify-end mb-6">
            <div className="flex gap-2 bg-muted p-1 rounded-lg">
              <Button
                size="sm"
                variant={comparisonView === "sideBySide" ? "default" : "ghost"}
                onClick={() => setComparisonView("sideBySide")}
                className="rounded-md"
              >
                Side-by-Side
              </Button>
              <Button
                size="sm"
                variant={comparisonView === "table" ? "default" : "ghost"}
                onClick={() => setComparisonView("table")}
                className="rounded-md"
              >
                Table View
              </Button>
            </div>
          </div>

          {/* Side-by-Side Comparison */}
          {comparisonView === "sideBySide" && (
            <div className="grid gap-6 lg:grid-cols-3">
              {selectedAgencies.map(key => {
                const agency = AGENCIES[key as keyof typeof AGENCIES]
                const colors = AGENCY_COLORS[key]
                const payWinner = getWinner(selectedAgencies, "pay") === agency.name
                const hiringWinner = getWinner(selectedAgencies, "hiring") === agency.name
                const balanceWinner = getWinner(selectedAgencies, "workLife") === agency.name
                return (
                  <Card key={key} className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${colors.border} ${colors.bg}`}>
                    <CardHeader className="relative">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl">{agency.name}</CardTitle>
                          <CardDescription className={colors.text}>{agency.type}</CardDescription>
                        </div>
                        {payWinner && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Trophy className="h-3 w-3 mr-1" />
                            Best Pay
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 bg-white/50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm flex items-center gap-1">
                            <DollarSign className="h-3 w-3" /> Pay
                          </h4>
                          {payWinner && <Trophy className="h-4 w-4 text-yellow-500" />}
                        </div>
                        <p className="text-sm font-medium">{agency.pay.entry}</p>
                        <p className="text-xs text-muted-foreground">{agency.pay.note}</p>
                      </div>

                      <div className="p-3 bg-white/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Work-Life
                          </h4>
                          {balanceWinner && <Trophy className="h-4 w-4 text-yellow-500" />}
                        </div>
                        {renderBalanceMeter(agency.workLife.balance, agency.workLife.balanceLabel)}
                        <p className="text-xs text-muted-foreground mt-2">{agency.workLife.hours}</p>
                      </div>

                      <div className="p-3 bg-white/50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm flex items-center gap-1">
                            <Shield className="h-3 w-3" /> Hiring
                          </h4>
                          {hiringWinner && <Trophy className="h-4 w-4 text-yellow-500" />}
                        </div>
                        <p className="text-sm font-medium">{agency.hiring.timeline}</p>
                        <Badge variant="outline" className="mt-1 text-xs">{agency.hiring.difficulty}</Badge>
                      </div>

                      <div className="p-3 bg-white/50 rounded-lg">
                        <h4 className="font-medium text-sm mb-1">Veterans</h4>
                        <p className="text-xs text-muted-foreground">{agency.veterans}</p>
                      </div>

                      <div className="p-3 bg-blue-50/50 rounded-lg">
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3 text-blue-600" />
                          Insider Tips
                        </h4>
                        {agency.insiderTips.slice(0, 2).map((tip, i) => (
                          <p key={i} className="text-xs text-blue-700 mb-1">• {tip}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Table Comparison */}
          {comparisonView === "table" && (
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-3 text-left font-medium">Category</th>
                      {selectedAgencies.map(key => {
                        const agency = AGENCIES[key as keyof typeof AGENCIES]
                        const isPayWinner = getWinner(selectedAgencies, "pay") === agency.name
                        const isHiringWinner = getWinner(selectedAgencies, "hiring") === agency.name
                        return (
                          <th key={key} className="pb-3 text-left font-medium">
                            <div className="flex items-center gap-1">
                              {agency.name}
                              {isPayWinner && <Trophy className="h-3 w-3 text-yellow-500" />}
                              {isHiringWinner && !isPayWinner && <Trophy className="h-3 w-3 text-yellow-500" />}
                            </div>
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 font-medium">Entry Pay</td>
                      {selectedAgencies.map(key => (
                        <td key={key} className="py-3">
                          {AGENCIES[key as keyof typeof AGENCIES].pay.entry}
                          {getWinner(selectedAgencies, "pay") === AGENCIES[key as keyof typeof AGENCIES].name && (
                            <Trophy className="h-3 w-3 text-yellow-500 inline ml-1" />
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 font-medium">Max Pay</td>
                      {selectedAgencies.map(key => (
                        <td key={key} className="py-3">{AGENCIES[key as keyof typeof AGENCIES].pay.top}</td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 font-medium">Age Req</td>
                      {selectedAgencies.map(key => (
                        <td key={key} className="py-3">{AGENCIES[key as keyof typeof AGENCIES].requirements.age}</td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 font-medium">Education</td>
                      {selectedAgencies.map(key => (
                        <td key={key} className="py-3">{AGENCIES[key as keyof typeof AGENCIES].requirements.education}</td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 font-medium">Timeline</td>
                      {selectedAgencies.map(key => (
                        <td key={key} className="py-3">
                          {AGENCIES[key as keyof typeof AGENCIES].hiring.timeline}
                          {getWinner(selectedAgencies, "hiring") === AGENCIES[key as keyof typeof AGENCIES].name && (
                            <Trophy className="h-3 w-3 text-yellow-500 inline ml-1" />
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 font-medium">Work-Life</td>
                      {selectedAgencies.map(key => (
                        <td key={key} className="py-3">
                          {renderBalanceMeter(AGENCIES[key as keyof typeof AGENCIES].workLife.balance, "")}
                        </td>
                      ))}
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="py-3 font-medium">Veterans</td>
                      {selectedAgencies.map(key => (
                        <td key={key} className="py-3">{AGENCIES[key as keyof typeof AGENCIES].veterans}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {/* Detailed Agency Cards */}
          <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-bold">Detailed Breakdown</h2>
            {selectedAgencies.map(key => {
              const agency = AGENCIES[key as keyof typeof AGENCIES]
              const colors = AGENCY_COLORS[key]
              return (
                <Card key={key} className={`hover:shadow-xl transition-all ${colors.border} ${colors.bg}`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${colors.badge.replace('bg-', 'from-').replace(' text-', ' to-').split(' ')[0]} flex items-center justify-center text-2xl`}>
                        {agency.name[0]}
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{agency.name}</CardTitle>
                        <CardDescription className={colors.text}>{agency.mission}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="pay" className="w-full">
                      <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-6">
                        {COMPARISON_CATEGORIES.map(cat => (
                          <TabsTrigger key={cat.key} value={cat.key} className="text-xs">
                            <cat.icon className="h-3 w-3 mr-1" />
                            {cat.label}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      <TabsContent value="pay" className="mt-4">
                        <div className="grid gap-4 sm:grid-cols-3">
                          <div className="p-4 bg-white/70 rounded-lg hover:shadow-md transition-shadow">
                            <div className="font-medium text-sm mb-1">Entry Level</div>
                            <div className="text-sm font-semibold">{agency.pay.entry}</div>
                            {getWinner(selectedAgencies, "pay") === agency.name && (
                              <Badge className="mt-2 bg-yellow-100 text-yellow-800">
                                <Trophy className="h-3 w-3 mr-1" />
                                Best Pay
                              </Badge>
                            )}
                          </div>
                          <div className="p-4 bg-white/70 rounded-lg hover:shadow-md transition-shadow">
                            <div className="font-medium text-sm mb-1">Top Pay</div>
                            <div className="text-sm font-semibold">{agency.pay.top}</div>
                          </div>
                          <div className="p-4 bg-white/70 rounded-lg hover:shadow-md transition-shadow">
                            <div className="font-medium text-sm mb-1">Notes</div>
                            <div className="text-sm">{agency.pay.note}</div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="workLife" className="mt-4">
                        <div className="space-y-4">
                          <div className="p-4 bg-white/70 rounded-lg">
                            {renderBalanceMeter(agency.workLife.balance, `Work-Life Balance: ${agency.workLife.balanceLabel}`)}
                          </div>
                          <div className="grid gap-3 sm:grid-cols-3">
                            {Object.entries(agency.workLife).filter(([k]) => !["balance", "balanceLabel"].includes(k)).map(([k, v]) => (
                              <div key={k} className="p-3 bg-white/70 rounded-lg">
                                <div className="font-medium text-sm capitalize">{k}</div>
                                <div className="text-sm text-muted-foreground">{v as string}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="hiring" className="mt-4">
                        <div className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-3">
                            <div className="p-4 bg-white/70 rounded-lg">
                              <div className="font-medium text-sm mb-1">Timeline</div>
                              <div className="text-sm font-semibold">{agency.hiring.timeline}</div>
                              {getWinner(selectedAgencies, "hiring") === agency.name && (
                                <Badge className="mt-2 bg-yellow-100 text-yellow-800">
                                  <Trophy className="h-3 w-3 mr-1" />
                                  Fastest
                                </Badge>
                              )}
                            </div>
                            <div className="p-4 bg-white/70 rounded-lg">
                              <div className="font-medium text-sm mb-1">Difficulty</div>
                              <div className="text-sm">{agency.hiring.difficulty}</div>
                            </div>
                            <div className="p-4 bg-white/70 rounded-lg">
                              <div className="font-medium text-sm mb-1">Veterans</div>
                              <div className="text-sm">{agency.veterans}</div>
                            </div>
                          </div>
                          <div className="p-4 bg-white/70 rounded-lg">
                            <div className="font-medium text-sm mb-2">Phases</div>
                            <div className="text-sm text-muted-foreground">{agency.hiring.phases}</div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="requirements" className="mt-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          {Object.entries(agency.requirements).map(([k, v]) => (
                            <div key={k} className="flex justify-between p-3 bg-white/70 rounded-lg hover:shadow-md transition-shadow">
                              <span className="text-sm font-medium capitalize">{k}</span>
                              <span className="text-sm text-muted-foreground text-right max-w-xs">{v as string}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="culture" className="mt-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          {Object.entries(agency.culture).map(([k, v]) => (
                            <div key={k} className="p-4 bg-white/70 rounded-lg hover:shadow-md transition-shadow">
                              <div className="font-medium text-sm capitalize mb-1">{k}</div>
                              <div className="text-sm text-muted-foreground">{v as string}</div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="locations" className="mt-4">
                        <div className="space-y-3">
                          {Object.entries(agency.locations).map(([k, v]) => (
                            <div key={k} className="flex justify-between p-3 bg-white/70 rounded-lg hover:shadow-md transition-shadow">
                              <span className="text-sm font-medium capitalize">{k}</span>
                              <span className="text-sm text-muted-foreground text-right max-w-md">{v as string}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>

                    {/* Insider Tips */}
                    <div className="mt-6 p-4 bg-blue-50/80 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-sm mb-3 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-blue-600" />
                        Insider Tips for {agency.name}
                      </h4>
                      <ul className="space-y-2">
                        {agency.insiderTips.map((tip, i) => (
                          <li key={i} className="text-sm text-blue-700 flex items-start gap-2">
                            <Star className="h-3 w-3 mt-1 text-blue-500 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Disqualifiers */}
                    <div className="mt-4 p-4 bg-red-50/80 rounded-lg border border-red-200">
                      <h4 className="font-medium text-sm mb-3 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        Common Disqualifiers
                      </h4>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {agency.disqualifiers.map((item, i) => (
                          <div key={i} className="text-sm text-red-700 flex items-center gap-2">
                            <AlertTriangle className="h-3 w-3 flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </>
      )}

      {selectedAgencies.length < 2 && (
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-12 pb-12 text-center">
            <Scale className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">Select at least 2 agencies above to start comparing</p>
            <p className="text-sm text-muted-foreground">Compare pay, requirements, work-life balance, and more</p>
          </CardContent>
        </Card>
      )}

      {/* Gen Z Reality Check */}
      <Card className="mt-8 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardContent className="pt-6">
          <p className="text-sm text-purple-800">
            <strong>Gen Z Reality Check (2026 Research):</strong> "77% of Gen Z prioritize work-life balance 
            when choosing employers. Use this tool to find agencies that match YOUR priorities - not just 
            the 'prestigious' ones. CBP might be a better fit than FBI if you value stability over intensity." - Police1
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
