"use client";

import Image from "next/image";
import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fill?: boolean;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
  unoptimized?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes = "100vw",
  quality = 75,
  fill = false,
  style,
  onLoad,
  onError,
  unoptimized = false,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <div className={`relative ${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        quality={quality}
        priority={priority}
        sizes={sizes}
        fill={fill}
        style={style}
        onLoad={handleLoad}
        onError={onError}
        loading={priority ? "eager" : "lazy"}
        unoptimized={unoptimized}
      />
    </div>
  );
}