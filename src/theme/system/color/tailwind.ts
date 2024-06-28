import { kebabCase } from '@/lib/kebab-case';
import { ColorLinkedDesignTokens } from '@/types/color';
import { ThemeConfig } from 'tailwindcss/types/config';
import { systemColorVariable } from './color-variable';

export const generateSystemColorTailwindConfig = (
  tokens: ColorLinkedDesignTokens,
  isNested = false,
): ThemeConfig['colors'] => {
  const config: ThemeConfig['colors'] = {};

  Object.entries(tokens).forEach(([token, value]) => {
    if (typeof value === 'string') {
      config[kebabCase(token)] = isNested
        ? kebabCase(token)
        : `var(${systemColorVariable(token)})`;
    } else {
      const objectConfig = generateSystemColorTailwindConfig(value, true);
      Object.entries(objectConfig).forEach(([key, v]) => {
        config[kebabCase(key ? `${token}-${key}` : token)] =
          `var(${v ? systemColorVariable(token) + '-' + v : systemColorVariable(token)})`;
      });
    }
  });

  return config;
};
