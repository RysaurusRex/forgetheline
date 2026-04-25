import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Building2, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

const AGENCIES = [
  {
    id: "local-pd",
    name: "Local Police Department",
    category: "Local",
    description: "Entry-level police officer positions at city or county departments",
    requirements: [
      " POST certification (varies by state)",
      "Valid driver's license",
      "No felony convictions",
      "Drug-free for specified period",
      "Background investigation",
      "Physical agility test",
    ],
    prepFocus: [
      "Physical fitness",
      "Written exam (multiple choice)",
      "Oral board interview",
      "Background check prep",
    ],
  },
  {
    id: "sheriff",
    name: "Sheriff's Office",
    category: "Local",
    description: "Deputy sheriff positions in county law enforcement",
    requirements: [
      "High school diploma or GED",
      "Valid driver's license",
      "No disqualifying criminal history",
      "Background investigation",
      "Psychological evaluation",
    ],
    prepFocus: [
      "Patrol procedures",
      "Jail operations",
      "Court security",
      "Civil process",
    ],
  },
  {
    id: "state-police",
    name: "State Police",
    category: "State",
    description: "State trooper or highway patrol positions",
    requirements: [
      "Some college preferred",
      "Valid driver's license with clean record",
      "No at-fault accidents",
      "Military service may help",
      "Extensive background check",
    ],
    prepFocus: [
      "Traffic enforcement",
      "Criminal law knowledge",
      "Written exams",
      "Physical testing",
    ],
  },
  {
    id: "fbi",
    name: "FBI",
    category: "Federal",
    description: "Special Agent positions with the Federal Bureau of Investigation",
    requirements: [
      "Bachelor's degree (any major)",
      "Three years of work experience",
      "Valid driver's license",
      "Top Secret clearance",
      "Age 23-37 at entry",
    ],
    prepFocus: [
      "Written exam",
      "Oral board interview",
      "Physical fitness test",
      "Background investigation",
      "Polygraph examination",
    ],
  },
  {
    id: "dea",
    name: "DEA",
    category: "Federal",
    description: "Special Agent positions with the Drug Enforcement Administration",
    requirements: [
      "Bachelor's degree",
      "One year of specialized experience OR military service",
      "Valid driver's license",
      "Secret clearance",
      "Age 21-37",
    ],
    prepFocus: [
      "Drug law knowledge",
      "Written examination",
      "Oral interview",
      "Physical evaluation",
    ],
  },
  {
    id: "atf",
    name: "ATF",
    category: "Federal",
    description: "Special Agent with Bureau of Alcohol, Tobacco, Firearms and Explosives",
    requirements: [
      "Bachelor's degree preferred",
      "Relevant work experience",
      "Valid driver's license",
      "Background investigation",
      "Firearms proficiency",
    ],
    prepFocus: [
      "Firearms regulations",
      "Explosives knowledge",
      "Written exam",
      "Oral board",
    ],
  },
  {
    id: "marshals",
    name: "US Marshals Service",
    category: "Federal",
    description: "Deputy U.S. Marshal positions",
    requirements: [
      "Bachelor's degree OR relevant experience",
      "Valid driver's license",
      "No felony convictions",
      "Physical fitness requirement",
      "Background investigation",
    ],
    prepFocus: [
      "Court security procedures",
      "Fugitive apprehension",
      "Witness protection",
      "Written exam",
    ],
  },
  {
    id: "cbp",
    name: "Customs and Border Protection",
    category: "Federal",
    description: "Border Patrol Agent and CBP Officer positions",
    requirements: [
      "High school diploma or equivalent",
      "Valid driver's license",
      "No drug convictions",
      "Physical fitness",
      "Spanish helpful but not required",
    ],
    prepFocus: [
      "Immigration law",
      "Written exam",
      "Physical fitness",
      "Oral interview",
    ],
  },
]

export default function AgenciesPage() {
  const categories = [...new Set(AGENCIES.map(a => a.category))]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold">Agency Prep Guides</h1>
      <p className="mb-8 text-muted-foreground">
        Specific preparation guides for different law enforcement agencies
      </p>

      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h2 className="mb-4 text-xl font-semibold flex items-center gap-2">
            {category === "Federal" ? (
              <Shield className="h-5 w-5" />
            ) : (
              <Building2 className="h-5 w-5" />
            )}
            {category}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {AGENCIES.filter(a => a.category === category).map((agency) => (
              <Card key={agency.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">{agency.name}</CardTitle>
                  <CardDescription>{agency.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {agency.requirements.slice(0, 4).map((req) => (
                        <li key={req} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 mt-1 text-green-500 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Prep Focus:</h4>
                    <div className="flex flex-wrap gap-1">
                      {agency.prepFocus.map((focus) => (
                        <Badge key={focus} variant="secondary" className="text-xs">
                          {focus}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardContent>
                  <Link href={`/app/agencies/${agency.id}`}>
                    <Button className="w-full">
                      View Full Guide <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}