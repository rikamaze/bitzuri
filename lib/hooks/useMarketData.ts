"use client"

import { useState, useEffect, useCallback, useMemo } from "react"

export interface MarketAsset {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
  marketCap: string
  sparkline: number[]
}

const fetchMarketData = async (): Promise<MarketAsset[]> => {
  await new Promise((resolve) => setTimeout(resolve, 120))

  return [
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: 43250.5,
      change: 2.45,
      changePercent: 5.67,
      volume: "28.5B",
      marketCap: "847B",
      sparkline: [42800, 43100, 42950, 43200, 43050, 43250],
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: 2650.75,
      change: -45.2,
      changePercent: -1.68,
      volume: "15.2B",
      marketCap: "318B",
      sparkline: [2680, 2695, 2670, 2685, 2660, 2650],
    },
    {
      symbol: "BNB",
      name: "Binance Coin",
      price: 315.8,
      change: 8.9,
      changePercent: 2.9,
      volume: "2.1B",
      marketCap: "48.5B",
      sparkline: [310, 312, 308, 315, 314, 316],
    },
    {
      symbol: "ADA",
      name: "Cardano",
      price: 0.485,
      change: 0.025,
      changePercent: 5.43,
      volume: "1.2B",
      marketCap: "17.2B",
      sparkline: [0.46, 0.47, 0.465, 0.48, 0.475, 0.485],
    },
    {
      symbol: "SOL",
      name: "Solana",
      price: 98.45,
      change: -2.15,
      changePercent: -2.14,
      volume: "3.8B",
      marketCap: "42.1B",
      sparkline: [100, 99, 101, 98, 97, 98.45],
    },
    {
      symbol: "USDT",
      name: "Tether",
      price: 1.0,
      change: 0.0,
      changePercent: 0.0,
      volume: "45.2B",
      marketCap: "83.1B",
      sparkline: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
    },
    {
      symbol: "XRP",
      name: "XRP",
      price: 0.62,
      change: 0.01,
      changePercent: 1.64,
      volume: "2.3B",
      marketCap: "33.2B",
      sparkline: [0.61, 0.62, 0.615, 0.62, 0.618, 0.62],
    },
    {
      symbol: "LTC",
      name: "Litecoin",
      price: 85.3,
      change: -1.2,
      changePercent: -1.39,
      volume: "0.8B",
      marketCap: "6.3B",
      sparkline: [86, 85.5, 86.2, 85.8, 85.6, 85.3],
    },
    {
      symbol: "UNI",
      name: "Uniswap",
      price: 6.2,
      change: 0.3,
      changePercent: 5.08,
      volume: "0.4B",
      marketCap: "4.7B",
      sparkline: [6.0, 6.1, 6.05, 6.15, 6.18, 6.2],
    },
    {
      symbol: "PEPE",
      name: "Pepe",
      price: 0.0000012,
      change: 0.0000001,
      changePercent: 9.09,
      volume: "0.2B",
      marketCap: "0.5B",
      sparkline: [0.0000011, 0.0000012, 0.00000115, 0.00000118, 0.00000119, 0.0000012],
    },
  ]
}

export const useMarketData = (searchQuery?: string, enableRealTime: boolean = false) => {
  const [marketData, setMarketData] = useState<MarketAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchData = useCallback(async (isRefresh: boolean = false) => {
    try {
      if (!isRefresh) setLoading(true)
      setError(null)
      const data = await fetchMarketData()
      
      // Add small price variations for real-time effect
      const updatedData = data.map(asset => ({
        ...asset,
        price: asset.price * (0.998 + Math.random() * 0.004), // ±0.2% variation
        change: asset.change + (Math.random() - 0.5) * 10,
        changePercent: asset.changePercent + (Math.random() - 0.5) * 2,
        sparkline: [...asset.sparkline.slice(1), asset.price * (0.999 + Math.random() * 0.002)]
      }))
      
      setMarketData(updatedData)
      setLastUpdate(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch market data")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Real-time updates every 5 seconds
  useEffect(() => {
    if (!enableRealTime) return

    const interval = setInterval(() => {
      fetchData(true) // Refresh without loading state
    }, 5000)

    return () => clearInterval(interval)
  }, [fetchData, enableRealTime])

  const filteredData = useMemo(() => {
    if (!searchQuery) return marketData

    return marketData.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [marketData, searchQuery])

  return {
    marketData: filteredData,
    loading,
    error,
    lastUpdate,
    refresh: fetchData,
  }
}
