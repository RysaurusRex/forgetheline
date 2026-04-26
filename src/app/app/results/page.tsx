"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getResultsLog, addResultLogEntry, deleteResultLogEntry } from "./actions"

interface ResultEntry {
  id: string
  entryTitle: string
  date: string
  tool: string
  score: number | null
  notes: string | null
}

const tools = [
  "RESUME_ANALYZER",
  "INTERVIEW_SIMULATOR", 
  "DISQUALIFIER_SCANNER",
  "STRATEGY_ENGINE",
  "FITNESS",
  "TESTING",
  "OTHER",
]

const toolLabels: Record<string, string> = {
  RESUME_ANALYZER: "Resume Analyzer",
  INTERVIEW_SIMULATOR: "Interview Simulator",
  DISQUALIFIER_SCANNER: "Disqualifier Scanner",
  STRATEGY_ENGINE: "Strategy Engine",
  FITNESS: "Fitness",
  TESTING: "Testing",
  OTHER: "Other",
}

export default function ResultsPage() {
  const [entries, setEntries] = useState<ResultEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [newEntry, setNewEntry] = useState({
    entryTitle: "",
    date: new Date().toISOString().split("T")[0],
    tool: "RESUME_ANALYZER",
    score: "",
    notes: "",
  })

  useEffect(() => {
    loadEntries()
  }, [])

  const loadEntries = async () => {
    const data = await getResultsLog()
    setEntries(data as unknown as ResultEntry[])
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const formData = new FormData()
    formData.set("entryTitle", newEntry.entryTitle)
    formData.set("date", newEntry.date)
    formData.set("tool", newEntry.tool)
    formData.set("score", newEntry.score)
    formData.set("notes", newEntry.notes)
    
    await addResultLogEntry(formData)
    setNewEntry({
      entryTitle: "",
      date: new Date().toISOString().split("T")[0],
      tool: "RESUME_ANALYZER",
      score: "",
      notes: "",
    })
    setShowForm(false)
    await loadEntries()
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    await deleteResultLogEntry(id)
    await loadEntries()
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Results Log</h1>

      <div className="mb-6">
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add new result"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">New Entry</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={newEntry.entryTitle}
                onChange={(e) => setNewEntry({ ...newEntry, entryTitle: e.target.value })}
                placeholder="Entry title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Input
                type="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Tool</label>
              <select
                value={newEntry.tool}
                onChange={(e) => setNewEntry({ ...newEntry, tool: e.target.value })}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                required
              >
                {tools.map((t) => (
                  <option key={t} value={t}>{toolLabels[t]}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Score (optional)</label>
              <Input
                type="number"
                step="0.1"
                value={newEntry.score}
                onChange={(e) => setNewEntry({ ...newEntry, score: e.target.value })}
                placeholder="0-100"
              />
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              value={newEntry.notes}
              onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
              placeholder="Key takeaways..."
              rows={3}
            />
          </div>
          
          <div className="mt-4">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Entry"}
            </Button>
          </div>
        </form>
      )}

      {entries.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="pb-3 text-left font-medium">Date</th>
                <th className="pb-3 text-left font-medium">Title</th>
                <th className="pb-3 text-left font-medium">Tool</th>
                <th className="pb-3 text-left font-medium">Score</th>
                <th className="pb-3 text-left font-medium">Notes</th>
                <th className="pb-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-b">
                  <td className="py-3">{new Date(entry.date).toLocaleDateString()}</td>
                  <td className="py-3 font-medium">{entry.entryTitle}</td>
                  <td className="py-3">{toolLabels[entry.tool] || entry.tool}</td>
                  <td className="py-3">{entry.score ?? "-"}</td>
                  <td className="py-3 max-w-xs truncate">{entry.notes || "-"}</td>
                  <td className="py-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(entry.id)}
                      className="text-destructive"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-muted-foreground">No results logged yet.</p>
      )}
    </div>
  )
}