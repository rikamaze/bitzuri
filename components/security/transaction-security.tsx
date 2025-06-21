"use client"

import { useState, memo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Shield, Smartphone, Key, Eye, EyeOff, AlertTriangle, Lock, Fingerprint, Mail, Activity, CheckCircle, Clock } from "lucide-react"
import { useTransactions } from "@/lib/hooks/useTransactions"

export const TransactionSecurity = memo(function TransactionSecurity() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [biometricEnabled, setBiometricEnabled] = useState(false)
  const [transactionLimits, setTransactionLimits] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [showApiKey, setShowApiKey] = useState(false)
  const [realtimeMonitoring, setRealtimeMonitoring] = useState(true)

  const { transactions } = useTransactions()
  
  // Get recent transactions for monitoring
  const recentTransactions = transactions.slice(0, 5)

  const securityFeatures = [
    {
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security to your account",
      icon: Smartphone,
      enabled: twoFactorEnabled,
      onToggle: setTwoFactorEnabled,
      status: "active",
    },
    {
      title: "Biometric Authentication",
      description: "Use fingerprint or face recognition for quick access",
      icon: Fingerprint,
      enabled: biometricEnabled,
      onToggle: setBiometricEnabled,
      status: "available",
    },
    {
      title: "Transaction Limits",
      description: "Set daily and monthly transaction limits",
      icon: Shield,
      enabled: transactionLimits,
      onToggle: setTransactionLimits,
      status: "active",
    },
    {
      title: "Email Notifications",
      description: "Get notified of all account activities",
      icon: Mail,
      enabled: emailNotifications,
      onToggle: setEmailNotifications,
      status: "active",
    },
    {
      title: "Real-time Monitoring",
      description: "Monitor all transactions in real-time",
      icon: Activity,
      enabled: realtimeMonitoring,
      onToggle: setRealtimeMonitoring,
      status: "active",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-400" />
            Security Center
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Security Score */}
          <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-semibold">Security Score</span>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Excellent</Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-4/5"></div>
              </div>
              <span className="text-white font-bold">85/100</span>
            </div>
            <p className="text-sm text-green-300 mt-2">Your account is well protected</p>
          </div>

          {/* Security Features */}
          <div className="space-y-4">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        feature.enabled ? "bg-green-500/20" : "bg-slate-500/20"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${feature.enabled ? "text-green-400" : "text-slate-400"}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{feature.title}</h4>
                      <p className="text-sm text-slate-300">{feature.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {feature.status === "active" && (
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">Active</Badge>
                    )}
                    <Switch checked={feature.enabled} onCheckedChange={feature.onToggle} />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* API Security */}
      <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Key className="h-5 w-5 text-purple-400" />
            API Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-300 text-sm font-medium">API Key</Label>
            <div className="relative">
              <Input
                type={showApiKey ? "text" : "password"}
                value="sk_live_1234567890abcdef1234567890abcdef"
                readOnly
                className="bg-white/5 border-white/20 text-white pr-12"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white h-8"
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
              Regenerate Key
            </Button>
            <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
              View Permissions
            </Button>
          </div>

          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <span className="text-xs text-yellow-300">
                Keep your API key secure. Never share it publicly or store it in client-side code.
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Limits */}
      <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Lock className="h-5 w-5 text-blue-400" />
            Transaction Limits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300 text-sm font-medium">Daily Limit (USD)</Label>
              <Input type="number" defaultValue="10000" className="bg-white/5 border-white/20 text-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300 text-sm font-medium">Monthly Limit (USD)</Label>
              <Input type="number" defaultValue="100000" className="bg-white/5 border-white/20 text-white" />
            </div>
          </div>

          <Separator className="bg-white/10" />

          <div className="space-y-3">
            <h4 className="font-semibold text-white text-sm">Current Usage</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Daily: $2,450 / $10,000</span>
                <span className="text-green-400">24.5%</span>
              </div>
              <div className="bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-1/4"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Monthly: $15,680 / $100,000</span>
                <span className="text-blue-400">15.7%</span>
              </div>
              <div className="bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full w-1/6"></div>
              </div>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
            Update Limits
          </Button>
        </CardContent>
      </Card>

      {/* Real-time Transaction Monitoring */}
      {realtimeMonitoring && (
        <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-400" />
              Real-time Transaction Monitor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 text-sm font-medium">Monitoring Active</span>
              </div>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Live</Badge>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-white text-sm">Recent Activity</h4>
              {recentTransactions.length > 0 ? (
                recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tx.status === "completed" ? "bg-green-500/20" : 
                        tx.status === "pending" ? "bg-yellow-500/20" : "bg-blue-500/20"
                      }`}>
                        {tx.status === "completed" ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : tx.status === "pending" ? (
                          <Clock className="h-4 w-4 text-yellow-400" />
                        ) : (
                          <Activity className="h-4 w-4 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium capitalize">{tx.type} {tx.asset}</p>
                        <p className="text-slate-400 text-xs">{new Date(tx.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-sm font-medium">{tx.amount} {tx.asset}</p>
                      <Badge className={
                        tx.status === "completed" ? "bg-green-500/20 text-green-300 border-green-500/30" :
                        tx.status === "pending" ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" :
                        "bg-blue-500/20 text-blue-300 border-blue-500/30"
                      }>
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-sm text-center py-4">No recent transactions</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
})
