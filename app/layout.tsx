import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import Script from "next/script"

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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-slate-900 focus:text-white">
            Skip to content
          </a>
          <Navigation />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
        
        {/* Web Vitals & Performance Monitoring */}
        <Script id="web-vitals" strategy="afterInteractive">
          {`
            function sendToAnalytics(metric) {
              // In production, you would send this to your analytics service
              console.log(metric);
            }
            
            try {
              window.addEventListener('load', () => {
                setTimeout(() => {
                  // Core Web Vitals
                  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                    getCLS(sendToAnalytics);
                    getFID(sendToAnalytics);
                    getFCP(sendToAnalytics);
                    getLCP(sendToAnalytics);
                    getTTFB(sendToAnalytics);
                  });
                }, 100);
              });
            } catch (err) {
              console.error('Web Vitals error:', err);
            }
          `}
        </Script>
      </body>
    </html>
  )
}
