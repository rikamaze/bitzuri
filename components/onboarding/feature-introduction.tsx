"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Search, BookOpen, ArrowRight, CheckCircle, X, Lightbulb } from "lucide-react"

interface FeatureIntro {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  benefits: string[]
  cta: string
  color: string
}

interface FeatureIntroductionProps {
  currentTab: string
  onDismiss: (featureId: string) => void
  dismissedFeatures: string[]
}

const featureIntros: Record<string, FeatureIntro> = {
  insights: {
    id: "insights",
    title: "AI-Powered Insights",
    description: "Get personalized trading recommendations based on your portfolio and market analysis",
    icon: <Sparkles className="h-6 w-6" />,
    benefits: [
      "Personalized recommendations",
      "Risk assessment for each suggestion",
      "Market trend analysis",
      "Portfolio optimization tips",
    ],
    cta: "Explore AI Insights",
    color: "from-purple-600 to-pink-600",
  },
  discover: {
    id: "discover",
    title: "Advanced Search & Discovery",
    description: "Find cryptocurrencies that match your investment criteria with powerful filtering",
    icon: <Search className="h-6 w-6" />,
    benefits: [
      "Advanced filtering options",
      "Save custom searches",
      "Price and volume alerts",
      "Market trend discovery",
    ],
    cta: "Start Discovering",
    color: "from-blue-600 to-cyan-600",
  },
  learn: {
    id: "learn",
    title: "Interactive Learning Hub",
    description: "Master crypto trading with guided tutorials and connect with the community",
    icon: <BookOpen className="h-6 w-6" />,
    benefits: ["Step-by-step tutorials", "Progress tracking", "Community discussions", "Expert insights"],
    cta: "Begin Learning",
    color: "from-green-600 to-emerald-600",
  },
}

export function FeatureIntroduction({ currentTab, onDismiss, dismissedFeatures }: FeatureIntroductionProps) {
  const [showIntro, setShowIntro] = useState(false)
  const [currentFeature, setCurrentFeature] = useState<FeatureIntro | null>(null)

  useEffect(() => {
    const feature = featureIntros[currentTab]
    if (feature && !dismissedFeatures.includes(feature.id)) {
      setCurrentFeature(feature)
      setShowIntro(true)
    } else {
      setShowIntro(false)
    }
  }, [currentTab, dismissedFeatures])

  const handleDismiss = () => {
    if (currentFeature) {
      setShowIntro(false)
      setTimeout(() => {
        onDismiss(currentFeature.id)
      }, 300)
    }
  }

  const handleExplore = () => {
    handleDismiss()
  }

  if (!showIntro || !currentFeature) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mb-6"
      >
        <Card className={`backdrop-blur-md bg-gradient-to-r ${currentFeature.color} p-0.5 shadow-2xl`}>
          <Card className="backdrop-blur-md bg-slate-900/90 border-0 m-0">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${currentFeature.color} rounded-xl flex items-center justify-center text-white`}
                  >
                    {currentFeature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{currentFeature.title}</h3>
                    <Badge className="bg-white/10 text-white border-white/20">
                      <Lightbulb className="h-3 w-3 mr-1" />
                      New Feature
                    </Badge>
                  </div>
                </div>
                <Button onClick={handleDismiss} variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-slate-300 mb-4 leading-relaxed">{currentFeature.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {currentFeature.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 text-sm text-slate-300"
                      >
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        {benefit}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className={`w-24 h-24 bg-gradient-to-r ${currentFeature.color} rounded-2xl flex items-center justify-center text-white opacity-20`}
                  >
                    {currentFeature.icon}
                  </motion.div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleExplore}
                  className={`gap-2 bg-gradient-to-r ${currentFeature.color} hover:opacity-90 text-white flex-1 md:flex-none`}
                >
                  {currentFeature.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleDismiss}
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  Maybe Later
                </Button>
              </div>
            </CardContent>
          </Card>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
