import { generateThemeTailwind } from '@/theme';
import { Config } from '@/types/config';
import { themesFromConfig } from './themes';

export const configToTailwind = <T extends string = string>(
  config: Config<T>,
  spacing = 2,
): string => {
  const theme = themesFromConfig(config)[config.defaultTheme];

  const tailwind = generateThemeTailwind(theme);

  return JSON.stringify(tailwind, null, spacing);
};
