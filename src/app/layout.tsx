import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ClientLayout from "./client-layout"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Forge the Line - Law Enforcement Hiring Prep",
    template: "%s | Forge the Line",
  },
  description: "Private client portal for law enforcement hiring preparation.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClientLayout fontVariable={inter.variable}>
      {children}
    </ClientLayout>
  )
}