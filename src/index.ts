import plugin from 'tailwindcss/plugin';
import { merge } from 'ts-deepmerge';
import { loadThemes } from './config/load-themes';
import { Config, configSchema } from './config/schema/config';
import { ThemeManager } from './config/theme-manager';
import { TailwindConfig } from './types/tailwind';

export const theme = {};

const loadThemeManagers = (config: Config) => {
  const themesConfigResult = loadThemes(config);
  if (themesConfigResult.isErr()) {
    throw new Error('Fail load themes: ' + themesConfigResult.unwrapErr());
  }
  const themesConfig = themesConfigResult.unwrap();

  const themeManagers: ThemeManager[] = [];

  Object.entries(themesConfig.themes)
    .sort((a, b) => (a[1].dependencies.includes(b[0]) ? 1 : -1))
    .forEach(([themeName, themeConfig]) => {
      const themeManager = new ThemeManager(
        themeName,
        themesConfig.prefix,
        themeConfig,
      );
      const loadResult = themeManager.load(themesConfig.themes);
      if (loadResult.isErr()) {
        throw new Error(
          `Fail load theme "${themeName}": ` + loadResult.unwrapErr(),
        );
      }

      themeManagers.push(themeManager);
    });

  return themeManagers;
};

export const themePlugin = plugin.withOptions<Omit<Partial<Config>, 'output'>>(
  (rawConfig) => {
    const config = configSchema.parse(rawConfig);
    const themeManagers = loadThemeManagers(config);

    return (api) => {
      api.addVariant('starting', '@starting-style');

      themeManagers.forEach((themeManager) => {
        themeManager.applyTailwind(config.absolute, api);
      });
    };
  },
  (rawConfig) => {
    const config = configSchema.parse(rawConfig);
    const themeManagers = loadThemeManagers(config);

    let tailwindConfig: TailwindConfig = {};

    tailwindConfig = merge(
      tailwindConfig,
      ...themeManagers.map((themeManager) =>
        themeManager.tailwindConfig(config.absolute),
      ),
    );

    return tailwindConfig;
  },
);

export default themePlugin;
