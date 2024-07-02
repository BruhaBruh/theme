import { Config } from '@/types/config';
import { Themes } from '@/types/theme';
import { generateTheme } from './generate-theme';

export const generateThemesFromConfig = <T extends Config>(
  config: T,
): Themes<T> => {
  const result = {} as Themes<T>;

  Object.entries(config.themes).forEach(([key, value]) => {
    result[key as keyof Themes<T>] = generateTheme(
      config.prefix,
      value,
    ) as Themes<T>[keyof Themes<T>];
  });

  return result;
};
