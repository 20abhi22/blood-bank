import { Shield, Zap, Users, Lock } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Verified Donors",
    description: "All donors are verified through college ID and health screening protocols.",
  },
  {
    icon: Zap,
    title: "Instant Matching",
    description: "Find compatible donors in seconds with our smart blood group matching.",
  },
  {
    icon: Users,
    title: "College Community",
    description: "Connect with donors right on your campus. Help your peers when they need it most.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Contact information is revealed only with donor consent. Your data stays protected.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built for Trust & Speed
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A platform designed with medical-grade precision for life-saving moments.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
