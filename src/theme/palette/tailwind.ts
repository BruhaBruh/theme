import { ColorDesignTokens } from '@/types/color';
import { PaletteDesignTokens } from '@/types/palette';
import { ThemeConfig } from 'tailwindcss/types/config';
import { generateColorTailwindConfig } from './color';

export const generatePaletteTailwindConfig = (
  tokens: PaletteDesignTokens,
): ThemeConfig['colors'] => {
  const config: ThemeConfig['colors'] = {};

  Object.entries<ColorDesignTokens>(tokens).forEach(
    ([colorName, colorTokens]) => {
      config[colorName] = generateColorTailwindConfig(colorName, colorTokens);
    },
  );

  return config;
};
