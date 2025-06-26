"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Home, TrendingUp, Gift, Wallet, User, Bell, Settings, Menu, X, Search, Target } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useOnboarding } from "@/hooks/useOnboarding"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const onboarding = useOnboarding()
  const prefersReducedMotion = useReducedMotion()
  
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

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
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
        className="hidden lg:flex fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/90 border-b border-white/10 shadow-md"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-3 hover-effect">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold gradient-text tracking-tight">
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
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg hover-effect ${
                      isActive 
                        ? "bg-white/15 text-white border-b-2 border-purple-500" 
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-xs px-1.5 py-0.5 shadow-sm">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full w-8 h-8 p-0 hover-effect">
                <Search className="h-4 w-4" />
              </Button>
              <Link href="/notifications">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full w-8 h-8 p-0 relative hover-effect">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full w-8 h-8 p-0 hover-effect">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
              {onboarding.showProgressTracker && (
                <Button
                  onClick={onboarding.toggleProgressTracker}
                  variant="ghost"
                  size="sm"
                  className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full w-8 h-8 p-0 hover-effect"
                >
                  <Target className="h-4 w-4" />
                </Button>
              )}
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full w-8 h-8 p-0 overflow-hidden hover-effect">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
        className="lg:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/90 border-b border-white/10 shadow-md"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-2 hover-effect">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold gradient-text tracking-tight">
                BITZURI
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2">
              <Link href="/notifications">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full w-8 h-8 p-0 relative hover-effect">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full w-8 h-8 p-0 hover-effect"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={prefersReducedMotion ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              className="pb-4 border-t border-white/10 mt-4 bg-slate-900/95 backdrop-blur-xl"
              role="menu"
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
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg hover-effect ${
                        isActive 
                          ? "bg-white/15 text-white border-l-2 border-purple-500" 
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <Badge className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-xs px-1.5 py-0.5 shadow-sm">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  )
                })}
                
                <Separator className="bg-white/10 my-2" />
                
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg hover-effect ${
                    pathname === "/profile" 
                      ? "bg-white/15 text-white border-l-2 border-purple-500" 
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">Profile</span>
                </Link>
                
                <Link
                  href="/notifications"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg hover-effect ${
                    pathname === "/notifications" 
                      ? "bg-white/15 text-white border-l-2 border-purple-500" 
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Bell className="h-5 w-5" />
                  <span className="font-medium">Notifications</span>
                </Link>
                
                <Link
                  href="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg hover-effect ${
                    pathname === "/settings" 
                      ? "bg-white/15 text-white border-l-2 border-purple-500" 
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">Settings</span>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Bottom Navigation for Mobile */}
      <div 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/95 border-t border-white/10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
        role="navigation"
        aria-label="Bottom navigation"
      >
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center hover-effect h-full"
              >
                <div className={`p-1 rounded-full ${isActive ? 'bg-white/15' : ''} relative`}>
                  <Icon className={`h-5 w-5 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                  {item.badge && <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>}
                </div>
                <span className={`text-xs mt-1 ${isActive ? 'text-purple-400' : 'text-slate-400'}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
          <Link href="/profile" className="flex flex-col items-center justify-center hover-effect h-full">
            <div className={`p-1 rounded-full ${pathname === "/profile" ? 'bg-white/15' : ''}`}>
              <User className={`h-5 w-5 ${pathname === "/profile" ? 'text-purple-400' : 'text-slate-400'}`} />
            </div>
            <span className={`text-xs mt-1 ${pathname === "/profile" ? 'text-purple-400' : 'text-slate-400'}`}>
              Profile
            </span>
          </Link>
        </div>
      </div>

      {/* Spacer for fixed navigation */}
      <div className="h-16"></div>
      <div className="h-16 lg:hidden" style={{ display: "none" }}></div>
    </>
  )
}
