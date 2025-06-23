"use client"

import { useState, memo, useCallback, useEffect } from "react"
import dynamic from "next/dynamic"
import QRCode from "react-qr-code"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AssetIcon } from "@/components/shared/asset-icon"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { usePortfolio } from "@/lib/hooks/usePortfolio"
import { useToast } from "@/components/ui/use-toast"
import { sendTransaction, validateAddress, getNetworkFee, generateDepositAddress } from "@/lib/api/walletService"
import { generateQRData, parseQRData } from "@/lib/api/qrService"
import { Send, Download, Copy, QrCode, AlertTriangle, CheckCircle, Scan, Wallet, Clock, Camera, X } from "lucide-react"
import { motion } from "framer-motion"

// Dynamically import QR Reader to avoid SSR issues
const QrReader = dynamic(() =>
  import('react-qr-reader').then(mod => mod.QrReader),
  {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-64"><LoadingSpinner /></div>
  }
)

export const SendReceive = memo(function SendReceive() {
  const [activeTab, setActiveTab] = useState("send")
  const [selectedAsset, setSelectedAsset] = useState("BTC")
  const [recipientAddress, setRecipientAddress] = useState("")
  const [sendAmount, setSendAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionHash, setTransactionHash] = useState("")
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [addressError, setAddressError] = useState("")
  const [networkFee, setNetworkFee] = useState(0)
  const [feeInUSD, setFeeInUSD] = useState(0)

  const { data: portfolioData, refresh: refreshPortfolio } = usePortfolio()
  const { toast } = useToast()
  const selectedHolding = portfolioData?.assets.find((asset) => asset.symbol === selectedAsset)

  // Update network fees when asset changes
  useEffect(() => {
    const fee = getNetworkFee(selectedAsset)
    setNetworkFee(fee)
    
    // Calculate USD value of fee
    const assetPrice = selectedHolding?.price || 0
    setFeeInUSD(fee * assetPrice)
  }, [selectedAsset, selectedHolding])

  // Validate address when it changes
  useEffect(() => {
    if (recipientAddress) {
      const isValid = validateAddress(recipientAddress, selectedAsset)
      setAddressError(isValid ? "" : `Invalid ${selectedAsset} address format`)
    } else {
      setAddressError("")
    }
  }, [recipientAddress, selectedAsset])

  const canSend = useCallback(() => {
    const amount = Number.parseFloat(sendAmount)
    return (
      recipientAddress.length > 0 &&
      !addressError &&
      sendAmount &&
      amount > 0 &&
      selectedHolding &&
      selectedHolding.balance >= (amount + networkFee) // Include network fee
    )
  }, [recipientAddress, addressError, sendAmount, selectedHolding, networkFee])

  const handleSend = useCallback(async () => {
    if (!canSend()) return
    
    setIsProcessing(true)
    try {
      const response = await sendTransaction({
        asset: selectedAsset,
        to: recipientAddress,
        amount: Number.parseFloat(sendAmount),
        fee: networkFee
      })
      
      setTransactionHash(response.hash)
      
      toast({
        title: "Transaction Sent Successfully!",
        description: `${sendAmount} ${selectedAsset} sent to ${recipientAddress.slice(0, 10)}...`,
        duration: 5000,
      })
      
      // Refresh portfolio
      await refreshPortfolio()
      
      // Reset form
      setRecipientAddress("")
      setSendAmount("")
      
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsProcessing(false)
    }
  }, [selectedAsset, recipientAddress, sendAmount, networkFee, canSend, toast, refreshPortfolio])

  const handleQRScan = useCallback((data: string | null) => {
    if (data) {
      const parsed = parseQRData(data)
      if (parsed) {
        setRecipientAddress(parsed.address)
        if (parsed.amount) {
          setSendAmount(parsed.amount.toString())
        }
        setShowQRScanner(false)
        toast({
          title: "QR Code Scanned",
          description: "Address has been filled automatically",
        })
      } else {
        // Try to use raw data as address
        setRecipientAddress(data)
        setShowQRScanner(false)
      }
    }
  }, [toast])

  const handleMaxAmount = useCallback(() => {
    if (selectedHolding) {
      const maxSendable = Math.max(0, selectedHolding.balance - networkFee)
      setSendAmount(maxSendable.toString())
    }
  }, [selectedHolding, networkFee])



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

                {/* Recipient Address with Enhanced Validation */}
                <div className="space-y-2">
                  <Label className="text-slate-300 text-sm font-medium">Recipient Address</Label>
                  <div className="relative">
                    <Input
                      placeholder={`Enter ${selectedAsset} wallet address`}
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value.trim())}
                      className={`h-12 bg-white/5 border-white/20 text-white placeholder:text-slate-400 pr-12 ${
                        addressError ? "border-red-500/50" : recipientAddress && !addressError ? "border-green-500/50" : ""
                      }`}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowQRScanner(true)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 h-8"
                    >
                      <Scan className="h-4 w-4" />
                    </Button>
                  </div>
                  {addressError && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {addressError}
                    </p>
                  )}
                  {recipientAddress && !addressError && (
                    <p className="text-xs text-green-400 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Valid {selectedAsset} address
                    </p>
                  )}
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
                      onClick={handleMaxAmount}
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
                      <div className="text-right">
                        <span className="text-white font-medium">
                          {networkFee} {selectedAsset}
                        </span>
                        <p className="text-xs text-slate-400">
                          ≈ ${feeInUSD.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-2">
                      <span className="text-slate-300 font-medium">Total</span>
                      <div className="text-right">
                        <span className="text-white font-bold">
                          {sendAmount ? (Number.parseFloat(sendAmount) + networkFee).toFixed(6) : "0.000000"}{" "}
                          {selectedAsset}
                        </span>
                        <p className="text-xs text-slate-400">
                          ≈ ${sendAmount ? ((Number.parseFloat(sendAmount) + networkFee) * (selectedHolding?.price || 0)).toFixed(2) : "0.00"}
                        </p>
                      </div>
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
                      onClick={() => navigator.clipboard.writeText(transactionHash)}
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

            {/* Enhanced Wallet Address with Real QR Code */}
            <div className="space-y-4">
              <div className="p-6 bg-white/5 rounded-lg border border-white/10 text-center">
                <div className="w-48 h-48 bg-white rounded-lg mx-auto mb-4 p-4">
                  <QRCode
                    value={generateQRData({
                      address: generateDepositAddress(selectedAsset),
                      asset: selectedAsset,
                      label: `${selectedAsset} Deposit Address`
                    })}
                    size={176}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  />
                </div>
                <p className="text-sm text-slate-300 mb-2">Your {selectedAsset} Deposit Address</p>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white font-mono text-sm break-all flex-1 mr-2">
                    {generateDepositAddress(selectedAsset)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(generateDepositAddress(selectedAsset))
                      toast({
                        title: "Address Copied",
                        description: "Deposit address copied to clipboard",
                      })
                    }}
                    className="text-purple-400 hover:text-purple-300"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Important Notice */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-blue-400" />
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

      {/* QR Scanner Dialog */}
      <Dialog open={showQRScanner} onOpenChange={setShowQRScanner}>
        <DialogContent className="backdrop-blur-md bg-slate-900/95 border-white/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Scan QR Code
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <div style={{ width: '100%' }}>
                <QrReader
                  onResult={(result, error) => {
                    if (result?.getText()) {
                      handleQRScan(result.getText());
                    } else if (error) {
                      console.error('QR Scanner Error:', error);
                      toast({
                        title: "Scanner Error",
                        description: "Unable to access camera. Please check permissions.",
                        variant: "destructive",
                      });
                    }
                  }}
                  constraints={{ facingMode: "environment" }}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setShowQRScanner(false)}
                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <p className="text-xs text-slate-400 self-center">
                Point camera at QR code
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
})
