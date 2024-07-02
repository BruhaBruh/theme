import { ThemeConfig } from '@/types/config';
import { Theme } from '@/types/theme';
import { generateColorFromConfig } from './color/generate';
import { generateRadiusFromConfig } from './radius/generate';
import { generateSystemFromConfig } from './system/generate';

export const generateTheme = <
  P extends string | undefined = undefined,
  T extends ThemeConfig = ThemeConfig,
>(
  prefix: P,
  config: T,
): Theme<P, T> => {
  return {
    prefix,
    radius: generateRadiusFromConfig(config),
    color: generateColorFromConfig(config),
    system: generateSystemFromConfig(prefix, config),
  };
};
