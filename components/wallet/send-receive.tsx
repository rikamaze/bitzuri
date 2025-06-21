"use client"

import { useState, memo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { AssetIcon } from "@/components/shared/asset-icon"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { usePortfolio } from "@/lib/hooks/usePortfolio"
import { Send, Download, Copy, QrCode, Shield, AlertTriangle, CheckCircle, Scan, Wallet, Clock } from "lucide-react"

export const SendReceive = memo(function SendReceive() {
  const [activeTab, setActiveTab] = useState("send")
  const [selectedAsset, setSelectedAsset] = useState("BTC")
  const [recipientAddress, setRecipientAddress] = useState("")
  const [sendAmount, setSendAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionHash, setTransactionHash] = useState("")

  const { data: portfolioData } = usePortfolio()
  const selectedHolding = portfolioData?.assets.find((asset) => asset.symbol === selectedAsset)

  const handleSend = async () => {
    setIsProcessing(true)
    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setTransactionHash("0x1234567890abcdef1234567890abcdef12345678")
    setIsProcessing(false)
    // Reset form
    setRecipientAddress("")
    setSendAmount("")
  }

  const canSend = () => {
    return (
      recipientAddress.length > 0 &&
      sendAmount &&
      Number.parseFloat(sendAmount) > 0 &&
      selectedHolding &&
      selectedHolding.balance >= Number.parseFloat(sendAmount)
    )
  }

  const getNetworkFee = () => {
    const fees: Record<string, number> = {
      BTC: 0.0001,
      ETH: 0.002,
      BNB: 0.0005,
      ADA: 0.17,
      SOL: 0.00025,
    }
    return fees[selectedAsset] || 0.001
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <Wallet className="h-5 w-5 text-purple-400" />
          Send & Receive
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
            <TabsTrigger
              value="send"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-slate-300"
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </TabsTrigger>
            <TabsTrigger
              value="receive"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-slate-300"
            >
              <Download className="h-4 w-4 mr-2" />
              Receive
            </TabsTrigger>
          </TabsList>

          {/* Send Tab */}
          <TabsContent value="send" className="space-y-6">
            {!transactionHash ? (
              <>
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
                      {portfolioData?.assets.map((asset) => (
                        <SelectItem key={asset.symbol} value={asset.symbol}>
                          <div className="flex items-center gap-3">
                            <AssetIcon symbol={asset.symbol} size="sm" />
                            <div>
                              <span className="font-medium">{asset.symbol}</span>
                              <span className="text-sm text-slate-400 ml-2">Balance: {asset.balance.toFixed(6)}</span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Recipient Address */}
                <div className="space-y-2">
                  <Label className="text-slate-300 text-sm font-medium">Recipient Address</Label>
                  <div className="relative">
                    <Input
                      placeholder="Enter wallet address or scan QR code"
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                      className="h-12 bg-white/5 border-white/20 text-white placeholder:text-slate-400 pr-12"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 h-8"
                    >
                      <Scan className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-300 text-sm font-medium">Amount</Label>
                    <span className="text-xs text-slate-400">
                      Available: {selectedHolding?.balance.toFixed(6) || "0.000000"} {selectedAsset}
                    </span>
                  </div>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      className="h-12 bg-white/5 border-white/20 text-white placeholder:text-slate-400 pr-16"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSendAmount(selectedHolding?.balance.toString() || "0")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 h-8"
                    >
                      Max
                    </Button>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                {/* Transaction Summary */}
                <div className="space-y-3 p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="font-semibold text-white text-sm">Transaction Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Amount to send</span>
                      <span className="text-white font-medium">
                        {sendAmount || "0.00"} {selectedAsset}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Network fee</span>
                      <span className="text-white font-medium">
                        {getNetworkFee()} {selectedAsset}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-2">
                      <span className="text-slate-300 font-medium">Total</span>
                      <span className="text-white font-bold">
                        {sendAmount ? (Number.parseFloat(sendAmount) + getNetworkFee()).toFixed(6) : "0.000000"}{" "}
                        {selectedAsset}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs text-yellow-300">
                    Double-check the recipient address. Transactions cannot be reversed.
                  </span>
                </div>

                {/* Send Button */}
                <Button
                  onClick={handleSend}
                  disabled={!canSend() || isProcessing}
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send {selectedAsset}
                    </div>
                  )}
                </Button>
              </>
            ) : (
              /* Transaction Success */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Transaction Sent!</h3>
                  <p className="text-slate-300 text-sm">Your {selectedAsset} has been sent successfully</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Transaction Hash</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(transactionHash)}
                      className="text-purple-400 hover:text-purple-300"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-white font-mono text-sm mt-2 break-all">{transactionHash}</p>
                </div>
                <Button
                  onClick={() => setTransactionHash("")}
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  Send Another Transaction
                </Button>
              </motion.div>
            )}
          </TabsContent>

          {/* Receive Tab */}
          <TabsContent value="receive" className="space-y-6">
            {/* Asset Selection */}
            <div className="space-y-2">
              <Label className="text-slate-300 text-sm font-medium">Select Asset to Receive</Label>
              <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                <SelectTrigger className="h-12 bg-white/5 border-white/20 text-white">
                  <div className="flex items-center gap-3">
                    <AssetIcon symbol={selectedAsset} size="sm" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {portfolioData?.assets.map((asset) => (
                    <SelectItem key={asset.symbol} value={asset.symbol}>
                      <div className="flex items-center gap-3">
                        <AssetIcon symbol={asset.symbol} size="sm" />
                        <span className="font-medium">{asset.symbol}</span>
                        <span className="text-sm text-slate-400">({asset.name})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Wallet Address */}
            <div className="space-y-4">
              <div className="p-6 bg-white/5 rounded-lg border border-white/10 text-center">
                <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-slate-800" />
                </div>
                <p className="text-sm text-slate-300 mb-2">Your {selectedAsset} Address</p>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white font-mono text-sm break-all">
                    bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh")}
                    className="text-purple-400 hover:text-purple-300 ml-2"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Important Notice */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <span className="text-xs text-blue-300">
                    Only send {selectedAsset} to this address. Other assets will be lost.
                  </span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <Clock className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs text-yellow-300">
                    Transactions require network confirmations and may take several minutes.
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
})
