import { globSync } from 'glob';
import { readThemeConfig } from './read-theme-config';
import { Config } from './schema/config';
import { ThemesConfig } from './schema/themes-config';

export const loadThemes = (config: Config): ThemesConfig => {
  const files = globSync(config.content);
  const themesConfig: ThemesConfig = {
    default: config.default,
    prefix: config.prefix,
    themes: {},
  };

  files.forEach((file) => {
    const themeConfig = readThemeConfig(file);
    const themeName = file.split(/[\\/]/).pop()?.split('.')[0];
    if (!themeName) throw new Error('fail get theme name of ' + file);
    themesConfig.themes[themeName] = {
      _output: {
        ...config.output.themes[themeName],
      },
      ...themeConfig,
    };
  });

  if (themesConfig.default && !themesConfig.themes[themesConfig.default])
    throw new Error('default theme is not found');

  return themesConfig;
};
