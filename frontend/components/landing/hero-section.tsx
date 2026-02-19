"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, ArrowRight, Heart, Droplets } from "lucide-react"
import Link from "next/link"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export function HeroSection() {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("")

  return (
    <section className="relative overflow-hidden  h-[calc(100vh-64px)] flex justify-center items-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4  sm:px-6 sm:py-28 ">
        <div className="mx-auto max-w-3xl text-center">
          {/* <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span>247 donors available now</span>
          </div> */}

          <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Find Blood. <span className="text-primary">Save Lives.</span>
            <br />
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-lg">
            Connect with verified blood donors in our university community. Solidarity through action. Every drop of blood donated is a step towards a more compassionate society.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <div className="relative flex-1 sm:max-w-md">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-2 shadow-lg shadow-primary/5">

                <Button className="flex-1 gap-2" asChild>
                  <Link href={`/directory${selectedBloodGroup ? `?bloodGroup=${selectedBloodGroup}` : ""}`}>
                    <Search className="h-4 w-4" />
                    Search Donors
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="outline" size="lg" className="gap-2 group bg-transparent" asChild>
              <Link href="/request">
                Request Blood
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="ghost" size="lg" className="gap-2" asChild>
              <Link href="/register">
                <Heart className="h-4 w-4" />
                Become a Donor
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
