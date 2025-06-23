"use client"

import { useState, memo, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AssetIcon } from "@/components/shared/asset-icon"
import { PriceChange } from "@/components/shared/price-change"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { usePortfolio } from "@/lib/hooks/usePortfolio"
import { useMarketData } from "@/lib/hooks/useMarketData"
import { createOrder, calculateTradingFee, validateTradeAmount } from "@/lib/api/tradeService"
import { useToast } from "@/components/ui/use-toast"
import { TrendingUp, TrendingDown, Clock, AlertTriangle, Zap, CheckCircle, Activity } from "lucide-react"

interface QuickTradeProps {
  defaultAction?: "buy" | "sell"
  defaultAsset?: string
}

export const QuickTrade = memo(function QuickTrade({ defaultAction = "buy", defaultAsset = "BTC" }: QuickTradeProps) {
  const [action, setAction] = useState<"buy" | "sell">(defaultAction)
  const [selectedAsset, setSelectedAsset] = useState(defaultAsset)
  const [amount, setAmount] = useState("")
  const [orderType, setOrderType] = useState<"market" | "limit">("market")
  const [limitPrice, setLimitPrice] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [estimatedTotal, setEstimatedTotal] = useState(0)
  const [estimatedFee, setEstimatedFee] = useState(0)
  const [lastOrderId, setLastOrderId] = useState<string | null>(null)

  const { data: portfolioData, refresh: refreshPortfolio } = usePortfolio()
  const { marketData, lastUpdate } = useMarketData("", true) // Enable real-time updates
  const { toast } = useToast()

  const selectedMarketData = marketData.find((crypto) => crypto.symbol === selectedAsset)
  const selectedHolding = portfolioData?.assets.find((asset) => asset.symbol === selectedAsset)

  const canTrade = useCallback(() => {
    const numAmount = Number.parseFloat(amount)
    // Basic validation
    if (!amount || numAmount <= 0) return false
    if (!validateTradeAmount(numAmount)) return false
    if (orderType === "limit" && (!limitPrice || Number.parseFloat(limitPrice) <= 0)) return false
    if (!selectedMarketData) return false
    if (action === "sell") {
      // For sell orders, check if user has enough crypto
      if (!selectedHolding || selectedHolding.balance < numAmount) return false
    } else {
      // For buy orders, check if user has enough USD (including fees)
      const availableUSD = portfolioData?.availableBalance || 0
      const totalCost = estimatedTotal + estimatedFee
      if (availableUSD < totalCost) return false
    }
    return true
  }, [amount, orderType, limitPrice, selectedMarketData, action, selectedHolding, portfolioData, estimatedTotal, estimatedFee])

  // Calculate estimated values with enhanced logic
  useEffect(() => {
    if (amount && selectedMarketData) {
      const numAmount = Number.parseFloat(amount)
      const price = orderType === "limit" && limitPrice ? Number.parseFloat(limitPrice) : selectedMarketData.price
      
      let total: number
      if (action === "buy") {
        // For buy orders, amount is in USD
        total = numAmount
      } else {
        // For sell orders, amount is in crypto, calculate USD value
        total = numAmount * price
      }
      
      const fee = calculateTradingFee(total)
      setEstimatedTotal(total)
      setEstimatedFee(fee)
    } else {
      setEstimatedTotal(0)
      setEstimatedFee(0)
    }
  }, [amount, selectedMarketData, orderType, limitPrice, action])

  const handleTrade = useCallback(async () => {
    if (!canTrade() || !selectedMarketData) return
    
    setIsProcessing(true)
    try {
      const numAmount = Number.parseFloat(amount)
      const price = orderType === "limit" && limitPrice ? Number.parseFloat(limitPrice) : selectedMarketData.price
      
      const response = await createOrder({
        type: action,
        symbol: selectedAsset,
        orderType,
        amount: numAmount,
        price,
        fee: estimatedFee
      })
      
      setLastOrderId(response.orderId)
      
      toast({
        title: "Trade Executed Successfully!",
        description: `${action === "buy" ? "Bought" : "Sold"} ${numAmount} ${selectedAsset} at $${response.executedPrice.toFixed(2)}`,
        duration: 5000,
      })
      
      // Refresh portfolio data
      await refreshPortfolio()
      
      // Reset form
      setAmount("")
      setLimitPrice("")
      
    } catch (error) {
      toast({
        title: "Trade Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsProcessing(false)
    }
  }, [action, selectedAsset, orderType, amount, limitPrice, estimatedFee, selectedMarketData, canTrade, toast, refreshPortfolio])

  const getAvailableBalance = () => {
    if (action === "buy") {
      return portfolioData?.availableBalance || 0
    } else {
      return selectedHolding?.balance || 0
    }
  }

  return (
    <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            Quick Trade
          </CardTitle>
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
            Secure
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Action Toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-lg">
          <Button
            variant={action === "buy" ? "default" : "ghost"}
            onClick={() => setAction("buy")}
            className={`h-10 ${
              action === "buy"
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Buy
          </Button>
          <Button
            variant={action === "sell" ? "default" : "ghost"}
            onClick={() => setAction("sell")}
            className={`h-10 ${
              action === "sell"
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <TrendingDown className="h-4 w-4 mr-2" />
            Sell
          </Button>
        </div>

        {/* Order Type */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-lg">
          <Button
            variant={orderType === "market" ? "default" : "ghost"}
            onClick={() => setOrderType("market")}
            size="sm"
            className={
              orderType === "market"
                ? "bg-purple-600 hover:bg-purple-700"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }
          >
            Market
          </Button>
          <Button
            variant={orderType === "limit" ? "default" : "ghost"}
            onClick={() => setOrderType("limit")}
            size="sm"
            className={
              orderType === "limit"
                ? "bg-purple-600 hover:bg-purple-700"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }
          >
            Limit
          </Button>
        </div>

        {/* Asset Selection */}
        <div className="space-y-2">
          <Label className="text-slate-300 text-sm font-medium">Select Asset</Label>
          <Select value={selectedAsset} onValueChange={setSelectedAsset}>
            <SelectTrigger className="h-12 bg-white/5 border-white/20 text-white">
              <div className="flex items-center gap-3">
                <AssetIcon symbol={selectedAsset} size="sm" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {marketData.map((crypto) => (
                <SelectItem key={crypto.symbol} value={crypto.symbol}>
                  <div className="flex items-center gap-3">
                    <AssetIcon symbol={crypto.symbol} size="sm" />
                    <div>
                      <span className="font-medium">{crypto.symbol}</span>
                      <span className="text-sm text-slate-400 ml-2">{crypto.name}</span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Current Price Display with Real-time Updates */}
        {selectedMarketData && (
          <div className="p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-300">Current Price</span>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30 animate-pulse">
                  <Activity className="h-2 w-2 mr-1" />
                  Live
                </Badge>
              </div>
              <div className="text-right">
                <p className="font-bold text-white">${selectedMarketData.price.toLocaleString()}</p>
                <PriceChange
                  change={selectedMarketData.change}
                  changePercent={selectedMarketData.changePercent}
                  size="sm"
                />
              </div>
            </div>
            <div className="mt-2 text-xs text-slate-400">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        )}

        {/* Amount Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-slate-300 text-sm font-medium">
              Amount {action === "buy" ? "(USD)" : `(${selectedAsset})`}
            </Label>
            <span className="text-xs text-slate-400">
              Available: {action === "buy" ? "$" : ""}
              {getAvailableBalance().toLocaleString()} {action === "sell" ? selectedAsset : ""}
            </span>
          </div>
          <div className="relative">
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-12 bg-white/5 border-white/20 text-white placeholder:text-slate-400 pr-16"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const maxAmount = getAvailableBalance()
                if (action === "buy" && selectedMarketData) {
                  setAmount((maxAmount / selectedMarketData.price).toFixed(6))
                } else {
                  setAmount(maxAmount.toString())
                }
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 h-8"
            >
              Max
            </Button>
          </div>
        </div>

        {/* Limit Price Input */}
        {orderType === "limit" && (
          <div className="space-y-2">
            <Label className="text-slate-300 text-sm font-medium">Limit Price (USD)</Label>
            <Input
              type="number"
              placeholder="0.00"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              className="h-12 bg-white/5 border-white/20 text-white placeholder:text-slate-400"
            />
          </div>
        )}

        <Separator className="bg-white/10" />

        {/* Enhanced Order Summary */}
        <div className="space-y-3 p-4 bg-white/5 rounded-lg border border-white/10">
          <h4 className="font-semibold text-white text-sm">Order Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">{action === "buy" ? "You'll receive" : "You'll get"}</span>
              <span className="text-white font-medium">
                {action === "buy"
                  ? `${amount && selectedMarketData ? (Number.parseFloat(amount) / (orderType === "limit" && limitPrice ? Number.parseFloat(limitPrice) : selectedMarketData.price)).toFixed(6) : "0.000000"} ${selectedAsset}`
                  : `$${estimatedTotal.toLocaleString()}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Trading Fee (0.1%)</span>
              <span className="text-white font-medium">${estimatedFee.toFixed(2)}</span>
            </div>
            {action === "buy" && (
              <div className="flex justify-between">
                <span className="text-slate-300">Total Cost</span>
                <span className="text-white font-bold">${(estimatedTotal + estimatedFee).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-300">Order Type</span>
              <span className="text-white font-medium capitalize">{orderType}</span>
            </div>
            {orderType === "market" && (
              <div className="flex items-center gap-2 text-xs text-yellow-400">
                <Clock className="h-3 w-3" />
                Executes immediately at market price
              </div>
            )}
            {orderType === "limit" && (
              <div className="flex items-center gap-2 text-xs text-blue-400">
                Executes only at your specified price or better
              </div>
            )}
          </div>
        </div>

        {/* Trade Button */}
        <Button
          onClick={handleTrade}
          disabled={!canTrade() || isProcessing}
          className={`w-full h-12 font-semibold ${
            action === "buy"
              ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
          } text-white`}
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <LoadingSpinner size="sm" />
              Processing...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {action === "buy" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {action === "buy" ? "Buy" : "Sell"} {selectedAsset}
            </div>
          )}
        </Button>

        {/* Enhanced Validation Messages */}
        {amount && !canTrade() && !isProcessing && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span className="text-xs text-red-300">
              {(() => {
                const numAmount = Number.parseFloat(amount)
                if (action === "sell" && (!selectedHolding || selectedHolding.balance < numAmount)) {
                  return `Insufficient ${selectedAsset} balance. Available: ${selectedHolding?.balance.toFixed(6) || 0} ${selectedAsset}`
                }
                if (action === "buy") {
                  const availableUSD = portfolioData?.availableBalance || 0
                  const totalCost = estimatedTotal + estimatedFee
                  if (availableUSD < totalCost) {
                    return `Insufficient USD balance. Need: $${totalCost.toFixed(2)}, Available: $${availableUSD.toFixed(2)}`
                  }
                }
                if (!validateTradeAmount(numAmount)) {
                  return "Trade amount is outside allowed limits"
                }
                if (orderType === "limit" && (!limitPrice || Number.parseFloat(limitPrice) <= 0)) {
                  return "Please enter a valid limit price"
                }
                return "Please check your input values"
              })()}
            </span>
          </div>
        )}

        {/* Success Message */}
        {lastOrderId && (
          <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span className="text-xs text-green-300">
              Order {lastOrderId} executed successfully!
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
})
