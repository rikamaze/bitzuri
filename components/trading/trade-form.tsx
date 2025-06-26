"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { AssetIcon } from "@/components/shared/asset-icon"
import { useMarketData } from "@/lib/hooks/useMarketData"
import { Separator } from "@/components/ui/separator"
import { createOrder, calculateTradingFee } from "@/lib/api/tradeService"

export function TradeForm() {
  const [orderType, setOrderType] = useState("market") // market or limit
  const [side, setSide] = useState("buy") // buy or sell
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState("BTC")
  const [amount, setAmount] = useState("") // in quote currency (e.g. USD) for market, in base (e.g. BTC) for limit
  const [limitPrice, setLimitPrice] = useState("")
  const [total, setTotal] = useState("") // total in quote currency
  const [isProcessing, setIsProcessing] = useState(false);

  const { toast } = useToast()
  const { marketData, loading } = useMarketData()

  const selectedAsset = useMemo(
    () => marketData.find((asset) => asset.symbol === selectedAssetSymbol),
    [marketData, selectedAssetSymbol],
  )

  // Calculations
  useEffect(() => {
    const numAmount = parseFloat(amount)
    const numLimitPrice = parseFloat(limitPrice)
    if (orderType === 'limit' && numAmount > 0 && numLimitPrice > 0) {
        setTotal((numAmount * numLimitPrice).toFixed(2))
    } else if (orderType === 'market') {
        // For market order, amount is in quote, so total is the same
        setTotal(amount)
    } else {
        setTotal("")
    }
  }, [amount, limitPrice, orderType])

  useEffect(() => {
    if(selectedAsset) {
        setLimitPrice(selectedAsset.price.toString())
    }
  }, [selectedAsset])


  async function onSubmit() {
    setIsProcessing(true);
    const price = orderType === 'market' ? selectedAsset?.price ?? 0 : parseFloat(limitPrice);
    const orderAmount = orderType === 'market' ? parseFloat(total) / price : parseFloat(amount);
    
    try {
        const response = await createOrder({
            type: side as "buy" | "sell",
            symbol: selectedAssetSymbol,
            orderType: orderType as "market" | "limit",
            amount: orderAmount,
            price: price,
            fee: calculateTradingFee(orderAmount * price)
        });
        
        toast({
            title: `Order ${response.status}`,
            description: `Successfully ${side === 'buy' ? 'bought' : 'sold'} ${response.executedAmount.toFixed(6)} ${selectedAssetSymbol} at ~$${response.executedPrice.toFixed(2)}`,
        });
        setAmount("");
        setTotal("");

    } catch(error) {
        toast({
            title: "Order Failed",
            description: error instanceof Error ? error.message : "An unexpected error occurred.",
            variant: "destructive",
        });
    } finally {
        setIsProcessing(false);
    }
  }

  return (
    <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
      <CardHeader className="p-4">
        <div className="flex justify-between items-center">
             <CardTitle className="text-white">Trade</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="buy" onValueChange={setSide} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5">
            <TabsTrigger value="buy" className="data-[state=active]:bg-green-600/80">Buy</TabsTrigger>
            <TabsTrigger value="sell" className="data-[state=active]:bg-red-600/80">Sell</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mt-4">
            <Tabs defaultValue="market" onValueChange={(v) => { setOrderType(v); setAmount(''); setTotal(''); }} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/5 mb-4">
                    <TabsTrigger value="market">Market</TabsTrigger>
                    <TabsTrigger value="limit">Limit</TabsTrigger>
                </TabsList>

                <TabsContent value="market" className="space-y-4">
                     <div>
                        <Label htmlFor="amount-input-market" className="text-slate-300">Amount (USD)</Label>
                        <Input id="amount-input-market" placeholder="1,000.00" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-white/5 border-white/20 text-white"/>
                    </div>
                </TabsContent>

                <TabsContent value="limit" className="space-y-4">
                    <div>
                        <Label htmlFor="price-input-limit" className="text-slate-300">Limit Price (USD)</Label>
                        <Input id="price-input-limit" placeholder="67000.00" value={limitPrice} onChange={(e) => setLimitPrice(e.target.value)} className="bg-white/5 border-white/20 text-white"/>
                    </div>
                    <div>
                        <Label htmlFor="amount-input-limit" className="text-slate-300">Amount (BTC)</Label>
                        <Input id="amount-input-limit" placeholder="0.5" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-white/5 border-white/20 text-white"/>
                    </div>
                </TabsContent>
            </Tabs>
        </div>

        <Separator className="my-4 bg-white/20"/>

        <div className="space-y-2 text-sm">
            <div className="flex justify-between">
                <span className="text-slate-400">Total</span>
                <span className="text-white">{total || '0.00'} USD</span>
            </div>
        </div>

        <Button
            onClick={onSubmit}
            className={`w-full mt-4 text-white font-bold ${side === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
            disabled={!amount || (orderType === 'limit' && !limitPrice) || isProcessing}
        >
          {isProcessing ? "Processing..." : `${side === 'buy' ? 'Buy' : 'Sell'} ${selectedAssetSymbol}`}
        </Button>

      </CardContent>
    </Card>
  )
} 