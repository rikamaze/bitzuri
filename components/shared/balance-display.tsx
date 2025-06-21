"use client"

import { memo } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BalanceDisplayProps {
  amount: number
  visible: boolean
  onToggleVisibility: () => void
  currency?: string
  size?: "sm" | "md" | "lg"
  showToggle?: boolean
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
}

export const BalanceDisplay = memo(function BalanceDisplay({
  amount,
  visible,
  onToggleVisibility,
  currency = "$",
  size = "md",
  showToggle = true,
}: BalanceDisplayProps) {
  return (
    <div className="flex items-center gap-3">
      <span className={`font-bold text-white ${sizeClasses[size]}`}>
        {visible ? `${currency}${amount.toLocaleString()}` : "••••••••"}
      </span>
      {showToggle && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleVisibility}
          className="text-slate-300 hover:text-white hover:bg-white/10"
        >
          {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </Button>
      )}
    </div>
  )
})
