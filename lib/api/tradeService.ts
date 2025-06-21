export interface TradeOrder {
  type: "buy" | "sell"
  symbol: string
  orderType: "market" | "limit"
  amount: number
  price: number
  fee: number
}

export interface TradeResponse {
  orderId: string
  status: "completed" | "pending" | "failed"
  executedPrice: number
  executedAmount: number
  fee: number
  timestamp: string
}

export async function createOrder(params: TradeOrder): Promise<TradeResponse> {
  // Simulate API call with realistic delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))
  
  // Simulate occasional failures for testing
  if (Math.random() < 0.05) {
    throw new Error("Insufficient liquidity for this order size")
  }
  
  if (Math.random() < 0.03) {
    throw new Error("Network timeout - please try again")
  }

  // Simulate successful trade
  return {
    orderId: `ord_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    status: "completed",
    executedPrice: params.price * (0.999 + Math.random() * 0.002), // Small price variation
    executedAmount: params.amount,
    fee: params.fee,
    timestamp: new Date().toISOString()
  }
}

export function calculateTradingFee(amount: number, feeRate: number = 0.001): number {
  return amount * feeRate
}

export function validateTradeAmount(amount: number, minAmount: number = 0.00001): boolean {
  return amount >= minAmount && amount <= 1000000 // Max 1M for safety
}
