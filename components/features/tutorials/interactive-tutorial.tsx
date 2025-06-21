"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, CheckCircle, Clock, BookOpen, Target, Lightbulb, ArrowRight } from "lucide-react"
import type { Tutorial } from "@/lib/types/enhancements"

const mockTutorials: Tutorial[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Learn the basics of BITZURI in 5 minutes",
    category: "Getting Started",
    difficulty: "Beginner",
    estimatedTime: 5,
    steps: [
      {
        id: "1",
        title: "Welcome",
        description: "Dashboard overview",
        target: ".dashboard-overview",
        content: "Your main dashboard overview",
        position: "bottom",
      },
    ],
  },
  {
    id: "first-trade",
    title: "Your First Trade",
    description: "Step-by-step guide to buying cryptocurrency",
    category: "Trading",
    difficulty: "Beginner",
    estimatedTime: 10,
    steps: [
      {
        id: "1",
        title: "Navigate to Trading",
        description: "Find the trading section",
        target: ".trading-tab",
        content: "Click here to start trading",
        position: "bottom",
      },
    ],
  },
  {
    id: "portfolio-management",
    title: "Portfolio Basics",
    description: "Track and manage your investments",
    category: "Portfolio",
    difficulty: "Intermediate",
    estimatedTime: 15,
    steps: [],
  },
]

export function InteractiveTutorial() {
  const [tutorials] = useState<Tutorial[]>(mockTutorials)
  const [completedTutorials, setCompletedTutorials] = useState<string[]>([])

  const startTutorial = (tutorial: Tutorial) => {
    // Tutorial logic would go here
    console.log("Starting tutorial:", tutorial.id)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      case "Intermediate":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      case "Advanced":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  const getCategoryIcon = (category: string) => {
    const iconClass = "h-4 w-4"
    switch (category) {
      case "Getting Started":
        return <Play className={iconClass} />
      case "Trading":
        return <Target className={iconClass} />
      case "Portfolio":
        return <BookOpen className={iconClass} />
      default:
        return <Lightbulb className={iconClass} />
    }
  }

  return (
    <div className="space-y-6">
      {/* Simplified Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Learn BITZURI</h2>
        </div>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Interactive tutorials to help you master crypto trading
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="backdrop-blur-md bg-white/5 border-white/10">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-white">Your Progress</h3>
              <p className="text-xs text-slate-400">
                {completedTutorials.length} of {tutorials.length} tutorials completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-white">
                {Math.round((completedTutorials.length / tutorials.length) * 100)}%
              </div>
              <Progress value={(completedTutorials.length / tutorials.length) * 100} className="w-20 h-2 mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simplified Tutorial Cards */}
      <div className="grid gap-4">
        {tutorials.map((tutorial, index) => {
          const isCompleted = completedTutorials.includes(tutorial.id)

          return (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="backdrop-blur-md bg-white/5 border-white/10 hover:border-white/20 transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                            {getCategoryIcon(tutorial.category)}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-white text-sm">{tutorial.title}</h3>
                          <Badge className={getDifficultyColor(tutorial.difficulty)} variant="outline">
                            {tutorial.difficulty}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400 mb-2">{tutorial.description}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {tutorial.estimatedTime} min
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {tutorial.steps.length} steps
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => startTutorial(tutorial)}
                      size="sm"
                      className={
                        isCompleted
                          ? "bg-white/5 border-white/20 text-white hover:bg-white/10"
                          : "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                      }
                    >
                      {isCompleted ? "Review" : "Start"}
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Simple CTA */}
      <div className="text-center">
        <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
          Browse All Tutorials
        </Button>
      </div>
    </div>
  )
}
