"use client"

import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAnalytics } from "@/components/google-analytics"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function ClientLayout({
  children,
  fontVariable,
}: {
  children: React.ReactNode
  fontVariable: string
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fontVariable} h-full antialiased`}>
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
            <SpeedInsights />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}