export const metadata = {
  title: 'Free Guide: 10 Mistakes That Kill Your Police Application',
  description: 'Download the free guide to identify and avoid the top 10 mistakes that cause law enforcement applications to fail.',
}

export default function FreeGuidePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <div className="inline-block bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium mb-6">
          FREE DOWNLOAD
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          10 Mistakes That Kill Your Police Application
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          The free guide every law enforcement applicant needs before they apply.
        </p>
        
        <div className="bg-card border rounded-xl p-8 text-left mb-8">
          <h2 className="text-xl font-semibold mb-4">What&apos;s inside:</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-primary mr-3">1.</span>
              <span>Why background checks fail before you even apply</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">2.</span>
              <span>The #1 interview mistake candidates make</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">3.</span>
              <span>Social media posts that disqualify you</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">4.</span>
              <span>Credit issues that show up on your background</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">5.</span>
              <span>How to explain past drug use properly</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">6.</span>
              <span>Employment gaps that raise red flags</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">7.</span>
              <span>The polygraph trap and how to prepare</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">8.</span>
              <span>Why &quot;no comment&quot; kills your interview</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">9.</span>
              <span>Reference check red flags</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">10.</span>
              <span>The single biggest mistake of all</span>
            </li>
          </ul>
        </div>

        <form className="space-y-4" action="/api/subscribe" method="POST">
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="w-full px-6 py-4 text-lg rounded-xl border bg-background"
          />
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-4 px-8 rounded-xl text-lg font-bold hover:bg-primary/90"
          >
            Get Free Guide
          </button>
        </form>

        <p className="text-sm text-muted-foreground mt-4">
          Join 500+ applicants who&apos;ve downloaded this guide. No spam, ever.
        </p>
      </div>
    </div>
  )
}