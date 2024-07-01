import { SystemDesignTokens } from '@/types/system';
import {
  ColorsThemeConfig,
  generateSystemColorTailwindConfig,
} from './color/tailwind';

export const generateSystemTailwindConfig = (
  tokens: SystemDesignTokens,
): ColorsThemeConfig => {
  const config = generateSystemColorTailwindConfig(tokens.color);

  return config;
};
