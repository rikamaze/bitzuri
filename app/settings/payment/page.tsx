import { Separator } from "@/components/ui/separator"
import { PaymentMethods } from "@/components/settings/payment-methods"
import { Heading } from "@/components/ui/heading"

export default function SettingsPaymentPage() {
  return (
    <div className="space-y-6">
      <Heading title="Payment Methods" description="Manage your connected payment methods and add new ones." />
      <Separator />
      <PaymentMethods />
    </div>
  )
} 