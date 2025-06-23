"use client"

import { useState, memo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { AssetIcon } from "@/components/shared/asset-icon"
import { PriceChange } from "@/components/shared/price-change"
import { BalanceDisplay } from "@/components/shared/balance-display"
import { QuickTrade } from "@/components/trading/quick-trade"
import { SendReceive } from "@/components/wallet/send-receive"
import { RealTimeTracker } from "@/components/portfolio/real-time-tracker"
import { ResponsiveContainer, AreaChart, Area, LineChart, Line } from "recharts"
import { usePortfolio } from "@/lib/hooks/usePortfolio"
import { useMarketData } from "@/lib/hooks/useMarketData"
import { useTransactions } from "@/lib/hooks/useTransactions"
import {
  Plus,
  Minus,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Search,
  RefreshCw,
  Download,
  Zap,
  Activity,
  Send,
} from "lucide-react"
import Link from "next/link"

import { ProgressTracker } from "@/components/onboarding/progress-tracker"
import { useOnboarding } from "@/hooks/useOnboarding"

const chartData = [
  { time: "00:00", value: 23000 },
  { time: "04:00", value: 23400 },
  { time: "08:00", value: 23200 },
  { time: "12:00", value: 24100 },
  { time: "16:00", value: 24300 },
  { time: "20:00", value: 24567 },
]

// Memoized components for better performance
const PortfolioChart = memo(function PortfolioChart() {
  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#portfolioGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
})

const MiniSparkline = memo(function MiniSparkline({
  data,
  isPositive,
}: {
  data: number[]
  isPositive: boolean
}) {
  return (
    <div className="w-20 h-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.map((value, i) => ({ value, index: i }))}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={isPositive ? "#10b981" : "#ef4444"}
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
})

const QuickActions = memo(function QuickActions() {
  return (
    <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
          <Zap className="h-4 w-4 text-yellow-400" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Link href="/wallet?action=deposit" className="block">
          <Button className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
            <Plus className="h-4 w-4" />
            Buy Crypto
          </Button>
        </Link>
        <Link href="/wallet?action=withdraw" className="block">
          <Button className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white">
            <Minus className="h-4 w-4" />
            Sell Crypto
          </Button>
        </Link>
        <Link href="/wallet?tab=send" className="block">
          <Button className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
            <Send className="h-4 w-4" />
            Send & Receive
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
})

const MarketSummary = memo(function MarketSummary() {
  return (
    <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-white">Market Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-300">Fear & Greed Index</span>
          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">Neutral</Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-300">Total Market Cap</span>
          <span className="text-sm font-semibold text-white">$1.2T</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-300">24h Volume</span>
          <span className="text-sm font-semibold text-white">$45.6B</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-300">BTC Dominance</span>
          <span className="text-sm font-semibold text-white">52.3%</span>
        </div>
      </CardContent>
    </Card>
  )
})

export default function DashboardPage() {
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("overview")

  const {
    data: portfolioData,
    loading: portfolioLoading,
    error: portfolioError,
    refresh: refreshPortfolio,
  } = usePortfolio()
  const { marketData, loading: marketLoading, error: marketError, refresh: refreshMarket } = useMarketData(searchQuery, true)
  const { transactions, loading: transactionsLoading, error: transactionsError } = useTransactions()

  const onboarding = useOnboarding()

  const handleRefresh = () => {
    refreshPortfolio()
    refreshMarket()
  }

  if (portfolioError || marketError || transactionsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 lg:p-6">
        <ErrorBoundary>
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <p className="text-red-400 mb-4">{portfolioError || marketError || transactionsError}</p>
              <Button onClick={handleRefresh} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Retry
              </Button>
            </div>
          </div>
        </ErrorBoundary>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 lg:p-6">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Crypto Exchange
              </h1>
              <p className="text-sm text-slate-400 mt-1">Buy, sell, send & receive cryptocurrencies securely</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleRefresh}
                disabled={portfolioLoading || marketLoading}
                variant="outline"
                size="sm"
                className="gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                {portfolioLoading || marketLoading ? <LoadingSpinner size="sm" /> : <RefreshCw className="h-4 w-4" />}
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Portfolio Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-6"
          >
            {/* Main Portfolio Card */}
            <Card className="lg:col-span-2 backdrop-blur-md bg-white/10 border-white/20 shadow-2xl dashboard-overview">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg font-semibold text-white">Portfolio Balance</CardTitle>
                  <CardDescription className="text-slate-300">Total value of your holdings</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="portfolio-card">
                {portfolioLoading ? (
                  <div className="flex items-center justify-center h-48">
                    <LoadingSpinner size="lg" />
                  </div>
                ) : portfolioData ? (
                  <div className="space-y-4">
                    <div>
                      <BalanceDisplay
                        amount={portfolioData.totalBalance}
                        visible={balanceVisible}
                        onToggleVisibility={() => setBalanceVisible(!balanceVisible)}
                        size="lg"
                      />
                      <div className="mt-1">
                        <PriceChange
                          change={portfolioData.totalChange}
                          changePercent={portfolioData.totalChangePercent}
                        />
                        <span className="text-slate-400 text-sm ml-2">24h</span>
                      </div>
                    </div>

                    <PortfolioChart />

                    {/* Balance Breakdown */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                      <div>
                        <p className="text-sm text-slate-300">Available</p>
                        <p className="font-semibold text-white">
                          {balanceVisible ? `$${portfolioData.availableBalance.toLocaleString()}` : "••••••••"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-300">Staked</p>
                        <p className="font-semibold text-white">
                          {balanceVisible ? `$${portfolioData.stakedBalance.toLocaleString()}` : "••••••••"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-300">Pending</p>
                        <p className="font-semibold text-white">
                          {balanceVisible ? `$${portfolioData.pendingBalance.toLocaleString()}` : "••••••••"}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <div className="quick-actions">
              <QuickActions />
            </div>
            <MarketSummary />
          </motion.div>

          {/* Core Functionality Tabs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}>
            <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
              <TabsList className="main-tabs grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5 bg-white/5 border border-white/10">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-slate-300 text-sm"
                >
                  <Activity className="h-3 w-3 mr-1" />
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="trade"
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-slate-300 text-sm"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Trade
                </TabsTrigger>
                <TabsTrigger
                  value="transfer"
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-slate-300 text-sm"
                >
                  <Send className="h-3 w-3 mr-1" />
                  Transfer
                </TabsTrigger>
                <TabsTrigger
                  value="portfolio"
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-slate-300 text-sm"
                >
                  <Activity className="h-3 w-3 mr-1" />
                  Portfolio
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Holdings */}
                  <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold text-white">Your Holdings</CardTitle>
                        <CardDescription className="text-slate-300">Assets in your portfolio</CardDescription>
                      </div>
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
                    </CardHeader>
                    <CardContent>
                      {portfolioLoading ? (
                        <div className="flex items-center justify-center h-32">
                          <LoadingSpinner />
                        </div>
                      ) : portfolioData?.assets ? (
                        <div className="space-y-4">
                          {portfolioData.assets.slice(0, 4).map((holding, index) => (
                            <motion.div
                              key={holding.symbol}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <AssetIcon symbol={holding.symbol} color={holding.color} size="sm" />
                                <div>
                                  <h4 className="font-semibold text-white text-sm">{holding.symbol}</h4>
                                  <p className="text-xs text-slate-300">
                                    {holding.balance.toFixed(4)} {holding.symbol}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-white text-sm">
                                  {balanceVisible ? `$${holding.value.toLocaleString()}` : "••••••"}
                                </p>
                                <PriceChange change={holding.change} changePercent={holding.changePercent} size="sm" />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold text-white">Recent Activity</CardTitle>
                        <CardDescription className="text-slate-300">Your latest transactions</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10"
                      >
                        <Download className="h-4 w-4" />
                        Export
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {transactionsLoading ? (
                        <div className="flex items-center justify-center h-32">
                          <LoadingSpinner />
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {transactions.slice(0, 4).map((activity, index) => (
                            <motion.div
                              key={activity.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    activity.type === "buy" || activity.type === "deposit"
                                      ? "bg-green-500/20"
                                      : "bg-red-500/20"
                                  }`}
                                >
                                  {activity.type === "buy" || activity.type === "deposit" ? (
                                    <ArrowUpRight className="h-4 w-4 text-green-400" />
                                  ) : (
                                    <ArrowDownRight className="h-4 w-4 text-red-400" />
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-white text-sm capitalize">{activity.type}</span>
                                    <span className="text-slate-300 text-sm">{activity.asset}</span>
                                  </div>
                                  <p className="text-xs text-slate-400">
                                    {new Date(activity.timestamp).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-white text-sm">
                                  {activity.amount} {activity.asset}
                                </p>
                                <Badge
                                  className={
                                    activity.status === "completed"
                                      ? "bg-green-500/20 text-green-300 border-green-500/30 text-xs"
                                      : activity.status === "pending"
                                        ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-xs"
                                        : "bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs"
                                  }
                                >
                                  {activity.status}
                                </Badge>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Trade Tab */}
              <TabsContent value="trade" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <QuickTrade />

                  {/* Market Overview */}
                  <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold text-white">Market Overview</CardTitle>
                        <CardDescription className="text-slate-300">Top cryptocurrencies</CardDescription>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <Input
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 h-8 w-32 bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400"
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      {marketLoading ? (
                        <div className="flex items-center justify-center h-32">
                          <LoadingSpinner />
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {marketData.slice(0, 5).map((crypto, index) => (
                            <motion.div
                              key={crypto.symbol}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <AssetIcon symbol={crypto.symbol} size="sm" />
                                <div>
                                  <h4 className="font-semibold text-white text-sm">{crypto.symbol}</h4>
                                  <p className="text-xs text-slate-400">{crypto.name}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <MiniSparkline data={crypto.sparkline} isPositive={crypto.changePercent > 0} />
                                <div className="text-right">
                                  <p className="font-semibold text-white text-sm">${crypto.price.toLocaleString()}</p>
                                  <PriceChange change={crypto.change} changePercent={crypto.changePercent} size="sm" />
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Transfer Tab */}
              <TabsContent value="transfer" className="space-y-4">
                <SendReceive />
              </TabsContent>

              {/* Portfolio Tab */}
              <TabsContent value="portfolio" className="space-y-4">
                <RealTimeTracker />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Onboarding Components */}
        <ProgressTracker
          isVisible={onboarding.showProgressTracker}
          onClose={onboarding.toggleProgressTracker}
          onTaskComplete={onboarding.completeTask}
        />
      </div>
    </ErrorBoundary>
  )
}
