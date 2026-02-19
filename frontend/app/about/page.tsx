'use client'
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Toaster, toast } from 'sonner'
import {
  Heart,
  Shield,
  Users,
  Clock,
  GraduationCap,
  Award,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import supabase from "@/lib/supabaseClient"

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "Every drop of blood represents hope. We connect donors with recipients with care and urgency.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Verified donors, secure data handling, and medical-grade protocols ensure safe connections.",
  },
  {
    icon: Clock,
    title: "Speed",
    description:
      "In emergencies, every second counts. Our platform is designed for rapid response and instant connections.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a network of lifesavers within our college ecosystem, strengthening bonds that save lives.",
  },
]

const team = [
  { name: "Dr. Rajesh Kumar", role: "Medical Advisor", affiliation: "College Health Center" },
  { name: "Prof. Anita Singh", role: "Faculty Coordinator", affiliation: "Department of Biotechnology" },
  { name: "Arjun Mehta", role: "Student Lead", affiliation: "Computer Science, Final Year" },
  { name: "Priya Sharma", role: "Outreach Coordinator", affiliation: "Electronics, Third Year" },
]

export default function AboutPage() {
  const router = useRouter()


  // const [stat, setStat] = useState({
  //     total: 0,
  //     willing: 0,
  //   })


  const [stat, setStat] = useState({
    registered_donors: 0,
    lives_saved: 0,
    avg_response_hours: 0,
    fulfillment_rate: 0,
  })

  //   useEffect(() => {
  //     const fetchStats = async () => {
  //       const [{ count: total }, { count: willing }] = await Promise.all([
  //         supabase
  //           .from("donors")
  //           .select("*", { count: "exact", head: true })
  //           .eq("status", "approved"),

  //         supabase
  //           .from("donors")
  //           .select("*", { count: "exact", head: true })
  //           .eq("status", "approved")
  //           .eq("is_willing_to_donate", true),
  //       ])

  //       setStat({
  //         total: total ?? 0,
  //         willing: willing ?? 0,
  //       })
  //     }

  //     fetchStats()
  //   }, [])


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/stats");

        if (!res.ok) throw new Error("Server not responding");

        const data = await res.json();

        setStat({
          registered_donors: Number(data.registered_donors),
          lives_saved: Number(data.lives_saved),
          avg_response_hours: Number(data.avg_response_hours),
          fulfillment_rate: Number(data.fulfillment_rate),
        });
      } catch (err) {
        console.error("Stats fetch error:", err);
        // fall back values
        setStat({
          registered_donors: 0,
          lives_saved: 0,
          avg_response_hours: 2,
          fulfillment_rate: 0,
        });
      }
    };

    fetchStats();
  }, []);


  // const handleRegisterClick = async () => {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser()

  //   if (!user) {
  //     router.push("/login")
  //     return
  //   }

  //   const { data: donor, error } = await supabase
  //     .from("donors")
  //     .select("id")
  //     .eq("auth_user_id", user.id)
  //     .maybeSingle()

  //   if (error) {
  //     console.error(error)
  //     return
  //   }

  //   if (donor) {
  //     toast.error('Already Registed as Donor')
  //   } else {
  //     router.push("/register")
  //   }
  // }




  const handleRegisterClick = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/donors/check", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.isDonor) {
      toast.error("Already Registered as Donor");
    } else {
      router.push("/register");
    }

  } catch (err) {
    console.error(err);
    toast.error("Server error");
  }
};

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 text-sm font-medium text-muted-foreground">
                <GraduationCap className="h-4 w-4 text-primary" />
                <span>A College Initiative</span>
              </div>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Saving Lives, One Drop at a Time
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Cusat Blood Bank is a student-driven initiative to create a reliable blood donor network within our college
                community. We believe that the gift of blood is the gift of life, and every member of our community has
                the power to be a hero.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="border-y border-border/40 bg-card py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Our Mission</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  To build a trusted, efficient, and accessible blood donation platform that connects donors with those
                  in need within our college community and beyond.
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    "Bridge the gap between blood donors and recipients",
                    "Ensure rapid response during medical emergencies",
                    "Promote blood donation awareness on campus",
                    "Maintain a verified, reliable donor database",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { value: stat.total.toString(), label: "Registered Donors" },
                  { value: "0", label: "Lives Saved" },
                  { value: "< 2hr", label: "Avg. Response Time" },
                  { value: "98%", label: "Fulfillment Rate" },
                ].map((stat) => (
                  <Card key={stat.label} className="border-border/60">
                    <CardContent className="p-6 text-center">
                      <p className="text-3xl font-bold text-primary">{stat.value}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div> */}

              {/* {Replaced by} */}

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { value: stat.registered_donors.toString(), label: "Registered Donors" },
                  { value: stat.lives_saved.toString(), label: "Lives Saved" },
                  {
                    value: stat.avg_response_hours
                      ? `< ${stat.avg_response_hours} hr`
                      : "< 2hr",
                    label: "Avg. Response Time"
                  },
                  {
                    value: stat.fulfillment_rate
                      ? `${stat.fulfillment_rate}%`
                      : "0%",
                    label: "Fulfillment Rate"
                  },
                ].map((item) => (
                  <Card key={item.label} className="border-border/60">
                    <CardContent className="p-6 text-center">
                      <p className="text-3xl font-bold text-primary">
                        {item.value}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.label}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>




            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Our Values</h2>
              <p className="mt-4 text-lg text-muted-foreground">The principles that guide our mission to save lives.</p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <Card
                  key={value.title}
                  className="border-border/60 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
                >
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* College Affiliation */}
        <section className="border-y border-border/40 bg-card py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Award className="mx-auto h-12 w-12 text-primary" />
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">College Affiliation</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Cusat Blood Bank is officially supported by our college administration and operates under the guidance of the
                College Health Center. Our platform is endorsed by the Student Affairs Office and complies with all
                institutional health and safety guidelines.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                {["Health Center", "Student Affairs", "NSS Unit", "Red Cross Club"].map((org) => (
                  <span
                    key={org}
                    className="rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm font-medium text-foreground"
                  >
                    {org}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Our Team</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Dedicated individuals working together to save lives.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <Card key={member.name} className="border-border/60">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mt-4 font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-primary">{member.role}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{member.affiliation}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Medical Disclaimer */}
        <section className="border-y border-border/40 bg-muted/30 py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 p-6">
              <AlertTriangle className="h-6 w-6 flex-shrink-0 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground">Medical Disclaimer</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Cusat Blood Bank is a platform that facilitates connections between blood donors and recipients. We do not
                  provide medical advice, diagnosis, or treatment. All blood donations should be conducted through
                  licensed medical facilities following proper health protocols. Always consult with healthcare
                  professionals before donating or receiving blood. In case of medical emergencies, please contact
                  emergency services (108) immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Heart className="mx-auto h-12 w-12 text-primary" />
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">Join Our Mission</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Be part of the change. Register as a donor today and help save lives in your community.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="gap-2 group" asChild onClick={handleRegisterClick}>
                  <div>
                    Become a Donor
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent" asChild>
                  <Link href="/directory">Browse Donors</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
