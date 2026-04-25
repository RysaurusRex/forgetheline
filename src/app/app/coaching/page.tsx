import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export default function CoachingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Coaching</h1>

      <div className="space-y-6">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Premium 1-on-1 Coaching</h2>
          <p className="text-muted-foreground">
            Get personalized guidance from law enforcement veterans. 
            Accelerate your preparation with expert feedback.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 text-xl font-semibold">Resume Review</h3>
            <p className="mb-4 text-3xl font-bold">$149</p>
            <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
              <li>- One-on-one session</li>
              <li>- Resume analysis</li>
              <li>- Rewrite recommendations</li>
              <li>- 30-day email support</li>
            </ul>
            <a href="https://cal.com/forge-the-line" target="_blank" rel="noopener noreferrer">
              <Button className="w-full">
                Book Now <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="mb-2 text-xl font-semibold">Interview Prep</h3>
            <p className="mb-4 text-3xl font-bold">$199</p>
            <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
              <li>- 2 one-on-one sessions</li>
              <li>- Mock interview practice</li>
              <li>- Question bank</li>
              <li>- Feedback & scoring</li>
            </ul>
            <a href="https://cal.com/forge-the-line" target="_blank" rel="noopener noreferrer">
              <Button className="w-full">
                Book Now <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="mb-2 text-xl font-semibold">Full Package</h3>
            <p className="mb-4 text-3xl font-bold">$499</p>
            <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
              <li>- 4 one-on-one sessions</li>
              <li>- Resume + Interview + Strategy</li>
              <li>- Complete package</li>
              <li>- 90-day support</li>
            </ul>
            <a href="https://cal.com/forge-the-line" target="_blank" rel="noopener noreferrer">
              <Button className="w-full">
                Book Now <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="mb-2 text-xl font-semibold">Coaching Credit</h3>
            <p className="mb-4 text-3xl font-bold">$100</p>
            <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
              <li>- Add to any package</li>
              <li>- Use for any service</li>
              <li>- Never expires</li>
              <li>- Transferable</li>
            </ul>
            <a href="https://cal.com/forge-the-line" target="_blank" rel="noopener noreferrer">
              <Button className="w-full" variant="outline">
                Learn More <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>

        <div className="rounded-lg border bg-muted p-6">
          <h2 className="mb-4 text-lg font-semibold">What's Included</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>- Direct access to experienced law enforcement professionals</li>
            <li>- Personalized feedback on your materials</li>
            <li>- Interview preparation with real scenarios</li>
            <li>- Strategy for multiple agencies</li>
            <li>- Support through the entire process</li>
          </ul>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Questions?</h2>
          <p className="text-muted-foreground">
            Email: forgetheline@gmail.com
          </p>
        </div>
      </div>
    </div>
  )
}