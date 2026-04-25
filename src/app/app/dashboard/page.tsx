"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { updateDashboard, getDashboard } from "./actions"
import { CheckCircle, Circle, ArrowRight } from "lucide-react"
import Link from "next/link"

const STEPS = [
  { id: "profile", label: "Complete your client profile", href: "/app/client-profile" },
  { id: "resume", label: "Run Resume Analyzer", href: "/app/tools/resume-analyzer" },
  { id: "interview", label: "Run Interview Simulator", href: "/app/tools/interview-simulator" },
  { id: "disqualifier", label: "Run Disqualifier Scanner", href: "/app/tools/disqualifier-scanner" },
  { id: "strategy", label: "Run Strategy Engine", href: "/app/tools/strategy-engine" },
  { id: "results", label: "Review results in Results log", href: "/app/results" },
]

interface DashboardData {
  currentStatus: string | null
  latestOutputs: string | null
  executionLoop: string | null
  targetInfo: string | null
  progressChecks: string | null
}

const defaultProgress = STEPS.map(s => `${s.id}:false`).join(",")

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [completed, setCompleted] = useState<string[]>([])

  const [data, setData] = useState<DashboardData>({
    currentStatus: "",
    latestOutputs: "",
    executionLoop: "",
    targetInfo: "",
    progressChecks: "",
  })

  useEffect(() => {
    getDashboard().then((d) => {
      if (d) {
        setData({
          currentStatus: d.currentStatus || "",
          latestOutputs: d.latestOutputs || "",
          executionLoop: d.executionLoop || "",
          targetInfo: d.targetInfo || "",
          progressChecks: d.progressChecks || "",
        })
        if (d.progressChecks) {
          setCompleted(d.progressChecks.split(",").filter(c => c.endsWith(":true")))
        }
      }
      setLoading(false)
    })
  }, [])

  const handleCheck = (stepId: string, checked: boolean) => {
    const newCompleted = checked
      ? [...completed, `${stepId}:true`]
      : completed.filter(c => !c.startsWith(stepId + ":"))
    setCompleted(newCompleted)
  }

  const progressPercent = Math.round((completed.length / STEPS.length) * 100)

  const handleSave = async () => {
    setSaving(true)
    const formData = new FormData()
    formData.set("currentStatus", data.currentStatus)
    formData.set("latestOutputs", data.latestOutputs)
    formData.set("executionLoop", data.executionLoop)
    formData.set("targetInfo", data.targetInfo)
    formData.set("progressChecks", completed.join(","))
    
    await updateDashboard(formData)
    setSaving(false)
  }

  const isStepCompleted = (stepId: string) => completed.some(c => c.startsWith(stepId + ":true"))

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold">Dashboard</h1>
      <p className="mb-8 text-muted-foreground">Track your progress through the portal</p>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Current Status</h2>
            <p className="mb-2 text-sm text-muted-foreground">
              Top priority, next action, deadline
            </p>
            <Textarea
              value={data.currentStatus}
              onChange={(e) => setData({ ...data, currentStatus: e.target.value })}
              placeholder="What's your current status?"
              rows={3}
            />
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Latest Outputs</h2>
            <p className="mb-2 text-sm text-muted-foreground">
              Paste your resume/interview/disqualifier/strategy outputs here
            </p>
            <Textarea
              value={data.latestOutputs}
              onChange={(e) => setData({ ...data, latestOutputs: e.target.value })}
              placeholder="Latest outputs..."
              rows={6}
            />
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Target Info</h2>
            <p className="mb-2 text-sm text-muted-foreground">
              Target Role / Hiring Stage / Biggest Weakness / Priority / Interview Date / Main Concern
            </p>
            <Textarea
              value={data.targetInfo}
              onChange={(e) => setData({ ...data, targetInfo: e.target.value })}
              placeholder="Target role, hiring stage, etc..."
              rows={4}
            />
          </div>

          <div className="flex gap-4">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Button variant="outline" onClick={() => router.push("/app/home")}>
              Back to Home
            </Button>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Progress
                <span className="text-lg font-bold text-primary">{progressPercent}%</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {STEPS.map((step) => (
                  <div key={step.id} className="flex items-center gap-3">
                    <Checkbox
                      id={step.id}
                      checked={isStepCompleted(step.id)}
                      onCheckedChange={(checked) => handleCheck(step.id, checked as boolean)}
                    />
                    <Label
                      htmlFor={step.id}
                      className={`flex-1 cursor-pointer text-sm ${
                        isStepCompleted(step.id) ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {step.label}
                    </Label>
                    {isStepCompleted(step.id) && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
              <Link href="/app/client-profile">
                <Button className="mt-4 w-full" variant="outline">
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}