import { ColorDesignTokens, ColorToken } from './color';

export type PaletteDesignTokens<T extends string = ColorToken> = Record<
  ColorToken | T,
  ColorDesignTokens
>;
