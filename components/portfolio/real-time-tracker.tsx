"use client"

import { useState, memo, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AssetIcon } from "@/components/shared/asset-icon"
import { PriceChange } from "@/components/shared/price-change"
import { BalanceDisplay } from "@/components/shared/balance-display"
import { ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts"
import { usePortfolio } from "@/lib/hooks/usePortfolio"
import { useMarketData } from "@/lib/hooks/useMarketData"
import {
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Percent,
  RefreshCw,
  AlertCircle,
  Target,
  Zap,
} from "lucide-react"

export const RealTimeTracker = memo(function RealTimeTracker() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  const { data: portfolioData, loading, refresh } = usePortfolio()
  const { marketData } = useMarketData()

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
      refresh()
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [refresh])

  const portfolioMetrics = [
    {
      title: "Total Value",
      value: portfolioData?.totalBalance || 0,
      change: portfolioData?.totalChange || 0,
      changePercent: portfolioData?.totalChangePercent || 0,
      icon: DollarSign,
      color: "text-green-400",
      format: "currency",
    },
    {
      title: "24h Change",
      value: portfolioData?.totalChange || 0,
      change: portfolioData?.totalChange || 0,
      changePercent: portfolioData?.totalChangePercent || 0,
      icon: TrendingUp,
      color: portfolioData?.totalChangePercent >= 0 ? "text-green-400" : "text-red-400",
      format: "change",
    },
    {
      title: "Available",
      value: portfolioData?.availableBalance || 0,
      change: 0,
      changePercent: 0,
      icon: Activity,
      color: "text-blue-400",
      format: "currency",
    },
    {
      title: "Staked",
      value: portfolioData?.stakedBalance || 0,
      change: 0,
      changePercent: 0,
      icon: Target,
      color: "text-purple-400",
      format: "currency",
    },
  ]

  const chartData = [
    { time: "00:00", value: 23000 },
    { time: "04:00", value: 23400 },
    { time: "08:00", value: 23200 },
    { time: "12:00", value: 24100 },
    { time: "16:00", value: 24300 },
    { time: "20:00", value: portfolioData?.totalBalance || 24567 },
  ]

  return (
    <div className="space-y-6">
      {/* Real-time Status */}
      <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              Real-Time Portfolio
            </CardTitle>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 animate-pulse">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Live
              </Badge>
              <Button
                onClick={refresh}
                disabled={loading}
                variant="outline"
                size="sm"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
          <p className="text-xs text-slate-400">Last updated: {lastUpdate.toLocaleTimeString()}</p>
        </CardHeader>
        <CardContent>
          {/* Portfolio Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {portfolioMetrics.map((metric, index) => {
              const Icon = metric.icon
              return (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`h-4 w-4 ${metric.color}`} />
                    <span className="text-sm text-slate-300">{metric.title}</span>
                  </div>
                  <div>
                    {metric.format === "currency" ? (
                      <BalanceDisplay
                        amount={metric.value}
                        visible={balanceVisible}
                        onToggleVisibility={() => setBalanceVisible(!balanceVisible)}
                        size="sm"
                        showToggle={false}
                      />
                    ) : (
                      <PriceChange change={metric.change} changePercent={metric.changePercent} size="sm" />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Portfolio Chart */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-white">Portfolio Performance</h4>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-20 h-8 text-xs bg-white/5 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1H</SelectItem>
                  <SelectItem value="24h">24H</SelectItem>
                  <SelectItem value="7d">7D</SelectItem>
                  <SelectItem value="30d">30D</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#portfolioGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Asset Performance */}
      <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Asset Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioData?.assets.map((asset, index) => (
              <motion.div
                key={asset.symbol}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-4">
                  <AssetIcon symbol={asset.symbol} color={asset.color} />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white">{asset.symbol}</h4>
                      <span className="text-sm text-slate-400">{asset.name}</span>
                    </div>
                    <p className="text-sm text-slate-300">
                      {asset.balance.toFixed(6)} {asset.symbol}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  {/* Mini Chart */}
                  <div className="w-20 h-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { value: asset.price * 0.98 },
                          { value: asset.price * 1.02 },
                          { value: asset.price * 0.99 },
                          { value: asset.price },
                        ]}
                      >
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={asset.changePercent >= 0 ? "#10b981" : "#ef4444"}
                          strokeWidth={1.5}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">
                      {balanceVisible ? `$${asset.value.toLocaleString()}` : "••••••"}
                    </p>
                    <PriceChange change={asset.change} changePercent={asset.changePercent} size="sm" />
                  </div>
                  <div className="flex items-center gap-1">
                    {asset.changePercent >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Alerts */}
      <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-400" />
            Market Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <div>
                  <p className="text-sm font-medium text-white">BTC Price Alert</p>
                  <p className="text-xs text-green-300">Bitcoin reached your target price of $43,000</p>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center gap-3">
                <Percent className="h-4 w-4 text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-white">Portfolio Milestone</p>
                  <p className="text-xs text-blue-300">Your portfolio gained 5% this week</p>
                </div>
              </div>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">New</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
})
