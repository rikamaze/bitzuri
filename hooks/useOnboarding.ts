"use client"

import { useState, useEffect } from "react"

interface OnboardingState {
  isFirstTime: boolean
  completedTour: boolean
  dismissedFeatures: string[]
  completedTasks: string[]
  showProgressTracker: boolean
}

const ONBOARDING_STORAGE_KEY = "bitzuri_onboarding"

export function useOnboarding() {
  const [state, setState] = useState<OnboardingState>({
    isFirstTime: true,
    completedTour: false,
    dismissedFeatures: [],
    completedTasks: [],
    showProgressTracker: false,
  })

  // Load state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(ONBOARDING_STORAGE_KEY)
    if (stored) {
      try {
        const parsedState = JSON.parse(stored)
        setState(parsedState)
      } catch (error) {
        console.error("Failed to parse onboarding state:", error)
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const completeTour = () => {
    setState((prev) => ({
      ...prev,
      completedTour: true,
      isFirstTime: false,
      showProgressTracker: true,
    }))
  }

  const skipTour = () => {
    setState((prev) => ({
      ...prev,
      completedTour: true,
      isFirstTime: false,
      showProgressTracker: true,
    }))
  }

  const dismissFeature = (featureId: string) => {
    setState((prev) => ({
      ...prev,
      dismissedFeatures: [...prev.dismissedFeatures, featureId],
    }))
  }

  const completeTask = (taskId: string) => {
    setState((prev) => ({
      ...prev,
      completedTasks: [...prev.completedTasks, taskId],
    }))
  }

  const toggleProgressTracker = () => {
    setState((prev) => ({
      ...prev,
      showProgressTracker: !prev.showProgressTracker,
    }))
  }

  const resetOnboarding = () => {
    setState({
      isFirstTime: true,
      completedTour: false,
      dismissedFeatures: [],
      completedTasks: [],
      showProgressTracker: false,
    })
    localStorage.removeItem(ONBOARDING_STORAGE_KEY)
  }

  return {
    ...state,
    completeTour,
    skipTour,
    dismissFeature,
    completeTask,
    toggleProgressTracker,
    resetOnboarding,
  }
}
