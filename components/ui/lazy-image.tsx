"use client";

import { useState, useEffect, useRef } from "react";
import { OptimizedImage } from "./optimized-image";

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  placeholderColor?: string;
  threshold?: number;
  quality?: number;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  placeholderColor = "#1e293b", // slate-900
  threshold = 0.1,
  quality = 75,
}: LazyImageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width,
        height,
        backgroundColor: placeholderColor,
      }}
    >
      {isVisible && (
        <OptimizedImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          onLoad={handleLoad}
          className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}