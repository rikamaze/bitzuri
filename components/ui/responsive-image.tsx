"use client";

import { useState, useEffect } from "react";
import { OptimizedImage } from "./optimized-image";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  sizes: {
    sm?: { width: number; height: number };
    md?: { width: number; height: number };
    lg?: { width: number; height: number };
    xl?: { width: number; height: number };
  };
  className?: string;
  quality?: number;
}

export function ResponsiveImage({
  src,
  alt,
  sizes,
  className = "",
  quality = 75,
}: ResponsiveImageProps) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    // Update width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine which size to use based on window width
  const getImageSize = () => {
    if (windowWidth === 0) {
      // Default to medium size if window width is not available yet
      return sizes.md || sizes.lg || sizes.sm || sizes.xl;
    }

    if (windowWidth < 640 && sizes.sm) {
      return sizes.sm;
    } else if (windowWidth < 1024 && sizes.md) {
      return sizes.md;
    } else if (windowWidth < 1280 && sizes.lg) {
      return sizes.lg;
    } else if (sizes.xl) {
      return sizes.xl;
    }

    // Fallback to the first available size
    return sizes.md || sizes.lg || sizes.sm || sizes.xl;
  };

  const imageSize = getImageSize();

  if (!imageSize) {
    return null;
  }

  // Generate sizes attribute for the browser
  const sizesAttribute = Object.entries(sizes)
    .map(([breakpoint, dimensions]) => {
      switch (breakpoint) {
        case "sm":
          return `(max-width: 640px) ${dimensions.width}px`;
        case "md":
          return `(max-width: 1024px) ${dimensions.width}px`;
        case "lg":
          return `(max-width: 1280px) ${dimensions.width}px`;
        case "xl":
          return `${dimensions.width}px`;
        default:
          return "";
      }
    })
    .filter(Boolean)
    .join(", ");

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={imageSize.width}
      height={imageSize.height}
      className={className}
      quality={quality}
      sizes={sizesAttribute}
    />
  );
}