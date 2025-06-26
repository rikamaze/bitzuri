"use client";

import { Suspense, lazy, ComponentType } from "react";
import { LoadingSpinner } from "./loading-spinner";

interface DynamicImportProps<T> {
  importFn: () => Promise<{ default: ComponentType<T> }>;
  props: T;
  fallback?: React.ReactNode;
}

export function DynamicImport<T>({
  importFn,
  props,
  fallback = <div className="flex items-center justify-center p-4"><LoadingSpinner /></div>,
}: DynamicImportProps<T>) {
  const LazyComponent = lazy(importFn);

  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}