"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { TrendingUp, TrendingDown, Target, Shield, ChevronDown, ChevronRight, Sparkles, Info } from "lucide-react"
import type { Recommendation } from "@/lib/types/enhancements"

const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    type: "Buy",
    asset: "ETH",
    title: "Consider Ethereum",
    description: "Strong technical signals suggest potential upside based on your portfolio.",
    reasoning: [
      "Technical momentum indicators trending positive",
      "Network upgrades driving adoption",
      "Low correlation with your current holdings",
    ],
    confidence: 78,
    potentialReturn: 15.2,
    riskLevel: "Medium",
    timeframe: "3-6 months",
    category: "AI",
  },
  {
    id: "2",
    type: "DiversifyPortfolio",
    title: "Reduce Bitcoin Concentration",
    description: "Your portfolio is 65% Bitcoin. Consider diversifying to reduce risk.",
    reasoning: [
      "High concentration increases volatility",
      "Diversification improves risk-adjusted returns",
      "Consider adding altcoins or stablecoins",
    ],
    confidence: 85,
    potentialReturn: 8.5,
    riskLevel: "Low",
    timeframe: "1-2 months",
    category: "Technical",
  },
]

export function RecommendationEngine() {
  const [recommendations] = useState<Recommendation[]>(mockRecommendations)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const getRecommendationIcon = (type: Recommendation["type"]) => {
    const iconClass = "h-4 w-4"
    switch (type) {
      case "Buy":
        return <TrendingUp className={`${iconClass} text-green-400`} />
      case "Sell":
        return <TrendingDown className={`${iconClass} text-red-400`} />
      case "Hold":
        return <Target className={`${iconClass} text-blue-400`} />
      case "DiversifyPortfolio":
        return <Shield className={`${iconClass} text-purple-400`} />
      case "ReduceRisk":
        return <Shield className={`${iconClass} text-orange-400`} />
      default:
        return <Sparkles className={`${iconClass} text-yellow-400`} />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      case "High":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  return (
    <div className="space-y-6">
      {/* Simplified Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">AI Insights</h2>
        </div>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Personalized recommendations based on your portfolio and market analysis
        </p>
      </div>

      {/* Streamlined Recommendations */}
      <div className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <motion.div
            key={recommendation.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="backdrop-blur-md bg-white/5 border-white/10 hover:border-white/20 transition-all">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Main Content */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getRecommendationIcon(recommendation.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-white text-sm">{recommendation.title}</h3>
                          {recommendation.asset && (
                            <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                              {recommendation.asset}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{recommendation.description}</p>
                      </div>
                    </div>

                    {/* Confidence & Risk */}
                    <div className="flex items-center gap-2 ml-3">
                      <Badge className={getRiskColor(recommendation.riskLevel)} variant="outline">
                        {recommendation.riskLevel}
                      </Badge>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Confidence</div>
                        <div className="text-sm font-semibold text-white">{recommendation.confidence}%</div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <span className="text-green-400">+{recommendation.potentialReturn}% potential</span>
                      <span className="text-slate-400">{recommendation.timeframe}</span>
                    </div>

                    {/* Expandable Details */}
                    <Collapsible
                      open={expandedCard === recommendation.id}
                      onOpenChange={(open) => setExpandedCard(open ? recommendation.id : null)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-400 hover:text-white">
                          <Info className="h-3 w-3 mr-1" />
                          Details
                          {expandedCard === recommendation.id ? (
                            <ChevronDown className="h-3 w-3 ml-1" />
                          ) : (
                            <ChevronRight className="h-3 w-3 ml-1" />
                          )}
                        </Button>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="mt-3">
                        <div className="space-y-3 pt-3 border-t border-white/10">
                          <div>
                            <h4 className="text-xs font-medium text-slate-300 mb-2">Key Insights</h4>
                            <ul className="space-y-1">
                              {recommendation.reasoning.map((reason, idx) => (
                                <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                                  <span className="text-purple-400 mt-0.5">•</span>
                                  <span className="flex-1">{reason}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              className="h-7 text-xs bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                            >
                              {recommendation.type === "Buy" ? "Buy Now" : "View Details"}
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-400 hover:text-white">
                              Dismiss
                            </Button>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Simple CTA */}
      <div className="text-center">
        <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
          View All Insights
        </Button>
      </div>
    </div>
  )
}
