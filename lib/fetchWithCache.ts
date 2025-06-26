"use client";

import { useState, useEffect, useCallback } from "react";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();
const DEFAULT_CACHE_TIME = 60 * 1000; // 1 minute in milliseconds

export function useFetchWithCache<T>(
  url: string,
  options?: RequestInit,
  cacheTime: number = DEFAULT_CACHE_TIME,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (force: boolean = false) => {
    setLoading(true);
    setError(null);

    const cacheKey = `${url}-${JSON.stringify(options)}`;
    const now = Date.now();
    const cachedData = cache.get(cacheKey);

    // Use cached data if available and not expired, unless force refresh is requested
    if (!force && cachedData && now - cachedData.timestamp < cacheTime) {
      setData(cachedData.data);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Update cache
      cache.set(cacheKey, {
        data: result,
        timestamp: now,
      });
      
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, [url, options, cacheTime]);

  useEffect(() => {
    fetchData();
  }, [...dependencies, fetchData]);

  return { data, loading, error, refresh: () => fetchData(true) };
}

// For server components or direct use
export async function fetchWithCache<T>(
  url: string, 
  options?: RequestInit,
  cacheTime: number = DEFAULT_CACHE_TIME
): Promise<T> {
  const cacheKey = `${url}-${JSON.stringify(options)}`;
  const now = Date.now();
  const cachedData = cache.get(cacheKey);

  // Use cached data if available and not expired
  if (cachedData && now - cachedData.timestamp < cacheTime) {
    return cachedData.data;
  }

  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  const result = await response.json();
  
  // Update cache
  cache.set(cacheKey, {
    data: result,
    timestamp: now,
  });
  
  return result;
}