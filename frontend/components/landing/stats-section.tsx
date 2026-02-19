'use client'
import supabase from "@/lib/supabaseClient"
import { Users, Heart, Activity, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import API from '../../backend/api.jsx'



export function StatsSection() {
  // const [stat, setStat] = useState({
  //   total: 0,
  //   willing: 0,
  // })

  // useEffect(() => {
  //   const fetchStats = async () => {
  //     const [{ count: total }, { count: willing }] = await Promise.all([
  //       supabase
  //         .from("donors")
  //         .select("*", { count: "exact", head: true })
  //         .eq("status", "approved"),

  //       supabase
  //         .from("donors")
  //         .select("*", { count: "exact", head: true })
  //         .eq("status", "approved")
  //         .eq("is_willing_to_donate", true),
  //     ])

  //     setStat({
  //       total: total ?? 0,
  //       willing: willing ?? 0,
  //     })
  //   }

  //   fetchStats()
  // }, [])


  const [stat, setStat] = useState({
      totalDonors: 0,
      pendingRequest: 0,
      availableDonors : 0,
      totalDonations:0,
    })
  
  
    useEffect(() => {
      const fetchStats = async () => {
        try {
          const response = await API.getStatsAdmin()
          
          setStat({
            totalDonors: response.data.totalDonors ?? 0,
            pendingRequest: response.data.pendingRequest ?? 0,
            availableDonors: response.data.availableDonors ?? 0,
            totalDonations: response.data.totalDonations ?? 0,
          })
        } catch (error) {
          console.error('Error fetching stats:', error)
        }
      }
  
      fetchStats()
    }, [])

  let stats = [
    {
      label: "Registered Donors",
      value: stat.totalDonors.toString(),
      icon: Users,
      description: "Active community members",
    },
    {
      label: "Available Now",
      value: stat.availableDonors.toString(),
      icon: Activity,
      description: "Ready to donate",
    },
    {
      label: "Total Donations",
      value: stat.totalDonations.toString(),
      icon: Heart,
      description: "Through our platform",
    },

  ]

  

  return (
    <section className="border-y border-border/40 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="mt-4 text-3xl font-bold tracking-tight text-foreground">{stat.value}</div>
              <div className="mt-1 text-sm font-medium text-foreground">{stat.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
