"use client"

import type React from "react"
import API from '../../backend/api.jsx'
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, User, Phone, Droplets, MapPin, Clock, CheckCircle2, Send, Heart } from "lucide-react"

//const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
const bloodGroups = [
  { id: 1, name: "O+" },
  { id: 2, name: "A+" },
  { id: 3, name: "A-" },
  { id: 4, name: "B+" },
  { id: 5, name: "B-" },
  { id: 6, name: "AB+" },
  { id: 7, name: "AB-" },
  { id: 8, name: "O-" },
];
const urgencyLevels = [
  { value: "critical", label: "Critical - Needed within hours", color: "text-red-600" },
  { value: "urgent", label: "Urgent - Needed within 24 hours", color: "text-orange-600" },
  { value: "planned", label: "Planned - Scheduled procedure", color: "text-blue-600" },
]

export function RequestForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false) // added
  const [formData, setFormData] = useState({
    patientName: "",
    contactName: "",
    phone: "",
    bloodGroup: "",
    units: "1",
    urgency: "",
    hospital: "",
    additionalInfo: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found.");

      API.setToken(token);



      const payload = {
        // patient_name: formData.patientName.trim(),
        // contact_name: formData.contactName.trim(),
        // phone: formData.phone.trim(),
        // blood_group: formData.bloodGroup,
        // units: Number(formData.units),
        // urgency: formData.urgency,
        // hospital: formData.hospital.trim(),
        // additional_info: formData.additionalInfo || null,
        // status: "P",

        blood_group_id: Number(formData.bloodGroup),     // backend expects ID
        units_required: Number(formData.units),
        urgency_level: formData.urgency,

        patient_name: formData.patientName.trim(),
        contact_person: formData.contactName.trim(),
        contact_number: formData.phone.trim(),
        hospital_name: formData.hospital.trim(),

        additional_info: formData.additionalInfo || null,
      }

      console.log("Submitting payload:", payload)

      const response = await API.requestblood(payload)

      console.log("API Response:", response)

      if (response.data.status === "success") {
        toast.success("Blood request submitted successfully!")
        setIsSubmitted(true)
      } else {
        toast.error(response.data.message || "Failed to submit request.")
      }
    } catch (err: any) {
      console.error("Submission error:", err)
      toast.error(err.response?.data?.message || "Server error. Please try again.")
    } finally {
      setLoading(false)
    }
  }
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsSubmitted(true)
  // }

  if (isSubmitted) {
    return (
      <Card className="mx-auto max-w-lg border-border/60 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
            <CheckCircle2 className="h-8 w-8 text-accent" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-foreground">Request Submitted</h2>
          <p className="mt-3 text-muted-foreground">
            Your blood request has been submitted successfully. We&apos;re notifying matching donors in your area.
          </p>

          <div className="mt-6 rounded-xl bg-primary/5 border border-primary/20 p-4 text-left">
            <h4 className="text-sm font-semibold text-foreground">Request Summary</h4>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Blood Group</dt>
                <dd className="font-semibold text-primary">{formData.bloodGroup}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Units Needed</dt>
                <dd className="font-medium text-foreground">{formData.units}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Request ID</dt>
                <dd className="font-mono text-xs text-foreground">REQ-{Date.now().toString(36).toUpperCase()}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 rounded-xl bg-secondary/50 p-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">What happens next?</span>
              <br />
              Matching donors will be notified immediately. You&apos;ll receive a call when a donor responds. Average
              response time is under 2 hours.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button className="gap-2" asChild>
              <a href="/directory">
                <Heart className="h-4 w-4" />
                View Available Donors
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/">Return Home</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/60 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <AlertTriangle className="h-5 w-5 text-primary" />
          Blood Request Form
        </CardTitle>
        <CardDescription>
          Fill in the details below to request blood. All fields marked with * are required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-foreground">Emergency?</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  For life-threatening emergencies, please also contact your nearest hospital and call emergency
                  services (108).
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bloodGroup">
                Blood Group Required <span className="text-primary">*</span>
              </Label>
              <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange("bloodGroup", value)}>
                <SelectTrigger id="bloodGroup" className="h-11">
                  <Droplets className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  {bloodGroups.map((group) => (
                    <SelectItem key={group.id} value={String(group.id)}>
                      {group.name}
                    </SelectItem>
                  ))}
                  {/* {bloodGroups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))} */}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="units">
                Units Needed <span className="text-primary">*</span>
              </Label>
              <Select value={formData.units} onValueChange={(value) => handleInputChange("units", value)}>
                <SelectTrigger id="units" className="h-11">
                  <SelectValue placeholder="Select units" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((unit) => (
                    <SelectItem key={unit} value={unit.toString()}>
                      {unit} {unit === 1 ? "unit" : "units"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="urgency">
              Urgency Level <span className="text-primary">*</span>
            </Label>
            <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
              <SelectTrigger id="urgency" className="h-11">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Select urgency level" />
              </SelectTrigger>
              <SelectContent>
                {urgencyLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    <span className={level.color}>{level.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="patientName">
                Patient Name <span className="text-primary">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="patientName"
                  placeholder="Patient's full name"
                  className="h-11 pl-10"
                  value={formData.patientName}
                  onChange={(e) => handleInputChange("patientName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactName">
                Contact Person <span className="text-primary">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="contactName"
                  placeholder="Your name"
                  className="h-11 pl-10"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange("contactName", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">
                Contact Number <span className="text-primary">*</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="h-11 pl-10"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hospital">
                Hospital / Location <span className="text-primary">*</span>
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="hospital"
                  placeholder="Hospital name"
                  className="h-11 pl-10"
                  value={formData.hospital}
                  onChange={(e) => handleInputChange("hospital", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              placeholder="Any additional details that might help donors (e.g., specific requirements, timing preferences)"
              className="min-h-[100px] resize-none"
              value={formData.additionalInfo}
              onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
            />
          </div>

          <Button type="submit" size="lg" className="w-full gap-2">
            <Send className="h-4 w-4" />
            Submit Blood Request
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By submitting this request, you agree to our terms of service. Your contact information will be shared with
            matching donors.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
