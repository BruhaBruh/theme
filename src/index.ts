import plugin from 'tailwindcss/plugin';
import { merge } from 'ts-deepmerge';
import { loadThemes } from './config/load-themes';
import { Config, configSchema } from './config/schema/config';
import { ThemeManager } from './config/theme-manager';
import { TailwindConfig } from './types/tailwind';

export const theme = {};

const loadThemeManagers = (config: Config) => {
  const themesConfig = loadThemes(config);

  const themeManagers: ThemeManager[] = [];

  Object.entries(themesConfig.themes)
    .sort((a, b) => (a[1].dependencies.includes(b[0]) ? 1 : -1))
    .forEach(([themeName, themeConfig]) => {
      const themeManager = new ThemeManager(
        themeName,
        themesConfig.prefix,
        themeConfig,
      );
      themeManager.load(themesConfig.themes);

      themeManagers.push(themeManager);
    });

  return themeManagers;
};

export const themePlugin = plugin.withOptions<Partial<Config>>(
  (rawConfig) => {
    const config = configSchema.parse(rawConfig);
    const themeManagers = loadThemeManagers(config);

    return (api) => {
      themeManagers.forEach((themeManager) => {
        themeManager.applyTailwind(api);
      });
    };
  },
  (rawConfig) => {
    const config = configSchema.parse(rawConfig);
    const themeManagers = loadThemeManagers(config);

    let tailwindConfig: TailwindConfig = {};

    tailwindConfig = merge(
      tailwindConfig,
      ...themeManagers.map((themeManager) => themeManager.tailwindConfig()),
    );

    return tailwindConfig;
  },
);

export default themePlugin;
