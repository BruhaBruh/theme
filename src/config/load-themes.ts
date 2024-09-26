import { Err, Ok, Result } from '@bruhabruh/type-safe';
import { globSync } from 'glob';
import { readThemeConfig } from './read-theme-config';
import { Config } from './schema/config';
import { ThemesConfig } from './schema/themes-config';

export const loadThemes = (config: Config): Result<ThemesConfig, string> => {
  const files = globSync(config.content);
  const themesConfig: ThemesConfig = {
    prefix: config.prefix,
    themes: {},
  };

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const themeConfigResult = readThemeConfig(file);
    if (themeConfigResult.isErr()) {
      return themeConfigResult.mapErr(
        (err) =>
          `Fail load theme config at ${file}:\n${JSON.stringify(err, null, 2)}`,
      );
    }

    const themeConfig = themeConfigResult.unwrap();
    const themeName = file.split(/[\\/]/).pop()?.split('.')[0];

    if (!themeName) return Err(`Fail get theme name of ${file}`);
    themesConfig.themes[themeName] = {
      _output: {
        ...config.output.themes[themeName],
      },
      ...themeConfig,
    };
  }

  return Ok(themesConfig);
};
