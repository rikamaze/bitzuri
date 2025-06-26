"use client";

// Convert hex color to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Calculate relative luminance for WCAG contrast
function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Calculate contrast ratio between two colors
export function getContrastRatio(foreground: string, background: string): number {
  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);

  if (!fg || !bg) return 1;

  const fgLuminance = getLuminance(fg.r, fg.g, fg.b);
  const bgLuminance = getLuminance(bg.r, bg.g, bg.b);

  const ratio =
    (Math.max(fgLuminance, bgLuminance) + 0.05) /
    (Math.min(fgLuminance, bgLuminance) + 0.05);

  return parseFloat(ratio.toFixed(2));
}

// Check if contrast meets WCAG AA standard (4.5:1 for normal text, 3:1 for large text)
export function meetsWCAGAA(foreground: string, background: string, isLargeText: boolean = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

// Check if contrast meets WCAG AAA standard (7:1 for normal text, 4.5:1 for large text)
export function meetsWCAGAAA(foreground: string, background: string, isLargeText: boolean = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}

// Get a color with better contrast if the original doesn't meet standards
export function getAccessibleColor(
  foreground: string,
  background: string,
  targetRatio: number = 4.5
): string {
  const fg = hexToRgb(foreground);
  if (!fg) return foreground;

  let ratio = getContrastRatio(foreground, background);
  
  // If already meets target, return original
  if (ratio >= targetRatio) return foreground;

  // Adjust color to meet contrast
  const bgRgb = hexToRgb(background);
  if (!bgRgb) return foreground;
  
  const bgLuminance = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
  
  // Determine if we need to lighten or darken
  const needsLightening = bgLuminance < 0.5;
  
  let r = fg.r;
  let g = fg.g;
  let b = fg.b;
  
  // Adjust until we meet the target ratio
  const step = needsLightening ? 5 : -5;
  
  while (ratio < targetRatio) {
    r = Math.max(0, Math.min(255, r + step));
    g = Math.max(0, Math.min(255, g + step));
    b = Math.max(0, Math.min(255, b + step));
    
    const newColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    ratio = getContrastRatio(newColor, background);
    
    // Break if we've reached the limits
    if ((needsLightening && (r >= 255 && g >= 255 && b >= 255)) || 
        (!needsLightening && (r <= 0 && g <= 0 && b <= 0))) {
      break;
    }
  }
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}