import { Heading } from "@/components/ui/heading";
import { OrderHistoryTable } from "@/components/orders/order-history-table";

export default function OrdersPage() {
  return (
    <div className="container mx-auto py-8">
      <Heading title="Order History" description="View your past and open orders." />
      <div className="mt-8">
        <OrderHistoryTable />
      </div>
    </div>
  );
} 