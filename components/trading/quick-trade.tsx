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
import { Skeleton } from "@/components/ui/skeleton"

export function QuickTrade() {
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState("BTC")
  const [amount, setAmount] = useState("")
  const [receiveAmount, setReceiveAmount] = useState("")

  const { toast } = useToast()
  const { marketData, loading } = useMarketData()

  const selectedAsset = useMemo(
    () => marketData.find((asset) => asset.symbol === selectedAssetSymbol),
    [marketData, selectedAssetSymbol],
  )

  useEffect(() => {
    if (selectedAsset && amount) {
      const value = parseFloat(amount) / selectedAsset.price
      setReceiveAmount(value.toFixed(8))
    } else {
      setReceiveAmount("")
    }
  }, [amount, selectedAsset])

  function onSubmit(side: "buy" | "sell") {
    toast({
      title: `Order Submitted: ${side.toUpperCase()}`,
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(
              { side, asset: selectedAssetSymbol, amount, receiveAmount },
              null,
              2,
            )}
          </code>
        </pre>
      ),
    })
  }

  return (
    <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white">Quick Trade</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5">
            <TabsTrigger
              value="buy"
              className="data-[state=active]:bg-green-600/80"
            >
              Buy
            </TabsTrigger>
            <TabsTrigger
              value="sell"
              className="data-[state=active]:bg-red-600/80"
            >
              Sell
            </TabsTrigger>
          </TabsList>
          <div className="py-4 space-y-4">
            <div>
              <Label htmlFor="asset-select" className="text-slate-300">
                Asset
              </Label>
              {loading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Select
                  value={selectedAssetSymbol}
                  onValueChange={setSelectedAssetSymbol}
                >
                  <SelectTrigger
                    id="asset-select"
                    className="bg-white/5 border-white/20 text-white"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {marketData.map((asset) => (
                      <SelectItem key={asset.symbol} value={asset.symbol}>
                        <div className="flex items-center gap-2">
                          <AssetIcon symbol={asset.symbol} />
                          <span>
                            {asset.name} ({asset.symbol})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div>
              <Label htmlFor="amount-input" className="text-slate-300">
                Amount (USD)
              </Label>
              <Input
                id="amount-input"
                placeholder="1,000.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-slate-400"
              />
            </div>
            {selectedAsset && (
              <div className="text-sm text-slate-300 text-center">
                1 {selectedAsset.symbol} ≈ ${selectedAsset.price.toLocaleString()}
              </div>
            )}
            <div>
              <Label htmlFor="receive-amount-input" className="text-slate-300">
                You receive
              </Label>
              <Input
                id="receive-amount-input"
                readOnly
                placeholder="0.00000000"
                value={receiveAmount}
                className="bg-black/20 border-white/10 text-slate-300 placeholder:text-slate-500"
              />
            </div>
          </div>
          <TabsContent value="buy">
            <Button
              onClick={() => onSubmit("buy")}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              disabled={!amount || !selectedAsset}
            >
              Buy {selectedAssetSymbol}
            </Button>
          </TabsContent>
          <TabsContent value="sell">
            <Button
              onClick={() => onSubmit("sell")}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              disabled={!amount || !selectedAsset}
            >
              Sell {selectedAssetSymbol}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
