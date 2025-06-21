"use client"

import React from "react"
import { Button } from "./button"
import { AlertCircle, RefreshCw } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; retry: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error} retry={this.retry} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error, retry }: { error?: Error; retry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
      <p className="text-slate-300 mb-6 max-w-md">
        {error?.message || "An unexpected error occurred. Please try again."}
      </p>
      <Button onClick={retry} className="gap-2">
        <RefreshCw className="w-4 h-4" />
        Try Again
      </Button>
    </div>
  )
}
