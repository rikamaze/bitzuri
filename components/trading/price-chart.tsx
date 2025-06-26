"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { useMemo } from "react";

const generateData = () => {
    const data = [];
    let price = 67340;
    const now = new Date();
    for (let i = 100; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 1000); 
        price += (Math.random() - 0.5) * 50;
        data.push({ time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), price: price });
    }
    return data;
};

export interface PriceChartProps {
  symbol?: string;
}

const symbolToName: Record<string, string> = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  USDT: "Tether",
  BNB: "Binance Coin",
  SOL: "Solana",
  XRP: "XRP",
  ADA: "Cardano",
  LTC: "Litecoin",
  UNI: "Uniswap",
  PEPE: "Pepe",
};

export function PriceChart({ symbol = "BTC" }: PriceChartProps) {
    const data = useMemo(()=>(generateData()), [symbol])
    const name = symbolToName[symbol] || symbol;
    return (
        <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl text-white h-full">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-lg">{symbol}/USD</CardTitle>
                        <CardDescription className="text-slate-400">{name} to US Dollar</CardDescription>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold">$67,339.80</p>
                        <p className="text-sm text-green-400">+1,234.56 (+1.86%) 24h</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="h-[400px] p-0">
                <ResponsiveContainer width="100%" height="100%">
                     <AreaChart
                        data={data}
                        margin={{ top: 5, right: 20, left: -10, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="time" stroke="rgba(255, 255, 255, 0.5)" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="rgba(255, 255, 255, 0.5)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value.toFixed(0)}`} domain={['dataMin - 100', 'dataMax + 100']}/>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(20, 20, 30, 0.8)',
                                borderColor: 'rgba(136, 132, 216, 0.5)',
                                color: '#fff'
                            }}
                            itemStyle={{ color: '#fff' }}
                            labelStyle={{ color: 'rgba(255,255,255,0.8)' }}
                        />
                        <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorPrice)" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
} 