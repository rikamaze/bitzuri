"use client"

import { useState, useEffect, useCallback, useMemo } from "react"

export interface Asset {
  symbol: string
  name: string
  balance: number
  value: number
  change: number
  changePercent: number
  price: number
  allocation: number
  color: string
}

export interface PortfolioData {
  totalBalance: number
  totalChange: number
  totalChangePercent: number
  availableBalance: number
  stakedBalance: number
  pendingBalance: number
  assets: Asset[]
}

// Simulated API calls - replace with actual API integration
const fetchPortfolioData = async (): Promise<PortfolioData> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const assets: Asset[] = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      balance: 0.5432,
      value: 23456.78,
      change: 1234.56,
      changePercent: 5.67,
      price: 43250.5,
      allocation: 45.2,
      color: "#f7931a",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      balance: 8.9123,
      value: 23654.32,
      change: -456.78,
      changePercent: -1.89,
      price: 2650.75,
      allocation: 35.8,
      color: "#627eea",
    },
    {
      symbol: "BNB",
      name: "Binance Coin",
      balance: 45.67,
      value: 14432.11,
      change: 234.56,
      changePercent: 1.65,
      price: 315.8,
      allocation: 12.3,
      color: "#f3ba2f",
    },
    {
      symbol: "ADA",
      name: "Cardano",
      balance: 1234.56,
      value: 598.76,
      change: 23.45,
      changePercent: 4.08,
      price: 0.485,
      allocation: 4.2,
      color: "#0033ad",
    },
    {
      symbol: "SOL",
      name: "Solana",
      balance: 12.34,
      value: 1214.56,
      change: -45.67,
      changePercent: -3.62,
      price: 98.45,
      allocation: 2.5,
      color: "#9945ff",
    },
  ]

  const totalBalance = assets.reduce((sum, asset) => sum + asset.value, 0)
  const totalChange = assets.reduce((sum, asset) => sum + asset.change, 0)
  const totalChangePercent = (totalChange / (totalBalance - totalChange)) * 100

  return {
    totalBalance,
    totalChange,
    totalChangePercent,
    availableBalance: totalBalance * 0.74,
    stakedBalance: totalBalance * 0.19,
    pendingBalance: totalBalance * 0.07,
    assets,
  }
}

export const usePortfolio = () => {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const portfolioData = await fetchPortfolioData()
      setData(portfolioData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch portfolio data")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refresh = useCallback(() => {
    fetchData()
  }, [fetchData])

  const memoizedData = useMemo(() => data, [data])

  return {
    data: memoizedData,
    loading,
    error,
    refresh,
  }
}
