"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, TrendingUp } from "lucide-react"

export default function EarnPage() {
  const [stakingAmount, setStakingAmount] = useState("")
  const [selectedPool, setSelectedPool] = useState("btc-pool")

  const stakingPools = [
    {
      id: "btc-pool",
      name: "Bitcoin Pool",
      symbol: "BTC",
      apy: 8.5,
      minStake: 0.001,
      lockPeriod: "30 days",
      totalStaked: "1,234 BTC",
      color: "from-orange-500 to-yellow-500",
    },
    {
      id: "eth-pool",
      name: "Ethereum Pool",
      symbol: "ETH",
      apy: 12.3,
      minStake: 0.1,
      lockPeriod: "60 days",
      totalStaked: "5,678 ETH",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "bnb-pool",
      name: "BNB Pool",
      symbol: "BNB",
      apy: 15.7,
      minStake: 1,
      lockPeriod: "90 days",
      totalStaked: "12,345 BNB",
      color: "from-yellow-500 to-orange-500",
    },
  ]

  const savingsProducts = [
    {
      name: "Flexible Savings",
      description: "Earn daily rewards with no lock-up period",
      apy: "3-6%",
      minAmount: "$10",
      features: ["Daily rewards", "No lock-up", "Instant withdrawal"],
    },
    {
      name: "Fixed Savings",
      description: "Higher returns with fixed terms",
      apy: "8-15%",
      minAmount: "$100",
      features: ["Higher APY", "Fixed terms", "Guaranteed returns"],
    },
    {
      name: "DeFi Yield",
      description: "Access to DeFi protocols with managed risk",
      apy: "12-25%",
      minAmount: "$500",
      features: ["DeFi access", "Risk management", "Auto-compound"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-4">
          BITZURI Earn
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Grow your crypto holdings with our secure earning products
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="staking" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10 max-w-2xl mx-auto">
            <TabsTrigger value="staking" className="data-[state=active]:bg-white/20">
              Staking
            </TabsTrigger>
            <TabsTrigger value="savings" className="data-[state=active]:bg-white/20">
              Savings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="staking" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Staking Pools */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white">Staking Pools</CardTitle>
                    <CardDescription className="text-slate-300">
                      Stake your crypto and earn rewards while securing the network
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stakingPools.map((pool, index) => (
                        <motion.div
                          key={pool.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            selectedPool === pool.id
                              ? "bg-white/15 border-purple-400"
                              : "bg-white/5 border-white/10 hover:bg-white/10"
                          }`}
                          onClick={() => setSelectedPool(pool.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div
                                className={`w-12 h-12 bg-gradient-to-r ${pool.color} rounded-lg flex items-center justify-center`}
                              >
                                <Coins className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-white font-medium">{pool.name}</h3>
                                <p className="text-slate-300 text-sm">
                                  Min stake: {pool.minStake} {pool.symbol}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-400">{pool.apy}%</div>
                              <div className="text-slate-300 text-sm">APY</div>
                            </div>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-slate-300">Lock Period:</span>
                              <span className="text-white ml-2">{pool.lockPeriod}</span>
                            </div>
                            <div>
                              <span className="text-slate-300">Total Staked:</span>
                              <span className="text-white ml-2">{pool.totalStaked}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Staking Interface */}
              <div className="space-y-6">
                <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white">Stake Now</CardTitle>
                    <CardDescription className="text-slate-300">Start earning rewards today</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-slate-200 text-sm">Amount to Stake</label>
                      <Input
                        placeholder="0.00"
                        value={stakingAmount}
                        onChange={(e) => setStakingAmount(e.target.value)}
                        className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400"
                      />
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Available: 2.5 BTC</span>
                        <button className="text-purple-400 hover:text-purple-300">Max</button>
                      </div>
                    </div>

                    <div className="space-y-3 p-3 bg-white/5 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Estimated Daily Rewards</span>
                        <span className="text-green-400">0.00023 BTC</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Lock Period</span>
                        <span className="text-white">30 days</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">APY</span>
                        <span className="text-green-400">8.5%</span>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                      Stake BTC
                    </Button>
                  </CardContent>
                </Card>

                {/* Active Stakes */}
                <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white">Your Stakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">BTC Stake</span>
                          <Badge className="bg-green-600">Active</Badge>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-300">Amount</span>
                            <span className="text-white">1.5 BTC</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-300">Rewards</span>
                            <span className="text-green-400">0.045 BTC</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-300">Unlock Date</span>
                            <span className="text-white">Dec 25, 2024</span>
                          </div>
                        </div>
                        <Progress value={65} className="mt-2 h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="savings" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {savingsProducts.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-white">{product.name}</CardTitle>
                      <CardDescription className="text-slate-300">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400">{product.apy}</div>
                        <div className="text-slate-300 text-sm">Annual Percentage Yield</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">Minimum</span>
                          <span className="text-white">{product.minAmount}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {product.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                            <span className="text-slate-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                        Start Earning
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
