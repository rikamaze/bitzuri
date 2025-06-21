"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, ArrowRight, Shield, Globe, MapPin } from "lucide-react"

export default function RegionPage() {
  const [selectedCountry, setSelectedCountry] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const countries = [
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "KE", name: "Kenya", flag: "🇰🇪" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "SG", name: "Singapore", flag: "🇸🇬" },
    { code: "BR", name: "Brazil", flag: "🇧🇷" },
  ]

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCountry) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/onboarding"
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
              <h1 className="text-5xl font-bold leading-tight">Choose your region</h1>
              <p className="text-xl text-white/80 max-w-md">
                We'll customize your experience based on your location to ensure compliance with local regulations and
                provide the best trading experience.
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
                  <Globe className="w-4 h-4" />
                </div>
                <span className="text-white/90">Available in 100+ countries worldwide</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-white/90">Fully compliant with local regulations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-white/90">Localized features and support</span>
              </div>
            </motion.div>
          </div>

          {/* Global Crypto Illustrations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex justify-center items-end space-x-6"
          >
            {/* Globe */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-20 h-20 bg-gradient-to-br from-blue-400 to-green-500 rounded-full flex items-center justify-center shadow-lg relative"
            >
              <Globe className="w-8 h-8 text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            </motion.div>

            {/* Network Nodes */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
              className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Region Form */}
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
            <h2 className="text-3xl font-bold text-gray-900">Confirm your region</h2>
            <p className="text-gray-600">
              This helps us provide the right experience for where you live and ensures compliance with local
              regulations. If you're temporarily abroad, choose your permanent residence.
            </p>
          </div>

          {/* Region Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="country-search" className="text-sm font-medium text-gray-700">
                Search for your country or region
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="country-search"
                  placeholder="Search for a country or region..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Country List */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredCountries.map((country) => (
                <motion.button
                  key={country.code}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCountry(country.code)}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    selectedCountry === country.code
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{country.flag}</span>
                    <span className="font-medium">{country.name}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
              disabled={!selectedCountry || isLoading}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500">
            <p>
              By continuing, you acknowledge that BITZURI will process your data in accordance with our Privacy Policy
              and local regulations.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
