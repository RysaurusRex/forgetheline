"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getToolOutput, saveToolOutput } from "@/app/app/tools/actions"

interface ToolPageProps {
  tool: string
  title: string
  description: string
  steps: string[]
  prompt: string
  exampleOutput?: string
}

export function ToolPage({ tool, title, description, steps, prompt, exampleOutput }: ToolPageProps) {
  const [savedOutput, setSavedOutput] = useState("")
  const [currentOutput, setCurrentOutput] = useState("")
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getToolOutput(tool).then((data) => {
      if (data?.output) {
        setSavedOutput(data.output)
        setCurrentOutput(data.output)
      }
      setLoading(false)
    })
  }, [tool])

  const handleSave = async () => {
    setSaving(true)
    const formData = new FormData()
    formData.set("tool", tool)
    formData.set("output", currentOutput)
    await saveToolOutput(formData)
    setSavedOutput(currentOutput)
    setSaving(false)
  }

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt)
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="border-primary">
            <CardHeader className="bg-primary/10">
              <CardTitle>Step 1: Copy This Prompt</CardTitle>
              <CardDescription>Paste this into ChatGPT, Claude, or Gemini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-muted p-4 text-sm font-mono whitespace-pre-wrap max-h-64 overflow-y-auto">
                {prompt}
              </div>
              <Button 
                className="mt-4 w-full"
                onClick={handleCopyPrompt}
              >
                Copy Prompt
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 2: How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                {steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {exampleOutput && (
            <Card>
              <CardHeader>
                <CardTitle>Example Output</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md bg-muted p-4 text-sm whitespace-pre-wrap">
                  {exampleOutput}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="border-green-500">
            <CardHeader className="bg-green-500/10">
              <CardTitle>Step 3: Get AI Response</CardTitle>
              <CardDescription>
                1. Go to <a href="https://chat.openai.com" target="_blank" className="underline text-blue-500">ChatGPT</a> or <a href="https://claude.ai" target="_blank" className="underline text-blue-500">Claude</a>
                <br/>
                2. Paste the prompt above
                <br/>
                3. Add your info (resume, background, etc)
                <br/>
                4. Copy the AI's response below
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Output</CardTitle>
              <CardDescription>Paste AI response here</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={currentOutput}
                onChange={(e) => setCurrentOutput(e.target.value)}
                placeholder="Paste AI response here..."
                rows={20}
                className="font-mono text-sm"
              />
              <div className="mt-4 flex gap-2">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Output"}
                </Button>
                {currentOutput !== savedOutput && currentOutput !== "" && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentOutput(savedOutput)}
                  >
                    Reset
                  </Button>
                )}
              </div>
              {savedOutput && (
                <Badge variant="secondary" className="mt-2">
                  Saved
                </Badge>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}