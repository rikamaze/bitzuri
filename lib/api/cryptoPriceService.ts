// This file is now empty. Add new API utilities here if needed.

export async function fetchCoinGeckoPrices(ids: string[], vsCurrency = 'usd') {
  const idsParam = ids.join(',');
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${idsParam}&vs_currencies=${vsCurrency}&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch crypto prices from CoinGecko');
  return response.json();
}

export async function fetchCoinGeckoSparkline(coinId: string, vsCurrency = 'usd', days = 7) {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${days}&interval=daily`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch sparkline data from CoinGecko');
  const data = await response.json();
  // data.prices is an array of [timestamp, price]
  return data.prices.map((p: [number, number]) => p[1]);
}

// Optionally, you can add more functions for other CoinGecko endpoints as needed. 