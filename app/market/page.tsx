"use client"

import { MarketTable } from "@/components/market/market-table"
import { Heading } from "@/components/ui/heading"

export default function MarketPage() {
  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="mb-8">
        <Heading
          title="Market Data"
          description="Live cryptocurrency prices and market data."
        />
      </div>
      <MarketTable />
    </div>
  )
} 