import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { RegistrationForm } from "@/components/register/registration-form"
import { Shield, Clock, Heart } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center">
      <Header />
      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="">
            <RegistrationForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
