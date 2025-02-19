import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Potion | Leaderboard",
  description: "View the leaderboard of Potion Members.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-gradient-to-br from-[#0D0B16] to-[#2D2A3E] text-white font-sans`}
      >
        <Navbar />
        {children}
        <Toaster />
        <Footer />
       
      </body>
    </html>
  )
}
