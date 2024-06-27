import { variable } from '@/lib/variable';
import { ColorDesignTokens } from '@/types/color';

export const generateColorTailwindConfig = (
  colorName: string,
  tokens: ColorDesignTokens,
): Record<string, string> => {
  const config: Record<string, string> = {};

  Object.keys(tokens).forEach((token) => {
    const name = variable('color', colorName, token);
    config[token] = `var(${name})`;
  });

  return config;
};
