"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, ArrowRight, Shield, Zap } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    keepLoggedIn: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard"
    }, 2000)
  }

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
              <h1 className="text-5xl font-bold leading-tight">Welcome back to the future of trading</h1>
              <p className="text-xl text-white/80 max-w-md">
                Sign in to access your portfolio, trade cryptocurrencies, and manage your digital assets with
                confidence.
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
                <span className="text-white/90">Your funds are protected by bank-grade security</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-white/90">Lightning-fast execution in milliseconds</span>
              </div>
            </motion.div>
          </div>

          {/* Crypto Illustrations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex justify-center items-end space-x-8"
          >
            {/* Bitcoin */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-xl">₿</span>
            </motion.div>

            {/* Ethereum */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
              className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-xl">Ξ</span>
            </motion.div>

            {/* Rocket */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
              className="w-12 h-16 bg-gradient-to-t from-purple-400 to-cyan-400 rounded-t-full rounded-b-sm flex items-center justify-center shadow-lg relative"
            >
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="w-2 h-3 bg-gradient-to-t from-orange-400 to-yellow-400 rounded-b-full"></div>
              </div>
              <span className="text-white text-xs">🚀</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
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
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Sign in to BITZURI</h2>
            <p className="text-gray-600">Enter your credentials to access your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 pr-12"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-12 px-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="keepLoggedIn"
                  checked={formData.keepLoggedIn}
                  onCheckedChange={(checked) => updateFormData("keepLoggedIn", checked as boolean)}
                />
                <Label htmlFor="keepLoggedIn" className="text-sm text-gray-600">
                  Keep me logged in for up to 30 days
                </Label>
              </div>
              <Link href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700 underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Alternative Actions */}
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-gray-500 text-sm">or</span>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-gray-300 hover:bg-gray-50 font-medium rounded-lg"
            >
              <Shield className="w-4 h-4 mr-2" />
              Sign in with passkey
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600">New to BITZURI?</span>{" "}
              <Link href="/signup" className="text-purple-600 hover:text-purple-700 font-medium underline">
                Create an account
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 space-y-2">
            <p>This site is protected by reCAPTCHA and the Google</p>
            <div className="space-x-4">
              <Link href="#" className="underline hover:text-gray-700">
                Privacy Policy
              </Link>
              <Link href="#" className="underline hover:text-gray-700">
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
