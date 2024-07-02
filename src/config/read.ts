import fs from 'node:fs';
import YAML from 'yaml';
import { validateConfig } from './validate';

export const readConfig = (path: string) => {
  const rawData = fs.readFileSync(path, { encoding: 'utf-8' });

  const data = YAML.parse(rawData);

  const config = validateConfig(data);
  return config;
};
