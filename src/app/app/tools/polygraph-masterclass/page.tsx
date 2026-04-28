"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PolygraphMasterclassPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/app/tools" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to Tools
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">Polygraph Masterclass</h1>
      <p className="text-xl text-muted-foreground mb-8">
        What really happens, how to prepare, and why deception = automatic disqualifier
      </p>

      <Alert className="mb-8 border-red-200 bg-red-50">
        <AlertTitle className="text-red-800">⚠️ #1 Disqualifier: Dishonesty</AlertTitle>
        <AlertDescription className="text-red-700">
          Insider officers agree: "They don't care about the crime, they care if you LIE about it." 
          Polygraph deception or "countermeasures" = automatic DQ at 77% of agencies.
        </AlertDescription>
      </Alert>

      {/* What is it */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What Is the Polygraph?</h2>
        <Card className="mb-4">
          <CardContent className="pt-6">
            <p className="mb-4">
              The polygraph ("lie detector") measures physiological responses: blood pressure, 
              pulse, respiration, and skin conductivity while you answer questions.
            </p>
            <p className="mb-4">
              <strong>Reality check from insiders:</strong> "Polygraphs aren't scientifically 
              reliable, but they're 100% admissible in LE hiring. Failing = automatic DQ."
            </p>
            <p>
              Agencies using polygraph: FBI, DEA, ATF, CBP, USSS, most State Police. 
              Agencies using CVSA (voice stress): Some sheriffs, smaller agencies.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* The Process */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">The Process (4-6 Hours)</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>1. Pre-Screening (1-2 hours)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✓ Life history review</li>
                <li>✓ "Significant admissions" disclosure</li>
                <li>✓ Question formulation together</li>
                <li>✓ You'll be asked: "Any undetected crimes?"</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. The Test (2-3 hours)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✓ Relevant questions (crimes, drug use)</li>
                <li>✓ Control questions (minor misdeeds)</li>
                <li>✓ 3-4 rounds of questions</li>
                <li>✓ "Countermeasures" = automatic fail</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. The Admission Trap</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-600 font-medium">
                Insider: "Admitting to undetected homicide, rape, kidnapping = automatic DQ. 
                They'll investigate and you might face charges."
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✓ "Passed" - move forward</li>
                <li>✓ "Inconclusive" - retake possible</li>
                <li>✓ "Deception indicated" = DQ</li>
                <li>✓ "Countermeasures detected" = DQ</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What They Ask */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What They'll Ask (Insider Compilation)</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="crimes">
            <AccordionTrigger>Undetected Crimes</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 p-4">
                <p className="font-medium text-red-600">
                  Insider warning: "DO NOT admit to serious undetected crimes. 
                  They'll investigate and you could be charged."
                </p>
                <p>Typical questions:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>"Have you ever committed a crime that went undetected?"</li>
                  <li>"Any burglary, theft, or property crimes?"</li>
                  <li>"Any violence, assault, domestic issues?"</li>
                  <li>"Any drug manufacturing, distribution, or sales?"</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  <strong>Safe answer:</strong> "I've made mistakes as a teenager but nothing 
                  serious or violent. If you want specifics, I've disclosed all convictions on my application."
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="drugs">
            <AccordionTrigger>Drug Use (Past & Current)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 p-4">
                <p className="font-medium">
                  Current use = automatic DQ. Past use reviewed case-by-case.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>FBI: "No current use, past marijuana OK if 12+ months ago"</li>
                  <li>DEA: "No illegal drugs, period. Past use = deep review."</li>
                  <li>State Police: "Marijuana OK if 12+ months, other drugs = DQ"</li>
                   <li>Insider: "Don't admit to cocaine, hallucinogens, or designer drugs"</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  <strong>Strategy:</strong> Be honest about marijuana if asked directly. 
                  "I experimented in college, stopped in 2022" is better than lying.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="truth">
            <AccordionTrigger>Dishonesty & Omissions</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 p-4">
                <p className="font-medium text-red-600">
                  #1 reason candidates fail. Insider: "They don't care about the crime, 
                  they care if you LIE."
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>"Have you ever lied on any application?"</li>
                  <li>"Did you omit anything from your background packet?"</li>
                  <li>"Have you ever stolen from an employer?"</li>
                  <li>"Any unreported income or tax evasion?"</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  <strong>Critical:</strong> If you forgot to list a job, SAY SO. 
                  "I realize now I forgot to list my 2019 summer job" = fixable. 
                  Hiding it = DQ.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="social">
            <AccordionTrigger>Social Media & Online Activity</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 p-4">
                <p>
                  Gen Z research: 95% say social media impacts their decision. 
                  Officers check your: Instagram, TikTok, X, Facebook.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Offensive posts = disqualifying at 77% of agencies</li>
                  <li>Gang symbols/tattoos = automatic DQ</li>
                  <li>Unprofessional behavior online = case-by-case review</li>
                   <li>Insider: "Clean up your social media 2 years before applying"</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Preparation Strategy */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Preparation Strategy</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">✅ DO This</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-green-700">
                <li>Disclose ALL convictions upfront on application</li>
                <li>Admit to minor past marijuana use truthfully</li>
                <li>Say "I don't recall" if unsure (not "no")</li>
                <li>Clean social media 2+ years before applying</li>
                <li>Get 8 hours of sleep before polygraph</li>
                <li>Bring documentation for past issues</li>
                <li>Be consistent across all forms and interviews</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">❌ NEVER Do This</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-red-700">
                <li>Admit to serious undetected crimes (murder, rape, etc.)</li>
                <li>Use "countermeasures" (breathing tricks, etc.)</li>
                <li>Lie about past drug use or crimes</li>
                <li>Say "no" when you're not 100% sure</li>
                <li>Get into arguments with the polygrapher</li>
                <li>Admit to cocaine/hallucinogen use in detail</li>
                <li>Go in sleep-deprived or highly stressed</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Insider Reality Checks */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Insider Reality Checks</h2>
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <Badge variant="destructive">Insider</Badge>
              <p className="mt-2 italic">
                "I admitted to undetected burglary during polygraph. They investigated, 
                found evidence, and I was charged. Don't admit to serious crimes 
                they don't already know about."
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Badge variant="destructive">Insider</Badge>
              <p className="mt-2 italic">
                "My BI was amazing - had all references called in 4 days, everything 
                finalized in 2 weeks. Timeline: Oct application → Feb box → 
                Immediate background → March final offer."
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Badge variant="destructive">Insider</Badge>
              <p className="mt-2 italic">
                "Written exam → PAT → Fingerprinting → Physical → Polygraph → 
                Background → Home visit → Medical (5 weeks before academy) → 
                Academy. Total: 10 months."
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-12 p-8 bg-primary/5 rounded-lg border border-primary/20">
        <h3 className="text-2xl font-bold mb-4">Ready to Practice?</h3>
        <p className="mb-6">
          Use our Disqualifier Scanner to identify your risks, then run scenarios 
          through the Interview Simulator with polygraph-style questions.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/app/tools/disqualifier-scanner">Disqualifier Scanner</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/app/tools/interview-simulator">Interview Simulator</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
