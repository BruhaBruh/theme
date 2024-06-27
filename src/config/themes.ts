import { generateTheme } from '@/theme';
import { Config, ThemeConfig } from '@/types/config';
import { Theme } from '@/types/theme';

export type Themes<T extends string> = Record<T, Theme>;

export const themesFromConfig = <T extends string>(
  config: Config<T>,
): Themes<T> => {
  const themes = {} as Record<T, Theme>;

  Object.entries<ThemeConfig>(config.themes).forEach(
    ([themeName, themeConfig]) => {
      const cfg = {
        ...config.base,
        ...themeConfig,
      } satisfies Required<ThemeConfig>;
      const theme = generateTheme(cfg);

      themes[themeName as T] = theme;
    },
  );

  return themes;
};
