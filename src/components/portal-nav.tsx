"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  LayoutDashboard,
  FileText,
  User,
  LogOut,
  FileCheck,
  Building2,
  Share2,
  MessageSquare,
  Settings,
  Wrench,
} from "lucide-react"
import { signOut } from "next-auth/react"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { href: "/app/home", label: "Home", icon: Home },
  { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/start-here", label: "Start Here", icon: FileText },
  { href: "/app/examples", label: "Examples", icon: FileCheck },
  { href: "/app/agencies", label: "Agencies", icon: Building2 },
  { href: "/app/forum", label: "Forum", icon: MessageSquare },
]

export function PortalNav() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <span className="text-lg font-semibold">Forge the Line</span>
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
             href="/app/client-profile"
             className={cn(
               "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
               pathname === "/app/client-profile"
                 ? "bg-secondary text-secondary-foreground"
                 : "text-muted-foreground hover:text-foreground hover:bg-secondary"
             )}
           >
             <User className="h-4 w-4" />
             Profile
           </Link>
           <Link
             href="/app/settings"
             className={cn(
               "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
               pathname === "/app/settings"
                 ? "bg-secondary text-secondary-foreground"
                 : "text-muted-foreground hover:text-foreground hover:bg-secondary"
             )}
           >
             <Settings className="h-4 w-4" />
             Settings
           </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  )
}