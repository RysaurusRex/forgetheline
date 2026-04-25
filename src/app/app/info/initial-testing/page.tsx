import { Button } from "@/components/ui/button"

export default function InitialTestingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Initial Testing - Written Exams</h1>

      <div className="space-y-6">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Overview</h2>
          <p className="text-muted-foreground">
            The written exam is typically the first hurdle. Most federal agencies use 
            the Treasury Enforcement Agents Test (TEAT) or a similar cognitive assessment.
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Test Components</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Logical reasoning / deductive reasoning</li>
            <li>Written expression</li>
            <li>Numerical ability</li>
            <li>Observational / attention to detail</li>
            <li>Situational judgment</li>
          </ul>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Preparation Tips</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Study general aptitude test formats</li>
            <li>Practice logical reasoning questions daily</li>
            <li>Work on typing speed if there's a written component</li>
            <li>Review basic math concepts (percentages, ratios)</li>
            <li>Read comprehension exercises</li>
          </ul>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Fill This In</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Target Exam Date</label>
              <input type="text" className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" placeholder="Q1 2025, etc" />
            </div>
            <div>
              <label className="text-sm font-medium">Practice Test Scores</label>
              <textarea className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" rows={3} placeholder="Record your practice scores here..." />
            </div>
            <div>
              <label className="text-sm font-medium">Areas to Improve</label>
              <textarea className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" rows={3} placeholder="What topics need more study?" />
            </div>
          </div>
        </div>

        <Button variant="outline">Save My Notes</Button>
      </div>
    </div>
  )
}