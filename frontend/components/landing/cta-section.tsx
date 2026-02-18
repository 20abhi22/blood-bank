import { Button } from "@/components/ui/button"
import supabase from "@/lib/supabaseClient"
import { ArrowRight, Heart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Toaster, toast } from 'sonner'

export function CTASection() {
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
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 sm:px-12 sm:py-20">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-primary-foreground/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <Heart className="mx-auto h-12 w-12 text-primary-foreground/80" />
            <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Your Blood Can Save a Life Today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
              Join our community of heroes. Register as a donor and be ready when someone needs you most.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="gap-2 group" asChild onClick={handleRegisterClick}>
                  <div>
                  Register as Donor
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
