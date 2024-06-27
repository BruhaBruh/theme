import { ThemeConfig } from '@/types/config';
import { Theme } from '@/types/theme';
import { Variables } from '@/types/variables';
import { Config } from 'tailwindcss/types/config';
import {
  generateRadiusDesignTokens,
  generateRadiusTailwindConfig,
  generateRadiusVariables,
} from './radius';

export const generateTheme = (config: Required<ThemeConfig>): Theme => {
  return {
    radius: generateRadiusDesignTokens(config.radius),
  };
};

export const generateThemeVariables = (theme: Theme): Variables => {
  return {
    ...generateRadiusVariables(theme.radius),
  };
};

export const generateThemeTailwind = (theme: Theme): Config['theme'] => {
  return {
    borderRadius: generateRadiusTailwindConfig(theme.radius),
  } satisfies Config['theme'];
};
