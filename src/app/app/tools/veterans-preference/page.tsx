"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, Star, Info, Home, ChevronRight, ArrowRight, Medal, Award, Users, FileText } from "lucide-react"

// Veterans Preference data
const VETERANS_INFO = {
  overview: {
    title: "Veterans Preference in Federal LE",
    description: "Federal law gives hiring preference to veterans. Here's how it works.",
    points: [
      { type: "5-Point Preference", criteria: "Active duty in war, campaign, or expedition", proof: "DD214 (Member 4 copy)", color: "bg-blue-100 text-blue-800", icon: "medal" },
      { type: "10-Point Preference", criteria: "Disabled veteran (30%+ disability rating)", proof: "DD214 + VA disability letter", color: "bg-purple-100 text-purple-800", icon: "award" },
      { type: "Spouse/ Widow(er)", criteria: "Spouse of disabled/ deceased veteran", proof: "Marriage cert + death/ disability proof", color: "bg-green-100 text-green-800", icon: "users" },
    ],
  },
  federalAgencies: [
    {
      agency: "FBI",
      preference: "Yes - 5 or 10 point",
      howItWorks: "Points added to Phase I score. Can be the difference between advancing or not.",
      insiderTip: "Phase I scored 0-100. Veterans get 5-10 points added. That's huge when cutoff is 70.",
      special: "Veterans with 10-point eligible for direct hire in some cases",
      color: "blue",
    },
    {
      agency: "DEA",
      preference: "Yes - 5 or 10 point",
      howItWorks: "Points added to assessment score. Also get preference for location assignments.",
      insiderTip: "DEA values military experience. Special Ops background is gold. They understand discipline.",
      special: "Veterans may get location preference near military bases",
      color: "green",
    },
    {
      agency: "ATF",
      preference: "Yes - 5 or 10 point",
      howItWorks: "Veterans preference applies to all ATF positions including Special Agent.",
      insiderTip: "ATF loves military vets. Explosives, firearms, tactical experience all transfer.",
      special: "Veterans with explosives/ EOD background fast-tracked",
      color: "orange",
    },
    {
      agency: "CBP / Border Patrol",
      preference: "Yes - Strong preference",
      howItWorks: "Veterans get 10-point + can apply up to age 40 (vs 37 for non-vets).",
      insiderTip: "CBP is veteran-heavy. 40% of agents are vets. They understand military culture.",
      special: "Age limit WAIVED for veterans (up to 40 instead of 37)",
      color: "blue",
    },
    {
      agency: "Local PD",
      preference: "Varies by department",
      howItWorks: "Some depts give 5-10 points on written exam. Others offer military pay grade.",
      insiderTip: "Local PD: Veterans get 5-10 points on written. Some depts match military rank to sergeant.",
      special: "Many depts have veterans units or promotion preference",
      color: "slate",
    },
  ],
  myths: [
    { myth: "Veterans automatically get hired", truth: "False. You still must pass all tests. Preference just adds points.", icon: "x" },
    { myth: "Only combat veterans get preference", truth: "False. Any veteran with honorable discharge qualifies for 5-point.", icon: "x" },
    { myth: "10-point preference means disabled", truth: "True. You need 30%+ VA disability rating for 10-point.", icon: "check" },
    { myth: "Veterans skip the background investigation", truth: "False. Everyone gets full background, veteran or not.", icon: "x" },
    { myth: "I can use veterans preference for multiple agencies", truth: "True. It applies to all federal agencies you apply to.", icon: "check" },
  ],
  documents: [
    { doc: "DD214 (Member 4 copy)", purpose: "Proves service, discharge type, awards", when: "Always required", priority: "High" },
    { doc: "VA Disability Letter", purpose: "Shows disability % for 10-point preference", when: "Only for 10-point", priority: "High" },
    { doc: "Marriage Certificate", purpose: "For spouse/ widow(er) preference", when: "If claiming spouse", priority: "Medium" },
    { doc: "Death Certificate + VA papers", purpose: "For widow(er) of deceased veteran", when: "If claiming widow", priority: "Medium" },
  ],
}

export default function VeteransPreferencePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/app/tools" className="hover:text-foreground flex items-center gap-1">
          <Home className="h-3 w-3" />
          Tools
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Veterans Preference</span>
      </div>

      <h1 className="mb-2 text-3xl font-bold text-yellow-700">
        Veterans Preference Guide
      </h1>
      <p className="mb-8 text-muted-foreground">
        How veterans preference works in federal LE hiring - 5 vs 10 point preference, benefits, and insider tips.
      </p>

      <div className="space-y-6">
        {/* Hero Overview */}
        <Card className="hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{VETERANS_INFO.overview.title}</h2>
                  <p className="text-base text-gray-700 mt-1">{VETERANS_INFO.overview.description}</p>
                </div>
              </div>
            </CardHeader>
          <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                {VETERANS_INFO.overview.points.map((point, i) => {
                  const IconComponent = point.icon === "medal" ? Medal : point.icon === "award" ? Award : Users
                  return (
                    <div key={i} className="p-4 border-2 rounded-xl hover:shadow-md transition-all hover:scale-105">
                      <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-2">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <Badge className={`mb-2 ${point.color}`}>{point.type}</Badge>
                      <p className="text-sm font-medium mb-1">{point.criteria}</p>
                      <p className="text-xs text-muted-foreground">Proof: {point.proof}</p>
                    </div>
                  )
                })}
              </div>
          </CardContent>
        </Card>

        {/* Decision Tree */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5" />
              Veterans Preference Decision Tree
            </CardTitle>
            <CardDescription>Find out what preference you qualify for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                <p className="font-medium">Are you a veteran with honorable discharge?</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-medium text-sm mb-2 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" /> Yes
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">→ You qualify for 5-point preference</p>
                  <div className="p-3 bg-white rounded border">
                    <p className="text-xs font-medium">Do you have 30%+ VA disability?</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-600" /> Yes → <strong>10-point preference</strong>
                      </p>
                      <p className="text-xs flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 text-red-600" /> No → <strong>5-point preference</strong>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="font-medium text-sm mb-2 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-red-600" /> No
                  </p>
                  <p className="text-xs text-muted-foreground">→ You do NOT qualify for veterans preference</p>
                  <p className="text-xs text-muted-foreground mt-2">But you can still apply! Many agencies hire non-veterans.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agency Breakdown with Visual Cards */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>How It Works by Agency</CardTitle>
            <CardDescription>Veterans preference varies by agency type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {VETERANS_INFO.federalAgencies.map((agency, i) => (
                <div key={i} className="p-4 border-2 rounded-xl hover:shadow-md transition-all hover:scale-[1.02]">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-lg">{agency.agency}</h4>
                    </div>
                    <Badge className={`bg-${agency.color}-100 text-${agency.color}-800 font-medium`}>
                      {agency.preference}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{agency.howItWorks}</p>
                  <div className="p-2 bg-blue-50 rounded-lg mb-2">
                    <p className="text-xs text-blue-700 flex items-start gap-1">
                      <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      {agency.insiderTip}
                    </p>
                  </div>
                  {agency.special && (
                    <div className="p-2 bg-green-50 rounded-lg">
                      <p className="text-xs text-green-700 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        {agency.special}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Myths vs Facts with Icons */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Myths vs. Facts</CardTitle>
            <CardDescription>Common misconceptions about veterans preference</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {VETERANS_INFO.myths.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                  {item.icon === "check" ? (
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.myth}</p>
                    <p className="text-sm text-gray-700 mt-1">{item.truth}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Required Documents with Priority */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Required Documents</CardTitle>
            <CardDescription>What you need to claim veterans preference</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {VETERANS_INFO.documents.map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{doc.doc}</p>
                    <p className="text-xs text-muted-foreground">{doc.purpose}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{doc.when}</Badge>
                    <Badge className={doc.priority === "High" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}>
                      {doc.priority} Priority
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Pro Tip:</strong> Get your DD214 (Member 4 copy) BEFORE you apply. Don't wait until the last minute. 
                The VA can take weeks to process requests.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Gen Z Reality Check */}
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="pt-6">
            <p className="text-sm text-green-800">
              <strong>Veterans Reality Check:</strong> "Veterans make up 30%+ of federal LE. 
              CBP is 40% veterans. If you're a vet, USE your preference. It's not 'cheating' - 
              it's the law. Get your DD214 (Member 4 copy) BEFORE you apply. Don't wait." - Insider Research
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
