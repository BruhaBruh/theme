import fs from 'node:fs';
import YAML from 'yaml';
import { ThemeConfig, themeConfigSchema } from './schema/theme-config';

export const readThemeConfig = (path: string): ThemeConfig => {
  const rawData = fs.readFileSync(path, { encoding: 'utf-8' });

  const data = YAML.parse(rawData);

  return themeConfigSchema.parse(data);
};
