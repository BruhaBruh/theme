import { RadiusDesignTokens, RadiusToken } from '@/types/radius';
import { ThemeConfig } from 'tailwindcss/types/config';
import { radiusVariable } from './radius-variable';

const BASE_TOKEN: RadiusToken = 'base';

export const generateRadiusTailwindConfig = (
  tokens: RadiusDesignTokens,
): ThemeConfig['borderRadius'] => {
  const config: ThemeConfig['borderRadius'] = {};

  Object.keys(tokens).forEach((token) => {
    const name = radiusVariable(token);
    config[token] = `var(${name})`;
    // eslint-disable-next-line security/detect-possible-timing-attacks
    if (token === BASE_TOKEN) {
      config['DEFAULT'] = `var(${name})`;
    }
  });

  return config;
};
