"use client"

import { use } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, BookOpen, MessageSquare, AlertTriangle, ExternalLink, Globe } from "lucide-react"
import Link from "next/link"

const AGENCIES: Record<string, any> = {
  "local-pd": {
    name: "Local Police Department",
    fullName: "City / Municipal Police (e.g., NYPD, LAPD, Chicago PD)",
    description: "Entry-level police officer at city or county departments. Each department has different requirements - this is a general example.",
    website: "https://www.nyc.gov/nypd",
    stats: { averageSalary: "$50,000 - $80,000", experience: "No experience needed", ageRange: "21+ years old" },
    requirements: ["High school diploma or GED", "Valid driver's license", "No felony convictions", "Background investigation", "Physical agility test", "Written exam", "Oral interview"],
    disqualifiers: ["Felony convictions", "Drug dealing", "Domestic violence", "Current drug use"],
    process: [{ step: "1", title: "Apply" }, { step: "2", title: "Written" }, { step: "3", title: "Physical" }, { step: "4", title: "Oral" }, { step: "5", title: "Background" }, { step: "6", title: "Academy" }],
    sampleQuestions: ["Why do you want to be a police officer?", "What would you do in a hostile situation?", "Tell me about your strengths.", "How do you handle stress?"],
  },
  sheriff: {
    name: "Sheriff's Office",
    fullName: "County Sheriff's Office (e.g., Harris County SO - Houston)",
    description: "Deputy Sheriff positions in county law enforcement. Each county has different requirements - this is a general example.",
    website: "https://harriscountyso.com",
    stats: { averageSalary: "$55,000 - $85,000", experience: "No experience needed", ageRange: "21+ years old" },
    requirements: ["High school diploma", "Valid driver's license", "No felony convictions", "Background investigation", "Physical test"],
    disqualifiers: ["Felony", "Drug dealing", "Domestic violence"],
    process: [{ step: "1", title: "Apply" }, { step: "2", title: "Written" }, { step: "3", title: "Physical" }, { step: "4", title: "Oral" }, { step: "5", title: "Background" }, { step: "6", title: "Academy" }],
    sampleQuestions: ["Why sheriff's office?", "Can you work in a jail?", "Handle difficult people?"],
  },
"state-police": {
    name: "State Police",
    fullName: "State Highway Patrol (e.g., Texas DPS, CHP, FHP)",
    description: "State trooper or highway patrol positions. Each state has different requirements - this is a general example.",
    website: "https://www.dps.texas.gov",
    stats: { averageSalary: "$60,000 - $90,000", experience: "Some college preferred", ageRange: "21+ years old" },
    requirements: ["Some college preferred", "Valid driver's license", "Clean driving record", "Background investigation", "Physical test"],
    disqualifiers: ["Felony", "DUI", "Multiple accidents", "Current drug use"],
    process: [{ step: "1", title: "Apply" }, { step: "2", title: "Written" }, { step: "3", title: "Physical" }, { step: "4", title: "Oral" }, { step: "5", title: "Background" }, { step: "6", title: "Academy" }],
    sampleQuestions: ["Why state police?", "Handle traffic stops?", "Work outdoors in all weather?"],
  },
  fbi: {
    name: "FBI",
    fullName: "Federal Bureau of Investigation",
    description: "Special Agent positions with federal law enforcement.",
    website: "https://fbijobs.gov",
    stats: { averageSalary: "$85,000 - $140,000", experience: "3+ years", ageRange: "23-37 years old" },
    requirements: ["Bachelor's degree", "3 years experience", "Valid driver's license", "Top Secret clearance", "Age 23-37", "U.S. citizenship"],
    disqualifiers: ["Felony", "Domestic violence", "Drug dealing", "Failed polygraph", "Bad credit"],
    process: [{ step: "1", title: "Apply" }, { step: "2", title: "Written" }, { step: "3", title: "Oral" }, { step: "4", title: "Background" }, { step: "5", title: "Polygraph" }, { step: "6", title: "Physical" }, { step: "7", title: "Offer" }],
    sampleQuestions: ["Why FBI?", "Ethical dilemma you faced?", "Handle pressure?", "Why should we hire you?", "Witness misconduct?"],
    insiderInsights: [
      { quote: "Suitability can take 6+ months after background completes. Then waiting for offer.", source: "Insider" },
      { quote: "Polygraph: 'Deception = DQ.' Countermeasures = automatic fail. Be 100% honest.", source: "Insider" },
      { quote: "Medical waivers take 2-4 weeks if straightforward. BP meds need documentation.", source: "Insider" },
      { quote: "USAJobs resume builder changed in 2025 - shorter format. Add skills paragraph in experiences.", source: "Insider" },
    ],
  },
  dea: {
    name: "DEA",
    fullName: "Drug Enforcement Administration",
    description: "Special Agent positions fighting drug trafficking.",
    website: "https://careers.dea.gov",
    stats: { averageSalary: "$80,000 - $130,000", experience: "1+ year", ageRange: "21-37 years old" },
    requirements: ["Bachelor's degree", "1 year experience OR military", "Valid driver's license", "Background investigation"],
    disqualifiers: ["Felony", "Drug dealing", "Current drug use", "Failed polygraph"],
    process: [{ step: "1", title: "Apply" }, { step: "2", title: "Written" }, { step: "3", title: "Oral" }, { step: "4", title: "Background" }, { step: "5", title: "Polygraph" }, { step: "6", title: "Physical" }],
    sampleQuestions: ["Why DEA?", "Know drug laws?", "Handle dangerous situations?"],
    insiderInsights: [
      { quote: "Suitability/Hiring Panel can take 6+ months after background. Location sheet sent fall, offer in spring.", source: "Insider" },
      { quote: "Medical waiver: 'Got DQ'd for BP meds. Submitted waiver, cleared in 2 weeks.'", source: "Insider" },
      { quote: "Polygraph takes 4+ hours. Very intense. 'Countermeasures detected = automatic DQ.'", source: "Insider" },
      { quote: "DEA moves faster than FBI but slower than local. Budget 2026: 64% increase for salaries/training.", source: "2026 LE Report" },
    ],
  },
  cbp: {
    name: "CBP",
    fullName: "Customs and Border Protection",
    description: "Border Patrol Agent and CBP Officer positions.",
    website: "https://cbp.gov/careers",
    stats: { averageSalary: "$60,000 - $100,000", experience: "No experience needed", ageRange: "21+ years old" },
    requirements: ["High school diploma", "Valid driver's license", "No drug convictions", "Physical fitness", "Spanish helpful"],
    disqualifiers: ["Drug convictions", "Felony", "Domestic violence"],
    process: [{ step: "1", title: "Apply" }, { step: "2", title: "Written" }, { step: "3", title: "Physical" }, { step: "4", title: "Oral" }, { step: "5", title: "Background" }, { step: "6", title: "Academy" }],
    sampleQuestions: ["Why CBP?", "Work in harsh conditions?", "Spanish proficiency?"],
  },
  marshals: {
    name: "US Marshals",
    fullName: "US Marshals Service",
    description: "Deputy U.S. Marshal positions.",
    website: "https://usmarshals.gov/careers.html",
    stats: { averageSalary: "$60,000 - $100,000", experience: "Bachelor's OR experience", ageRange: "21-37 years old" },
    requirements: ["Bachelor's degree OR experience", "Valid driver's license", "Background investigation", "Physical test"],
    disqualifiers: ["Felony", "Domestic violence", "Current drug use"],
    process: [{ step: "1", title: "Apply" }, { step: "2", title: "Written" }, { step: "3", title: "Oral" }, { step: "4", title: "Background" }, { step: "5", title: "Physical" }],
    sampleQuestions: ["Why Marshals?", "Court security?", "Fugitive apprehension?"],
  },
  atf: {
    name: "ATF",
    fullName: "Alcohol, Tobacco, Firearms and Explosives",
    description: "Special Agent with ATF.",
    website: "https://atf.gov/careers",
    stats: { averageSalary: "$80,000 - $130,000", experience: "Relevant experience", ageRange: "21-37 years old" },
    requirements: ["Bachelor's preferred", "Relevant experience", "Valid driver's license", "Firearms proficiency"],
    disqualifiers: ["Felony", "Drug dealing", "Domestic violence"],
    process: [{ step: "1", title: "Apply" }, { step: "2", title: "Written" }, { step: "3", title: "Oral" }, { step: "4", title: "Background" }, { step: "5", title: "Physical" }],
    sampleQuestions: ["Why ATF?", "Know firearms?", "Hazmat situations?"],
  },
}

function AgencyGuide() {
  const params = useParams()
  const agencyId = params.id as string
  const agency = AGENCIES[agencyId] || AGENCIES["local-pd"]
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/app/agencies">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Agencies
        </Button>
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-3xl font-bold">{agency.fullName}</h1>
          <a href={agency.website} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <Globe className="h-4 w-4 mr-2" />
              Visit Website
            </Button>
          </a>
        </div>
        <p className="text-muted-foreground">{agency.description}</p>
        {agencyId === "local-pd" && (
          <p className="text-sm text-yellow-600 mt-2">
            Note: Requirements vary by department. Check your specific department's website for accurate requirements.
          </p>
        )}
        {agencyId === "state-police" && (
          <p className="text-sm text-yellow-600 mt-2">
            Note: Each state has different requirements - check your specific state's patrol website for accurate requirements.
          </p>
        )}
        {agencyId === "sheriff" && (
          <p className="text-sm text-yellow-600 mt-2">
            Note: Requirements vary by county. Check your specific Sheriff's Office website for accurate requirements.
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Salary</CardDescription>
            <CardTitle className="text-xl">{agency.stats.averageSalary}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Experience</CardDescription>
            <CardTitle className="text-xl">{agency.stats.experience}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Minimum Age</CardDescription>
            <CardTitle className="text-xl">{agency.stats.ageRange}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Prep Focus</CardDescription>
            <CardTitle className="text-xl">{agency.sampleQuestions.length} areas</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {agency.requirements.map((req: string) => (
                <li key={req} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                  {req}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-500">
              <AlertTriangle className="h-5 w-5" />
              Disqualifiers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {agency.disqualifiers.map((item: string) => (
                <li key={item} className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-1" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Application Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-6">
              {agency.process.map((step: any, i: number) => (
                <div key={i} className="text-center p-3 rounded-lg border">
                  <div className="font-bold">{step.step}</div>
                  <div className="text-sm">{step.title}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Interview Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2 md:grid-cols-2">
              {agency.sampleQuestions.map((q: string) => (
                <li key={q} className="flex items-start gap-2">
                  <MessageSquare className="h-4 w-4 mt-1" />
                  {q}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {agency.insiderInsights && agency.insiderInsights.length > 0 && (
        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <MessageSquare className="h-5 w-5" />
              What Insiders Say
            </CardTitle>
            <CardDescription className="text-blue-600">
              Real experiences from federal hiring processes and agency insiders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {agency.insiderInsights.map((insight: any, i: number) => (
                <li key={i} className="text-sm text-blue-700 bg-white/50 p-3 rounded-lg">
                  <span className="font-medium">{insight.source}:</span> {insight.quote}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>

    <div className="mt-8">
      <Link href="/app/tools/strategy-engine">
        <Button>
          Get Prepped for {agency.name} <BookOpen className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  </div>
)

export default function AgencyPage() {
  return <AgencyGuide />
}