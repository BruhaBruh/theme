import { ThemeConfig } from '@/types/config';
import { Theme } from '@/types/theme';
import { Variables } from '@/types/variables';
import { Config } from 'tailwindcss/types/config';
import { generatePaletteDesignTokens } from './palette/design-token';
import { generatePaletteTailwindConfig } from './palette/tailwind';
import { generatePaletteVariables } from './palette/variables';
import {
  generateRadiusDesignTokens,
  generateRadiusTailwindConfig,
  generateRadiusVariables,
} from './radius';

export const generateTheme = (config: ThemeConfig): Theme => {
  return {
    radius: generateRadiusDesignTokens(config.radius),
    palette: generatePaletteDesignTokens(config.palette),
    options: {
      withoutRadius: config.options?.withoutRadius ?? false,
      withoutPalette: config.options?.withoutPalette ?? false,
    },
  };
};

export const generateThemeVariables = (theme: Theme): Variables => {
  const variables: Variables = {};

  if (!theme.options.withoutRadius)
    Object.assign(variables, generateRadiusVariables(theme.radius));
  if (!theme.options.withoutPalette)
    Object.assign(variables, generatePaletteVariables(theme.palette));

  return variables;
};

export const generateThemeTailwind = (theme: Theme): Config['theme'] => {
  return {
    borderRadius: generateRadiusTailwindConfig(theme.radius),
    colors: generatePaletteTailwindConfig(theme.palette),
  } satisfies Config['theme'];
};
