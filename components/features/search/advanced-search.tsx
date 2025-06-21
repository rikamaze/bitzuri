"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Search, SlidersHorizontal, ChevronDown, Bookmark, X } from "lucide-react"

interface SearchFilters {
  query: string
  category: string
  priceRange: string
  sortBy: string
}

export function AdvancedSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "all",
    priceRange: "any",
    sortBy: "marketCap",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [savedSearches] = useState([
    { id: "1", name: "High Volume Altcoins", query: "altcoin volume:high" },
    { id: "2", name: "DeFi Under $50", query: "defi price:<50" },
  ])

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      query: "",
      category: "all",
      priceRange: "any",
      sortBy: "marketCap",
    })
  }

  const hasActiveFilters = filters.category !== "all" || filters.priceRange !== "any" || filters.sortBy !== "marketCap"

  return (
    <div className="space-y-4">
      {/* Simplified Search Header */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-white">Discover Assets</h2>
        <p className="text-sm text-slate-400">Find cryptocurrencies that match your criteria</p>
      </div>

      {/* Main Search Bar */}
      <Card className="backdrop-blur-md bg-white/5 border-white/10">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search cryptocurrencies..."
                value={filters.query}
                onChange={(e) => updateFilter("query", e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400"
              />
            </div>

            <Collapsible open={showFilters} onOpenChange={setShowFilters}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 ml-1">
                      {
                        Object.values(filters).filter(
                          (v) => v !== "all" && v !== "any" && v !== "marketCap" && v !== "",
                        ).length
                      }
                    </Badge>
                  )}
                  <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Category</label>
                      <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="defi">DeFi</SelectItem>
                          <SelectItem value="gaming">Gaming</SelectItem>
                          <SelectItem value="nft">NFT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Price Range</label>
                      <Select value={filters.priceRange} onValueChange={(value) => updateFilter("priceRange", value)}>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Price</SelectItem>
                          <SelectItem value="under1">Under $1</SelectItem>
                          <SelectItem value="1to100">$1 - $100</SelectItem>
                          <SelectItem value="over100">Over $100</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Sort By</label>
                      <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marketCap">Market Cap</SelectItem>
                          <SelectItem value="price">Price</SelectItem>
                          <SelectItem value="volume">Volume</SelectItem>
                          <SelectItem value="change">Price Change</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <Button
                      onClick={clearFilters}
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </motion.div>
              </CollapsibleContent>
            </Collapsible>

            <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Saved Searches - Simplified */}
      {savedSearches.length > 0 && (
        <Card className="backdrop-blur-md bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-white">Quick Searches</h3>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {savedSearches.map((search) => (
                <Button
                  key={search.id}
                  variant="outline"
                  size="sm"
                  className="text-xs bg-white/5 border-white/20 text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  {search.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results Placeholder */}
      <Card className="backdrop-blur-md bg-white/5 border-white/10">
        <CardContent className="p-8 text-center">
          <Search className="h-8 w-8 mx-auto mb-3 text-slate-400 opacity-50" />
          <p className="text-slate-400 text-sm">Enter search criteria to discover assets</p>
        </CardContent>
      </Card>
    </div>
  )
}
