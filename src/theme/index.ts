import { Theme, ThemeConfig } from '@/types/theme';
import { VariablesBySelectors } from '@/types/variables';
import { Config } from 'tailwindcss/types/config';
import {
  generateRadiusDesignTokens,
  generateRadiusTailwindConfig,
  generateRadiusVariables,
} from './radius';

export const generateTheme = (config: ThemeConfig): Theme => {
  return {
    radius: generateRadiusDesignTokens(config.radius),
  };
};

export const generateThemeVariables = (
  config: ThemeConfig,
  spacing = 2,
): string => {
  const theme = generateTheme(config);

  const variablesBySelectors: VariablesBySelectors = {
    ':root': {
      ...generateRadiusVariables(theme.radius),
    },
    ':root, .light': {},
    '.dark': {},
  };

  const lines: string[] = [];

  const space = (n = 1) => ' '.repeat(spacing).repeat(n);

  Object.entries(variablesBySelectors).forEach(
    ([selector, variables], i, arr) => {
      lines.push(`${selector} {`);
      Object.entries(variables).forEach(([key, value]) => {
        lines.push(`${space()}${key}: ${value};`);
      });
      lines.push('}');
      if (i !== arr.length - 1) lines.push('');
    },
  );

  return lines.join('\n');
};

export const generateThemeTailwind = (config: ThemeConfig): Config['theme'] => {
  const theme = generateTheme(config);

  return {
    borderRadius: generateRadiusTailwindConfig(theme.radius),
  } satisfies Config['theme'];
};

export const generateThemeTailwindJson = (config: ThemeConfig, spacing = 2) => {
  return JSON.stringify(generateThemeTailwind(config), null, spacing);
};
