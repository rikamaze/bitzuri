"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, TrendingUp, Gift, Wallet, User, Bell, Settings, Menu, X, Search, Target } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useOnboarding } from "@/hooks/useOnboarding"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const onboarding = useOnboarding()

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/features", label: "Trade", icon: TrendingUp },
    { href: "/earn", label: "Earn", icon: Gift, badge: "New" },
    { href: "/wallet", label: "Wallet", icon: Wallet },
  ]

  // Don't show navigation on auth pages
  if (
    pathname === "/" ||
    pathname === "/signup" ||
    pathname === "/verify-email" ||
    pathname === "/region" ||
    pathname === "/onboarding" ||
    pathname === "/forgot-password"
  ) {
    return null
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden lg:flex fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                BITZURI
              </span>
            </Link>

            {/* Navigation Items */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                      isActive ? "bg-white/10 text-white" : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge className="bg-green-500/20 text-green-300 text-xs px-1.5 py-0.5 border-green-500/30">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/10">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/10">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/10">
                <Settings className="h-4 w-4" />
              </Button>
              {onboarding.showProgressTracker && (
                <Button
                  onClick={onboarding.toggleProgressTracker}
                  variant="ghost"
                  size="sm"
                  className="text-slate-300 hover:text-white hover:bg-white/10"
                >
                  <Target className="h-4 w-4" />
                </Button>
              )}
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/10">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-white/10"
      >
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                BITZURI
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 hover:text-white hover:bg-white/10"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pb-4 border-t border-white/10 mt-4"
            >
              <div className="space-y-2 pt-4">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                        isActive ? "bg-white/10 text-white" : "text-slate-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <Badge className="bg-green-500/20 text-green-300 text-xs px-1.5 py-0.5 border-green-500/30">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/90 border-t border-white/10">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all ${
                  isActive ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {item.badge && <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Spacer for fixed navigation */}
      <div className="h-16"></div>
      <div className="h-16 lg:hidden"></div>
    </>
  )
}
