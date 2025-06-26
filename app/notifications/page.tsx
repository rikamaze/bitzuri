"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  AlertCircle,
  TrendingUp,
  Wallet,
  Shield,
  Info,
  Check,
  Clock,
  ChevronRight,
  Settings,
  X,
  CheckCircle,
} from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

type NotificationType = "price" | "security" | "transaction" | "system"

interface Notification {
  id: number
  type: NotificationType
  title: string
  message: string
  time: string
  read: boolean
}

// Mock notification data
const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "price",
    title: "BTC Price Alert",
    message: "Bitcoin has increased by 5% in the last hour, now at $58,245.00",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "security",
    title: "New Login Detected",
    message: "A new login was detected from San Francisco, CA. If this wasn't you, please secure your account.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "transaction",
    title: "Deposit Confirmed",
    message: "Your deposit of 5,000 USDT has been confirmed and credited to your account.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 4,
    type: "system",
    title: "Scheduled Maintenance",
    message: "Bitzuri will undergo scheduled maintenance on June 30, 2025, from 2:00 AM to 4:00 AM UTC.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 5,
    type: "price",
    title: "ETH Price Alert",
    message: "Ethereum has decreased by 3% in the last 24 hours, now at $3,120.50",
    time: "3 days ago",
    read: true,
  },
]

const notificationTypes: Record<
  NotificationType,
  { icon: React.ElementType; color: string; label: string }
> = {
  price: { icon: TrendingUp, color: "text-blue-400", label: "Price Alerts" },
  security: { icon: Shield, color: "text-red-400", label: "Security" },
  transaction: { icon: Wallet, color: "text-green-400", label: "Transactions" },
  system: { icon: Info, color: "text-purple-400", label: "System Updates" },
}

const NotificationIcon = ({ type }: { type: NotificationType }) => {
  const Icon = notificationTypes[type]?.icon || Bell
  const color = notificationTypes[type]?.color || "text-slate-400"
  return <Icon className={`h-6 w-6 ${color}`} />
}

const NotificationItem = ({
  notification,
  onMarkAsRead,
  onDelete,
}: {
  notification: Notification
  onMarkAsRead: (id: number) => void
  onDelete: (id: number) => void
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className={`relative p-4 rounded-lg flex items-start gap-4 transition-colors ${
      notification.read ? "bg-white/5" : "bg-white/10"
    }`}
  >
    {!notification.read && <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-blue-500"></div>}
    <div className="pt-1">
      <NotificationIcon type={notification.type} />
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-white">{notification.title}</h4>
      <p className="text-sm text-slate-300 mt-1">{notification.message}</p>
      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-slate-400 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {notification.time}
        </p>
        <div className="flex items-center gap-2">
          {!notification.read && (
            <Button
              size="sm"
              variant="ghost"
              className="text-xs h-auto px-2 py-1 text-slate-300 hover:bg-white/10 hover:text-white"
              onClick={() => onMarkAsRead(notification.id)}
            >
              Mark as read
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            className="text-xs h-auto px-2 py-1 text-slate-300 hover:bg-red-500/20 hover:text-red-400"
            onClick={() => onDelete(notification.id)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  </motion.div>
)

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<NotificationType | "all">("all")
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  const markAsRead = useCallback((id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    )
    toast.success("Notification marked as read")
  }, [])

  const deleteNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
    toast.error("Notification deleted")
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    toast.success("All notifications marked as read")
  }, [])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
    toast.error("All notifications cleared")
  }, [])

  const filteredNotifications = useMemo(() => {
    if (activeTab === "all") return notifications
    return notifications.filter(n => n.type === activeTab)
  }, [activeTab, notifications])

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 lg:p-6 text-white">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Notifications
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {unreadCount > 0 ? `You have ${unreadCount} unread notifications.` : "All caught up!"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              variant="outline"
              size="sm"
              className="gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              <CheckCircle className="h-4 w-4" />
              Mark all as read
            </Button>
            <Link href="/settings#notifications">
              <Button variant="outline" size="icon" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
            <CardHeader>
              <div className="flex space-x-1 p-1 bg-white/5 rounded-lg">
                <Button
                  onClick={() => setActiveTab("all")}
                  variant={activeTab === "all" ? "secondary" : "ghost"}
                  className={`w-full ${activeTab === "all" ? "bg-white/10" : "hover:bg-white/10"}`}
                >
                  All {notifications.length > 0 && <Badge className="ml-2">{notifications.length}</Badge>}
                </Button>
                {Object.entries(notificationTypes).map(([key, { label }]) => (
                  <Button
                    key={key}
                    onClick={() => setActiveTab(key as NotificationType)}
                    variant={activeTab === key ? "secondary" : "ghost"}
                    className={`w-full ${activeTab === key ? "bg-white/10" : "hover:bg-white/10"}`}
                  >
                    {label}
                    {notifications.filter(n => n.type === key).length > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {notifications.filter(n => n.type === key).length}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onDelete={deleteNotification}
                  />
                ))
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <Bell className="mx-auto h-12 w-12 mb-4" />
                  <h3 className="text-lg font-semibold text-white">No notifications here</h3>
                  <p>It looks like you're all caught up.</p>
                </div>
              )}
            </CardContent>
          </Card>
          {notifications.length > 0 && (
            <div className="text-center mt-6">
              <Button
                onClick={clearAllNotifications}
                variant="link"
                className="text-slate-400 hover:text-red-400"
              >
                Clear all notifications
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}