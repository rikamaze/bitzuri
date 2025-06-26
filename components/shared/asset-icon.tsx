import { memo } from "react"
import { OptimizedImage } from "@/components/ui/optimized-image"

interface AssetIconProps {
  symbol: string
  color?: string
  size?: "sm" | "md" | "lg"
  className?: string
  iconUrl?: string
}

const sizeClasses = {
  sm: "w-6 h-6 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
}

export const AssetIcon = memo(function AssetIcon({ 
  symbol, 
  color, 
  size = "md", 
  className = "",
  iconUrl
}: AssetIconProps) {
  const bgColor = color ? `${color}20` : "rgba(147, 51, 234, 0.2)"
  const sizePx = size === "sm" ? 24 : size === "md" ? 40 : 48;

  if (iconUrl) {
    return (
      <div className={`${sizeClasses[size]} ${className} overflow-hidden rounded-full`}>
        <OptimizedImage
          src={iconUrl}
          alt={`${symbol} icon`}
          width={sizePx}
          height={sizePx}
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold text-white ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: bgColor }}
      aria-label={`${symbol} icon`}
    >
      {symbol[0]}
    </div>
  )
})
