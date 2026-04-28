"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MedicalWaiverPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/app/tools" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to Tools
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">Medical Waiver Masterclass</h1>
      <p className="text-xl text-muted-foreground mb-8">
        When you need a waiver, how the process works, and what disqualifies - based on insider research
      </p>

      <Alert className="mb-8 border-yellow-200 bg-yellow-50">
        <AlertTitle className="text-yellow-800">⚠️ Insider Reality Check</AlertTitle>
        <AlertDescription className="text-yellow-700">
          Insider: "Blood pressure meds = waiver needed. Process takes 2-4 weeks after submission."
          <br/>
          Insider: "Med boards take 8-10 months to 1-2 years if contested."
        </AlertDescription>
      </Alert>

      {/* Blood Pressure */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Blood Pressure & Heart Conditions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">✅ Usually Waivable</CardTitle>
              <CardDescription className="text-green-600">
                If managed, controlled, or off medication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-green-700">
                <li>✓ Controlled with meds (disclosed & stable)</li>
                <li>✓ Borderline high (130/80) if you pass re-test</li>
                <li>✓ Past hypertension (now off meds, stable)</li>
                <li>✓ Family history if you test normal</li>
              </ul>
               <p className="mt-4 text-sm italic text-green-600">
                 Insider: "I passed barely. Got DQ'd initially, submitted waiver, cleared in 3 weeks."
               </p>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">❌ High Risk / DQ</CardTitle>
              <CardDescription className="text-red-600">
                Uncontrolled or severe conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-red-700">
                <li>✗ Uncontrolled hypertension (&gt,140/90 consistently)</li>
                <li>✗ Heart disease, arrhythmias, or past heart attacks</li>
                <li>✗ On blood thinners or cardiac meds</li>
                <li>✗ Failed re-test multiple times during medical</li>
              </ul>
               <p className="mt-4 text-sm italic text-red-600">
                 Insider: "Got put back on meds after medical. Submitted waiver, cleared in 2 weeks."
               </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Vision */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Vision Standards</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h4 className="font-bold text-green-600 mb-2">✅ Usually OK</h4>
                <ul className="space-y-1 text-sm">
                  <li>Correctable to 20/20</li>
                  <li>Color blind (some agencies)</li>
                  <li>Laser eye surgery (healed)</li>
                  <li>Wear glasses/contacts</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-yellow-600 mb-2">⚠️ Case-by-Case</h4>
                <ul className="space-y-1 text-sm">
                  <li>20/40 correctable (some agencies)</li>
                  <li>Night blindness</li>
                  <li>Depth perception issues</li>
                  <li>Recent LASIK (&lt,3 months)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-red-600 mb-2">❌ Usually DQ</h4>
                <ul className="space-y-1 text-sm">
                  <li>20/200 or worse (uncorrected)</li>
                  <li>Complete color blindness</li>
                  <li>Field of vision loss</li>
                  <li>Legal blindness in one eye</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-sm italic text-muted-foreground">
              Insider: "NPS requires 20/20 uncorrected. DEA allows 20/40 correctable. Know YOUR agency."
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Hearing */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Hearing Standards</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Most agencies use the <strong>whisper test</strong> (can you hear a whisper at 5 feet?) or audiometry.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-bold text-green-700 mb-2">✅ Pass Criteria</h4>
                <ul className="space-y-1 text-sm text-green-600">
                  <li>Hears whisper at 5 feet in quiet room</li>
                  <li>Audiometry: &lt,25 dB loss in each ear</li>
                  <li>Can use hearing aids (some agencies)</li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-bold text-red-700 mb-2">❌ Fail Criteria</h4>
                <ul className="space-y-1 text-sm text-red-600">
                  <li>Cannot hear whisper at 5 feet</li>
                  <li>Audiometry: &gt,25 dB loss</li>
                  <li>Single-sided deafness (most agencies)</li>
                  <li>Tinnitus (severe, affects duties)</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm italic text-muted-foreground">
              Insider: "Hard of hearing + anxiety = polygraph nightmare. Cannot take test."
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Past Conditions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Past Medical Conditions & Surgeries</h2>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="mental">
            <AccordionTrigger>🧠️ Mental Health (Anxiety, Depression, PTSD)</AccordionTrigger>
            <AccordionContent>
              <div className="p-4 space-y-4">
                <p className="text-sm">
                  <strong>Gen Z research:</strong> "77% consider mental health crucial. They expect employers to take it seriously."
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium text-green-600">✅ Usually Waivable</h4>
                    <ul className="space-y-1 text-sm">
                      <li>History of anxiety/depression (treated, managed)</li>
                      <li>ADHD on medication (stable, functional)</li>
                      <li>Past counseling/therapy (resolved)</li>
                      <li>OCD (mild, managed)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-600">❌ High Risk</h4>
                    <ul className="space-y-1 text-sm">
                      <li>Recent psychiatric hospitalization</li>
                      <li>Suicidal ideation (within 2 years)</li>
                      <li>Bipolar disorder (untreated)</li>
                      <li>PTSD affecting daily function</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm italic text-muted-foreground">
                  Insider: "I was DQ'd for past anxiety. Submitted psychiatrist letter + waiver. Cleared in 4 weeks."
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="back">
            <AccordionTrigger>🦴 Back & Spine Issues</AccordionTrigger>
            <AccordionContent>
              <div className="p-4">
                <p className="mb-4 text-sm">
                  LE requires lifting 50+ lbs, wearing heavy gear, defensive tactics.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Past back surgery (fully recovered, Dr. clearance)</li>
                  <li>✓ Herniated disc (healed, no restrictions)</li>
                  <li>✗ Chronic back pain (affects duties)</li>
                  <li>✗ Recent spinal fusion (&lt,1 year)</li>
                </ul>
                <p className="mt-4 text-sm italic text-muted-foreground">
                  Insider: "Back issues disqualify if they limit 'ability to perform essential functions'."
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="other">
            <AccordionTrigger>💊 Other Conditions</AccordionTrigger>
            <AccordionContent>
              <div className="p-4">
                <ul className="space-y-3 text-sm">
                  <li><strong>Asthma:</strong> ✅ Controlled/mild → waiver possible. ✗ Severe, needs inhaler daily → often DQ</li>
                  <li><strong>Diabetes:</strong> ✅ Type 2 (diet controlled) → waiver. ✗ Type 1 (insulin dependent) → usually DQ</li>
                  <li><strong>Sleep Apnea:</strong> ✅ Using CPAP, clearance letter → waiver. ✗ Untreated severe apnea → DQ</li>
                  <li><strong>Seizures:</strong> ✗ Any seizure within 5 years → automatic DQ at most agencies</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Waiver Process */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">The Waiver Process (Insider Timeline)</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex gap-4">
                <Badge variant="outline" className="h-8 w-8 shrink-0">1</Badge>
                <div>
                  <h4 className="font-bold">Medical Disqualification Notice</h4>
                  <p className="text-sm text-muted-foreground">
                    You receive "You've been DQ'd for [condition]. Submit waiver or appeal."
                    <br/>
                    <span className="italic">Insider: "Got DQ'd in March, submitted waiver in April."</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Badge variant="outline" className="h-8 w-8 shrink-0">2</Badge>
                <div>
                  <h4 className="font-bold">Gather Documentation</h4>
                  <p className="text-sm text-muted-foreground">
                    Physician letter, medical records, specialist clearance, "fit for duty" statement.
                    <br/>
                    <span className="italic">Timeline: 2-4 weeks to gather docs</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Badge variant="outline" className="h-8 w-8 shrink-0">3</Badge>
                <div>
                  <h4 className="font-bold">Submit Waiver Package</h4>
                  <p className="text-sm text-muted-foreground">
                    Via portal or email. Includes all docs + personal statement.
                    <br/>
                    <span className="italic">Insider: "Submitted April 15th, waiting since..."</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Badge variant="outline" className="h-8 w-8 shrink-0">4</Badge>
                <div>
                  <h4 className="font-bold">Medical Review Board</h4>
                  <p className="text-sm text-muted-foreground">
                    Agency doctors review. Can take 2-4 weeks (sometimes 8+).
                    <br/>
                    <span className="italic">Insider: "Med boards: 8-10 months if contested"</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Badge variant="outline" className="h-8 w-8 shrink-0">5</Badge>
                <div>
                  <h4 className="font-bold">Decision</h4>
                  <p className="text-sm text-muted-foreground">
                    ✅ Waiver Approved → Continue process
                    <br/>
                    ❌ Waiver Denied → Appeal possible (not always)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="font-medium">Total Timeline from Insider Research:</p>
              <p className="text-sm text-muted-foreground">
                Simple waivers: <strong>2-4 weeks</strong> | Complex cases: <strong>2-6 months</strong> | Contested: <strong>8-12+ months</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="mt-12 p-8 bg-primary/5 rounded-lg border border-primary/20">
        <h3 className="text-2xl font-bold mb-4">Know Your Risks Before Applying</h3>
        <p className="mb-6">
          Use our Disqualifier Scanner to identify your medical risks, then prepare your waiver docs early.
        </p>
        <Button asChild>
          <Link href="/app/tools/disqualifier-scanner">Check My Medical Risks</Link>
        </Button>
      </section>
    </div>
  )
}
