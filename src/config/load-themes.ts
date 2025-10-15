import type { Result } from '@bruhabruh/type-safe';
import { Err, Ok } from '@bruhabruh/type-safe';
import { globSync } from 'glob';
import { readThemeConfig } from './read-theme-config';
import type { Config } from './schema/config';
import type { ThemeConfig } from './schema/theme-config';

export const loadThemes = (
  config: Config,
): Result<Record<string, ThemeConfig>, string> => {
  const files = globSync(config.content);
  const themesConfig: Record<string, ThemeConfig> = {};

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

    if (!themeName) {return Err(`Fail get theme name of ${file}`);}
    themesConfig[themeName] = themeConfig;
  }

  return Ok(themesConfig);
};
