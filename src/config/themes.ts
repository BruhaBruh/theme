import { merge } from '@/lib/merge';
import { generateTheme } from '@/theme';
import { Config, ThemeConfig } from '@/types/config';
import { Theme } from '@/types/theme';

export type Themes<T extends string> = Record<T, Theme>;

export const themesFromConfig = <T extends string>(
  config: Config<T>,
): Themes<T> => {
  const themes = {} as Record<T, Theme>;

  Object.entries<Partial<ThemeConfig>>(config.themes).forEach(
    ([themeName, themeConfig]) => {
      const cfg = merge(config.base, themeConfig);
      const theme = generateTheme(cfg);

      if (themeName === config.defaultTheme) {
        theme.options.withoutRadius = false;
        theme.options.withoutPalette = false;
      }

      themes[themeName as T] = theme;
    },
  );

  return themes;
};
