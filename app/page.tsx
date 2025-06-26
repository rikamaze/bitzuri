"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
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
      window.location.href = "/wallet"
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
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white w-full">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <span className="text-3xl font-bold tracking-wide">BITZURI</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight text-center">Welcome back</h1>
          <p className="text-lg text-white/80 max-w-md text-center mt-4">
            Sign in to access your portfolio and manage your digital assets.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-xl p-8 space-y-8 shadow-none">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
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
                className="h-12 bg-gray-50 text-black border-gray-300 focus:border-purple-600 focus:ring-purple-600"
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
                  className="h-12 bg-gray-50 text-black border-gray-300 focus:border-purple-600 focus:ring-purple-600 pr-12"
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
              className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
          {/* Alternative Actions */}
          <div className="text-center">
            <span className="text-gray-500 text-sm">or</span>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 border-gray-300 hover:bg-gray-50 font-medium rounded-lg"
          >
            Sign in with passkey
          </Button>
          <div className="text-center text-sm">
            <span className="text-gray-600">New to BITZURI?</span>{" "}
            <Link href="/signup" className="text-purple-600 hover:text-purple-700 font-medium underline">
              Create an account
            </Link>
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
        </div>
      </div>
    </div>
  )
}
