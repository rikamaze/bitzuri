"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { 
  User, 
  Shield, 
  Wallet, 
  History, 
  Bell, 
  Settings, 
  LogOut, 
  Upload, 
  Check, 
  Clock, 
  AlertTriangle 
} from "lucide-react"

const profileSchema = z.object({
  displayName: z.string().min(2, { message: "Display name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  bio: z.string().max(160, { message: "Bio must not exceed 160 characters." }).optional(),
})

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: "Alex Trader",
      email: "alex@example.com",
      bio: "Crypto enthusiast and day trader. Focused on DeFi and emerging blockchain technologies.",
    },
  })

  function onSubmit(values: z.infer<typeof profileSchema>) {
    // In a real app, this would send the data to your backend
    console.log(values)
    toast.success("Profile updated successfully!")
  }

  const recentActivity = [
    { 
      type: "trade", 
      title: "BTC/USDT Trade", 
      description: "Bought 0.05 BTC at $58,245.00", 
      time: "2 hours ago",
      status: "completed",
      icon: Check
    },
    { 
      type: "deposit", 
      title: "USDT Deposit", 
      description: "Deposited 5,000 USDT", 
      time: "Yesterday",
      status: "completed",
      icon: Check
    },
    { 
      type: "withdrawal", 
      title: "ETH Withdrawal", 
      description: "Withdrew 2.5 ETH to external wallet", 
      time: "3 days ago",
      status: "pending",
      icon: Clock
    },
    { 
      type: "login", 
      title: "New Login Detected", 
      description: "Login from new device in San Francisco, CA", 
      time: "5 days ago",
      status: "alert",
      icon: AlertTriangle
    },
  ]

  return (
    <div className="container py-10 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-4">
          <Card className="card-glass border rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-white/10 shadow-lg">
                    <AvatarImage src="/avatar-placeholder.png" alt="Profile" />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-purple-600 to-cyan-600">AT</AvatarFallback>
                  </Avatar>
                  <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-gradient-to-r from-purple-600 to-cyan-600 border-0 shadow-lg hover-effect">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold gradient-text">Alex Trader</h2>
                  <p className="text-sm text-slate-400">Member since June 2023</p>
                </div>
                <Badge className="bg-gradient-to-r from-purple-600 to-cyan-600 shadow-sm">
                  <Check className="h-3 w-3 mr-1" /> Verified
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-glass border rounded-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="space-y-1 py-2">
                <Button 
                  variant={activeTab === "overview" ? "secondary" : "ghost"} 
                  className={`w-full justify-start hover-effect ${
                    activeTab === "overview" 
                      ? "bg-white/15 text-white border-l-2 border-purple-500" 
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Overview
                </Button>
                <Button 
                  variant={activeTab === "security" ? "secondary" : "ghost"} 
                  className={`w-full justify-start hover-effect ${
                    activeTab === "security" 
                      ? "bg-white/15 text-white border-l-2 border-purple-500" 
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => setActiveTab("security")}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </Button>
                <Button 
                  variant={activeTab === "payment" ? "secondary" : "ghost"} 
                  className={`w-full justify-start hover-effect ${
                    activeTab === "payment" 
                      ? "bg-white/15 text-white border-l-2 border-purple-500" 
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => setActiveTab("payment")}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Payment Methods
                </Button>
                <Button 
                  variant={activeTab === "activity" ? "secondary" : "ghost"} 
                  className={`w-full justify-start hover-effect ${
                    activeTab === "activity" 
                      ? "bg-white/15 text-white border-l-2 border-purple-500" 
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => setActiveTab("activity")}
                >
                  <History className="mr-2 h-4 w-4" />
                  Activity
                </Button>
                <Button 
                  variant={activeTab === "notifications" ? "secondary" : "ghost"} 
                  className={`w-full justify-start hover-effect ${
                    activeTab === "notifications" 
                      ? "bg-white/15 text-white border-l-2 border-purple-500" 
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button 
                  variant={activeTab === "settings" ? "secondary" : "ghost"} 
                  className={`w-full justify-start hover-effect ${
                    activeTab === "settings" 
                      ? "bg-white/15 text-white border-l-2 border-purple-500" 
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Separator className="my-2 bg-white/10" />
                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10 hover-effect">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          <TabsContent value="overview" className="mt-0" forceMount={activeTab === "overview"}>
            <Card className="card-glass border rounded-xl overflow-hidden">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Manage your personal information and how it appears on Bitzuri.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="displayName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Name</FormLabel>
                          <FormControl>
                            <Input {...field} className="input-field" />
                          </FormControl>
                          <FormDescription>
                            This is your public display name on the platform.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input {...field} className="input-field" />
                          </FormControl>
                          <FormDescription>
                            Your email is used for notifications and account recovery.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us a bit about yourself" 
                              className="resize-none input-field" 
                              {...field} 
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormDescription>
                            Brief description for your profile. Maximum 160 characters.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="btn-primary">Save Changes</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card className="card-glass border rounded-xl overflow-hidden mt-6">
              <CardHeader>
                <CardTitle>Account Statistics</CardTitle>
                <CardDescription>
                  Overview of your account activity and status.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border border-white/10 bg-white/5 hover-effect">
                    <p className="text-sm text-slate-400">Total Trades</p>
                    <p className="text-2xl font-bold gradient-text">247</p>
                    <p className="text-xs text-green-400">+12% from last month</p>
                  </div>
                  <div className="p-4 rounded-lg border border-white/10 bg-white/5 hover-effect">
                    <p className="text-sm text-slate-400">Trading Volume</p>
                    <p className="text-2xl font-bold gradient-text">$128,450</p>
                    <p className="text-xs text-green-400">+8% from last month</p>
                  </div>
                  <div className="p-4 rounded-lg border border-white/10 bg-white/5 hover-effect">
                    <p className="text-sm text-slate-400">Account Level</p>
                    <p className="text-2xl font-bold gradient-text">Silver</p>
                    <p className="text-xs text-slate-400">75% to Gold</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="mt-0" forceMount={activeTab === "activity"}>
            <Card className="card-glass border rounded-xl overflow-hidden">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Track your recent actions and transactions on the platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon
                    return (
                      <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-white/5 transition-all">
                        <div className={`mt-0.5 rounded-full p-2 ${
                          activity.status === 'completed' ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 shadow-sm' :
                          activity.status === 'pending' ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-400 shadow-sm' :
                          'bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-400 shadow-sm'
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-xs text-slate-400">{activity.time}</p>
                          </div>
                          <p className="text-sm text-slate-400">{activity.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline">View All Activity</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-0" forceMount={activeTab === "security"}>
            <Card className="card-glass border rounded-xl overflow-hidden">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and authentication methods.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password</h3>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-all">
                    <div>
                      <p className="font-medium">Change Password</p>
                      <p className="text-sm text-slate-400">Last changed 45 days ago</p>
                    </div>
                    <Button className="btn-secondary">Update</Button>
                  </div>
                </div>
                
                <Separator className="bg-white/10" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-all">
                    <div>
                      <p className="font-medium">Authenticator App</p>
                      <p className="text-sm text-green-400">Enabled</p>
                    </div>
                    <Button variant="outline" className="btn-secondary">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-all">
                    <div>
                      <p className="font-medium">SMS Authentication</p>
                      <p className="text-sm text-slate-400">Not enabled</p>
                    </div>
                    <Button className="btn-primary">Enable</Button>
                  </div>
                </div>
                
                <Separator className="bg-white/10" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Active Sessions</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-all">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-slate-400">Chrome on Windows • San Francisco, CA</p>
                        </div>
                        <Badge className="bg-gradient-to-r from-green-600 to-emerald-600">Active Now</Badge>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-all">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Mobile App</p>
                          <p className="text-sm text-slate-400">iOS • Last active 2 hours ago</p>
                        </div>
                        <Button variant="outline" size="sm" className="btn-secondary">Logout</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment" className="mt-0" forceMount={activeTab === "payment"}>
            <Card className="card-glass border rounded-xl overflow-hidden">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your payment methods for deposits and withdrawals.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md flex items-center justify-center shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <rect width="20" height="14" x="2" y="5" rx="2" />
                          <line x1="2" x2="22" y1="10" y2="10" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-slate-400">Expires 04/2026</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="btn-secondary">Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-500/10 hover-effect">Remove</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-md flex items-center justify-center shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <rect width="20" height="14" x="2" y="5" rx="2" />
                          <circle cx="6" cy="12" r="1" />
                          <circle cx="10" cy="12" r="1" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Bank Account (ACH)</p>
                        <p className="text-sm text-slate-400">Chase Bank ****6789</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="btn-secondary">Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-500/10 hover-effect">Remove</Button>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-0" forceMount={activeTab === "notifications"}>
            <Card className="card-glass border rounded-xl overflow-hidden">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications from Bitzuri.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Price Alerts</p>
                          <p className="text-sm text-slate-400">Get notified when your watched assets change significantly</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <Separator className="bg-white/10" />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Account Activity</p>
                          <p className="text-sm text-slate-400">Logins, password changes, and security alerts</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <Separator className="bg-white/10" />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Trading Updates</p>
                          <p className="text-sm text-slate-400">Order confirmations, executions, and cancellations</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <Separator className="bg-white/10" />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">News and Updates</p>
                          <p className="text-sm text-slate-400">Platform announcements and crypto news</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Push Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Mobile App Notifications</p>
                          <p className="text-sm text-slate-400">Manage notifications sent to your mobile device</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <Separator className="bg-white/10" />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Browser Notifications</p>
                          <p className="text-sm text-slate-400">Receive alerts in your web browser</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0" forceMount={activeTab === "settings"}>
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Display Preferences</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
                      <div>
                        <p className="font-medium">Theme</p>
                        <p className="text-sm text-slate-400">Choose between light and dark mode</p>
                      </div>
                      <Button variant="outline">Dark</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
                      <div>
                        <p className="font-medium">Currency Display</p>
                        <p className="text-sm text-slate-400">Your preferred currency for displaying values</p>
                      </div>
                      <Button variant="outline">USD</Button>
                    </div>
                  </div>
                </div>
                
                <Separator className="bg-white/10" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Trading Preferences</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-all">
                      <div>
                        <p className="font-medium">Default Order Type</p>
                        <p className="text-sm text-slate-400">Set your preferred order type</p>
                      </div>
                      <Button variant="outline" className="btn-secondary">Market</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-all">
                      <div>
                        <p className="font-medium">Trade Confirmations</p>
                        <p className="text-sm text-slate-400">Require confirmation before executing trades</p>
                      </div>
                      <Button variant="outline" className="btn-secondary">Enabled</Button>
                    </div>
                  </div>
                </div>
                
                <Separator className="bg-white/10" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Account Management</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-all">
                      <div>
                        <p className="font-medium">Account Verification</p>
                        <p className="text-sm text-slate-400">Complete verification to unlock all features</p>
                      </div>
                      <Badge className="bg-gradient-to-r from-green-600 to-emerald-600">Verified</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-all">
                      <div>
                        <p className="font-medium">API Access</p>
                        <p className="text-sm text-slate-400">Manage API keys for programmatic access</p>
                      </div>
                      <Button variant="outline" className="btn-secondary">Manage</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-gradient-to-r from-red-500/5 to-rose-500/5 hover:bg-white/5 transition-all">
                      <div>
                        <p className="font-medium text-red-400">Close Account</p>
                        <p className="text-sm text-slate-400">Permanently close your Bitzuri account</p>
                      </div>
                      <Button variant="outline" className="text-red-500 hover:text-red-400 hover:bg-red-500/10 hover-effect">
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </div>
    </div>
  )
}