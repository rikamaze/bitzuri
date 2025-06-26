"use client"

import { useState, memo, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { AssetIcon } from "@/components/shared/asset-icon"
import { PriceChange } from "@/components/shared/price-change"
import { BalanceDisplay } from "@/components/shared/balance-display"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts"
import { usePortfolio } from "@/lib/hooks/usePortfolio"
import { useTransactions } from "@/lib/hooks/useTransactions"
import {
  Wallet,
  Plus,
  Minus,
  ArrowUpRight,
  ArrowDownRight,
  Copy,
  QrCode,
  RefreshCw,
  Filter,
  Download,
  Search,
  CreditCard,
  Banknote,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const chartData = [
  { time: "00:00", value: 23000 },
  { time: "04:00", value: 23400 },
  { time: "08:00", value: 23200 },
  { time: "12:00", value: 24100 },
  { time: "16:00", value: 24300 },
  { time: "20:00", value: 24567 },
]

// Memoized components
const WalletChart = memo(function WalletChart() {
  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="walletGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#walletGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
})

const PortfolioAllocation = memo(function PortfolioAllocation({ assets }: { assets: any[] }) {
  return (
    <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-white">Portfolio Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assets}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  dataKey="allocation"
                  stroke="none"
                >
                  {assets.map((asset, index) => (
                    <Cell key={`cell-${index}`} fill={asset.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {assets.slice(0, 3).map((asset) => (
              <div key={asset.symbol} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }}></div>
                  <span className="text-slate-300">{asset.symbol}</span>
                </div>
                <span className="text-white font-medium">{asset.allocation}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

const TransactionIcon = memo(function TransactionIcon({ type }: { type: string }) {
  switch (type) {
    case "deposit":
      return <ArrowDownRight className="h-4 w-4 text-green-400" />
    case "withdrawal":
      return <ArrowUpRight className="h-4 w-4 text-red-400" />
    case "buy":
      return <Plus className="h-4 w-4 text-blue-400" />
    case "sell":
      return <Minus className="h-4 w-4 text-orange-400" />
    default:
      return <ArrowUpRight className="h-4 w-4 text-gray-400" />
  }
})

const StatusIcon = memo(function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-400" />
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-400" />
    case "processing":
      return <RefreshCw className="h-4 w-4 text-blue-400 animate-spin" />
    default:
      return <AlertCircle className="h-4 w-4 text-red-400" />
  }
})

export default function WalletPage() {
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("assets")

  const searchParams = useSearchParams()

  const {
    data: portfolioData,
    loading: portfolioLoading,
    error: portfolioError,
    refresh: refreshPortfolio,
  } = usePortfolio()
  const {
    transactions,
    loading: transactionsLoading,
    error: transactionsError,
    refresh: refreshTransactions,
  } = useTransactions(searchQuery)

  // Handle URL parameters for direct actions
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "trading") setActiveTab("trading")
  }, [searchParams])

  const handleRefresh = () => {
    refreshPortfolio()
    refreshTransactions()
  }

  if (portfolioError || transactionsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 lg:p-6">
        <ErrorBoundary>
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <p className="text-red-400 mb-4">{portfolioError || transactionsError}</p>
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Wallet
              </h1>
              <p className="text-slate-300 mt-1">Manage your digital assets and transactions</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleRefresh}
                disabled={portfolioLoading || transactionsLoading}
                variant="outline"
                size="sm"
                className="gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                {portfolioLoading || transactionsLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Refresh
              </Button>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Wallet Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-6"
          >
            {/* Main Balance Card */}
            <Card className="lg:col-span-2 backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg font-semibold text-white">Total Balance</CardTitle>
                  <CardDescription className="text-slate-300">All your digital assets</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
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

                    <WalletChart />

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

            {/* Quick Actions */}
            <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/fiat/deposit" className="w-full">
                  <Button className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                    <Plus className="h-4 w-4" />
                    Deposit
                  </Button>
                </Link>

                <Link href="/fiat/withdraw" className="w-full">
                  <Button className="w-full justify-start gap-3 h-12 bg-white/5 border-white/20 text-white hover:bg-white/10">
                    <Minus className="h-4 w-4" />
                    Withdraw
                  </Button>
                </Link>

                <Link href="/features" className="w-full">
                  <Button className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                    <ArrowUpRight className="h-4 w-4" />
                    Buy Crypto
                  </Button>
                </Link>

                <Link href="/features" className="w-full">
                  <Button className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white">
                    <ArrowDownRight className="h-4 w-4" />
                    Sell Crypto
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Portfolio Allocation */}
            {portfolioData?.assets && <PortfolioAllocation assets={portfolioData.assets} />}
          </motion.div>

          {/* Main Content Tabs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3 bg-white/5 border border-white/10">
                <TabsTrigger
                  value="assets"
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-slate-300"
                >
                  Assets
                </TabsTrigger>
                <TabsTrigger
                  value="transactions"
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-slate-300"
                >
                  Transactions
                </TabsTrigger>
                <TabsTrigger
                  value="trading"
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-slate-300"
                >
                  Trading
                </TabsTrigger>
              </TabsList>

              {/* Assets Tab */}
              <TabsContent value="assets" className="space-y-4">
                <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold text-white">Your Assets</CardTitle>
                      <CardDescription className="text-slate-300">Manage your cryptocurrency holdings</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10"
                    >
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {portfolioLoading ? (
                      <div className="flex items-center justify-center h-32">
                        <LoadingSpinner />
                      </div>
                    ) : portfolioData?.assets ? (
                      <div className="space-y-4">
                        {portfolioData.assets.map((asset, index) => (
                          <motion.div
                            key={asset.symbol}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer"
                          >
                            <div className="flex items-center gap-4">
                              <AssetIcon symbol={asset.symbol} color={asset.color} />
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-white">{asset.symbol}</h3>
                                  <span className="text-sm text-slate-400">{asset.name}</span>
                                </div>
                                <p className="text-sm text-slate-300">
                                  {asset.balance} {asset.symbol} • ${asset.price.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-white">
                                {balanceVisible ? `$${asset.value.toLocaleString()}` : "••••••"}
                              </p>
                              <PriceChange change={asset.change} changePercent={asset.changePercent} size="sm" />
                            </div>
                            <div className="flex items-center gap-2">
                              <Link href="/features">
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                                >
                                  Buy
                                </Button>
                              </Link>
                              <Link href="/features">
                                <Button
                                  size="sm"
                                  className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                                >
                                  Sell
                                </Button>
                              </Link>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Transactions Tab */}
              <TabsContent value="transactions" className="space-y-4">
                <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold text-white">Transaction History</CardTitle>
                      <CardDescription className="text-slate-300">All your wallet transactions</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <Input
                          placeholder="Search transactions..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 h-8 w-48 bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400"
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10"
                      >
                        <Download className="h-4 w-4" />
                        Export
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {transactionsLoading ? (
                      <div className="flex items-center justify-center h-32">
                        <LoadingSpinner />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {transactions.map((tx, index) => (
                          <motion.div
                            key={tx.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <TransactionIcon type={tx.type} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-white capitalize">{tx.type}</span>
                                  <span className="text-slate-300">{tx.asset}</span>
                                  <StatusIcon status={tx.status} />
                                </div>
                                <p className="text-sm text-slate-400">
                                  {new Date(tx.timestamp).toLocaleDateString()} •{" "}
                                  {new Date(tx.timestamp).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-white">
                                {tx.amount} {tx.asset}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-300">${tx.value.toLocaleString()}</span>
                                <Badge
                                  className={
                                    tx.status === "completed"
                                      ? "bg-green-500/20 text-green-300 border-green-500/30"
                                      : tx.status === "pending"
                                        ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                        : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                                  }
                                >
                                  {tx.status}
                                </Badge>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-slate-400 hover:text-white hover:bg-white/10"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Trading Tab */}
              <TabsContent value="trading" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-white">Quick Trade</CardTitle>
                      <CardDescription className="text-slate-300">Buy or sell crypto instantly</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          onClick={() => setActiveTab("assets")}
                          className="h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Buy
                        </Button>
                        <Button
                          onClick={() => setActiveTab("assets")}
                          className="h-12 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
                        >
                          <Minus className="h-4 w-4 mr-2" />
                          Sell
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">Trading Fee</span>
                          <span className="text-white">0.1%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">Available Balance</span>
                          <span className="text-white">
                            {portfolioData ? `$${portfolioData.availableBalance.toLocaleString()}` : "Loading..."}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-white">Market Overview</CardTitle>
                      <CardDescription className="text-slate-300">Top performing assets</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {portfolioData?.assets ? (
                        <div className="space-y-3">
                          {portfolioData.assets.slice(0, 3).map((asset) => (
                            <div key={asset.symbol} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <AssetIcon symbol={asset.symbol} color={asset.color} size="sm" />
                                <div>
                                  <p className="text-white font-medium">{asset.symbol}</p>
                                  <p className="text-xs text-slate-400">${asset.price.toLocaleString()}</p>
                                </div>
                              </div>
                              <PriceChange
                                change={asset.change}
                                changePercent={asset.changePercent}
                                size="sm"
                                showIcon={false}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-24">
                          <LoadingSpinner />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
