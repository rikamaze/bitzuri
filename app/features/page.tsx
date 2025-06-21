"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Shield,
  Zap,
  TrendingUp,
  Calendar,
  Users,
  BookOpen,
  Wallet,
  Target,
  Repeat,
  Gift,
  Star,
  Lock,
  Smartphone,
} from "lucide-react"

export default function FeaturesPage() {
  const [priceAlerts, setPriceAlerts] = useState([
    { crypto: "BTC", price: 45000, type: "above", active: true },
    { crypto: "ETH", price: 2500, type: "below", active: false },
  ])

  const features = [
    {
      icon: Zap,
      title: "Instant Trading",
      description: "Execute trades in milliseconds with our advanced matching engine",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Multi-layer security with cold storage and insurance protection",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Never miss market opportunities with intelligent price notifications",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Professional charts and technical indicators for informed decisions",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Repeat,
      title: "DCA Automation",
      description: "Dollar-cost averaging with automated recurring purchases",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Target,
      title: "Copy Trading",
      description: "Follow and copy successful traders automatically",
      color: "from-red-500 to-pink-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-4">
          BITZURI Features
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Discover powerful tools designed to enhance your crypto trading experience
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="trading" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/5 border border-white/10 max-w-2xl mx-auto">
            <TabsTrigger value="trading" className="data-[state=active]:bg-white/20">
              Trading
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-white/20">
              Security
            </TabsTrigger>
            <TabsTrigger value="automation" className="data-[state=active]:bg-white/20">
              Automation
            </TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:bg-white/20">
              Social
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trading" className="space-y-8">
            {/* Advanced Trading Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }}>
                <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white">Advanced Orders</CardTitle>
                    <CardDescription className="text-slate-300">
                      Stop-loss, take-profit, and conditional orders
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                        <span className="text-slate-300 text-sm">Market Orders</span>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                        <span className="text-slate-300 text-sm">Limit Orders</span>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                        <span className="text-slate-300 text-sm">Stop-Loss</span>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white">Lightning Fast</CardTitle>
                    <CardDescription className="text-slate-300">Sub-millisecond order execution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">0.1ms</div>
                        <div className="text-slate-300 text-sm">Average execution time</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">Order Matching</span>
                          <span className="text-green-400">99.9% uptime</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">API Response</span>
                          <span className="text-green-400">&lt; 50ms</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white">Smart Routing</CardTitle>
                    <CardDescription className="text-slate-300">
                      Best price execution across multiple exchanges
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">12+</div>
                        <div className="text-slate-300 text-sm">Connected exchanges</div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        Enable Smart Routing
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Price Alerts Section */}
            <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Price Alerts
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Set up intelligent price notifications for your favorite cryptocurrencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">Create New Alert</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-slate-300 text-sm">Cryptocurrency</label>
                        <Input
                          placeholder="BTC"
                          className="bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <label className="text-slate-300 text-sm">Target Price</label>
                        <Input
                          placeholder="$45,000"
                          className="bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                      Create Alert
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">Active Alerts</h4>
                    <div className="space-y-2">
                      {priceAlerts.map((alert, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{alert.crypto}</span>
                            </div>
                            <div>
                              <p className="text-white text-sm">
                                {alert.type === "above" ? "Above" : "Below"} ${alert.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Switch checked={alert.active} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white">Multi-Layer Security</CardTitle>
                    <CardDescription className="text-slate-300">
                      Your assets are protected by industry-leading security measures
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                        <div className="flex items-center space-x-2">
                          <Lock className="h-4 w-4 text-green-400" />
                          <span className="text-slate-300 text-sm">2FA Authentication</span>
                        </div>
                        <Badge className="bg-green-600">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                        <div className="flex items-center space-x-2">
                          <Smartphone className="h-4 w-4 text-green-400" />
                          <span className="text-slate-300 text-sm">Biometric Login</span>
                        </div>
                        <Badge className="bg-green-600">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                        <div className="flex items-center space-x-2">
                          <Wallet className="h-4 w-4 text-green-400" />
                          <span className="text-slate-300 text-sm">Cold Storage</span>
                        </div>
                        <Badge className="bg-green-600">95% Assets</Badge>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                      Security Settings
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white">Insurance Protection</CardTitle>
                    <CardDescription className="text-slate-300">
                      Your funds are insured up to $250,000 per account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">$250K</div>
                      <div className="text-slate-300 text-sm">Insurance coverage per account</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Coverage Type</span>
                        <span className="text-white">FDIC Insured</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Provider</span>
                        <span className="text-white">Lloyd's of London</span>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="automation" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }}>
                <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <Repeat className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white">DCA Strategy</CardTitle>
                    <CardDescription className="text-slate-300">
                      Automate your investments with dollar-cost averaging
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">$500</div>
                        <div className="text-slate-300 text-sm">Weekly investment</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">Next Purchase</span>
                          <span className="text-white">Tomorrow</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">Total Invested</span>
                          <span className="text-white">$12,500</span>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                        Setup DCA
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white">Scheduled Orders</CardTitle>
                    <CardDescription className="text-slate-300">Set up recurring buy and sell orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">3</div>
                        <div className="text-slate-300 text-sm">Active schedules</div>
                      </div>
                      <div className="space-y-2">
                        <div className="p-2 bg-white/5 rounded text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-300">BTC Buy</span>
                            <span className="text-green-400">Weekly</span>
                          </div>
                        </div>
                        <div className="p-2 bg-white/5 rounded text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-300">ETH Buy</span>
                            <span className="text-green-400">Monthly</span>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                        Manage Schedules
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white">Smart Rebalancing</CardTitle>
                    <CardDescription className="text-slate-300">Automatically rebalance your portfolio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">Auto</div>
                        <div className="text-slate-300 text-sm">Rebalancing enabled</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">Frequency</span>
                          <span className="text-white">Monthly</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">Threshold</span>
                          <span className="text-white">5%</span>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white">Copy Trading</CardTitle>
                    <CardDescription className="text-slate-300">
                      Follow and automatically copy successful traders
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">JD</span>
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">John Doe</p>
                            <p className="text-green-400 text-xs">+24.5% this month</p>
                          </div>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-pink-600 to-rose-600">
                          Follow
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">AS</span>
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">Alice Smith</p>
                            <p className="text-green-400 text-xs">+18.2% this month</p>
                          </div>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-pink-600 to-rose-600">
                          Follow
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700">
                      Explore Traders
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <Gift className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white">Referral Program</CardTitle>
                    <CardDescription className="text-slate-300">
                      Earn rewards by inviting friends to BITZURI
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-white font-medium">Beginner Course</h4>
                          <Badge className="bg-green-600">Free</Badge>
                        </div>
                        <p className="text-slate-300 text-sm mb-3">Learn the basics of cryptocurrency and trading</p>
                        <Button size="sm" className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                          Start Learning
                        </Button>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-white font-medium">Technical Analysis</h4>
                          <Badge className="bg-blue-600">Premium</Badge>
                        </div>
                        <p className="text-slate-300 text-sm mb-3">Master chart patterns and trading indicators</p>
                        <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600">
                          Unlock Course
                        </Button>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-white font-medium">Advanced Strategies</h4>
                          <Badge className="bg-purple-600">Pro</Badge>
                        </div>
                        <p className="text-slate-300 text-sm mb-3">
                          Professional trading strategies and risk management
                        </p>
                        <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                          Coming Soon
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Learning Center */}
            <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  BITZURI Academy
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Learn crypto trading from beginner to advanced levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">Beginner Course</h4>
                      <Badge className="bg-green-600">Free</Badge>
                    </div>
                    <p className="text-slate-300 text-sm mb-3">Learn the basics of cryptocurrency and trading</p>
                    <Button size="sm" className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                      Start Learning
                    </Button>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">Technical Analysis</h4>
                      <Badge className="bg-blue-600">Premium</Badge>
                    </div>
                    <p className="text-slate-300 text-sm mb-3">Master chart patterns and trading indicators</p>
                    <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600">
                      Unlock Course
                    </Button>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">Advanced Strategies</h4>
                      <Badge className="bg-purple-600">Pro</Badge>
                    </div>
                    <p className="text-slate-300 text-sm mb-3">Professional trading strategies and risk management</p>
                    <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                      Coming Soon
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
