export interface SendTransactionParams {
  asset: string
  to: string
  amount: number
  fee?: number
}

export interface TransactionResponse {
  hash: string
  status: "pending" | "confirmed" | "failed"
  blockHeight?: number
  confirmations: number
  timestamp: string
}

export async function sendTransaction(params: SendTransactionParams): Promise<TransactionResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000))
  
  // Simulate occasional failures
  if (Math.random() < 0.02) {
    throw new Error("Network congestion - transaction failed")
  }
  
  if (Math.random() < 0.01) {
    throw new Error("Invalid recipient address")
  }

  // Generate realistic transaction hash
  const hash = "0x" + Array.from({length: 64}, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join("")

  return {
    hash,
    status: "pending",
    confirmations: 0,
    timestamp: new Date().toISOString()
  }
}

export function validateAddress(address: string, asset: string): boolean {
  if (!address || address.length < 10) return false
  
  switch (asset) {
    case "BTC":
      // Bitcoin address validation (simplified)
      return /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/.test(address)
    case "ETH":
    case "BNB":
      // Ethereum-style address validation
      return /^0x[a-fA-F0-9]{40}$/.test(address)
    case "ADA":
      // Cardano address validation (simplified)
      return /^addr1[a-z0-9]{98}$/.test(address) || /^[A-Za-z0-9]{103}$/.test(address)
    case "SOL":
      // Solana address validation (simplified)
      return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)
    default:
      return address.length >= 10 && address.length <= 100
  }
}

export function getNetworkFee(asset: string): number {
  const fees: Record<string, number> = {
    BTC: 0.0001,
    ETH: 0.002,
    BNB: 0.0005,
    ADA: 0.17,
    SOL: 0.00025,
    USDT: 0.001
  }
  return fees[asset] || 0.001
}

export function generateDepositAddress(asset: string): string {
  // Generate mock deposit addresses
  switch (asset) {
    case "BTC":
      return "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
    case "ETH":
    case "BNB":
      return "0x742d35Cc6634C0532925a3b8D4C2C4e4C8C8C8C8"
    case "ADA":
      return "addr1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlhxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlhxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
    case "SOL":
      return "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
    default:
      return `${asset.toLowerCase()}_deposit_address_${Math.random().toString(36).substr(2, 9)}`
  }
}
