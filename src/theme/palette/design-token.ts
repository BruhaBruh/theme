import { ColorToken } from '@/types/color';
import { PaletteDesignTokens } from '@/types/palette';
import { generateColorDesignTokens } from './color';

export const generatePaletteDesignTokens = <T extends string = ColorToken>(
  colors: Record<T, string>,
): PaletteDesignTokens<T> => {
  const tokens = {} as PaletteDesignTokens<T>;

  Object.entries<string>(colors).forEach(([colorName, color]) => {
    tokens[colorName as T] = generateColorDesignTokens(
      color,
      ['white', 'black'].includes(colorName),
    );
  });

  return tokens;
};
