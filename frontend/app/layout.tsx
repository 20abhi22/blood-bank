import type React from "react"
import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Cusat Blood Bank | College Blood Bank Directory",
  description:
    "Find blood donors instantly. Save lives in your community. A premium blood bank directory for college campuses.",
  keywords: ["blood bank", "blood donation", "college", "donors", "healthcare"],
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#8B2332",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            unstyled: true,
            classNames: {
              toast:
                "text-white border-none rounded-lg shadow-lg px-6 py-4 flex justify-center items-center text-center",
              success: "bg-green-600",
              error: "bg-red-700",
              warning: "bg-yellow-500 text-black",
              info: "bg-blue-600",
              title: "text-center font-medium",
              description: "text-center text-sm opacity-90",
            },
          }}
        />
      </body>
    </html>
  )
}
