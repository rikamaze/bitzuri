"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  Settings
} from "lucide-react"
import { toast } from "sonner"

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  
  // Mock notification data
  const notifications = [
    {
      id: 1,
      type: "price",
      title: "BTC Price Alert",
      message: "Bitcoin has increased by 5% in the last hour, now at $58,245.00",
      time: "10 minutes ago",
      read: false,
      category: "price"
    },
    {
      id: 2,
      type: "security",
      title: "New Login Detected",
      message: "A new login was detected from San Francisco, CA. If this wasn't you, please secure your account.",
      time: "2 hours ago",
      read: false,
      category: "security"
    },
    {
      id: 3,
      type: "transaction",
      title: "Deposit Confirmed",
      message: "Your deposit of 5,000 USDT has been confirmed and credited to your account.",
      time: "Yesterday",
      read: true,
      category: "transaction"
    },
    {
      id: 4,
      type: "system",
      title: "Scheduled Maintenance",
      message: "Bitzuri will undergo scheduled maintenance on June 30, 2025, from 2:00 AM to 4:00 AM UTC.",
      time: "2 days ago",
      read: true,
      category: "system"
    },
    {
      id: 5,
      type: "price",
      title: "ETH Price Alert",
      message: "Ethereum has decreased by 3% in the last 24 hours, now at $3,120.50",
      time: "3 days ago",
      read: true,
      category: "price"
    },
    {
      id: 6,
      type: "transaction",
      title: "Withdrawal Processed",
      message: "Your withdrawal of 2.5 ETH has been processed and is pending blockchain confirmation.",
      time: "4 days ago",
      read: true,
      category: "transaction"
    },
    {
      id: 7,
      type: "system",
      title: "New Feature Available",
      message: "We've launched a new staking feature! Earn up to 12% APY on your crypto assets.",
      time: "1 week ago",
      read: true,
      category: "system"
    },
    {
      id: 8,
      type: "security",
      title: "Security Settings Updated",
      message: "Your account security settings were updated. Two-factor authentication is now enabled.",
      time: "1 week ago",
      read: true,
      category: "security"
    }
  ]
  
  const [userNotifications, setUserNotifications] = useState(notifications)
  
  const markAsRead = (id: number) => {
    setUserNotifications(
      userNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
    toast.success("Notification marked as read")
  }
  
  const markAllAsRead = () => {
    setUserNotifications(
      userNotifications.map(notification => ({ ...notification, read: true }))
    )
    toast.success("All notifications marked as read")
  }
  
  const deleteNotification = (id: number) => {
    setUserNotifications(
      userNotifications.filter(notification => notification.id !== id)
    )
    toast.success("Notification deleted")
  }
  
  const clearAllNotifications = () => {
    setUserNotifications([])
    toast.success("All notifications cleared")
  }
  
  const filteredNotifications = userNotifications.filter(notification => {
    if (activeTab === "all") return true
    return notification.category === activeTab
  })
  
  const unreadCount = userNotifications.filter(notification => !notification.read).length
  const priceAlertsCount = userNotifications.filter(notification => notification.category === "price").length
  const securityAlertsCount = userNotifications.filter(notification => notification.category === "security").length
  const transactionAlertsCount = userNotifications.filter(notification => notification.category === "transaction").length
  const systemAlertsCount = userNotifications.filter(notification => notification.category === "system").length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "price":
        return <TrendingUp className="h-5 w-5 text-blue-400" />
      case "security":
        return <Shield className="h-5 w-5 text-red-400" />
      case "transaction":
        return <Wallet className="h-5 w-5 text-green-400" />
      case "system":
        return <Info className="h-5 w-5 text-purple-400" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Notifications
          </h1>
          <p className="text-slate-400 mt-2">
            Stay updated with important alerts and information about your account.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark All as Read
          </Button>
          <Button variant="outline" onClick={clearAllNotifications} disabled={userNotifications.length === 0}>
            Clear All
          </Button>
          <Button variant="outline" onClick={() => window.location.href = "/settings"}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="card-glass border rounded-xl overflow-hidden">
            <CardContent className="p-4">
              <div className="space-y-2">
                <Button 
                  variant={activeTab === "all" ? "secondary" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("all")}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  All Notifications
                  {unreadCount > 0 && (
                    <Badge className="ml-auto bg-blue-500">{unreadCount}</Badge>
                  )}
                </Button>
                <Button 
                  variant={activeTab === "price" ? "secondary" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("price")}
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Price Alerts
                  {priceAlertsCount > 0 && (
                    <Badge className="ml-auto bg-slate-700">{priceAlertsCount}</Badge>
                  )}
                </Button>
                <Button 
                  variant={activeTab === "security" ? "secondary" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("security")}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Security Alerts
                  {securityAlertsCount > 0 && (
                    <Badge className="ml-auto bg-slate-700">{securityAlertsCount}</Badge>
                  )}
                </Button>
                <Button 
                  variant={activeTab === "transaction" ? "secondary" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("transaction")}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Transactions
                  {transactionAlertsCount > 0 && (
                    <Badge className="ml-auto bg-slate-700">{transactionAlertsCount}</Badge>
                  )}
                </Button>
                <Button 
                  variant={activeTab === "system" ? "secondary" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("system")}
                >
                  <Info className="mr-2 h-4 w-4" />
                  System Updates
                  {systemAlertsCount > 0 && (
                    <Badge className="ml-auto bg-slate-700">{systemAlertsCount}</Badge>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-glass border rounded-xl overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg gradient-text">Notification Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Unread</span>
                <span className="font-medium">{unreadCount}</span>
              </div>
              <Separator className="bg-white/10" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Total</span>
                <span className="font-medium">{userNotifications.length}</span>
              </div>
              <Separator className="bg-white/10" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Last Updated</span>
                <span className="font-medium">Just now</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-3">
          <Card className="card-glass border rounded-xl overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle>
                {activeTab === "all" ? "All Notifications" : 
                 activeTab === "price" ? "Price Alerts" :
                 activeTab === "security" ? "Security Alerts" :
                 activeTab === "transaction" ? "Transaction Notifications" :
                 "System Updates"}
              </CardTitle>
              <CardDescription>
                {filteredNotifications.length === 0 
                  ? "No notifications to display" 
                  : `Showing ${filteredNotifications.length} notification${filteredNotifications.length !== 1 ? 's' : ''}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-10">
                  <Bell className="h-12 w-12 mx-auto text-slate-500 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Notifications</h3>
                  <p className="text-slate-400">
                    You don't have any {activeTab !== "all" ? activeTab + " " : ""}notifications at the moment.
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 rounded-lg border hover:bg-white/5 transition-all ${notification.read ? 'border-white/10' : 'border-blue-500/30 bg-blue-500/5'}`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="mt-0.5 rounded-full p-2 bg-gradient-to-r from-slate-800 to-slate-700 shadow-sm">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <p className="font-medium">{notification.title}</p>
                            {!notification.read && (
                              <Badge className="ml-2 bg-gradient-to-r from-blue-500 to-indigo-500">New</Badge>
                            )}
                          </div>
                          <p className="text-xs text-slate-400">{notification.time}</p>
                        </div>
                        <p className="text-sm text-slate-400">{notification.message}</p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex space-x-2">
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 px-2 text-xs hover-effect"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-3.5 w-3.5 mr-1" />
                                Mark as read
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 px-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 hover-effect"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              Delete
                            </Button>
                          </div>
                          {notification.type === "price" && (
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs btn-secondary">
                              View Chart
                              <ChevronRight className="h-3.5 w-3.5 ml-1" />
                            </Button>
                          )}
                          {notification.type === "transaction" && (
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs btn-secondary">
                              View Transaction
                              <ChevronRight className="h-3.5 w-3.5 ml-1" />
                            </Button>
                          )}
                          {notification.type === "security" && (
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs btn-secondary">
                              Security Settings
                              <ChevronRight className="h-3.5 w-3.5 ml-1" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
            {filteredNotifications.length > 0 && (
              <CardFooter className="flex justify-center border-t border-white/10 pt-6">
                <Button variant="outline">Load More</Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}