import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" })

export const metadata: Metadata = {
  title: "BITZURI - Your Gateway to Digital Assets",
  description: "Trade, Earn, and Grow with Confidence. Professional cryptocurrency exchange platform.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
