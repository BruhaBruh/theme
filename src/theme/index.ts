import { ThemeConfig } from '@/types/config';
import { Theme } from '@/types/theme';
import { Variables } from '@/types/variables';
import { Config } from 'tailwindcss/types/config';
import {
  generatePaletteDesignTokens,
  generatePaletteTailwindConfig,
  generatePaletteVariables,
} from './palette';
import {
  generateRadiusDesignTokens,
  generateRadiusTailwindConfig,
  generateRadiusVariables,
} from './radius';
import {
  generateSystemTailwindConfig,
  generateSystemVariables,
} from './system';

export const generateTheme = (config: ThemeConfig): Theme => {
  return {
    radius: generateRadiusDesignTokens(config.radius),
    palette: generatePaletteDesignTokens(config.palette),
    system: config.system,
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

  Object.assign(variables, generateSystemVariables(theme.system));

  return variables;
};

export const generateThemeTailwind = (theme: Theme): Config['theme'] => {
  const config = {
    borderRadius: generateRadiusTailwindConfig(theme.radius),
    colors: generatePaletteTailwindConfig(theme.palette),
  } satisfies Config['theme'];

  config.colors = Object.assign(
    config.colors,
    generateSystemTailwindConfig(theme.system).colors,
  );

  return config;
};
