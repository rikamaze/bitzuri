"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, CheckCircle, TrendingUp, Shield, Sparkles, Eye, Plus, Search, X } from "lucide-react"

interface OnboardingStep {
  id: string
  title: string
  description: string
  content: React.ReactNode
  target?: string
  position?: "top" | "bottom" | "left" | "right" | "center"
  action?: () => void
  canSkip?: boolean
  highlight?: boolean
}

interface OnboardingFlowProps {
  isActive: boolean
  onComplete: () => void
  onSkip: () => void
}

export function OnboardingFlow({ isActive, onComplete, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(false)

  const steps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome to BITZURI!",
      description: "Let's get you started with a quick tour",
      position: "center",
      content: (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Welcome to the future of crypto trading</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              We'll show you around in just 2 minutes. You can skip this tour anytime, but we recommend completing it to
              get the most out of BITZURI.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <span>⏱️ 2 minutes</span>
            <span>•</span>
            <span>6 steps</span>
            <span>•</span>
            <span>Skip anytime</span>
          </div>
        </div>
      ),
    },
    {
      id: "dashboard",
      title: "Your Dashboard",
      description: "This is your command center",
      target: ".dashboard-overview",
      position: "bottom",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <h4 className="font-semibold text-white">Portfolio Overview</h4>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Here you can see your total portfolio value, recent performance, and balance breakdown. The chart shows your
            portfolio's performance over time.
          </p>
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Eye className="h-3 w-3" />
              <span>Pro tip</span>
            </div>
            <p className="text-xs text-slate-300">Click the eye icon to hide/show your balance for privacy</p>
          </div>
        </div>
      ),
    },
    {
      id: "quick-actions",
      title: "Quick Actions",
      description: "Fast access to common tasks",
      target: ".quick-actions",
      position: "left",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-blue-400" />
            <h4 className="font-semibold text-white">Quick Actions</h4>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Use these buttons for the most common actions: depositing funds, withdrawing money, and starting trades.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-slate-300">Deposit - Add funds to your account</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span className="text-slate-300">Withdraw - Transfer money out</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-slate-300">Trade - Buy and sell crypto</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "navigation",
      title: "Explore Features",
      description: "Discover what BITZURI offers",
      target: ".main-tabs",
      position: "top",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-cyan-400" />
            <h4 className="font-semibold text-white">Feature Tabs</h4>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Navigate between different sections using these tabs. Each offers unique tools and insights.
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white/5 rounded p-2 border border-white/10">
              <div className="font-medium text-white mb-1">Holdings</div>
              <div className="text-slate-400">Your crypto assets</div>
            </div>
            <div className="bg-white/5 rounded p-2 border border-white/10">
              <div className="font-medium text-white mb-1">Markets</div>
              <div className="text-slate-400">Live crypto prices</div>
            </div>
            <div className="bg-white/5 rounded p-2 border border-white/10">
              <div className="font-medium text-white mb-1">Insights</div>
              <div className="text-slate-400">AI recommendations</div>
            </div>
            <div className="bg-white/5 rounded p-2 border border-white/10">
              <div className="font-medium text-white mb-1">Learn</div>
              <div className="text-slate-400">Tutorials & community</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "ai-insights",
      title: "AI-Powered Insights",
      description: "Get personalized recommendations",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <h4 className="font-semibold text-white">Smart Recommendations</h4>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Our AI analyzes your portfolio and market conditions to provide personalized trading insights and
            recommendations.
          </p>
          <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg p-3 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-purple-300">AI Insight</span>
            </div>
            <p className="text-xs text-slate-300">
              "Consider diversifying your portfolio by adding Ethereum. Based on your risk profile, it could provide
              good balance."
            </p>
          </div>
        </div>
      ),
      position: "center",
    },
    {
      id: "security",
      title: "Your Security Matters",
      description: "We keep your assets safe",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-400" />
            <h4 className="font-semibold text-white">Bank-Level Security</h4>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Your funds are protected with industry-leading security measures including cold storage, 2FA, and insurance
            coverage.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle className="h-3 w-3 text-green-400" />
              <span className="text-slate-300">256-bit encryption</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle className="h-3 w-3 text-green-400" />
              <span className="text-slate-300">Cold storage for 95% of funds</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle className="h-3 w-3 text-green-400" />
              <span className="text-slate-300">FDIC insured up to $250k</span>
            </div>
          </div>
          <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
            <p className="text-xs text-green-300">💡 Enable 2FA in your account settings for extra security</p>
          </div>
        </div>
      ),
      position: "center",
    },
  ]

  useEffect(() => {
    if (isActive) {
      setIsVisible(true)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isActive])

  const nextStep = () => {
    const current = steps[currentStep]
    if (current.action) {
      current.action()
    }

    setCompletedSteps((prev) => [...prev, current.id])

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      handleComplete()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleComplete = () => {
    setIsVisible(false)
    setTimeout(() => {
      onComplete()
    }, 300)
  }

  const handleSkip = () => {
    setIsVisible(false)
    setTimeout(() => {
      onSkip()
    }, 300)
  }

  const progress = ((currentStep + 1) / steps.length) * 100
  const currentStepData = steps[currentStep]

  if (!isActive) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Spotlight Effect */}
          {currentStepData.target && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 pointer-events-none"
              style={{
                background: `radial-gradient(circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), transparent 150px, rgba(0,0,0,0.8) 300px)`,
              }}
            />
          )}

          {/* Onboarding Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed z-50 w-full max-w-md ${getPositionClasses(currentStepData.position)}`}
          >
            <Card className="backdrop-blur-md bg-slate-900/95 border-white/20 shadow-2xl">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{currentStep + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg">{currentStepData.title}</h3>
                        <p className="text-xs text-slate-400">{currentStepData.description}</p>
                      </div>
                    </div>
                    <Button onClick={handleSkip} variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-white">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {/* Content */}
                  <div className="py-2">{currentStepData.content}</div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <Button
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button
                        onClick={handleSkip}
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white"
                      >
                        Skip Tour
                      </Button>
                      <Button
                        onClick={nextStep}
                        className="gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                      >
                        {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Step Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentStep
                      ? "bg-purple-400 scale-125"
                      : completedSteps.includes(step.id)
                        ? "bg-green-400"
                        : "bg-slate-600"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function getPositionClasses(position?: string) {
  switch (position) {
    case "top":
      return "top-20 left-1/2 transform -translate-x-1/2"
    case "bottom":
      return "bottom-20 left-1/2 transform -translate-x-1/2"
    case "left":
      return "top-1/2 left-6 transform -translate-y-1/2"
    case "right":
      return "top-1/2 right-6 transform -translate-y-1/2"
    case "center":
    default:
      return "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  }
}
