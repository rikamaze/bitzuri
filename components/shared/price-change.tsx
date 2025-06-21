import { memo } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface PriceChangeProps {
  change: number
  changePercent: number
  showIcon?: boolean
  size?: "sm" | "md"
}

export const PriceChange = memo(function PriceChange({
  change,
  changePercent,
  showIcon = true,
  size = "md",
}: PriceChangeProps) {
  const isPositive = changePercent > 0
  const textSize = size === "sm" ? "text-sm" : "text-base"
  const iconSize = size === "sm" ? "h-3 w-3" : "h-4 w-4"

  return (
    <div className={`flex items-center gap-1 ${textSize}`}>
      {showIcon &&
        (isPositive ? (
          <TrendingUp className={`${iconSize} text-green-400`} />
        ) : (
          <TrendingDown className={`${iconSize} text-red-400`} />
        ))}
      <span className={isPositive ? "text-green-400" : "text-red-400"}>
        {isPositive ? "+" : ""}${change.toLocaleString()} ({isPositive ? "+" : ""}
        {changePercent.toFixed(2)}%)
      </span>
    </div>
  )
})
