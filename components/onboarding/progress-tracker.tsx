"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Trophy, Target, ArrowRight, Sparkles, X } from "lucide-react"

interface OnboardingTask {
  id: string
  title: string
  description: string
  completed: boolean
  points: number
  category: "essential" | "recommended" | "advanced"
  action?: () => void
}

interface ProgressTrackerProps {
  isVisible: boolean
  onClose: () => void
  onTaskComplete: (taskId: string) => void
}

export function ProgressTracker({ isVisible, onClose, onTaskComplete }: ProgressTrackerProps) {
  const [tasks, setTasks] = useState<OnboardingTask[]>([
    {
      id: "complete-profile",
      title: "Complete Your Profile",
      description: "Add your personal information and preferences",
      completed: false,
      points: 100,
      category: "essential",
    },
    {
      id: "verify-identity",
      title: "Verify Your Identity",
      description: "Complete KYC verification for full access",
      completed: false,
      points: 150,
      category: "essential",
    },
    {
      id: "first-deposit",
      title: "Make Your First Deposit",
      description: "Add funds to start trading",
      completed: false,
      points: 200,
      category: "essential",
    },
    {
      id: "explore-markets",
      title: "Explore Market Data",
      description: "Browse cryptocurrencies and market trends",
      completed: false,
      points: 50,
      category: "recommended",
    },
    {
      id: "try-ai-insights",
      title: "Try AI Insights",
      description: "Get your first personalized recommendation",
      completed: false,
      points: 75,
      category: "recommended",
    },
    {
      id: "join-community",
      title: "Join the Community",
      description: "Make your first post or comment",
      completed: false,
      points: 50,
      category: "recommended",
    },
    {
      id: "complete-tutorial",
      title: "Complete a Tutorial",
      description: "Finish your first interactive tutorial",
      completed: false,
      points: 100,
      category: "advanced",
    },
    {
      id: "set-alerts",
      title: "Set Price Alerts",
      description: "Create alerts for your favorite cryptocurrencies",
      completed: false,
      points: 75,
      category: "advanced",
    },
  ])

  const totalPoints = tasks.reduce((sum, task) => sum + task.points, 0)
  const completedPoints = tasks.filter((task) => task.completed).reduce((sum, task) => sum + task.points, 0)
  const progress = (completedPoints / totalPoints) * 100

  const essentialTasks = tasks.filter((task) => task.category === "essential")
  const recommendedTasks = tasks.filter((task) => task.category === "recommended")
  const advancedTasks = tasks.filter((task) => task.category === "advanced")

  const essentialCompleted = essentialTasks.filter((task) => task.completed).length
  const isEssentialComplete = essentialCompleted === essentialTasks.length

  const handleTaskClick = (task: OnboardingTask) => {
    if (!task.completed) {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, completed: true } : t)))
      onTaskComplete(task.id)
      if (task.action) {
        task.action()
      }
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "essential":
        return "from-red-600 to-orange-600"
      case "recommended":
        return "from-blue-600 to-cyan-600"
      case "advanced":
        return "from-purple-600 to-pink-600"
      default:
        return "from-gray-600 to-gray-700"
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "essential":
        return <Badge className="bg-red-500/20 text-red-300 border-red-500/30">Essential</Badge>
      case "recommended":
        return <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Recommended</Badge>
      case "advanced":
        return <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Advanced</Badge>
      default:
        return null
    }
  }

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-4 top-20 bottom-4 w-80 z-40"
    >
      <Card className="backdrop-blur-md bg-slate-900/95 border-white/20 shadow-2xl h-full flex flex-col">
        <CardContent className="p-4 flex-1 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-400" />
              <h3 className="font-semibold text-white">Getting Started</h3>
            </div>
            <Button onClick={onClose} variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Overview */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">Overall Progress</span>
              <span className="text-sm font-semibold text-white">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 mb-2" />
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>
                {completedPoints} / {totalPoints} points
              </span>
              <div className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                <span>Level {Math.floor(progress / 20) + 1}</span>
              </div>
            </div>
          </div>

          {/* Task Categories */}
          <div className="flex-1 overflow-y-auto space-y-4">
            {/* Essential Tasks */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-red-400" />
                  <span className="text-sm font-medium text-white">Essential</span>
                </div>
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                  {essentialCompleted}/{essentialTasks.length}
                </Badge>
              </div>
              <div className="space-y-2">
                {essentialTasks.map((task) => (
                  <TaskItem key={task.id} task={task} onClick={() => handleTaskClick(task)} />
                ))}
              </div>
            </div>

            {/* Recommended Tasks */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium text-white">Recommended</span>
                </div>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  {recommendedTasks.filter((t) => t.completed).length}/{recommendedTasks.length}
                </Badge>
              </div>
              <div className="space-y-2">
                {recommendedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onClick={() => handleTaskClick(task)}
                    disabled={!isEssentialComplete}
                  />
                ))}
              </div>
            </div>

            {/* Advanced Tasks */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-medium text-white">Advanced</span>
                </div>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  {advancedTasks.filter((t) => t.completed).length}/{advancedTasks.length}
                </Badge>
              </div>
              <div className="space-y-2">
                {advancedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onClick={() => handleTaskClick(task)}
                    disabled={!isEssentialComplete}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Achievement */}
          {progress === 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-3 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg border border-yellow-500/30"
            >
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-semibold text-yellow-300">Congratulations!</span>
              </div>
              <p className="text-xs text-yellow-200">
                You've completed all onboarding tasks. You're now a BITZURI expert!
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface TaskItemProps {
  task: OnboardingTask
  onClick: () => void
  disabled?: boolean
}

function TaskItem({ task, onClick, disabled = false }: TaskItemProps) {
  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={!disabled ? onClick : undefined}
      className={`p-3 rounded-lg border transition-all cursor-pointer ${
        task.completed
          ? "bg-green-500/10 border-green-500/30"
          : disabled
            ? "bg-white/5 border-white/10 opacity-50 cursor-not-allowed"
            : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {task.completed ? (
            <CheckCircle className="h-4 w-4 text-green-400" />
          ) : (
            <Circle className="h-4 w-4 text-slate-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4
              className={`text-sm font-medium ${
                task.completed ? "text-green-300" : disabled ? "text-slate-500" : "text-white"
              }`}
            >
              {task.title}
            </h4>
            <div className="flex items-center gap-1">
              <span
                className={`text-xs ${
                  task.completed ? "text-green-400" : disabled ? "text-slate-500" : "text-yellow-400"
                }`}
              >
                +{task.points}
              </span>
              {!task.completed && !disabled && <ArrowRight className="h-3 w-3 text-slate-400" />}
            </div>
          </div>
          <p
            className={`text-xs ${task.completed ? "text-green-200" : disabled ? "text-slate-500" : "text-slate-400"}`}
          >
            {task.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
