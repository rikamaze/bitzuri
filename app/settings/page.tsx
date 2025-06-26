"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { toast } from "sonner"
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Briefcase,
  LogOut,
  ChevronRight,
} from "lucide-react"
import { ErrorBoundary } from "@/components/ui/error-boundary"

// Schemas for different settings forms
const notificationsSchema = z.object({
  priceAlerts: z.boolean().default(true),
  securityAlerts: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
})

const securitySchema = z.object({
  twoFactorEnabled: z.boolean().default(true),
  loginNotifications: z.boolean().default(true),
})

const appearanceSchema = z.object({
  theme: z.enum(["dark", "light", "system"]).default("dark"),
  accentColor: z.string().default("purple"),
})

const tradingSchema = z.object({
  defaultOrderType: z.enum(["limit", "market"]).default("limit"),
  tradeConfirmations: z.boolean().default(true),
  defaultSlippage: z.number().min(0.1).max(5).default(0.5),
})

type SettingsTab = "general" | "security" | "notifications" | "appearance" | "trading"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general")
  const router = useRouter()

  const notificationsForm = useForm({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      priceAlerts: true,
      securityAlerts: true,
      marketingEmails: false,
    },
  })
  // ... other form initializations

  const onSubmit = (data: any, formName: string) => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: `Saving ${formName} settings...`,
      success: `${formName} settings saved!`,
      error: `Failed to save ${formName} settings.`,
    })
  }

  const menuItems = [
    { id: "general", label: "General", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "trading", label: "Trading", icon: Briefcase },
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <Card className="card-glass">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your main account settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>General settings form goes here.</p>
            </CardContent>
          </Card>
        )
      case "security":
        return (
          <Card className="card-glass">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your account security settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationsForm}>
                <form
                  onSubmit={notificationsForm.handleSubmit((data) => onSubmit(data, "Security"))}
                  className="space-y-8"
                >
                  <FormField
                    control={notificationsForm.control}
                    name="securityAlerts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/20 p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Two-Factor Authentication</FormLabel>
                          <FormDescription>
                            Enable 2FA for enhanced account security.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
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
        )
      case "notifications":
        return (
          <Card className="card-glass">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Choose what you want to be notified about.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Form for notifications */}
            </CardContent>
          </Card>
        )
        case "appearance":
          return (
            <Card className="card-glass">
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of the application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Form for appearance */}
              </CardContent>
            </Card>
          )
        case "trading":
          return (
            <Card className="card-glass">
              <CardHeader>
                <CardTitle>Trading</CardTitle>
                <CardDescription>
                  Customize your trading preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Form for trading */}
              </CardContent>
            </Card>
          )
      default:
        return null
    }
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
              Settings
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
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Card className="card-glass">
                <CardContent className="p-2">
                  <div className="space-y-1">
                    {menuItems.map(({ id, label, icon: Icon }) => (
                      <Button
                        key={id}
                        variant="ghost"
                        onClick={() => setActiveTab(id as SettingsTab)}
                        className={`w-full justify-start gap-3 h-11 transition-all duration-200 ${
                          activeTab === id
                            ? "bg-white/10 text-white font-semibold"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{label}</span>
                      </Button>
                    ))}
                    <Button
                      variant="ghost"
                      onClick={() => router.push("/profile")}
                      className="w-full justify-start gap-3 h-11 text-slate-300 hover:bg-white/5 hover:text-white"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-3"
            >
              {renderContent()}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </ErrorBoundary>
  )
}