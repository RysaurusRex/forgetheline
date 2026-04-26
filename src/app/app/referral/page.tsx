"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Share2, Gift, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

const REFERRAL_PERKS = [
  "Get $50 credit for each successful referral",
  "Your referrals get 10% off their purchase",
  "Track all referrals in your dashboard",
  "No limit on referrals",
]

export default function ReferralPage() {
  const referralLink = "https://forgetheline.com/pricing?ref=demo"

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold">Referral Program</h1>
      <p className="mb-8 text-muted-foreground">
        Share Forge the Line with others and earn credits
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              How It Works
            </CardTitle>
            <CardDescription>Earn credits by referring friends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                  1
                </span>
                <span>Share your referral link below</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                  2
                </span>
                <span>Your friend signs up and makes a purchase</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                  3
                </span>
                <span>You get $50 credit, they get 10% off</span>
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Your Referral Link
            </CardTitle>
            <CardDescription>Copy and share this link</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
              />
              <Button
                onClick={() => navigator.clipboard.writeText(referralLink)}
              >
                Copy
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Or share on social media with your unique code: <span className="font-mono font-bold">DEMO</span>
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Referral Perks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2 md:grid-cols-2">
              {REFERRAL_PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  {perk}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Link href="/app/dashboard">
          <Button variant="outline">
            View Your Referrals in Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}