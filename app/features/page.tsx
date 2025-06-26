"use client"

import { motion } from "framer-motion"
import { QuickTrade } from "@/components/trading/quick-trade"
import { Heading } from "@/components/ui/heading"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen p-4 lg:p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8 text-center">
          <Heading
            title="Trade Crypto"
            description="A simple and efficient way to buy and sell digital assets."
          />
        </div>
        <QuickTrade />
      </motion.div>
    </div>
  )
}
