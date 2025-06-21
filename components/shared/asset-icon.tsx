import { memo } from "react"

interface AssetIconProps {
  symbol: string
  color?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "w-6 h-6 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
}

export const AssetIcon = memo(function AssetIcon({ symbol, color, size = "md", className = "" }: AssetIconProps) {
  const bgColor = color ? `${color}20` : "rgba(147, 51, 234, 0.2)"

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold text-white ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {symbol[0]}
    </div>
  )
})
