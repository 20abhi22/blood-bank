"use client"

import { useState, useMemo, Suspense, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { DonorCard } from "@/components/directory/donor-card"
import { DonorFilters } from "@/components/directory/donor-filters"
import { Users } from "lucide-react"
import API from '../../backend/api.jsx'
import supabase from "@/lib/supabaseClient"

// const mockDonors = [
//   {
//     id: "1",
//     name: "Priya Sharma",
//     bloodGroup: "O+",
//     department: "Computer Science",
//     lastDonation: "2024-09-15",
//     isAvailable: true,
//     isVerified: true,
//     phone: "+91 98765 43210",
//     email: "priya.s@college.edu",
//   },
//   {
//     id: "2",
//     name: "Rahul Verma",
//     bloodGroup: "A+",
//     department: "Electronics",
//     lastDonation: "2024-08-20",
//     isAvailable: true,
//     isVerified: true,
//     phone: "+91 98765 43211",
//     email: "rahul.v@college.edu",
//   },
//   {
//     id: "3",
//     name: "Ananya Patel",
//     bloodGroup: "B+",
//     department: "Biotechnology",
//     lastDonation: null,
//     isAvailable: true,
//     isVerified: false,
//     phone: "+91 98765 43212",
//     email: "ananya.p@college.edu",
//   },
//   {
//     id: "4",
//     name: "Vikram Singh",
//     bloodGroup: "AB-",
//     department: "Mechanical",
//     lastDonation: "2024-07-10",
//     isAvailable: false,
//     isVerified: true,
//     phone: "+91 98765 43213",
//     email: "vikram.s@college.edu",
//   },
//   {
//     id: "5",
//     name: "Neha Gupta",
//     bloodGroup: "O-",
//     department: "Civil",
//     lastDonation: "2024-10-01",
//     isAvailable: true,
//     isVerified: true,
//     phone: "+91 98765 43214",
//     email: "neha.g@college.edu",
//   },
//   {
//     id: "6",
//     name: "Arjun Kumar",
//     bloodGroup: "A-",
//     department: "Computer Science",
//     lastDonation: "2024-06-25",
//     isAvailable: true,
//     isVerified: true,
//     phone: "+91 98765 43215",
//     email: "arjun.k@college.edu",
//   },
//   {
//     id: "7",
//     name: "Kavya Reddy",
//     bloodGroup: "B-",
//     department: "Electronics",
//     lastDonation: null,
//     isAvailable: false,
//     isVerified: false,
//     phone: "+91 98765 43216",
//     email: "kavya.r@college.edu",
//   },
//   {
//     id: "8",
//     name: "Aditya Joshi",
//     bloodGroup: "AB+",
//     department: "Biotechnology",
//     lastDonation: "2024-11-05",
//     isAvailable: true,
//     isVerified: true,
//     phone: "+91 98765 43217",
//     email: "aditya.j@college.edu",
//   },
// ]

function DirectoryContent() {
  const searchParams = useSearchParams()
  const initialBloodGroup = searchParams.get("bloodGroup") || "All"

  // const [searchQuery, setSearchQuery] = useState("")
  // const [bloodGroupFilter, setBloodGroupFilter] = useState(initialBloodGroup)
  // const [availabilityFilter, setAvailabilityFilter] = useState("All")
  // const [donors, setDonors] = useState<any>([])
  // const [loading, setLoading] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")
  const [bloodGroupFilter, setBloodGroupFilter] = useState(initialBloodGroup)
  const [availabilityFilter, setAvailabilityFilter] = useState("All")
  const [donors, setDonors] = useState<any>([])
  const [loading, setLoading] = useState(false)

  // const filteredDonors = useMemo(() => {
  //   return donors.filter((donor : any) => {
  //     const matchesSearch = (donor['full_name']).toLowerCase().includes(searchQuery.toLowerCase())
  //     const matchesBloodGroup = bloodGroupFilter === "All" || donor['blood_group'] === bloodGroupFilter
  //     const matchesAvailability =
  //       availabilityFilter === "All" ||
  //       (availabilityFilter === "Available" && donor['is_available']) ||
  //       (availabilityFilter === "Unavailable" && !donor['is_available'])

  //     return matchesSearch && matchesBloodGroup && matchesAvailability
  //   })
  // }, [ donors,searchQuery, bloodGroupFilter, availabilityFilter])


//   const filteredDonors = useMemo(() => {
//   return donors.filter((donor: any) => {
//     const matchesSearch =
//       donor.name?.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesBloodGroup =
//       bloodGroupFilter === "All" ||
//       donor.blood_group === bloodGroupFilter;

//     const matchesAvailability =
//       availabilityFilter === "All" ||
//       (availabilityFilter === "Available" && donor.available === "Y") ||
//       (availabilityFilter === "Unavailable" && donor.is_available === "N");

//     return matchesSearch && matchesBloodGroup && matchesAvailability;
//   });
// }, [donors, searchQuery, bloodGroupFilter, availabilityFilter]);


  useEffect(() => {
      fetchDonorList()
  },[])

  // async function fetchDonorList() {
  //     setLoading(true)
  //     const { data, error } = await supabase
  //       .from("donors")
  //       .select("*")

  //     if (error) {
  //       console.error(error)
  //       return
  //     }

  //     console.log(data)

  //     setDonors(data ?? [])
  //     setLoading(false)

  //   }



  async function fetchDonorList() {
  try {
    setLoading(true);

    const res = await API.getDonors(); // calls /getdonor

    console.log("Donors:", res.data);

    setDonors(res.data.data || []);

  } catch (err) {
    console.error("Fetch donors error:", err);
  } finally {
    setLoading(false);
  }
}

  // const clearFilters = () => {
  //   setSearchQuery("")
  //   setBloodGroupFilter("All")
  //   setAvailabilityFilter("All")
  // }

  // const availableCount = filteredDonors.filter((d : any) => d['is_available']).length
  // const availableCount = filteredDonors.filter((d: any) => d.available === "Y").length;
    // Client-side filtering with useMemo for performance
  const filteredDonors = useMemo(() => {
    return donors.filter((donor: any) => {
      const matchesSearch =
        donor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donor.email?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesBloodGroup =
        bloodGroupFilter === "All" ||
        donor.blood_group === bloodGroupFilter

      const matchesAvailability =
        availabilityFilter === "All" ||
        (availabilityFilter === "Available" && donor.is_available === "Y") ||
        (availabilityFilter === "Unavailable" && donor.is_available === "N")

      return matchesSearch && matchesBloodGroup && matchesAvailability
    })
  }, [donors, searchQuery, bloodGroupFilter, availabilityFilter])

  const availableCount = useMemo(() => 
    filteredDonors.filter((d: any) => d.is_available === "Y").length,
    [filteredDonors]
  )

    function clearFilters() {
    setSearchQuery("")
    setBloodGroupFilter("All")
    setAvailabilityFilter("All")
  }



  if (loading) return (
    <>
      <div className="flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    </>
  )

  return (
    <>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Donor Directory</h1>
        <p className="mt-3 text-lg text-muted-foreground">Browse verified blood donors in our college community.</p>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2 rounded-full bg-card border border-border/60 px-4 py-2">
          <Users className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{filteredDonors.length} donors found</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-sm font-medium text-foreground">{availableCount} available now</span>
        </div>
      </div>

      <div className="mt-8">
        <DonorFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          bloodGroupFilter={bloodGroupFilter}
          setBloodGroupFilter={setBloodGroupFilter}
          availabilityFilter={availabilityFilter}
          setAvailabilityFilter={setAvailabilityFilter}
          onClearFilters={clearFilters}
        />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDonors.map((donor : any) => (
          <DonorCard key={donor.id} donor={donor} />
        ))}
      </div>

      {filteredDonors.length === 0 && (
        <div className="mt-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">No donors found</h3>
          <p className="mt-2 text-muted-foreground">Try adjusting your filters or search query.</p>
        </div>
      )}
    </>
  )
}

export default function DirectoryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
            <DirectoryContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
