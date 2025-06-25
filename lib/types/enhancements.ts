import type React from "react"
// Enhanced type definitions for new features

export interface UserProfile {
  id: string
  username: string
  displayName: string
  avatar?: string
  bio?: string
  tradingLevel: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  joinDate: string
  totalTrades: number
  portfolioValue: number
  achievements: Achievement[]
  preferences: UserPreferences
  socialStats: any // SocialStats is undeclared, using any as a placeholder
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string
  category: "Trading" | "Portfolio"
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
}

export interface UserPreferences {
  notifications: NotificationSettings
  privacy: any // PrivacySettings is undeclared, using any as a placeholder
  trading: any // TradingPreferences is undeclared, using any as a placeholder
  display: any // DisplayPreferences is undeclared, using any as a placeholder
}

export interface NotificationSettings {
  priceAlerts: boolean
  portfolioUpdates: boolean
  newsUpdates: boolean
  tradingSignals: boolean
  emailNotifications: boolean
  pushNotifications: boolean
}

export interface Recommendation {
  id: string
  type: "Buy" | "Sell" | "Hold" | "DiversifyPortfolio" | "ReduceRisk"
  asset?: string
  title: string
  description: string
  reasoning: string[]
  confidence: number
  potentialReturn: number
  riskLevel: "Low" | "Medium" | "High"
  timeframe: string
  category: "AI" | "Technical" | "Fundamental"
}

export interface TradingSignal {
  id: string
  asset: string
  action: "Buy" | "Sell"
  price: number
  targetPrice: number
  stopLoss: number
  confidence: number
  timeframe: string
  analysis: string
  provider: "AI" | "Expert"
  createdAt: string
}

export interface PortfolioInsight {
  id: string
  type: "Performance" | "Risk" | "Diversification" | "Opportunity"
  title: string
  description: string
  impact: "Positive" | "Negative" | "Neutral"
  actionable: boolean
  recommendation?: string
  data: any
}
