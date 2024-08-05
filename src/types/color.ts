export const colorVariantsByAlpha = [
  50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600,
] as const;

export const colorVariantsByDarken = [
  650, 700, 750, 800, 850, 900, 950, 1000,
] as const;

export const colorVariants = [
  ...colorVariantsByAlpha,
  ...colorVariantsByDarken,
] as const;

export type ColorVariantByAlpha = (typeof colorVariantsByAlpha)[number];

export type ColorVariantByDarken = (typeof colorVariantsByDarken)[number];

export type ColorSolidVariant =
  `${ColorVariantByAlpha | ColorVariantByDarken}s`;

export type ColorVariant =
  | ColorVariantByAlpha
  | ColorVariantByDarken
  | ColorSolidVariant
  | string;

export type Color = Record<ColorVariant, string>;
