import { Button } from "@/components/ui/button"

export default function ProcessingClearancesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Processing & Clearances</h1>

      <div className="space-y-6">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Background Investigation</h2>
          <p className="text-muted-foreground">
            The background investigation is often the longest and most intensive phase. 
            It typically takes 2-6 months and covers every aspect of your life.
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">What's Investigated</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Employment history (last 5-10 years)</li>
            <li>Education verification</li>
            <li>Credit history</li>
            <li>Criminal history (local, state, federal)</li>
            <li>Driving record</li>
            <li>Military record (if applicable)</li>
            <li>Interview with references</li>
            <li>Neighborhood interviews</li>
            <li>Social media review</li>
          </ul>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Timeline</h2>
          <div className="space-y-2 text-muted-foreground">
            <div className="flex justify-between rounded-md bg-muted px-4 py-2">
              <span>Phase 1: Application & Written Exam</span>
              <span>1-3 months</span>
            </div>
            <div className="flex justify-between rounded-md bg-muted px-4 py-2">
              <span>Phase 2: Physical Test</span>
              <span>1-2 months</span>
            </div>
            <div className="flex justify-between rounded-md bg-muted px-4 py-2">
              <span>Phase 3: Background Investigation</span>
              <span>2-6 months</span>
            </div>
            <div className="flex justify-between rounded-md bg-muted px-4 py-2">
              <span>Phase 4: Polygraph / Interview</span>
              <span>1-2 months</span>
            </div>
            <div className="flex justify-between rounded-md bg-muted px-4 py-2">
              <span>Phase 5: Final Clearance & Offer</span>
              <span>1-2 months</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Common Issues</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Credit problems (collections, late payments)</li>
            <li>Past drug use</li>
            <li>Employment gaps</li>
            <li>Traffic violations</li>
            <li>Associates with criminal records</li>
          </ul>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Your Notes</h2>
          <textarea className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" rows={4} placeholder="Track your processing timeline..." />
        </div>

        <Button variant="outline">Save Notes</Button>
      </div>
    </div>
  )
}