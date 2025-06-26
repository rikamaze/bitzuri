"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Dummy data with cumulative total
const asksData = [
    { price: 67341.1, amount: 0.1, total: 0.1 },
    { price: 67341.0, amount: 0.5, total: 0.6 },
    { price: 67340.5, amount: 1.2, total: 1.8 },
    { price: 67339.9, amount: 2.0, total: 3.8 },
    { price: 67338.2, amount: 0.8, total: 4.6 },
];

const bidsData = [
    { price: 67338.1, amount: 0.7, total: 0.7 },
    { price: 67337.5, amount: 1.1, total: 1.8 },
    { price: 67336.9, amount: 0.9, total: 2.7 },
    { price: 67335.0, amount: 2.5, total: 5.2 },
    { price: 67334.8, amount: 3.0, total: 8.2 },
];

export function OrderBook() {
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
              <TableHead className="p-2 text-right text-slate-400">Amount (BTC)</TableHead>
              <TableHead className="p-2 text-right text-slate-400">Total (BTC)</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <div className="max-h-48 overflow-y-auto">
            <Table>
                <TableBody>
                    {asksData.slice(0).reverse().map((order, index) => (
                    <TableRow key={index} className="border-0">
                        <TableCell className="p-1 text-red-400">{order.price.toFixed(2)}</TableCell>
                        <TableCell className="p-1 text-right">{order.amount.toFixed(4)}</TableCell>
                        <TableCell className="p-1 text-right">{order.total.toFixed(4)}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        <div className="py-2 text-center font-bold text-lg border-y border-y-white/10">
            $67,339.80
        </div>
        <div className="max-h-48 overflow-y-auto">
            <Table>
                <TableBody>
                    {bidsData.map((order, index) => (
                    <TableRow key={index} className="border-0">
                        <TableCell className="p-1 text-green-400">{order.price.toFixed(2)}</TableCell>
                        <TableCell className="p-1 text-right">{order.amount.toFixed(4)}</TableCell>
                        <TableCell className="p-1 text-right">{order.total.toFixed(4)}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  )
} 