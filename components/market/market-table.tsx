"use client"

import { useState, useMemo } from "react"
import { useMarketData } from "@/lib/hooks/useMarketData"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PriceChange } from "@/components/shared/price-change"
import { AssetIcon } from "@/components/shared/asset-icon"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"
import { ResponsiveContainer, LineChart, Line } from "recharts"

export function MarketTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const { marketData, loading, error, lastUpdate } = useMarketData(
    undefined,
    true,
  )
  const [sortConfig, setSortConfig] = useState<{
    key: keyof typeof marketData[0]
    direction: "ascending" | "descending"
  } | null>({ key: "marketCap", direction: "descending" })

  const sortedData = useMemo(() => {
    let sortableData = [...marketData]
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }
    return sortableData
  }, [marketData, sortConfig])

  const filteredData = useMemo(() => {
    if (!searchQuery) return sortedData

    return sortedData.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [sortedData, searchQuery])

  const requestSort = (key: keyof typeof marketData[0]) => {
    let direction: "ascending" | "descending" = "ascending"
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key: keyof typeof marketData[0]) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null
    }
    if (sortConfig.direction === "ascending") {
      return <ArrowUp className="w-4 h-4 ml-1" />
    }
    return <ArrowDown className="w-4 h-4 ml-1" />
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search crypto..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm bg-white/5 border-white/20 text-white placeholder:text-slate-400"
        />
        <div className="text-sm text-slate-400">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
      </div>
      <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("price")}
              >
                <div className="flex items-center">
                  Price {getSortIcon("price")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("changePercent")}
              >
                <div className="flex items-center">
                  24h Change {getSortIcon("changePercent")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hidden md:table-cell"
                onClick={() => requestSort("volume")}
              >
                <div className="flex items-center">
                  Volume {getSortIcon("volume")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hidden md:table-cell"
                onClick={() => requestSort("marketCap")}
              >
                <div className="flex items-center">
                  Market Cap {getSortIcon("marketCap")}
                </div>
              </TableHead>
              <TableHead className="hidden lg:table-cell">Last 7 Days</TableHead>
              <TableHead className="text-right">Trade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading &&
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-700 rounded-full animate-pulse" />
                      <div>
                        <div className="h-4 w-12 bg-slate-700 rounded animate-pulse mb-1" />
                        <div className="h-3 w-8 bg-slate-700 rounded animate-pulse" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-20 bg-slate-700 rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-16 bg-slate-700 rounded animate-pulse" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="h-4 w-24 bg-slate-700 rounded animate-pulse" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="h-4 w-24 bg-slate-700 rounded animate-pulse" />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="h-8 w-24 bg-slate-700 rounded animate-pulse" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="h-8 w-20 bg-slate-700 rounded animate-pulse" />
                  </TableCell>
                </TableRow>
              ))}
            {!loading &&
              filteredData.map((asset) => (
                <TableRow key={asset.symbol}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <AssetIcon symbol={asset.symbol} />
                      <div>
                        <div className="font-medium text-white">{asset.name}</div>
                        <div className="text-sm text-slate-400">
                          {asset.symbol}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">${asset.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <PriceChange
                      change={asset.change}
                      changePercent={asset.changePercent}
                    />
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-white">${asset.volume}</TableCell>
                  <TableCell className="hidden md:table-cell text-white">${asset.marketCap}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="w-24 h-10">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={asset.sparkline.map(p => ({price: p}))}>
                          <Line
                            type="monotone"
                            dataKey="price"
                            stroke={
                              asset.changePercent >= 0 ? "#10b981" : "#ef4444"
                            }
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">Trade</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
} 