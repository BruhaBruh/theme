import fs from 'node:fs';
import YAML from 'yaml';
import { Config, configSchema } from './schema/config';

export const readConfig = (path: string): Config => {
  const rawData = fs.readFileSync(path, { encoding: 'utf-8' });

  const data = YAML.parse(rawData);

  return configSchema.parse(data);
};
