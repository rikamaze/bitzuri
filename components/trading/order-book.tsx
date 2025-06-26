"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export interface OrderBookProps {
  symbol?: string;
}

function generateOrderBookData(symbol: string) {
  // Generate dummy data based on symbol for demo
  const basePrice = {
    BTC: 67340,
    ETH: 2650,
    USDT: 1,
    BNB: 315,
    SOL: 98,
    XRP: 0.62,
    ADA: 0.48,
    LTC: 85,
    UNI: 6.2,
    PEPE: 0.0000012,
  }[symbol] || 100;
  const asks = Array.from({ length: 5 }, (_, i) => ({
    price: basePrice + (5 - i) * (basePrice * 0.001),
    amount: (Math.random() * 2 + 0.1),
    total: 0, // will be filled below
  }));
  let askTotal = 0;
  asks.forEach(a => { askTotal += a.amount; a.total = askTotal; });
  const bids = Array.from({ length: 5 }, (_, i) => ({
    price: basePrice - (i + 1) * (basePrice * 0.001),
    amount: (Math.random() * 2 + 0.1),
    total: 0,
  }));
  let bidTotal = 0;
  bids.forEach(b => { bidTotal += b.amount; b.total = bidTotal; });
  return { asks, bids, mid: basePrice };
}

export function OrderBook({ symbol = "BTC" }: OrderBookProps) {
  const { asks, bids, mid } = generateOrderBookData(symbol);
  return (
    <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl text-white">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Order Book</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-b-white/10">
              <TableHead className="p-2 text-left text-slate-400">Price (USD)</TableHead>
              <TableHead className="p-2 text-right text-slate-400">Amount ({symbol})</TableHead>
              <TableHead className="p-2 text-right text-slate-400">Total ({symbol})</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <div className="max-h-48 overflow-y-auto">
            <Table>
                <TableBody>
                    {asks.slice(0).reverse().map((order, index) => (
                    <TableRow key={index} className="border-0">
                        <TableCell className="p-1 text-red-400">{order.price.toFixed(6)}</TableCell>
                        <TableCell className="p-1 text-right">{order.amount.toFixed(6)}</TableCell>
                        <TableCell className="p-1 text-right">{order.total.toFixed(6)}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        <div className="py-2 text-center font-bold text-lg border-y border-y-white/10">
            ${mid.toLocaleString(undefined, { maximumFractionDigits: 6 })}
        </div>
        <div className="max-h-48 overflow-y-auto">
            <Table>
                <TableBody>
                    {bids.map((order, index) => (
                    <TableRow key={index} className="border-0">
                        <TableCell className="p-1 text-green-400">{order.price.toFixed(6)}</TableCell>
                        <TableCell className="p-1 text-right">{order.amount.toFixed(6)}</TableCell>
                        <TableCell className="p-1 text-right">{order.total.toFixed(6)}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  )
} 