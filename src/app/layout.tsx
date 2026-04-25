import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAnalytics } from "@/components/google-analytics"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Forge the Line - Law Enforcement Hiring Prep",
    template: "%s | Forge the Line",
  },
  description: "Private client portal for law enforcement hiring preparation. Tools for resume, interview, background check, and strategy to help you get hired.",
  keywords: ["law enforcement", "police", "hiring", "resume", "interview prep", "federal", "FBI", "DEA", "career"],
  authors: [{ name: "Forge the Line" }],
  creator: "Forge the Line",
  publisher: "Forge the Line",
  openGraph: {
    title: "Forge the Line - Law Enforcement Hiring Prep",
    description: "Prepare for law enforcement careers with tools for resume, interview, background check, and strategy.",
    url: "https://forgetheline.com",
    siteName: "Forge the Line",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <GoogleAnalytics />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}