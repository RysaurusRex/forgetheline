"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  DollarSign, MapPin, Clock, Users, Shield, AlertTriangle, 
  CheckCircle, Star, Building, Scale 
} from "lucide-react"

// Comprehensive agency data based on OPM, agency websites, and insider research
const AGENCIES = {
  fbi: {
    name: "FBI",
    type: "Federal",
    mission: "Protect the American people and uphold the Constitution",
    logo: "🕵️",
    pay: {
      entry: "GL-10: $66,693 - $95,654",
      top: "GS-13: $120,285 - $156,371",
      note: "Plus 25% LEAP (Law Enforcement Availability Pay)",
    },
    requirements: {
      age: "23-36 (veterans up to 40)",
      education: "Bachelor's degree required",
      experience: "No experience required for GL-10",
      citizenship: "US citizen required",
      clearance: "Top Secret required",
    },
    locations: {
      total: "56 Field Offices, 350+ Resident Agencies",
      major: "All 50 states + Puerto Rico + Guam",
      international: "60+ Legal Attaché offices worldwide",
    },
    workLife: {
      hours: "50-60/week average (including LEAP)",
      schedule: "Rotating shifts, on-call",
      travel: "Frequent, sometimes short notice",
      balance: "2/5",
      insider: "Insider: 'FBI is NOT 9-5. Expect 50+ hour weeks. But the mission keeps you going.'",
    },
    culture: {
      vibe: "Professional, mission-driven, bureaucratic but prestigious",
      diversity: "Strong diversity initiatives, 35% female agents",
      promotion: "GS-10 → GS-13 typical in 5-7 years",
      office: "Field office culture varies widely",
    },
    veterans: "5 or 10-point preference, strong veteran hiring",
    disqualifiers: ["Felony convictions", "Recent drug use (past 3 years)", "Defaulted student loans", "Poor credit history"],
    hiring: {
      timeline: "12-18 months",
      difficulty: "Highly competitive (5% acceptance)",
      phases: "Phase I (Test) → Phase II (Interview) → Background → Poly → Medical",
    },
    insiderTips: [
      "Insider: 'Apply at 23 if you can. Older applicants have harder time with PT standards.'",
      "Insider: 'FBI loves advanced degrees. Master's degree = GS-10 starting pay.'",
      "Insider: 'Choose your field office wisely. NYC is competitive, rural offices may need people.'",
      "Insider: 'FLETC training is 21 weeks in Glynco, GA. Mentally prepare.'",
    ],
  },
  dea: {
    name: "DEA",
    type: "Federal",
    mission: "Enforce controlled substances laws and reduce drug supply",
    logo: "💊",
    pay: {
      entry: "GL-7/9: $52,560 - $73,375",
      top: "GS-13: $120,285 - $156,371",
      note: "Plus 25% LEAP (Law Enforcement Availability Pay)",
    },
    requirements: {
      age: "21-36 (veterans up to 40)",
      education: "Bachelor's degree OR specialized experience",
      experience: "Some positions accept 3 years specialized experience",
      citizenship: "US citizen required",
      clearance: "Top Secret required",
    },
    locations: {
      total: "241 Domestic Offices, 92 Foreign Offices",
      major: "All 50 states + major cities",
      international: "92 foreign offices in 68 countries",
    },
    workLife: {
      hours: "50-60/week average",
      schedule: "Shift work, on-call",
      travel: "Moderate, mostly domestic",
      balance: "2/5",
      insider: "Insider: 'DEA does more undercover than anyone. If you want action, this is it.'",
    },
    culture: {
      vibe: "Tactical, high-intensity, close-knit teams",
      diversity: "Improving, 20% female agents",
      promotion: "Steady progression, GS-7 → GS-13 in 6-8 years",
      office: "Teams are tight, like military units",
    },
    veterans: "5 or 10-point preference, values military experience highly",
    disqualifiers: ["Felony convictions", "Past drug use (depends on type/recency)", "Failed polygraph elsewhere", "Poor driving record"],
    hiring: {
      timeline: "6-12 months",
      difficulty: "Competitive (10-15% acceptance)",
      phases: "Assessment → PTT (Physical Task Test) → Interview → Background → Poly → Medical",
    },
    insiderTips: [
      "Insider: 'DEA Academy is 18 weeks at Quantico. Physical. Be ready.'",
      "Insider: 'DEA values Special Ops background. Rangers, SEALs, SF do well here.'",
      "Insider: 'Undercover work is common. If you have a family, consider that.'",
      "Insider: 'DEA has the best equipment. You'll have what you need to do the job.'",
    ],
  },
  atf: {
    name: "ATF",
    type: "Federal",
    mission: "Protect communities from violent criminals, criminal organizations, and illegal use of firearms",
    logo: "🔫",
    pay: {
      entry: "GL-7/9: $52,560 - $73,375",
      top: "GS-13: $120,285 - $156,371",
      note: "Plus 25% LEAP (Law Enforcement Availability Pay)",
    },
    requirements: {
      age: "21-36 (veterans up to 40)",
      education: "Bachelor's degree OR specialized experience",
      experience: "Firearms/explosives experience valuable",
      citizenship: "US citizen required",
      clearance: "Top Secret required",
    },
    locations: {
      total: "25 Field Divisions, 150+ field offices",
      major: "Major cities, specialized task forces",
      international: "Limited, mostly attaches",
    },
    workLife: {
      hours: "45-55/week average",
      schedule: "More regular than FBI/DEA",
      travel: "Moderate, task force work",
      balance: "3/5",
      insider: "Insider: 'ATF is smaller, more niche. Better work-life than FBI. Less bureaucracy.'",
    },
    culture: {
      vibe: "Technical, specialized, collaborative with local agencies",
      diversity: "25% female agents",
      promotion: "Slower than FBI, but less competitive",
      office: "Task force heavy - work with local/state police",
    },
    veterans: "5 or 10-point preference, loves military police/EOD",
    disqualifiers: ["Felony convictions", "Domestic violence convictions", "Recent marijuana use", "Poor credit"],
    hiring: {
      timeline: "6-12 months",
      difficulty: "Moderate (15-20% acceptance)",
      phases: " Written → Physical → Interview → Background → Poly → Medical",
    },
    insiderTips: [
      "Insider: 'ATF loves prior military police, EOD, or firearms instructors.'",
      "Insider: 'ATF Academy is 12 weeks at FLETC. Easier than Quantico.'",
      "Insider: 'Explosives experience = fast track. They need those skills.'",
      "Insider: 'ATF does a lot of task force work. You'll work with locals daily.'",
    ],
  },
  cbp: {
    name: "CBP / Border Patrol",
    type: "Federal",
    mission: "Protect borders, prevent terrorism, enforce customs laws",
    logo: "🛂",
    pay: {
      entry: "GL-7/9: $52,560 - $73,375 (BP-9: $61,620 - $79,990)",
      top: "GS-13: $120,285 - $156,371 (BP-12: $104,905 - $136,371)",
      note: "Plus 25% LEAP + recruitment bonuses up to $30k",
    },
    requirements: {
      age: "21-40 (veterans exempt from age limit)",
      education: "Bachelor's degree OR specialized experience",
      experience: "1 year specialized experience for GL-9",
      citizenship: "US citizen required",
      clearance: "Secret (not Top Secret)",
    },
    locations: {
      total: "170+ Border Patrol Stations, 328 Ports of Entry",
      major: "Border states: TX, CA, AZ, NM primarily",
      international: "Pre-clearance at foreign airports",
    },
    workLife: {
      hours: "50-60/week average",
      schedule: "Rotating shifts, nights, weekends",
      travel: "Minimal, station-based",
      balance: "2/5",
      insider: "Insider: 'Border Patrol is 24/7/365. Expect night shifts. It's tough on families.'",
    },
    culture: {
      vibe: "Paramilitary, rugged, mission-focused",
      diversity: "30% Hispanic agents, 15% female",
      promotion: "Can be fast due to high turnover",
      office: "Remote locations, tight-knit stations",
    },
    veterans: "5 or 10-point preference, age limit WAIVED for veterans",
    disqualifiers: ["Felony convictions", "Past drug use (varies by border sector)", "Failed polygraph", "Poor driving record"],
    hiring: {
      timeline: "3-6 months (fastest federal LE)",
      difficulty: "Moderate (30% acceptance, high turnover)",
      phases: "Application → Entrance Exam → Physical → Interview → Background → Medical → Poly",
    },
    insiderTips: [
      "Insider: 'CBP offers $30k recruitment bonus for hard-to-fill locations. Take it.'",
      "Insider: 'Border Patrol Academy is 6 months in Artesia, NM. Isolated but doable.'",
      "Insider: 'San Diego sector is competitive. Rural Texas sectors need people NOW.'",
      "Insider: 'Veterans: Age limit doesn't apply to you. Apply up to age 40 (or older with veterans preference).'",
    ],
  },
  local: {
    name: "Local Police Department",
    type: "Local",
    mission: "Serve and protect local communities, enforce local/state laws",
    logo: "🚔",
    pay: {
      entry: "$45,000 - $65,000 (varies widely)",
      top: "$85,000 - $130,000 (with overtime)",
      note: "Metro areas pay more, rural areas pay less",
    },
    requirements: {
      age: "21+ (no upper limit typically)",
      education: "High school diploma (some require 60 college credits)",
      experience: "None required, military preferred",
      citizenship: "US citizen OR legal resident (varies)",
      clearance: "Background investigation, no clearance",
    },
    locations: {
      total: "18,000+ local police agencies in US",
      major: "Every city, county, and town",
      international: "None",
    },
    workLife: {
      hours: "40-50/week average",
      schedule: "Rotating shifts, weekends, holidays",
      travel: "None, patrol assigned area",
      balance: "3/5",
      insider: "Insider: 'Local PD varies WILDLY. Research YOUR department. Some are great, some are toxic.'",
    },
    culture: {
      vibe: "Community-focused, paramilitary structure, unionized",
      diversity: "Varies by department, improving nationwide",
      promotion: "Based on civil service exam scores + time in grade",
      office: "Precinct-based, strong camaraderie",
    },
    veterans: "5-10 point preference on exams, veterans preference in hiring",
    disqualifiers: ["Felony convictions", "Domestic violence", "Recent drug use (1-3 years)", "Failed polygraph (if used)"],
    hiring: {
      timeline: "3-6 months",
      difficulty: "Varies (metro areas competitive, rural areas hiring)",
      phases: "Written Exam → Physical Agility → Oral Board → Background → Medical/Psych → Academy",
    },
    insiderTips: [
      "Insider: 'Check your local department's contract. Pay, benefits, and culture vary HUGE.'",
      "Insider: 'Small departments: You'll do everything. Big departments: Specialized units.'",
      "Insider: 'Ask about take-home car policy. Some depts give them, some don't.'",
      "Insider: 'Local PD: Veterans get 5-10 points on written exam. Ask HR about this.'",
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

  const renderStars = (rating: string) => {
    const num = parseInt(rating)
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(i => (
          <Star key={i} className={`h-4 w-4 ${i <= num ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
        ))}
        <span className="text-sm text-muted-foreground ml-1">{rating}/5</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="mb-2 text-2xl font-bold">Agency Comparison Tool</h1>
      <p className="mb-8 text-muted-foreground">
        Compare federal and local law enforcement agencies side-by-side. Based on OPM data, agency websites, and insider research.
      </p>

      {/* Agency Selector */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Agencies to Compare (max 3)</CardTitle>
          <CardDescription>Choose 2-3 agencies to see detailed comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.entries(AGENCIES).map(([key, agency]) => (
              <button
                key={key}
                onClick={() => toggleAgency(key)}
                className={`p-3 border rounded-lg text-left transition-all ${
                  selectedAgencies.includes(key)
                    ? "border-primary bg-primary/10"
                    : "border-muted hover:border-primary/50"
                }`}
              >
                <div className="text-2xl mb-1">{agency.logo}</div>
                <div className="font-medium text-sm">{agency.name}</div>
                <Badge variant={agency.type === "Federal" ? "default" : "secondary"} className="mt-1 text-xs">
                  {agency.type}
                </Badge>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedAgencies.length >= 2 && (
        <>
          {/* View Toggle */}
          <div className="flex justify-end mb-4">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={comparisonView === "sideBySide" ? "default" : "outline"}
                onClick={() => setComparisonView("sideBySide")}
              >
                Side-by-Side
              </Button>
              <Button
                size="sm"
                variant={comparisonView === "table" ? "default" : "outline"}
                onClick={() => setComparisonView("table")}
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
                return (
                  <Card key={key} className="overflow-hidden">
                    <CardHeader className="bg-muted/50">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{agency.logo}</span>
                        <div>
                          <CardTitle>{agency.name}</CardTitle>
                          <CardDescription>{agency.type}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-1 flex items-center gap-1">
                          <DollarSign className="h-3 w-3" /> Pay
                        </h4>
                        <p className="text-sm text-muted-foreground">{agency.pay.entry}</p>
                        <p className="text-xs text-muted-foreground">{agency.pay.note}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Work-Life Balance
                        </h4>
                        {renderStars(agency.workLife.balance)}
                        <p className="text-xs text-muted-foreground mt-1">{agency.workLife.hours}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-1 flex items-center gap-1">
                          <Shield className="h-3 w-3" /> Hiring
                        </h4>
                        <p className="text-sm text-muted-foreground">{agency.hiring.timeline}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {agency.hiring.difficulty}
                        </Badge>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-1">Veterans</h4>
                        <p className="text-xs text-muted-foreground">{agency.veterans}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-1">Insider Tips</h4>
                        {agency.insiderTips.slice(0, 2).map((tip, i) => (
                          <p key={i} className="text-xs text-blue-600 mb-1 flex items-start gap-1">
                            <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                            {tip}
                          </p>
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
            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2 text-left font-medium">Category</th>
                        {selectedAgencies.map(key => (
                          <th key={key} className="pb-2 text-left font-medium">
                            {AGENCIES[key as keyof typeof AGENCIES].name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Entry Pay</td>
                        {selectedAgencies.map(key => (
                          <td key={key} className="py-2 text-muted-foreground">
                            {AGENCIES[key as keyof typeof AGENCIES].pay.entry}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Max Pay</td>
                        {selectedAgencies.map(key => (
                          <td key={key} className="py-2 text-muted-foreground">
                            {AGENCIES[key as keyof typeof AGENCIES].pay.top}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Age Requirement</td>
                        {selectedAgencies.map(key => (
                          <td key={key} className="py-2 text-muted-foreground">
                            {AGENCIES[key as keyof typeof AGENCIES].requirements.age}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Education</td>
                        {selectedAgencies.map(key => (
                          <td key={key} className="py-2 text-muted-foreground">
                            {AGENCIES[key as keyof typeof AGENCIES].requirements.education}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Hiring Timeline</td>
                        {selectedAgencies.map(key => (
                          <td key={key} className="py-2 text-muted-foreground">
                            {AGENCIES[key as keyof typeof AGENCIES].hiring.timeline}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Work-Life Balance</td>
                        {selectedAgencies.map(key => (
                          <td key={key} className="py-2">
                            {renderStars(AGENCIES[key as keyof typeof AGENCIES].workLife.balance)}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Veterans Preference</td>
                        {selectedAgencies.map(key => (
                          <td key={key} className="py-2 text-muted-foreground">
                            {AGENCIES[key as keyof typeof AGENCIES].veterans}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Detailed Agency Cards */}
          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-bold">Detailed Breakdown</h2>
            {selectedAgencies.map(key => {
              const agency = AGENCIES[key as keyof typeof AGENCIES]
              return (
                <Card key={key}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{agency.logo}</span>
                      <div>
                        <CardTitle>{agency.name}</CardTitle>
                        <CardDescription>{agency.mission}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="pay" className="w-full">
                      <TabsList className="grid grid-cols-3 lg:grid-cols-6">
                        {COMPARISON_CATEGORIES.map(cat => (
                          <TabsTrigger key={cat.key} value={cat.key} className="text-xs">
                            <cat.icon className="h-3 w-3 mr-1" />
                            {cat.label}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      <TabsContent value="pay" className="mt-4">
                        <div className="grid gap-4 sm:grid-cols-3">
                          <div className="p-3 bg-muted rounded-lg">
                            <div className="font-medium text-sm">Entry Level</div>
                            <div className="text-sm text-muted-foreground">{agency.pay.entry}</div>
                          </div>
                          <div className="p-3 bg-muted rounded-lg">
                            <div className="font-medium text-sm">Top Pay</div>
                            <div className="text-sm text-muted-foreground">{agency.pay.top}</div>
                          </div>
                          <div className="p-3 bg-muted rounded-lg">
                            <div className="font-medium text-sm">Notes</div>
                            <div className="text-sm text-muted-foreground">{agency.pay.note}</div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="requirements" className="mt-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          {Object.entries(agency.requirements).map(([key, val]) => (
                            <div key={key} className="flex justify-between p-2 border-b">
                              <span className="text-sm font-medium capitalize">{key}</span>
                              <span className="text-sm text-muted-foreground">{val}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="workLife" className="mt-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Work-Life Balance</span>
                            {renderStars(agency.workLife.balance)}
                          </div>
                          {Object.entries(agency.workLife).filter(([key]) => !["balance", "insider"].includes(key)).map(([key, val]) => (
                            <div key={key} className="flex justify-between p-2 border-b">
                              <span className="text-sm font-medium capitalize">{key}</span>
                              <span className="text-sm text-muted-foreground">{val}</span>
                            </div>
                          ))}
                          <p className="text-xs text-blue-600 flex items-start gap-1">
                            <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                            {agency.workLife.insider}
                          </p>
                        </div>
                      </TabsContent>

                      <TabsContent value="hiring" className="mt-4">
                        <div className="space-y-3">
                          <div className="grid gap-3 sm:grid-cols-3">
                            <div className="p-3 bg-muted rounded-lg">
                              <div className="font-medium text-sm">Timeline</div>
                              <div className="text-sm text-muted-foreground">{agency.hiring.timeline}</div>
                            </div>
                            <div className="p-3 bg-muted rounded-lg">
                              <div className="font-medium text-sm">Difficulty</div>
                              <div className="text-sm text-muted-foreground">{agency.hiring.difficulty}</div>
                            </div>
                            <div className="p-3 bg-muted rounded-lg">
                              <div className="font-medium text-sm">Veterans</div>
                              <div className="text-sm text-muted-foreground">{agency.veterans}</div>
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-sm mb-2">Hiring Phases</div>
                            <p className="text-sm text-muted-foreground">{agency.hiring.phases}</p>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="culture" className="mt-4">
                        <div className="space-y-3">
                          {Object.entries(agency.culture).map(([key, val]) => (
                            <div key={key} className="p-3 border rounded-lg">
                              <div className="font-medium text-sm capitalize">{key}</div>
                              <div className="text-sm text-muted-foreground">{val}</div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="locations" className="mt-4">
                        <div className="space-y-3">
                          {Object.entries(agency.locations).map(([key, val]) => (
                            <div key={key} className="flex justify-between p-2 border-b">
                              <span className="text-sm font-medium capitalize">{key}</span>
                              <span className="text-sm text-muted-foreground text-right max-w-md">{val}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>

                    {/* Insider Tips */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-blue-600" />
                        Insider Tips for {agency.name}
                      </h4>
                      <ul className="space-y-1">
                        {agency.insiderTips.map((tip, i) => (
                          <li key={i} className="text-xs text-blue-700">{tip}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Disqualifiers */}
                    <div className="mt-4 p-4 bg-red-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        Common Disqualifiers
                      </h4>
                      <ul className="space-y-1">
                        {agency.disqualifiers.map((item, i) => (
                          <li key={i} className="text-xs text-red-700 flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </>
      )}

      {selectedAgencies.length < 2 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Select at least 2 agencies above to start comparing</p>
          </CardContent>
        </Card>
      )}

      {/* Gen Z Reality Check */}
      <Card className="mt-8 border-purple-200 bg-purple-50">
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
