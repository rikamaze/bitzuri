"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const orders = [
  {
    id: "1",
    date: "2023-10-27",
    pair: "BTC/USD",
    type: "Limit",
    side: "Buy",
    price: "40000.00",
    amount: "0.5",
    filled: "0.5",
    status: "Filled",
  },
  {
    id: "2",
    date: "2023-10-26",
    pair: "ETH/USD",
    type: "Market",
    side: "Sell",
    price: "2000.00",
    amount: "2.0",
    filled: "2.0",
    status: "Filled",
  },
  {
    id: "3",
    date: "2023-10-25",
    pair: "BTC/ETH",
    type: "Limit",
    side: "Buy",
    price: "20.0",
    amount: "1.0",
    filled: "0.0",
    status: "Open",
  },
]

export function OrderHistoryTable() {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "filled":
        return <Badge variant="success">Filled</Badge>
      case "open":
        return <Badge variant="default">Open</Badge>
      case "canceled":
        return <Badge variant="destructive">Canceled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Pair</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Side</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Filled</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.date}</TableCell>
            <TableCell>{order.pair}</TableCell>
            <TableCell>{order.type}</TableCell>
            <TableCell>{order.side}</TableCell>
            <TableCell className="text-right">{order.price}</TableCell>
            <TableCell className="text-right">{order.amount}</TableCell>
            <TableCell className="text-right">{order.filled}</TableCell>
            <TableCell className="text-right">
              {getStatusBadge(order.status)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 