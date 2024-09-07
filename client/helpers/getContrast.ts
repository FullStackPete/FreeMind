export function getContrast(backgroundColor: string): "#000000" | "#FFFFFF" {
  const luminance = computeLuminance(backgroundColor);
  return luminance > 0.179 ? "#000000" : "#FFFFFF";
}

function computeLuminance(backgroundColor: string): number {
  const colors = hexToRgb(backgroundColor);
  if (colors) {
    const { r, g, b } = colors;

    const luminance =
      0.2126 * normalizeColor(r) +
      0.7152 * normalizeColor(g) +
      0.0722 * normalizeColor(b);

    return luminance;
  }
  return 0;
}

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

function normalizeColor(value: number): number {
  const normalized = value / 255.0;
  return normalized <= 0.03928
    ? normalized / 12.92
    : Math.pow((normalized + 0.055) / 1.055, 2.4);
}
