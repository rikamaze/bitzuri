"use client"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export function CompletionStep() {
  return (
    <div className="space-y-6 text-center">
      <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-12 h-12 text-white" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900">Congratulations, you're all set!</h3>
      <p className="text-gray-600">Your account is now ready to start trading cryptocurrencies.</p>
      <Link href="/dashboard">
        <Button className="w-full bg-black hover:bg-gray-800 text-white font-medium">Go to Dashboard</Button>
      </Link>
    </div>
  )
}
