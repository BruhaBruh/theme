import { Config } from '@/types/config';
import { globSync } from 'glob';
import fs from 'node:fs';
import YAML from 'yaml';
import { validateConfig, validateConfigWithThemes } from './validate';

const readThemes = (path: string): Config['themes'] => {
  const themes = {} as Config['themes'];

  const files = globSync(path);

  files.forEach((filePath) => {
    const rawData = fs.readFileSync(filePath, { encoding: 'utf-8' });

    const split = filePath.split(/[\\/]/);
    const theme = split[split.length - 1].replace('.theme.yaml', '');

    const data = YAML.parse(rawData);

    if (data === null) {
      themes[theme] = {} as Config['themes'][string];
    } else {
      themes[theme] = data;
    }
  });

  return themes;
};

export const readConfig = (path: string): Config => {
  const rawData = fs.readFileSync(path, { encoding: 'utf-8' });

  const data = YAML.parse(rawData);

  const config = validateConfig(data);

  const configWithThemes = validateConfigWithThemes({
    ...config,
    themes: readThemes(config.content),
  });

  return configWithThemes;
};
