export interface QRCodeData {
  address: string
  amount?: number
  asset?: string
  label?: string
}

export function generateQRData(data: QRCodeData): string {
  const { address, amount, asset, label } = data
  
  if (!address) return ""
  
  // For cryptocurrency addresses, we can use URI schemes
  switch (asset) {
    case "BTC":
      let btcUri = `bitcoin:${address}`
      const btcParams = []
      if (amount) btcParams.push(`amount=${amount}`)
      if (label) btcParams.push(`label=${encodeURIComponent(label)}`)
      if (btcParams.length > 0) btcUri += `?${btcParams.join('&')}`
      return btcUri
      
    case "ETH":
      let ethUri = `ethereum:${address}`
      if (amount) ethUri += `?value=${amount * 1e18}` // Convert to wei
      return ethUri
      
    default:
      // For other assets, return the address with optional metadata
      if (amount && asset) {
        return JSON.stringify({ address, amount, asset, label })
      }
      return address
  }
}

export function parseQRData(qrString: string): QRCodeData | null {
  try {
    // Try to parse as JSON first
    const parsed = JSON.parse(qrString)
    if (parsed.address) return parsed
  } catch {
    // Not JSON, try other formats
  }
  
  // Bitcoin URI
  if (qrString.startsWith('bitcoin:')) {
    const url = new URL(qrString)
    return {
      address: url.pathname,
      amount: url.searchParams.get('amount') ? parseFloat(url.searchParams.get('amount')!) : undefined,
      label: url.searchParams.get('label') || undefined,
      asset: 'BTC'
    }
  }
  
  // Ethereum URI
  if (qrString.startsWith('ethereum:')) {
    const url = new URL(qrString)
    return {
      address: url.pathname,
      amount: url.searchParams.get('value') ? parseFloat(url.searchParams.get('value')!) / 1e18 : undefined,
      asset: 'ETH'
    }
  }
  
  // Plain address
  if (qrString.length > 10 && qrString.length < 100) {
    return { address: qrString }
  }
  
  return null
}

export function isValidQRData(qrString: string): boolean {
  return parseQRData(qrString) !== null
}
