import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { RequestForm } from "@/components/request/request-form"
import { Phone, Clock, Users } from "lucide-react"

export default function RequestPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Request Blood</h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Need blood urgently? Submit a request and we&apos;ll connect you with available donors.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6 max-w-3xl mx-auto">
            {[
              { icon: Clock, title: "< 2hr Response", desc: "Average connection time" },
              { icon: Users, title: "247 Available", desc: "Donors ready to help" },
              { icon: Phone, title: "Direct Contact", desc: "Connect with donors" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 rounded-xl bg-card border border-border/60 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 mx-auto max-w-2xl">
            <RequestForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
