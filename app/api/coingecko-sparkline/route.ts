import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const coinId = searchParams.get('coinId');
  const vsCurrency = searchParams.get('vs_currency') || 'usd';
  const days = searchParams.get('days') || '7';

  if (!coinId) {
    return NextResponse.json({ error: 'Missing coinId parameter' }, { status: 400 });
  }

  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${days}&interval=daily`;
  const response = await fetch(url);
  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch from CoinGecko' }, { status: 500 });
  }
  const data = await response.json();
  // Return only the price values
  const prices = data.prices.map((p: [number, number]) => p[1]);
  return NextResponse.json(prices);
} 