"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, AlertCircle, Star, Info } from "lucide-react"

// Veterans Preference data based on federal regulations
const VETERANS_INFO = {
  overview: {
    title: "Veterans Preference in Federal LE",
    description: "Federal law gives hiring preference to veterans. Here's how it works.",
    points: [
      { type: "5-Point Preference", criteria: "Active duty in war, campaign, or expedition", proof: "DD214 (Member 4 copy)" },
      { type: "10-Point Preference", criteria: "Disabled veteran (30%+ disability rating)", proof: "DD214 + VA disability letter" },
      { type: "Spouse/ Widow(er)", criteria: "Spouse of disabled/ deceased veteran", proof: "Marriage certificate + death/ disability proof" },
    ],
  },
  federalAgencies: [
    {
      agency: "FBI",
      preference: "Yes - 5 or 10 point",
      howItWorks: "Veterans get preference points added to Phase I score. Can be the difference between advancing or not.",
      insiderTip: "Insider: 'FBI Phase I is scored 0-100. Veterans get 5-10 points added. That's huge when cutoff is 70.'",
      special: "Veterans with 10-point preference are eligible for direct hire in some cases",
    },
    {
      agency: "DEA",
      preference: "Yes - 5 or 10 point",
      howItWorks: "Same as FBI - points added to assessment score. Also get preference for location assignments.",
      insiderTip: "Insider: 'DEA values military experience. Special Ops background is gold. They understand discipline.'",
      special: "Veterans may get location preference near military bases",
    },
    {
      agency: "ATF",
      preference: "Yes - 5 or 10 point",
      howItWorks: "Veterans preference applies to all ATF positions including Special Agent.",
      insiderTip: "Insider: 'ATF loves military vets. Explosives, firearms, tactical experience all transfer.'",
      special: "Veterans with explosives/ EOD background fast-tracked",
    },
    {
      agency: "CBP / Border Patrol",
      preference: "Yes - Strong preference",
      howItWorks: "Veterans get 10-point preference AND can apply up to age 40 (vs 37 for non-vets).",
      insiderTip: "Insider: 'CBP is veteran-heavy. 40% of agents are vets. They understand military culture.'",
      special: "Age limit waived for veterans (up to 40 instead of 37)",
    },
    {
      agency: "Local PD",
      preference: "Varies by department",
      howItWorks: "Some depts give veterans 5-10 points on written exam. Others offer military pay grade.",
      insiderTip: "Insider: 'Local PD: Veterans get 5-10 points on written. Some depts match military rank to sergeant.'",
      special: "Many depts have veterans units or preference in promotions",
    },
  ],
  myths: [
    { myth: "Veterans automatically get hired", truth: "False. You still must pass all tests. Preference just adds points." },
    { myth: "Only combat veterans get preference", truth: "False. Any veteran with honorable discharge qualifies for 5-point." },
    { myth: "10-point preference means disabled", truth: "True. You need 30%+ VA disability rating for 10-point." },
    { myth: "Veterans skip the background investigation", truth: "False. Everyone gets full background, veteran or not." },
    { myth: "I can use veterans preference for multiple agencies", truth: "True. It applies to all federal agencies you apply to." },
  ],
  documents: [
    { doc: "DD214 (Member 4 copy)", purpose: "Proves service, discharge type, awards", when: "Always required" },
    { doc: "VA Disability Letter", purpose: "Shows disability % for 10-point preference", when: "Only for 10-point" },
    { doc: "Marriage Certificate", purpose: "For spouse/ widow(er) preference", when: "If claiming spouse preference" },
    { doc: "Death Certificate + VA papers", purpose: "For widow(er) of deceased veteran", when: "If claiming widow preference" },
  ],
}

export default function VeteransPreferencePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="mb-8 text-2xl font-bold">Veterans Preference Guide</h1>

      <div className="space-y-6">
        {/* Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <CardTitle>{VETERANS_INFO.overview.title}</CardTitle>
            </div>
            <CardDescription>{VETERANS_INFO.overview.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {VETERANS_INFO.overview.points.map((point, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <Badge className="mb-2">{point.type}</Badge>
                  <p className="text-sm font-medium mb-1">{point.criteria}</p>
                  <p className="text-xs text-muted-foreground">Proof: {point.proof}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Agency Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works by Agency</CardTitle>
            <CardDescription>Veterans preference varies by agency type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {VETERANS_INFO.federalAgencies.map((agency, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{agency.agency}</h4>
                    <Badge variant={agency.preference.includes("Yes") ? "default" : "secondary"}>
                      {agency.preference}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{agency.howItWorks}</p>
                  <p className="text-xs text-blue-600 flex items-start gap-1 mb-2">
                    <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    {agency.insiderTip}
                  </p>
                  {agency.special && (
                    <p className="text-xs text-green-600 flex items-start gap-1">
                      <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      {agency.special}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Myths vs Facts */}
        <Card>
          <CardHeader>
            <CardTitle>Myths vs. Facts</CardTitle>
            <CardDescription>Common misconceptions about veterans preference</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {VETERANS_INFO.myths.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 border rounded-lg">
                  <AlertCircle className="h-4 w-4 mt-0.5 text-yellow-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-600">{item.myth}</p>
                    <p className="text-sm text-green-600">{item.truth}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Required Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Required Documents</CardTitle>
            <CardDescription>What you need to claim veterans preference</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left font-medium">Document</th>
                    <th className="pb-2 text-left font-medium">Purpose</th>
                    <th className="pb-2 text-left font-medium">When Needed</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {VETERANS_INFO.documents.map((doc, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 font-medium">{doc.doc}</td>
                      <td className="py-2">{doc.purpose}</td>
                      <td className="py-2">
                        <Badge variant="outline" className="text-xs">{doc.when}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Gen Z Reality Check */}
        <Card className="border-green-200 bg-green-50">
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
