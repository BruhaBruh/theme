import { ColorDesignTokens } from '@/types/color';
import { colorVariable } from './color-variable';

export const generateColorTailwindConfig = (
  colorName: string,
  tokens: ColorDesignTokens,
): Record<string, string> => {
  const config: Record<string, string> = {};

  Object.keys(tokens).forEach((token) => {
    const name = colorVariable(colorName, token);
    config[token] = `var(${name})`;
  });

  return config;
};
