import { ColorDesignTokens } from '@/types/color';
import { PaletteDesignTokens } from '@/types/palette';
import { Variables } from '@/types/variables';
import { generateColorVariables } from './color';

export const generatePaletteVariables = (
  tokens: PaletteDesignTokens,
): Variables => {
  const variables: Variables = {};

  Object.entries<ColorDesignTokens>(tokens).forEach(
    ([colorName, colorTokens]) => {
      const colorVariables = generateColorVariables(colorName, colorTokens);

      Object.assign(variables, colorVariables);
    },
  );

  return variables;
};
