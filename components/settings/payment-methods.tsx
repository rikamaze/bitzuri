"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

const paymentMethods = [
  {
    id: "bank-1",
    type: "Bank Account",
    details: "First National Bank ending in 1234",
  },
  {
    id: "card-1",
    type: "Credit Card",
    details: "Visa ending in 5678",
  },
]

export function PaymentMethods() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Payment Methods</CardTitle>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between rounded-md border p-4"
            >
              <div>
                <p className="font-semibold">{method.type}</p>
                <p className="text-sm text-muted-foreground">
                  {method.details}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Remove
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 