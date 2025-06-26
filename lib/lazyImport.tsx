"use client";

import dynamic from "next/dynamic";
import { ComponentType, lazy, Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// For client components
export function lazyImport<T extends ComponentType<any>, I extends { [K2 in K]: T }, K extends keyof I>(
  factory: () => Promise<I>,
  name: K,
  fallback: React.ReactNode = <div className="flex items-center justify-center p-4"><LoadingSpinner /></div>
): I {
  const LazyComponent = dynamic(() => factory().then((module) => ({ default: module[name] })), {
    loading: () => <>{fallback}</>,
    ssr: false,
  });

  return {
    [name]: LazyComponent,
  } as I;
}

// For server components
export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback: React.ReactNode = <div className="flex items-center justify-center p-4"><LoadingSpinner /></div>
) {
  const LazyComponent = lazy(importFunc);
  
  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}