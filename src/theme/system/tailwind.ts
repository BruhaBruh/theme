import { SystemDesignTokens } from '@/types/system';
import { ThemeConfig } from 'tailwindcss/types/config';
import { generateSystemColorTailwindConfig } from './color/tailwind';

export const generateSystemTailwindConfig = (
  tokens: SystemDesignTokens,
): Pick<ThemeConfig, 'colors'> => {
  const config: Pick<ThemeConfig, 'colors'> = {
    colors: {},
  };

  Object.assign(config.colors, generateSystemColorTailwindConfig(tokens.color));

  return config;
};
