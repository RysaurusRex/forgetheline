import { Button } from "@/components/ui/button"

export default function FitnessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Fitness Standards & Prep</h1>

      <div className="space-y-6">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Overview</h2>
          <p className="text-muted-foreground">
            Physical fitness is a requirement for most law enforcement positions. 
            The PFT (Physical Fitness Test) typically includes push-ups, sit-ups, 
            and a timed run.
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Standard Events</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Push-ups ( timed - usually 1-2 min )</li>
            <li>Sit-ups / curl-ups ( timed )</li>
            <li>Timed run (1.5-3 miles)</li>
            <li>Sometimes: vertical jump, agility course</li>
          </ul>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Typical Minimum Standards</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left font-medium">Event</th>
                  <th className="pb-2 text-left font-medium">Age 20-29</th>
                  <th className="pb-2 text-left font-medium">Age 30-39</th>
                  <th className="pb-2 text-left font-medium">Age 40+</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2">Push-ups (min)</td>
                  <td className="py-2">29</td>
                  <td className="py-2">24</td>
                  <td className="py-2">19</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Sit-ups (min)</td>
                  <td className="py-2">38</td>
                  <td className="py-2">34</td>
                  <td className="py-2">29</td>
                </tr>
                <tr>
                  <td className="py-2">1.5 mile run (max)</td>
                  <td className="py-2">12:51</td>
                  <td className="py-2">13:50</td>
                  <td className="py-2">15:10</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            * Standards vary by agency. Check your specific agency's requirements.
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Training Recommendations</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Start 12+ weeks before your test date</li>
            <li>Focus on progressive overload</li>
            <li>Include interval training for the run</li>
            <li>Practice the test events under timed conditions</li>
            <li>Rest 48-72 hours before the actual test</li>
          </ul>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Track Your Progress</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Current Push-up PR</label>
              <input type="number" className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" placeholder="Number" />
            </div>
            <div>
              <label className="text-sm font-medium">Current 1.5 Mile Run Time</label>
              <input type="text" className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" placeholder="mm:ss" />
            </div>
          </div>
        </div>

        <Button variant="outline">Save My Fitness Notes</Button>
      </div>
    </div>
  )
}