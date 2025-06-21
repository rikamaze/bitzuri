"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Users,
  MessageSquare,
  Heart,
  Share2,
  Plus,
  Search,
  Pin,
  Verified,
  TrendingUp,
  HelpCircle,
  Newspaper,
} from "lucide-react"
import type { CommunityPost } from "@/lib/types/enhancements"

const mockPosts: CommunityPost[] = [
  {
    id: "1",
    author: {
      id: "user1",
      username: "alex_crypto",
      displayName: "Alex Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      tradingLevel: "Expert",
      joinDate: "2023-01-15",
      totalTrades: 1250,
      portfolioValue: 125000,
      achievements: [],
      preferences: {} as any,
      socialStats: {} as any,
    },
    content: "Bitcoin showing strong support at $42k. Potential breakout to $48k if volume increases. Thoughts?",
    tags: ["BTC", "Analysis"],
    likes: 24,
    comments: 8,
    shares: 3,
    createdAt: "2024-01-15T10:30:00Z",
    category: "Analysis",
    isVerified: true,
  },
  {
    id: "2",
    author: {
      id: "user2",
      username: "sarah_defi",
      displayName: "Sarah Kim",
      tradingLevel: "Advanced",
      joinDate: "2023-03-20",
      totalTrades: 890,
      portfolioValue: 75000,
      achievements: [],
      preferences: {} as any,
      socialStats: {} as any,
    },
    content: "New to yield farming. Any recommendations for beginner-friendly protocols?",
    tags: ["DeFi", "Question"],
    likes: 15,
    comments: 12,
    shares: 2,
    createdAt: "2024-01-15T09:15:00Z",
    category: "Question",
  },
]

export function CommunityHub() {
  const [posts] = useState<CommunityPost[]>(mockPosts)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [showNewPostDialog, setShowNewPostDialog] = useState(false)

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category.toLowerCase() === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getCategoryIcon = (category: string) => {
    const iconClass = "h-3 w-3"
    switch (category) {
      case "Analysis":
        return <TrendingUp className={iconClass} />
      case "Question":
        return <HelpCircle className={iconClass} />
      case "News":
        return <Newspaper className={iconClass} />
      default:
        return <MessageSquare className={iconClass} />
    }
  }

  const getTradingLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20"
      case "Advanced":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20"
      case "Intermediate":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      default:
        return "bg-green-500/10 text-green-400 border-green-500/20"
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "now"
    if (diffInHours < 24) return `${diffInHours}h`
    return `${Math.floor(diffInHours / 24)}d`
  }

  const createPost = () => {
    if (!newPostContent.trim()) return
    setNewPostContent("")
    setShowNewPostDialog(false)
  }

  return (
    <div className="space-y-4">
      {/* Simplified Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-cyan-400" />
          <h2 className="text-xl font-semibold text-white">Community</h2>
        </div>

        <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
            >
              <Plus className="h-4 w-4" />
              Post
            </Button>
          </DialogTrigger>
          <DialogContent className="backdrop-blur-md bg-slate-900/95 border-white/20 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Share with Community</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Share your thoughts, analysis, or ask a question..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="min-h-24 bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowNewPostDialog(false)} size="sm">
                  Cancel
                </Button>
                <Button onClick={createPost} disabled={!newPostContent.trim()} size="sm">
                  Post
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Simplified Navigation */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1">
          <TabsList className="grid w-full grid-cols-4 bg-white/5 border border-white/10">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-slate-300 text-xs"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="analysis"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-slate-300 text-xs"
            >
              Analysis
            </TabsTrigger>
            <TabsTrigger
              value="question"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-slate-300 text-xs"
            >
              Questions
            </TabsTrigger>
            <TabsTrigger
              value="news"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-slate-300 text-xs"
            >
              News
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-48">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400"
          />
        </div>
      </div>

      {/* Streamlined Posts */}
      <div className="space-y-3">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="backdrop-blur-md bg-white/5 border-white/10 hover:border-white/20 transition-all">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Post Header - Simplified */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.displayName} />
                        <AvatarFallback className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-xs">
                          {post.author.displayName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white text-sm">{post.author.displayName}</span>
                          {post.isVerified && <Verified className="h-3 w-3 text-blue-400" />}
                          <Badge className={getTradingLevelColor(post.author.tradingLevel)} variant="outline">
                            {post.author.tradingLevel}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span>@{post.author.username}</span>
                          <span>•</span>
                          <span>{formatTimeAgo(post.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {post.isPinned && <Pin className="h-3 w-3 text-yellow-400" />}
                      <Badge variant="outline" className="gap-1 text-xs">
                        {getCategoryIcon(post.category)}
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-sm text-slate-300 leading-relaxed">{post.content}</p>

                  {/* Tags - Simplified */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="outline"
                          className="text-xs bg-purple-500/10 border-purple-500/20 text-purple-300 hover:bg-purple-500/20 cursor-pointer"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Post Actions - Simplified */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-slate-400 hover:text-red-400 hover:bg-red-500/10 h-7 px-2"
                      >
                        <Heart className="h-3 w-3" />
                        <span className="text-xs">{post.likes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 h-7 px-2"
                      >
                        <MessageSquare className="h-3 w-3" />
                        <span className="text-xs">{post.comments}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-slate-400 hover:text-green-400 hover:bg-green-500/10 h-7 px-2"
                      >
                        <Share2 className="h-3 w-3" />
                        <span className="text-xs">{post.shares}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <Card className="backdrop-blur-md bg-white/5 border-white/10">
          <CardContent className="p-8 text-center">
            <MessageSquare className="h-8 w-8 mx-auto mb-3 text-slate-400 opacity-50" />
            <p className="text-slate-400 text-sm mb-3">No posts found</p>
            <Button
              onClick={() => setShowNewPostDialog(true)}
              size="sm"
              className="gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
            >
              <Plus className="h-4 w-4" />
              Start Discussion
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
