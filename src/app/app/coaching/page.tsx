import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

export default function CoachingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">1-on-1 Coaching</h1>
        <p className="text-xl text-muted-foreground">
          Work directly with law enforcement veterans to accelerate your preparation
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
        {/* Session */}
        <Card>
          <CardHeader>
            <CardTitle>1:1 Coaching</CardTitle>
            <CardDescription>Use for anything: resume, stories, mock interview, strategy, background prep, etc.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold mb-4">$225</p>
            <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
              <li>• 60 minute session</li>
              <li>• Personalized to your needs</li>
              <li>• Any topic you choose</li>
              <li>• Follow-up notes included</li>
            </ul>
            <a href="https://cal.com/forge-the-line" target="_blank" rel="noopener noreferrer">
              <Button className="w-full text-lg py-6">
                Book Session <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </CardContent>
        </Card>

        {/* Starter */}
        <Card>
          <CardHeader>
            <CardTitle>Starter: Get Unstuck</CardTitle>
            <CardDescription>One strategy session + a personalized next-steps plan</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold mb-4">$299</p>
            <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
              <li>• 60 minute strategy session</li>
              <li>• Personalized next-steps plan</li>
              <li>• Where to focus your efforts</li>
              <li>• Roadmap for success</li>
            </ul>
            <a href="https://cal.com/forge-the-line" target="_blank" rel="noopener noreferrer">
              <Button className="w-full text-lg py-6">
                Book Starter <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </CardContent>
        </Card>

        {/* Interview Ready */}
        <Card>
          <CardHeader>
            <CardTitle>Interview Ready</CardTitle>
            <CardDescription>Mock interview + follow-up + written scorecard and fix list</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold mb-4">$399</p>
            <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
              <li>• 60-minute mock interview</li>
              <li>• 30-minute follow-up (same day or scheduled)</li>
              <li>• Written scorecard</li>
              <li>• Prioritized fix list</li>
            </ul>
            <a href="https://cal.com/forge-the-line" target="_blank" rel="noopener noreferrer">
              <Button className="w-full text-lg py-6">
                Book Interview Ready <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </CardContent>
        </Card>

        {/* Full Send */}
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="text-primary">Forge the Line — Full Send Package</CardTitle>
            <CardDescription>Resume + strategy + two mock interviews + 14 days async support</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold mb-4">$999</p>
            <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
              <li>• Resume + strategy support</li>
              <li>• 2 mock interviews</li>
              <li>• 14 days async support (60 min/day)</li>
              <li>• Comprehensive prep package</li>
            </ul>
            <a href="https://cal.com/forge-the-line" target="_blank" rel="noopener noreferrer">
              <Button className="w-full text-lg py-6" variant="default">
                Book Full Send <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 max-w-3xl mx-auto">
        <div className="rounded-lg border bg-muted p-6">
          <h2 className="mb-4 text-xl font-semibold">What's Included</h2>
          <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <li>• Direct access to experienced law enforcement professionals</li>
            <li>• Personalized feedback on your materials</li>
            <li>• Interview preparation with real scenarios</li>
            <li>• Strategy for multiple agencies</li>
            <li>• Support through the entire process</li>
            <li>• Follow-up notes and action items</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Questions? Email{" "}
          <a href="mailto:forgetheline@gmail.com" className="text-primary hover:underline">
            forgetheline@gmail.com
          </a>
        </p>
      </div>
    </div>
  )
}