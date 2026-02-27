"use client"

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export function PrivacyDialog({ trigger }: { trigger: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <div>
              <h3 className="font-semibold text-foreground mb-2">1. Information We Collect</h3>
              <p>We collect the following information when you register: full name, email address, phone number, blood group, department, college, year of study, date of birth, weight, and last donation date. This information is necessary to operate the blood donor matching service.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">2. How We Use Your Information</h3>
              <p>Your information is used to: match blood donors with recipients, verify your identity via OTP, display your profile to verified users seeking blood, and send notifications about blood requests matching your blood group.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">3. Contact Information Visibility</h3>
              <p>Your phone number and email are only revealed to users who complete OTP verification. Your name, blood group, and availability are publicly visible to logged-in users on the donor directory.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">4. Data Storage</h3>
              <p>Your data is stored securely on servers managed by the CUSAT Blood Bank platform. Passwords are encrypted using industry-standard bcrypt hashing. We do not store OTPs after verification.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">5. Data Sharing</h3>
              <p>We do not sell, rent, or share your personal information with any third parties for commercial purposes. Data is only shared within the platform for the purpose of blood donor matching.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">6. Your Rights</h3>
              <p>You have the right to: access your personal data, update or correct your information, request deletion of your account, and opt out of notifications. Contact us at bloodbank@cusat.ac.in to exercise these rights.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">7. Cookies</h3>
              <p>We use localStorage to maintain your login session. We do not use tracking cookies or third-party analytics.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">8. Changes to This Policy</h3>
              <p>We may update this Privacy Policy periodically. We will notify users of significant changes via email or a notice on the platform.</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
