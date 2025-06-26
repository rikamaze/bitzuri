"use client"

import { useState, useMemo } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
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
  AlertTriangle,
  CreditCard,
  Banknote,
  KeyRound,
  Eye,
  Plus,
} from "lucide-react"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

const profileSchema = z.object({
  displayName: z.string().min(2, { message: "Display name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  bio: z.string().max(160, { message: "Bio must not exceed 160 characters." }).optional(),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(8, "Password must be at least 8 characters"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
})

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isUploading, setIsUploading] = useState(false)

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: "Alex Trader",
      email: "alex@example.com",
      bio: "Crypto enthusiast and day trader. Focused on DeFi and emerging blockchain technologies.",
    },
  })

  function onSubmit(values: z.infer<typeof profileSchema>) {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
      loading: "Updating profile...",
      success: "Profile updated successfully!",
      error: "Failed to update profile.",
    })
  }

  const handleAvatarUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      toast.success("Avatar updated successfully!")
    }, 2000)
  }

  const renderIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="h-4 w-4 text-green-400" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      default:
        return null
    }
  }

  const recentActivity = useMemo(
    () => [
      {
        type: "trade",
        title: "BTC/USDT Trade",
        description: "Bought 0.05 BTC",
        time: "2 hours ago",
        status: "completed",
      },
      {
        type: "deposit",
        title: "USDT Deposit",
        description: "Deposited 5,000 USDT",
        time: "Yesterday",
        status: "completed",
      },
      {
        type: "withdrawal",
        title: "ETH Withdrawal",
        description: "Withdrew 2.5 ETH to external wallet",
        time: "3 days ago",
        status: "pending",
      },
      {
        type: "login",
        title: "New Login Detected",
        description: "From new device in San Francisco, CA",
        time: "5 days ago",
        status: "alert",
      },
    ],
    [],
  )

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 lg:p-6 text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-20 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              User Profile & Settings
            </h1>
            <Button variant="ghost" className="text-red-400 hover:bg-red-500/10 hover:text-red-300 gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-4 gap-6"
          >
            {/* Sidebar */}
            <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
              <Card className="card-glass">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="w-24 h-24 border-4 border-white/10 shadow-lg">
                        <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                        <AvatarFallback className="text-2xl bg-gradient-to-r from-purple-600 to-cyan-600">
                          AT
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={handleAvatarUpload}
                        className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 bg-gradient-to-r from-purple-600 to-cyan-600 border-2 border-slate-800 shadow-lg hover:scale-110 transition-transform"
                      >
                        {isUploading ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <Upload className="h-4 w-4 text-white" />
                        )}
                      </Button>
                    </div>
                    <div className="text-center">
                      <h2 className="text-xl font-bold text-white">Alex Trader</h2>
                      <p className="text-sm text-slate-400">Member since June 2023</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30 font-medium">
                      <Check className="h-3 w-3 mr-1" />
                      KYC Verified
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-glass">
                <CardContent className="p-2">
                  <div className="space-y-1">
                    {[
                      { id: "overview", label: "Overview", icon: User },
                      { id: "security", label: "Security", icon: Shield },
                      { id: "payment", label: "Payment Methods", icon: Wallet },
                      { id: "activity", label: "Activity", icon: History },
                      { id: "notifications", label: "Notifications", icon: Bell },
                      { id: "settings", label: "API Settings", icon: Settings },
                    ].map(({ id, label, icon: Icon }) => (
                      <Button
                        key={id}
                        variant="ghost"
                        className={`w-full justify-start gap-3 h-11 transition-all duration-200 ${
                          activeTab === id
                            ? "bg-white/10 text-white font-semibold"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                        onClick={() => setActiveTab(id)}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-3"
            >
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="overview">
                  <motion.div variants={itemVariants}>
                    <Card className="card-glass">
                      <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Manage your personal information.</CardDescription>
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
                                    <Input type="email" {...field} className="input-field" />
                                  </FormControl>
                                  <FormDescription>
                                    Used for notifications and account recovery.
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
                                    <Textarea {...field} className="input-field" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="flex justify-end">
                              <Button type="submit" className="button-primary">
                                Save Changes
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="security">
                  <motion.div variants={itemVariants} className="space-y-6">
                    <Card className="card-glass">
                      <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                          Change your password regularly to keep your account secure.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form className="space-y-4">
                          <Input
                            type="password"
                            placeholder="Current Password"
                            className="input-field"
                          />
                          <Input type="password" placeholder="New Password" className="input-field" />
                          <Input
                            type="password"
                            placeholder="Confirm New Password"
                            className="input-field"
                          />
                          <div className="flex justify-end">
                            <Button className="button-primary">Update Password</Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>

                    <Card className="card-glass">
                      <CardHeader>
                        <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
                        <CardDescription>
                          Add an extra layer of security to your account.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">Authenticator App</p>
                          <p className="text-sm text-slate-400">Enabled</p>
                        </div>
                        <Button variant="destructive">Disable</Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="payment">
                  <motion.div variants={itemVariants} className="space-y-6">
                    <Card className="card-glass">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>Payment Methods</CardTitle>
                          <CardDescription>
                            Add and manage your payment methods.
                          </CardDescription>
                        </div>
                        <Button className="button-primary gap-2">
                          <Plus className="h-4 w-4" /> Add Method
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 rounded-lg border border-white/20 flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <CreditCard className="h-6 w-6 text-cyan-400" />
                            <div>
                              <p className="font-semibold">Visa **** 4242</p>
                              <p className="text-sm text-slate-400">Expires 12/26</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">Remove</Button>
                        </div>
                        <div className="p-4 rounded-lg border border-white/20 flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <Banknote className="h-6 w-6 text-green-400" />
                            <div>
                              <p className="font-semibold">Bank Account ***5678</p>
                              <p className="text-sm text-slate-400">Checking</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">Remove</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="activity">
                  <motion.div variants={itemVariants}>
                    <Card className="card-glass">
                      <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                          A log of recent account activity.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {recentActivity.map((item, index) => (
                            <motion.li
                              key={index}
                              variants={itemVariants}
                              className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                            >
                              <div className="flex items-center gap-4">
                                <div className="p-2 rounded-full bg-slate-700">
                                  {renderIcon(item.status)}
                                </div>
                                <div>
                                  <p className="font-semibold">{item.title}</p>
                                  <p className="text-sm text-slate-400">{item.description}</p>
                                </div>
                              </div>
                              <p className="text-xs text-slate-500">{item.time}</p>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                 <TabsContent value="notifications">
                  <motion.div variants={itemVariants}>
                    <Card className="card-glass">
                      <CardHeader>
                        <CardTitle>Notification Settings</CardTitle>
                        <CardDescription>
                          Choose what you want to be notified about.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                         {/* Notification settings content here */}
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="settings">
                  <motion.div variants={itemVariants}>
                    <Card className="card-glass">
                      <CardHeader>
                        <CardTitle>API Settings</CardTitle>
                        <CardDescription>
                          Manage your API keys for third-party services.
                        </CardDescription>
                      </CardHeader>
                       <CardContent>
                         {/* API settings content here */}
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

              </Tabs>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </ErrorBoundary>
  )
}