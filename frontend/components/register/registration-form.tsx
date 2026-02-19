"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import supabase from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import {
  User,
  Mail,
  Phone,
  Droplets,
  GraduationCap,
  Shield,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Heart,
  Cake,
  MapPin,
  Weight,
} from "lucide-react"
import API from '../../backend/api.jsx'
import { toast } from "sonner"




const steps = [
  { id: 1, name: "Personal Info", icon: User },
  { id: 2, name: "Medical Info", icon: Droplets },
  { id: 3, name: "Verification", icon: Shield },
]

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    collegeId: "",
    collegeNameId: "",
    departmentId: "",
    bloodGroupId: "",
    yearId: "",
    dateOfBirth: "",
    lastDonation: "",
    gender: "",
    state: "",
    address: "",
    weight: "",
    medicalnotes: "",
    medicalConditions: false,
    agreeTerms: false,
    agreeContact: false,
  })


  type MasterState = {
    bloodgroup: any[]
    department: any[]
    college: any[]
    year: any[]
  }


  useEffect(() => {
    fetchAllMasters()
  }, [])

  const [masters, setMasters] = useState<MasterState>({
    bloodgroup: [],
    department: [],
    college: [],
    year: [],
  })


  async function fetchAllMasters() {
    try {
      const [bloodgroup, department, college, year] = await Promise.all([
        API.masterslist("bloodgroup"),
        API.masterslist("department"),
        API.masterslist("college"),
        API.masterslist("year"),
      ])

      setMasters({
        bloodgroup: bloodgroup.data.data,
        department: department.data.data,
        college: college.data.data,
        year: year.data.data,
      })

      console.log(masters)
    } catch (err) {
      console.error(err)
      toast.error("Failed to load master data")
    }
  }


  useEffect(() => {
    const username = window.localStorage.getItem("user_name")
    const email = window.localStorage.getItem("user_email")
    const phone = window.localStorage.getItem("user_phone")

    setFormData((prev) => ({
      ...prev,
      fullName: username || "",
      email: email || "",
      phone: phone ||"",
    }))

  }, [])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        gender: formData.gender,
        dob: formData.dateOfBirth,
        college_student_id: formData.collegeId,
        department_id: Number(formData.departmentId),
        college_id: Number(formData.collegeNameId),
        year_id: Number(formData.yearId),
        state: formData.state,
        address: formData.address,
        blood_group_id: Number(formData.bloodGroupId),
        weight: formData.weight,
        last_donated_date: formData.lastDonation || null,
        health_decleration: formData.medicalConditions && formData.agreeTerms && formData.agreeContact ? "Y" : "N",
        available: 'Y',
        status: 'P',
        phone: formData.phone.trim(),
      };

      console.log("Submitting payload:", payload);

      const response = await API.savedonor(payload);

      console.log("API Response:", response);

      if (response.data.status === "success") {
        toast.success("Registration successful! Awaiting admin approval.");
        setIsSubmitted(true);
      } else {
        toast.error(response.data.message || "Registration failed");
      }

    } catch (err: any) {
      console.error("Registration error:", err);
      toast.error(err.response?.data?.message || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  }



  if (isSubmitted) {
    return (
      <Card className="mx-auto max-w-lg border-border/60 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
            <CheckCircle2 className="h-8 w-8 text-accent" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-foreground">Registration Successful!</h2>
          <p className="mt-3 text-muted-foreground">
            Thank you for registering as a donor.
          </p>
          <div className="mt-6 rounded-xl bg-secondary/50 p-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Next Steps:</span>
              <br />
              1. Admin will verify your registration
              <br />
              2. You&apos;ll be listed as an active donor
            </p>
          </div>
          <Button className="mt-6 gap-2" asChild>
            <a href="/">
              <Heart className="h-4 w-4" />
              Return Home
            </a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                currentStep === step.id
                  ? "bg-primary text-primary-foreground"
                  : currentStep > step.id
                    ? "bg-accent/20 text-accent"
                    : "bg-secondary text-muted-foreground"
              }`}
            >
              <step.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{step.name}</span>
              <span className="sm:hidden">{step.id}</span>
            </div>
            {index < steps.length - 1 && <div className="mx-2 h-px w-8 bg-border sm:w-12" />}
          </div>
        ))}
      </div>

      <Card className="border-border/60 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {currentStep === 1 && "Personal Information"}
            {currentStep === 2 && "Medical Information"}
            {currentStep === 3 && "Verification & Consent"}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Let's start with your basic details"}
            {currentStep === 2 && "Help us understand your donation eligibility"}
            {currentStep === 3 && "Almost there! Please review and confirm"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="fullName"
                        className="pl-10"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        required
                      />
                    </div>
                  </div>


                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange("gender", value)}
                    >
                      <SelectTrigger id="gender" className="w-full">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="prefer not to say">Prefer Not to Say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Date Of Birth</Label>
                    <div className="relative">
                      <Cake className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="date"
                        className="pl-10"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="collegeId">College ID</Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="collegeId"
                        className="pl-10"
                        value={formData.collegeId}
                        onChange={(e) => handleInputChange("collegeId", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={formData.departmentId}
                      onValueChange={(value) => handleInputChange("departmentId", value)}
                    >
                      <SelectTrigger id="department" className="w-full">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        {masters.department.map((dep) => (
                          <SelectItem key={dep.id} value={String(dep.id)}>
                            {dep.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">College</Label>
                    <Select
                      value={formData.collegeNameId}
                      onValueChange={(value) => handleInputChange("collegeNameId", value)}
                    >
                      <SelectTrigger id="college" className="w-full">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        {masters.college.map((col) => (
                          <SelectItem key={col.id} value={String(col.id)}>
                            {col.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearofstudy">Year of Study</Label>
                    <Select
                      value={formData.yearId}
                      onValueChange={(value) => handleInputChange("yearId", value)}
                    >
                      <SelectTrigger id="yearofstudy" className="w-full">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        {masters.year.map((y) => (
                          <SelectItem key={y.id} value={String(y.id)}>
                            {y.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="state"
                        type="text"
                        className="pl-10"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="address"
                        type="text"
                        className="pl-10"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select value={formData.bloodGroupId} onValueChange={(value) => handleInputChange("bloodGroupId", value)}>
                      <SelectTrigger id="bloodGroup" className="w-full">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        {masters.bloodgroup.map((bg) => (
                          <SelectItem key={bg.id} value={String(bg.id)}>
                            {bg.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    <div className="relative">
                      <Weight className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="weight"
                        type="text"
                        className="pl-10"
                        value={formData.weight}
                        onChange={(e) => handleInputChange("weight", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>


                <div className="space-y-2">
                  <Label htmlFor="lastDonation">Last Donation Date (if any)</Label>
                  <Input
                    id="lastDonation"
                    type="date"
                    value={formData.lastDonation}
                    onChange={(e) => handleInputChange("lastDonation", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty if you&apos;ve never donated before. Minimum gap between donations is 3 months.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-secondary/30 p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="medicalConditions"
                      checked={!formData.medicalConditions}
                      onCheckedChange={(checked) => handleInputChange("medicalConditions", !checked)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="medicalConditions" className="text-sm font-medium leading-none cursor-pointer">
                        Health Declaration
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        I confirm that I don&apos;t have any medical conditions that prevent me from donating blood
                        (HIV, Hepatitis, heart disease, etc.)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-muted/50 p-4">
                  <h4 className="text-sm font-medium text-foreground">Eligibility Criteria</h4>
                  <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <li>• Age: 18-65 years</li>
                    <li>• Weight: Above 50 kg</li>
                    <li>• Hemoglobin: Above 12.5 g/dL</li>
                    <li>• No recent tattoos or piercings (within 6 months)</li>
                  </ul>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-secondary/30 p-4">
                  <h4 className="text-sm font-semibold text-foreground">Registration Summary</h4>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Name</dt>
                      <dd className="font-medium text-foreground">{formData.fullName || "—"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Email</dt>
                      <dd className="font-medium text-foreground">{formData.email || "—"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Blood Group</dt>
                      <dd className="font-medium text-primary">{masters.bloodgroup.find((bg) => String(bg.id) === formData.bloodGroupId)?.name || "—"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">College ID</dt>
                      <dd className="font-medium text-foreground">{formData.collegeId || "—"}</dd>
                    </div>
                  </dl>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeTerms", !!checked)}
                    />
                    <Label htmlFor="agreeTerms" className="text-sm text-muted-foreground cursor-pointer">
                      I agree to the Terms of Service and Privacy Policy. I understand my information will be used to
                      facilitate blood donation connections.
                    </Label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="agreeContact"
                      checked={formData.agreeContact}
                      onCheckedChange={(checked) => handleInputChange("agreeContact", !!checked)}
                    />
                    <Label htmlFor="agreeContact" className="text-sm text-muted-foreground cursor-pointer">
                      I consent to being contacted by verified requesters when my blood type is needed for emergencies.
                    </Label>
                  </div>
                </div>

                <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Privacy Note:</span> Your contact details will only be
                    shared with your consent for each request. You can update your availability status anytime.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              {currentStep < 3 ? (
                <Button type="button" onClick={() => setCurrentStep((prev) => prev + 1)} className="gap-2">
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" className="gap-2" disabled={!formData.agreeTerms || !formData.agreeContact}>
                  <Shield className="h-4 w-4" />
                  Complete Registration
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}