"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsEmailSent(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl p-8 space-y-8 shadow-none">
        <div className="flex flex-col items-center mb-4">
          <span className="text-3xl font-bold text-purple-700 mb-2">BITZURI</span>
          <h2 className="text-2xl font-bold text-gray-900">Forgot your password?</h2>
          <p className="text-gray-600 text-center mt-2">Enter your email address and we'll send you a link to reset your password.</p>
        </div>
        {!isEmailSent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-gray-50 text-black border-gray-300 focus:border-purple-600 focus:ring-purple-600"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>Send Reset Link<ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
            <p className="text-gray-600">We've sent a password reset link to <strong>{email}</strong></p>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEmailSent(false)}
              className="w-full h-12 border-purple-200 hover:bg-purple-50 text-purple-700 font-medium rounded-lg"
            >Try again</Button>
          </div>
        )}
        <div className="text-center mt-4">
          <Link href="/" className="text-sm text-purple-600 hover:text-purple-700 font-medium underline">Back to sign in</Link>
        </div>
      </div>
    </div>
  )
}
