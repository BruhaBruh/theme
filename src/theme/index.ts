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
  };
};

export const generateThemeVariables = (theme: Theme): Variables => {
  const variables: Variables = {};

  Object.assign(variables, generateRadiusVariables(theme.radius));
  Object.assign(variables, generatePaletteVariables(theme.palette));

  return variables;
};

export const generateThemeTailwind = (theme: Theme): Config['theme'] => {
  return {
    borderRadius: generateRadiusTailwindConfig(theme.radius),
    colors: generatePaletteTailwindConfig(theme.palette),
  } satisfies Config['theme'];
};
