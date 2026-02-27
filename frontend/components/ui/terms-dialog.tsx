"use client"

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export function TermsDialog({ trigger }: { trigger: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <div>
              <h3 className="font-semibold text-foreground mb-2">1. Acceptance of Terms</h3>
              <p>By accessing or using the CUSAT Blood Bank platform, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">2. Purpose of the Platform</h3>
              <p>This platform is operated by SFI CUSAT to connect voluntary blood donors with individuals in need within the CUSAT college community. It is a non-commercial, community service initiative.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">3. Eligibility</h3>
              <p>You must be a student, faculty member, or staff of CUSAT or its affiliated institutions to register as a donor. You must meet standard medical eligibility criteria for blood donation.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">4. Donor Responsibilities</h3>
              <p>As a registered donor, you agree to: provide accurate health and contact information, update your availability status honestly, respond to blood requests in good faith, and notify the platform if your health status changes.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">5. Contact Information</h3>
              <p>Your contact details (phone and email) will only be shared with verified users who have completed OTP verification. We do not sell or share your information with third parties.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">6. Limitation of Liability</h3>
              <p>CUSAT Blood Bank acts solely as a connecting platform. We are not responsible for medical outcomes, donor-recipient interactions, or any disputes arising from blood donation arrangements made through this platform.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">7. Modifications</h3>
              <p>We reserve the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">8. Contact</h3>
              <p>For questions about these terms, contact us at bloodbank@cusat.ac.in or visit the SFI CUSAT office.</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
