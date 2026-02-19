"use client"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { StatsSection } from "@/components/landing/stats-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { CTASection } from "@/components/landing/cta-section"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function HomePage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isloggedin") === "true"

    if (!isLoggedIn) {
      router.replace("/login")
    } else {
      setCheckingAuth(false)
    }
  }, [router])

  if (checkingAuth) return null
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
