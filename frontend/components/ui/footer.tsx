'use client'
import Link from "next/link"
import { Heart } from "lucide-react"
import supabase from "@/lib/supabaseClient"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function Footer() {

  const router = useRouter()
  const handleRegisterClick = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push("/login")
      return
    }

    const { data: donor, error } = await supabase
      .from("donors")
      .select("id")
      .eq("auth_user_id", user.id)
      .maybeSingle()

    if (error) {
      console.error(error)
      return
    }

    if (donor) {
      toast.error('Already Registed as Donor')
    } else {
      router.push("/register")
    }
  }
  return (
    <footer className="border-t border-border/40 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">Cusat Blood Bank</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A mission-critical platform connecting blood donors with those in need. Every donation saves lives.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/directory"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Find Donors
                </Link>
              </li>
              <li>
                <Link href="/request" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Request Blood
                </Link>
              </li>
              <li>
                <p
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                  onClick={handleRegisterClick}
                >
                  Become a Donor
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Information</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Admin Portal
                </Link>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Emergency: 108</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Cusat Blood Bank. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">
            Medical Disclaimer: This platform facilitates connections only. Always consult healthcare professionals.
          </p>
        </div>
      </div>
    </footer>
  )
}
