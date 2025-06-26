"use client";
import { OrderBook } from "@/components/trading/order-book";
import { PriceChart } from "@/components/trading/price-chart";
import { TradeForm } from "@/components/trading/trade-form";
import { OrderHistoryTable } from "@/components/orders/order-history-table";
import { useSearchParams } from "next/navigation";

export default function TradePage() {
    const searchParams = useSearchParams();
    const symbol = searchParams.get("symbol") || undefined;
    return (
        <div className="min-h-screen bg-slate-900 text-white p-4">
            <div className="grid grid-cols-12 gap-4">
                {/* Left Side: Trade Form and Order Book */}
                <div className="col-span-12 lg:col-span-3 space-y-4">
                    <TradeForm symbol={symbol} />
                    <OrderBook symbol={symbol} />
                </div>

                {/* Right Side: Chart and Order History */}
                <div className="col-span-12 lg:col-span-9 space-y-4">
                    <PriceChart symbol={symbol} />
                    <OrderHistoryTable />
                </div>
            </div>
        </div>
    );
} 