"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getClientProfile, updateClientProfile } from "./actions"

interface ProfileData {
  targetRoles: string | null
  agencies: string | null
  locationConstraints: string | null
  hiringStage: string | null
  timelineTargetDate: string | null
  interviewDate: string | null
  strengths: string | null
  weakPoints: string | null
  riskFlags: string | null
  resumeLinkOrNotes: string | null
  jobPostingLink: string | null
  notes: string | null
}

const hiringStages = [
  "Not started",
  "Applied",
  "Written exam passed",
  "PFT passed",
  "Background investigation",
  "Interview scheduled",
  "Final selection",
  "Offer received",
  "In academy",
]

export default function ClientProfilePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<ProfileData>({
    targetRoles: "",
    agencies: "",
    locationConstraints: "",
    hiringStage: "",
    timelineTargetDate: "",
    interviewDate: "",
    strengths: "",
    weakPoints: "",
    riskFlags: "",
    resumeLinkOrNotes: "",
    jobPostingLink: "",
    notes: "",
  })

  useEffect(() => {
    getClientProfile().then((p) => {
      if (p) {
        setData({
          targetRoles: p.targetRoles || "",
          agencies: p.agencies || "",
          locationConstraints: p.locationConstraints || "",
          hiringStage: p.hiringStage || "",
          timelineTargetDate: p.timelineTargetDate || "",
          interviewDate: p.interviewDate ? new Date(p.interviewDate).toISOString().split("T")[0] : "",
          strengths: p.strengths || "",
          weakPoints: p.weakPoints || "",
          riskFlags: p.riskFlags || "",
          resumeLinkOrNotes: p.resumeLinkOrNotes || "",
          jobPostingLink: p.jobPostingLink || "",
          notes: p.notes || "",
        })
      }
      setLoading(false)
    })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    const formData = new FormData()
    formData.set("targetRoles", data.targetRoles)
    formData.set("agencies", data.agencies)
    formData.set("locationConstraints", data.locationConstraints)
    formData.set("hiringStage", data.hiringStage)
    formData.set("timelineTargetDate", data.timelineTargetDate)
    formData.set("interviewDate", data.interviewDate)
    formData.set("strengths", data.strengths)
    formData.set("weakPoints", data.weakPoints)
    formData.set("riskFlags", data.riskFlags)
    formData.set("resumeLinkOrNotes", data.resumeLinkOrNotes)
    formData.set("jobPostingLink", data.jobPostingLink)
    formData.set("notes", data.notes)
    
    await updateClientProfile(formData)
    setSaving(false)
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Client Profile</h1>

      <div className="space-y-6">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Target Roles</h2>
          <Textarea
            value={data.targetRoles}
            onChange={(e) => setData({ ...data, targetRoles: e.target.value })}
            placeholder="e.g., Police Officer, Detective, 1811, DEA, FBI, HSI..."
            rows={2}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Agencies</h2>
            <Textarea
              value={data.agencies}
              onChange={(e) => setData({ ...data, agencies: e.target.value })}
              placeholder="Target agencies..."
              rows={2}
            />
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Location</h2>
            <Textarea
              value={data.locationConstraints}
              onChange={(e) => setData({ ...data, locationConstraints: e.target.value })}
              placeholder="Preferred locations..."
              rows={2}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Hiring Stage</h2>
            <select
              value={data.hiringStage}
              onChange={(e) => setData({ ...data, hiringStage: e.target.value })}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            >
              <option value="">Select stage...</option>
              {hiringStages.map((stage) => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Timeline Target</h2>
            <Input
              type="text"
              value={data.timelineTargetDate}
              onChange={(e) => setData({ ...data, timelineTargetDate: e.target.value })}
              placeholder="e.g., Q2 2025"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Interview Date</h2>
            <Input
              type="date"
              value={data.interviewDate}
              onChange={(e) => setData({ ...data, interviewDate: e.target.value })}
            />
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Resume / Links</h2>
            <Textarea
              value={data.resumeLinkOrNotes}
              onChange={(e) => setData({ ...data, resumeLinkOrNotes: e.target.value })}
              placeholder="Resume link or notes..."
              rows={2}
            />
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Job Posting Link</h2>
          <Input
            type="url"
            value={data.jobPostingLink}
            onChange={(e) => setData({ ...data, jobPostingLink: e.target.value })}
            placeholder="https://..."
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Strengths</h2>
            <Textarea
              value={data.strengths}
              onChange={(e) => setData({ ...data, strengths: e.target.value })}
              placeholder="Your strengths..."
              rows={3}
            />
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Weak Points</h2>
            <Textarea
              value={data.weakPoints}
              onChange={(e) => setData({ ...data, weakPoints: e.target.value })}
              placeholder="Areas to improve..."
              rows={3}
            />
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Risk Flags</h2>
            <Textarea
              value={data.riskFlags}
              onChange={(e) => setData({ ...data, riskFlags: e.target.value })}
              placeholder="Potential concerns..."
              rows={3}
            />
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Notes</h2>
          <Textarea
            value={data.notes}
            onChange={(e) => setData({ ...data, notes: e.target.value })}
            placeholder="Additional notes..."
            rows={4}
          />
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </div>
  )
}