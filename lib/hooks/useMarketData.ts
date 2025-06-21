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
  ]
}

export const useMarketData = (searchQuery?: string) => {
  const [marketData, setMarketData] = useState<MarketAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchMarketData()
      setMarketData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch market data")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

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
    refresh: fetchData,
  }
}
