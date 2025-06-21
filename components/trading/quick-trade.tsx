"use client"

import { useState, memo, useEffect } from "react"
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
import { TrendingUp, TrendingDown, Shield, Clock, AlertTriangle, Zap } from "lucide-react"

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

  const { data: portfolioData } = usePortfolio()
  const { marketData } = useMarketData()

  const selectedMarketData = marketData.find((crypto) => crypto.symbol === selectedAsset)
  const selectedHolding = portfolioData?.assets.find((asset) => asset.symbol === selectedAsset)

  // Calculate estimated values
  useEffect(() => {
    if (amount && selectedMarketData) {
      const numAmount = Number.parseFloat(amount)
      const price = orderType === "limit" && limitPrice ? Number.parseFloat(limitPrice) : selectedMarketData.price
      const total = numAmount * price
      const fee = total * 0.001 // 0.1% fee
      setEstimatedTotal(total)
      setEstimatedFee(fee)
    } else {
      setEstimatedTotal(0)
      setEstimatedFee(0)
    }
  }, [amount, selectedMarketData, orderType, limitPrice])

  const handleTrade = async () => {
    setIsProcessing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    // Reset form
    setAmount("")
    setLimitPrice("")
  }

  const canTrade = () => {
    if (!amount || Number.parseFloat(amount) <= 0) return false
    if (orderType === "limit" && (!limitPrice || Number.parseFloat(limitPrice) <= 0)) return false
    if (action === "sell" && (!selectedHolding || selectedHolding.balance < Number.parseFloat(amount))) return false
    return true
  }

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
            <Shield className="h-3 w-3 mr-1" />
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

        {/* Current Price Display */}
        {selectedMarketData && (
          <div className="p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Current Price</span>
              <div className="text-right">
                <p className="font-bold text-white">${selectedMarketData.price.toLocaleString()}</p>
                <PriceChange
                  change={selectedMarketData.change}
                  changePercent={selectedMarketData.changePercent}
                  size="sm"
                />
              </div>
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

        {/* Order Summary */}
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
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <Shield className="h-4 w-4 text-blue-400" />
          <span className="text-xs text-blue-300">All transactions are secured with bank-level encryption</span>
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

        {/* Validation Messages */}
        {amount && !canTrade() && !isProcessing && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span className="text-xs text-red-300">
              {action === "sell" && (!selectedHolding || selectedHolding.balance < Number.parseFloat(amount))
                ? `Insufficient ${selectedAsset} balance`
                : "Please check your input values"}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
})
