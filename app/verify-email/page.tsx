"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Mail, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [isResending, setIsResending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/wallet"
    }, 2000)
  }

  const handleResend = async () => {
    setIsResending(true)
    // Simulate API call
    setTimeout(() => {
      setIsResending(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl p-8 space-y-8 shadow-none">
        <div className="flex flex-col items-center mb-4">
          <span className="text-3xl font-bold text-purple-700 mb-2">BITZURI</span>
          <h2 className="text-2xl font-bold text-gray-900">Verify your email</h2>
          <p className="text-gray-600 text-center mt-2">We sent a verification code to your email address. Enter it below to continue.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="code" className="text-sm font-medium text-gray-700">Verification code</Label>
            <Input
              id="code"
              placeholder="Enter 6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="h-12 bg-gray-50 text-black border-gray-300 focus:border-purple-600 focus:ring-purple-600 text-center text-lg tracking-widest"
              maxLength={6}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
            disabled={isLoading || verificationCode.length !== 6}
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>Verify Email<ArrowRight className="w-4 h-4 ml-2" /></>
            )}
          </Button>
        </form>
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">Didn't receive the code?</p>
          <Button
            type="button"
            variant="outline"
            onClick={handleResend}
            disabled={isResending}
            className="w-full h-10 border-purple-200 hover:bg-purple-50 text-purple-700 font-medium rounded-lg"
          >
            {isResending ? (
              <span className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full mr-2 animate-spin inline-block"></span>
            ) : null}
            Resend code
          </Button>
        </div>
        <div className="text-center text-xs text-gray-500 mt-4">
          <p>Need help? <Link href="#" className="underline hover:text-gray-700">Contact support</Link></p>
        </div>
      </div>
    </div>
  )
}
