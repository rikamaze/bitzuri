import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ids = searchParams.get('ids');
    const vsCurrency = searchParams.get('vs_currency') || 'usd';

    if (!ids) {
      return NextResponse.json({ error: 'Missing ids parameter' }, { status: 400 });
    }

    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${vsCurrency}&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`;
    const response = await fetch(url);
    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      console.error('Failed to parse CoinGecko response as JSON:', jsonError);
      return NextResponse.json({ error: 'Invalid JSON from CoinGecko' }, { status: 502 });
    }
    if (!response.ok) {
      console.error('CoinGecko API error:', data);
      return NextResponse.json({ error: 'Failed to fetch from CoinGecko', details: data }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error in /api/coingecko-prices:', error);
    return NextResponse.json({ error: 'Internal server error', details: error instanceof Error ? error.message : error }, { status: 500 });
  }
} 