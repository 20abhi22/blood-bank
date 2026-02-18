"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X } from "lucide-react"
import supabase from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    const loggedIn = localStorage.getItem("isloggedin") === "true"
    setIsLoggedIn(loggedIn)
  }, [])

  if (isLoggedIn === null) return null

  const handleLogout = () => {
    localStorage.removeItem("isloggedin")
    localStorage.removeItem("user_id")
    localStorage.removeItem("user_name")
    localStorage.removeItem("user_email")
    localStorage.removeItem("user_phone")

    setIsLoggedIn(false)
    router.replace("/login")
  }


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          {/* <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
          </div> */}
          <span className="text-xl font-bold tracking-tight text-foreground">SFI CUSAT</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/directory"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Find Donors
          </Link>
          <Link
            href="/request"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Request Blood
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
        </nav>

        {window.localStorage.getItem("isloggedin") !== "true" && <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>}
        {window.localStorage.getItem("isloggedin") === "true" && <div className="hidden items-center gap-3 md:flex">
          <Button asChild onClick={handleLogout}>
            <p>Logout</p>
          </Button>
        </div>}

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <nav className="flex flex-col gap-1 p-4">
            <Link
              href="/directory"
              className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Find Donors
            </Link>
            <Link
              href="/request"
              className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Request Blood
            </Link>
            <Link
              href="/about"
              className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            {window.localStorage.getItem("isloggedin") !== "true" && <Link
              href="/login"
              className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>}
            <div className="mt-2 pt-2 border-t border-border/40">
              {!isLoggedIn ? (
                <Button className="w-full" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              ) : (
                <Button className="w-full" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
