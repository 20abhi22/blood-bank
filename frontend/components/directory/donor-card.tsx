"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Phone, Mail, Shield, Clock, Eye, EyeOff } from "lucide-react"
import { OTPDialog } from "./otp-dialog"



export function DonorCard({ donor }: any) {
  
  const [showContact, setShowContact] = useState(false)
    const [otpDialogOpen, setOtpDialogOpen] = useState(false)

  


  function getDepartment(dept: string) {
    switch (dept) {
      case "CSE":
        return "Computer Science and Engineering"
      case "EEE":
        return "Electrical and Electronics Engineering"
      case "ECE":
        return "Electronics and Communication Engineering"
      case "ME":
        return "Mechanical Engineering"
      case "CE":
        return "Civil Engineering"
      case "BME":
        return "Biomedical Engineering"
      default:
        return "Unknown"
    }
  }

   function handleViewContact() {
    // Open OTP dialog instead of directly showing contact
    setOtpDialogOpen(true)
  }

  function handleOTPVerified() {
    // Once OTP is verified, show the contact information
    setShowContact(true)
  }



  return (
    <><Card className="border-border/60 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{donor['name']}</h3>
                {donor['status'] && <Shield className="h-4 w-4 text-accent" aria-label="Verified donor" />}
              </div>
              <p className="text-sm text-muted-foreground">{getDepartment(donor['department_name'])}</p>
            </div>
          </div>

          <Badge
            variant={donor['is_available'] === 'Y' ? "default" : "secondary"}
            className={donor['is_available'] === 'Y' ? "bg-accent text-accent-foreground" : ""}
          >
            {donor['is_available'] === 'Y' ? "Available" : "Unavailable"}
          </Badge>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex h-10 w-16 items-center justify-center rounded-lg bg-primary/10">
            <span className="text-lg font-bold text-primary">{donor['blood_group']}</span>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              {donor['last_donation_date']
                ? `Last donated: ${new Date(donor['last_donation_date']).toLocaleDateString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}`
                : "First-time donor"}
            </span>
          </div>
        </div>

        {/* {showContact ? (
      <div className="mt-4 space-y-2 rounded-xl bg-secondary/50 p-4">
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">{donor['phone']}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">{donor['email']}</span>
        </div>
        <Button variant="ghost" size="sm" className="mt-2 w-full gap-2" onClick={() => setShowContact(false)}>
          <EyeOff className="h-4 w-4" />
          Hide Contact
        </Button>
      </div>
    ) : (
      <Button
        variant="outline"
        className="mt-4 w-full gap-2 bg-transparent"
        onClick={() => setShowContact(true)}
        disabled={!donor['is_available']}
      >
        <Eye className="h-4 w-4" />
        {donor['is_available'] ? "View Contact" : "Currently Unavailable"}
      </Button> */}

        {showContact ? (
          <div className="mt-4 space-y-2 rounded-xl bg-secondary/50 p-4">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${donor['phone']}`} className="font-medium text-foreground hover:underline">
                {donor['phone']}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${donor['email']}`} className="font-medium text-foreground hover:underline">
                {donor['email']}
              </a>
            </div>
            <Button variant="ghost" size="sm" className="mt-2 w-full gap-2" onClick={() => setShowContact(false)}>
              <EyeOff className="h-4 w-4" />
              Hide Contact
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            className="mt-4 w-full gap-2 bg-transparent"
            onClick={handleViewContact}
            disabled={donor['is_available'] !== 'Y'}
          >
            <Eye className="h-4 w-4" />
            {donor['is_available'] === 'Y' ? "View Contact" : "Currently Unavailable"}
          </Button>
        )}
      </CardContent>
    </Card>
    <OTPDialog
        open={otpDialogOpen}
        onOpenChange={setOtpDialogOpen}
        onVerified={handleOTPVerified}
        donorEmail={donor['email']}
        donorPhone={donor['phone']} /></>
  
  )
}
