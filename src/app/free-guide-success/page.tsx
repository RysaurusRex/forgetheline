import Link from "next/link"

export default function FreeGuideSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg text-center">
        <div className="text-6xl mb-6">✅</div>
        
        <h1 className="text-3xl font-bold mb-4">
          Check Your Email!
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          I just sent the &quot;10 Mistakes That Kill Your Police Application&quot; guide to your inbox.
        </p>

        <div className="bg-muted rounded-xl p-6 mb-8">
          <p className="font-medium mb-2">Didn&apos;t receive it?</p>
          <p className="text-sm text-muted-foreground">
            Check your spam folder, or email me at forgetheline@gmail.com
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full py-3 px-6 rounded-xl border hover:bg-muted"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}