"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Wallet, 
  Monitor, 
  Languages, 
  HelpCircle, 
  LogOut,
  Check,
  X
} from "lucide-react"

const notificationFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  priceAlerts: z.boolean().default(true),
  securityAlerts: z.boolean().default(true),
  tradingUpdates: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
})

const securityFormSchema = z.object({
  loginNotifications: z.boolean().default(true),
  twoFactorAuth: z.boolean().default(true),
  sessionTimeout: z.enum(["15", "30", "60", "never"], {
    required_error: "Please select a session timeout.",
  }),
  ipWhitelisting: z.boolean().default(false),
})

const tradingFormSchema = z.object({
  defaultOrderType: z.enum(["market", "limit", "stop", "stop_limit"], {
    required_error: "Please select a default order type.",
  }),
  confirmTrades: z.boolean().default(true),
  defaultLeverage: z.number().min(1).max(100),
  tradingView: z.enum(["basic", "advanced", "professional"], {
    required_error: "Please select a trading view.",
  }),
})

const accountSetupSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),
  country: z.string().min(1, { message: "Please select your country." }),
  twoFactorEnabled: z.boolean().default(false),
  tradingExperience: z.string().min(1, { message: "Please select your trading experience." }),
})

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("notifications")
  const router = useRouter()
  
  const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      priceAlerts: true,
      securityAlerts: true,
      tradingUpdates: true,
      marketingEmails: false,
    },
  })
  
  const securityForm = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      loginNotifications: true,
      twoFactorAuth: true,
      sessionTimeout: "30",
      ipWhitelisting: false,
    },
  })
  
  const tradingForm = useForm<z.infer<typeof tradingFormSchema>>({
    resolver: zodResolver(tradingFormSchema),
    defaultValues: {
      defaultOrderType: "market",
      confirmTrades: true,
      defaultLeverage: 1,
      tradingView: "basic",
    },
  })
  
  const accountSetupForm = useForm<z.infer<typeof accountSetupSchema>>({
    resolver: zodResolver(accountSetupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      country: "",
      twoFactorEnabled: false,
      tradingExperience: "",
    },
  })

  function onNotificationSubmit(values: z.infer<typeof notificationFormSchema>) {
    console.log(values)
    toast.success("Notification settings saved!")
  }
  
  function onSecuritySubmit(values: z.infer<typeof securityFormSchema>) {
    console.log(values)
    toast.success("Security settings saved!")
  }
  
  function onTradingSubmit(values: z.infer<typeof tradingFormSchema>) {
    console.log(values)
    toast.success("Trading settings saved!")
  }
  
  function onAccountSetupSubmit(values: z.infer<typeof accountSetupSchema>) {
    console.log(values)
    toast.success("Account setup completed successfully!")
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-slate-400 mt-2">
            Customize your Bitzuri experience and account preferences.
          </p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="card-glass border rounded-xl overflow-hidden">
            <CardContent className="p-4">
              <TabsList className="flex flex-col space-y-2 bg-transparent p-0">
                <TabsTrigger 
                  value="notifications"
                  className="w-full justify-start data-[state=active]:bg-white/10 data-[state=active]:text-white"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger 
                  value="security"
                  className="w-full justify-start data-[state=active]:bg-white/10 data-[state=active]:text-white"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </TabsTrigger>
                <TabsTrigger 
                  value="trading"
                  className="w-full justify-start data-[state=active]:bg-white/10 data-[state=active]:text-white"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Trading
                </TabsTrigger>
                <Button 
                  variant="ghost"
                  className="w-full justify-start hover:bg-white/10" 
                  onClick={() => router.push("/profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <TabsTrigger 
                  value="account-setup"
                  className="w-full justify-start data-[state=active]:bg-white/10 data-[state=active]:text-white"
                >
                  <User className="mr-2 h-4 w-4" />
                  Account Setup
                </TabsTrigger>
                <TabsTrigger 
                  value="help"
                  className="w-full justify-start data-[state=active]:bg-white/10 data-[state=active]:text-white"
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Support
                </TabsTrigger>
                <Separator className="my-2 bg-white/10" />
                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </TabsList>
            </CardContent>
          </Card>
          
          <Card className="card-glass border rounded-xl overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg gradient-text">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 hover:bg-white/5 p-2 rounded-md transition-all">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <span className="text-sm">Verified Account</span>
              </div>
              <div className="flex items-center space-x-2 hover:bg-white/5 p-2 rounded-md transition-all">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <span className="text-sm">2FA Enabled</span>
              </div>
              <div className="flex items-center space-x-2 hover:bg-white/5 p-2 rounded-md transition-all">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500"></div>
                <span className="text-sm">API Access Limited</span>
              </div>
              <div className="flex items-center space-x-2 hover:bg-white/5 p-2 rounded-md transition-all">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <span className="text-sm">Trading Enabled</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-3">
          <TabsContent value="notifications" className="mt-0" forceMount={activeTab === "notifications"}>
            <Card className="card-glass border rounded-xl overflow-hidden">
              <CardHeader>
                <CardTitle className="gradient-text">Notification Settings</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications from Bitzuri.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...notificationForm}>
                  <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Channels</h3>
                      <FormField
                        control={notificationForm.control}
                        name="emailNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4 hover:bg-white/5 transition-all">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Email Notifications</FormLabel>
                              <FormDescription>
                                Receive notifications via email.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationForm.control}
                        name="pushNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Push Notifications</FormLabel>
                              <FormDescription>
                                Receive notifications on your devices.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Types</h3>
                      <FormField
                        control={notificationForm.control}
                        name="priceAlerts"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Price Alerts</FormLabel>
                              <FormDescription>
                                Get notified about significant price movements.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationForm.control}
                        name="securityAlerts"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Security Alerts</FormLabel>
                              <FormDescription>
                                Get notified about security-related events.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationForm.control}
                        name="tradingUpdates"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Trading Updates</FormLabel>
                              <FormDescription>
                                Get notified about your trades and orders.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationForm.control}
                        name="marketingEmails"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Marketing Emails</FormLabel>
                              <FormDescription>
                                Receive promotional offers and updates.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">Save Notification Settings</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-0" forceMount={activeTab === "security"}>
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and authentication methods.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...securityForm}>
                  <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
                        <div>
                          <p className="font-medium">Password</p>
                          <p className="text-sm text-slate-400">Last changed 45 days ago</p>
                        </div>
                        <Button>Change Password</Button>
                      </div>
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Authentication</h3>
                      <FormField
                        control={securityForm.control}
                        name="twoFactorAuth"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Two-Factor Authentication</FormLabel>
                              <FormDescription>
                                Add an extra layer of security to your account.
                              </FormDescription>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              {field.value && <Button variant="outline" size="sm">Configure</Button>}
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={securityForm.control}
                        name="sessionTimeout"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Session Timeout</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select session timeout" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="15">15 minutes</SelectItem>
                                <SelectItem value="30">30 minutes</SelectItem>
                                <SelectItem value="60">1 hour</SelectItem>
                                <SelectItem value="never">Never</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Automatically log out after a period of inactivity.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Advanced Security</h3>
                      <FormField
                        control={securityForm.control}
                        name="loginNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Login Notifications</FormLabel>
                              <FormDescription>
                                Get notified when someone logs into your account.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={securityForm.control}
                        name="ipWhitelisting"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">IP Whitelisting</FormLabel>
                              <FormDescription>
                                Restrict account access to specific IP addresses.
                              </FormDescription>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              {field.value && <Button variant="outline" size="sm">Configure</Button>}
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Device Management</h3>
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg border border-white/10">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Current Device</p>
                              <p className="text-sm text-slate-400">Chrome on Windows • San Francisco, CA</p>
                            </div>
                            <Badge className="bg-green-500/20 text-green-400">Active Now</Badge>
                          </div>
                        </div>
                        <div className="p-4 rounded-lg border border-white/10">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">iPhone 13</p>
                              <p className="text-sm text-slate-400">iOS • Last active 2 hours ago</p>
                            </div>
                            <Button variant="outline" size="sm">Revoke</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">Save Security Settings</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trading" className="mt-0" forceMount={activeTab === "trading"}>
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Trading Settings</CardTitle>
                <CardDescription>
                  Customize your trading experience and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...tradingForm}>
                  <form onSubmit={tradingForm.handleSubmit(onTradingSubmit)} className="space-y-8">
                    <FormField
                      control={tradingForm.control}
                      name="defaultOrderType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Order Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select default order type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="market">Market</SelectItem>
                              <SelectItem value="limit">Limit</SelectItem>
                              <SelectItem value="stop">Stop</SelectItem>
                              <SelectItem value="stop_limit">Stop Limit</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            The default order type when placing trades.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={tradingForm.control}
                      name="confirmTrades"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Confirm Trades</FormLabel>
                            <FormDescription>
                              Show confirmation dialog before executing trades.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={tradingForm.control}
                      name="defaultLeverage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Leverage</FormLabel>
                          <div className="flex items-center space-x-4">
                            <FormControl>
                              <Slider
                                min={1}
                                max={100}
                                step={1}
                                defaultValue={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                                className="w-full"
                              />
                            </FormControl>
                            <span className="w-12 text-center">{field.value}x</span>
                          </div>
                          <FormDescription>
                            Default leverage for margin trading. Higher values increase both potential profits and risks.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={tradingForm.control}
                      name="tradingView"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trading View</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select trading view" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="basic">Basic</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                              <SelectItem value="professional">Professional</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose the complexity level of your trading interface.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Chart Preferences</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
                          <div>
                            <p className="font-medium">Default Timeframe</p>
                            <p className="text-sm text-slate-400">Default chart timeframe</p>
                          </div>
                          <Button variant="outline">1H</Button>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
                          <div>
                            <p className="font-medium">Chart Type</p>
                            <p className="text-sm text-slate-400">Default chart visualization</p>
                          </div>
                          <Button variant="outline">Candlestick</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">Save Trading Settings</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account-setup" className="mt-0" forceMount={activeTab === "account-setup"}>
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Complete Your Profile</CardTitle>
                <CardDescription>
                  Provide your information to personalize your experience and enable all features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-8">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  </TabsList>
                  
                  <Form {...accountSetupForm}>
                    <form onSubmit={accountSetupForm.handleSubmit(onAccountSetupSubmit)} className="space-y-8">
                      <TabsContent value="personal" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={accountSetupForm.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={accountSetupForm.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={accountSetupForm.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (555) 123-4567" {...field} />
                              </FormControl>
                              <FormDescription>
                                Used for account recovery and security notifications.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={accountSetupForm.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country of Residence</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your country" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="us">United States</SelectItem>
                                  <SelectItem value="ca">Canada</SelectItem>
                                  <SelectItem value="uk">United Kingdom</SelectItem>
                                  <SelectItem value="au">Australia</SelectItem>
                                  <SelectItem value="sg">Singapore</SelectItem>
                                  <SelectItem value="jp">Japan</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Your country determines available features and compliance requirements.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                      
                      <TabsContent value="security" className="space-y-6">
                        <FormField
                          control={accountSetupForm.control}
                          name="twoFactorEnabled"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Two-Factor Authentication</FormLabel>
                                <FormDescription>
                                  Enhance your account security with 2FA verification.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <div className="rounded-lg border border-white/10 p-4">
                          <h3 className="text-lg font-medium mb-2">Recovery Options</h3>
                          <p className="text-slate-400 mb-4">
                            Set up recovery methods to ensure you never lose access to your account.
                          </p>
                          <Button variant="outline" className="mr-4">Set Up Recovery Email</Button>
                          <Button variant="outline">Generate Recovery Codes</Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="preferences" className="space-y-6">
                        <FormField
                          control={accountSetupForm.control}
                          name="tradingExperience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Trading Experience</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your experience level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="beginner">Beginner</SelectItem>
                                  <SelectItem value="intermediate">Intermediate</SelectItem>
                                  <SelectItem value="advanced">Advanced</SelectItem>
                                  <SelectItem value="professional">Professional</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                This helps us customize your trading interface and recommendations.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Notification Preferences</h3>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Price Alerts</p>
                              <p className="text-sm text-slate-400">Get notified about significant price movements</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator className="bg-white/10" />
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Trading Activity</p>
                              <p className="text-sm text-slate-400">Notifications about your trades and orders</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator className="bg-white/10" />
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">News and Updates</p>
                              <p className="text-sm text-slate-400">Latest crypto news and platform updates</p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </TabsContent>
                      
                      <div className="flex justify-end">
                        <Button type="submit">Save Profile Settings</Button>
                      </div>
                    </form>
                  </Form>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-white/10 pt-6">
                <p className="text-sm text-slate-400">
                  By completing your profile, you agree to our Terms of Service and Privacy Policy.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="help" className="mt-0" forceMount={activeTab === "help"}>
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Help & Support</CardTitle>
                <CardDescription>
                  Get help with your Bitzuri account and trading.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-lg border border-white/10 bg-white/5">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 rounded-full bg-blue-500/20">
                        <HelpCircle className="h-6 w-6 text-blue-400" />
                      </div>
                      <h3 className="text-lg font-medium">Help Center</h3>
                    </div>
                    <p className="text-slate-400 mb-4">
                      Browse our comprehensive knowledge base for answers to common questions.
                    </p>
                    <Button className="w-full">Visit Help Center</Button>
                  </div>
                  <div className="p-6 rounded-lg border border-white/10 bg-white/5">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 rounded-full bg-green-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium">Live Chat</h3>
                    </div>
                    <p className="text-slate-400 mb-4">
                      Chat with our support team for immediate assistance with your account.
                    </p>
                    <Button className="w-full">Start Chat</Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-white/10">
                      <h4 className="font-medium mb-2">How do I deposit funds?</h4>
                      <p className="text-sm text-slate-400">
                        To deposit funds, navigate to the Wallet section and click on "Deposit". You can choose from various payment methods including bank transfer, credit card, or cryptocurrency.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-white/10">
                      <h4 className="font-medium mb-2">How long do withdrawals take?</h4>
                      <p className="text-sm text-slate-400">
                        Cryptocurrency withdrawals typically process within 30 minutes to 2 hours. Bank withdrawals may take 1-5 business days depending on your location and bank.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-white/10">
                      <h4 className="font-medium mb-2">How do I enable two-factor authentication?</h4>
                      <p className="text-sm text-slate-400">
                        Go to Security settings, find the Two-Factor Authentication section, and click "Enable". Follow the instructions to set up with an authenticator app.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 rounded-lg border border-white/10 bg-white/5">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-full bg-purple-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium">Contact Support</h3>
                  </div>
                  <p className="text-slate-400 mb-4">
                    Need more help? Our support team is available 24/7 to assist you.
                  </p>
                  <div className="space-y-4">
                    <Input placeholder="Subject" />
                    <textarea 
                      className="w-full h-32 rounded-md border border-white/10 bg-slate-800 px-3 py-2 text-sm"
                      placeholder="Describe your issue in detail..."
                    ></textarea>
                    <Button className="w-full">Submit Support Request</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </div>
      </Tabs>
    </div>
  )
}