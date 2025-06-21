"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Mail, Shield, CheckCircle } from "lucide-react"
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
      window.location.href = "/region"
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
    <div className="min-h-screen flex">
      {/* Left Side - Brand & Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-32 left-32 w-16 h-16 border border-white/20 rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-2xl font-bold">BITZURI</span>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl font-bold leading-tight">Verify your email</h1>
              <p className="text-xl text-white/80 max-w-md">
                We've sent a verification code to your email address. This helps us keep your account secure.
              </p>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-white/90">Enhanced security for your account</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-white/90">Quick and easy verification process</span>
              </div>
            </motion.div>
          </div>

          {/* Email Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex justify-center items-end space-x-8"
          >
            {/* Email Icon */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <Mail className="w-10 h-10 text-white" />
            </motion.div>

            {/* Security Shield */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
              className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>

            {/* Check Mark */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
              className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <CheckCircle className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Verification Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              BITZURI
            </span>
          </div>

          {/* Form Header */}
          <div className="space-y-2 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Check your email</h2>
            <p className="text-gray-600">
              We sent a verification code to <strong>john@example.com</strong>
            </p>
          </div>

          {/* Verification Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-sm font-medium text-gray-700">
                Verification code
              </Label>
              <Input
                id="code"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-center text-lg tracking-widest"
                maxLength={6}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
              disabled={isLoading || verificationCode.length !== 6}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  Verify Email
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Resend Code */}
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">Didn't receive the code?</p>
            <Button
              type="button"
              variant="outline"
              onClick={handleResend}
              disabled={isResending}
              className="h-10 border-gray-300 hover:bg-gray-50 font-medium rounded-lg"
            >
              {isResending ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full mr-2"
                />
              ) : null}
              Resend code
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500">
            <p>
              Need help?{" "}
              <Link href="#" className="underline hover:text-gray-700">
                Contact support
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
