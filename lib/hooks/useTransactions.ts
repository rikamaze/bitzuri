"use client"

import { useState, useEffect, useCallback, useMemo } from "react"

export interface Transaction {
  id: string
  type: "deposit" | "withdrawal" | "buy" | "sell"
  asset: string
  amount: number
  value: number
  status: "completed" | "pending" | "processing" | "failed"
  timestamp: string
  txHash: string
  fee: number
}

const fetchTransactions = async (): Promise<Transaction[]> => {
  await new Promise((resolve) => setTimeout(resolve, 150))

  return [
    {
      id: "tx001",
      type: "deposit",
      asset: "BTC",
      amount: 0.025,
      value: 1077.5,
      status: "completed",
      timestamp: "2024-01-15T10:30:00Z",
      txHash: "0x1234...5678",
      fee: 0.0001,
    },
    {
      id: "tx002",
      type: "buy",
      asset: "ETH",
      amount: 1.5,
      value: 4020.0,
      status: "completed",
      timestamp: "2024-01-15T09:15:00Z",
      txHash: "0x2345...6789",
      fee: 2.01,
    },
    {
      id: "tx003",
      type: "sell",
      asset: "BNB",
      amount: 10,
      value: 3150.0,
      status: "pending",
      timestamp: "2024-01-15T08:45:00Z",
      txHash: "0x3456...7890",
      fee: 1.58,
    },
    {
      id: "tx004",
      type: "withdrawal",
      asset: "USDT",
      amount: 500,
      value: 500.0,
      status: "processing",
      timestamp: "2024-01-15T07:20:00Z",
      txHash: "0x4567...8901",
      fee: 1.0,
    },
  ]
}

export const useTransactions = (searchQuery?: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchTransactions()
      setTransactions(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch transactions")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const filteredTransactions = useMemo(() => {
    if (!searchQuery) return transactions

    return transactions.filter(
      (tx) =>
        tx.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.type.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [transactions, searchQuery])

  return {
    transactions: filteredTransactions,
    loading,
    error,
    refresh: fetchData,
  }
}
