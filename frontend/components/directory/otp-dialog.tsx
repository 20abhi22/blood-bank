"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Phone, ArrowLeft, CheckCircle2 } from "lucide-react"

interface OTPDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onVerified: () => void
  donorEmail?: string
  donorPhone?: string
}

export function OTPDialog({
  open,
  onOpenChange,
  onVerified,
  donorEmail,
  donorPhone,
}: OTPDialogProps) {
  const [step, setStep] = useState<"phone" | "verify">("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Basic Indian phone validation (10 digits, starts with 6-9)
  const isValidPhone = /^[6-9]\d{9}$/.test(phone)

  async function handleSendOTP() {
    if (!isValidPhone) {
      setError("Please enter a valid 10-digit mobile number.")
      return
    }

    setLoading(true)
    setError("")

    try {
      // TODO: Replace with real API call
      // await API.sendOTP({ phone: `+91${phone}` })
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStep("verify")
    } catch (err) {
      setError("Failed to send OTP. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyOTP() {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.")
      return
    }

    setLoading(true)
    setError("")

    try {
      // TODO: Replace with real API call
      // await API.verifyOTP({ phone: `+91${phone}`, otp })
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // On success:
      onVerified()
      onOpenChange(false)
      resetState()
    } catch (err) {
      setError("Invalid OTP. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function handleResend() {
    setStep("phone")
    setOtp("")
    setError("")
  }

  function resetState() {
    setStep("phone")
    setPhone("")
    setOtp("")
    setError("")
    setLoading(false)
  }

  function handleClose() {
    onOpenChange(false)
    resetState()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            {step === "phone" ? "Verify Your Identity" : "Enter OTP"}
          </DialogTitle>
          <DialogDescription>
            {step === "phone"
              ? "Enter your registered mobile number to receive a one-time password and view the donor's contact details."
              : `A 6-digit OTP has been sent to +91 ${phone}. It expires in 10 minutes.`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {step === "phone" ? (
            <>
              {/* Phone Input */}
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="flex items-center gap-2">
                  {/* Country code prefix */}
                  <div className="flex h-10 items-center justify-center rounded-md border border-input bg-muted px-3 text-sm text-muted-foreground select-none">
                    🇮🇳 +91
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "")
                      setPhone(val)
                      setError("")
                    }}
                    autoComplete="tel"
                    className="flex-1 tracking-wider"
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <p className="text-xs text-muted-foreground">
                  Use the number linked to your account.
                </p>
              </div>

              <Button
                onClick={handleSendOTP}
                disabled={loading || !isValidPhone}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP…
                  </>
                ) : (
                  <>
                    <Phone className="mr-2 h-4 w-4" />
                    Send OTP
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              {/* OTP Input */}
              <div className="space-y-2">
                <Label htmlFor="otp">One-Time Password</Label>
                <Input
                  id="otp"
                  placeholder="• • • • • •"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "")
                    setOtp(val)
                    setError("")
                  }}
                  className="text-center text-2xl tracking-[0.5em]"
                  autoComplete="one-time-code"
                  inputMode="numeric"
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>

              {/* Confirmation hint */}
              {otp.length === 6 && !error && (
                <div className="flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-2 text-sm text-accent">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Looks good — tap Verify!
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleResend}
                  disabled={loading}
                  className="flex-1 gap-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Change Number
                </Button>
                <Button
                  onClick={handleVerifyOTP}
                  disabled={loading || otp.length !== 6}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying…
                    </>
                  ) : (
                    "Verify"
                  )}
                </Button>
              </div>

              <p className="text-center text-xs text-muted-foreground">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  Resend OTP
                </button>
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}