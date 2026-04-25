import { Button } from "@/components/ui/button"

export default function OffersAcademyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Offers, Academy & Probation</h1>

      <div className="space-y-6">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">The Offer</h2>
          <p className="text-muted-foreground">
            Congratulations! Once you receive an offer, you'll need to make decisions about 
            location, start date, and any relocation considerations.
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">What to Consider</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Location preferences</li>
            <li>Start date flexibility</li>
            <li>Relocation package</li>
            <li>Salary and benefits</li>
            <li>Agency culture</li>
          </ul>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Academy Overview</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Length: 8-22 weeks depending on agency</li>
            <li>Full-time, dorm-style attendance</li>
            <li>Academic and physical training</li>
            <li>Firearms qualification</li>
            <li>Defensive tactics</li>
            <li>Legal training</li>
            <li>Scenario-based learning</li>
          </ul>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Academy Tips</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Stay physically fit before arriving</li>
            <li>Study the agency policy manual</li>
            <li>Be prepared for stress inoculation</li>
            <li>Build relationships with your class</li>
            <li>Take notes extensively</li>
            <li>Ask questions when unclear</li>
          </ul>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Probation</h2>
          <p className="text-muted-foreground">
            After academy, you'll typically have a 1-year probation period. 
            Performance during this time determines your continued employment.
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Your Notes</h2>
          <textarea className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" rows={4} placeholder="Notes about offers, academy, etc..." />
        </div>

        <Button variant="outline">Save Notes</Button>
      </div>
    </div>
  )
}