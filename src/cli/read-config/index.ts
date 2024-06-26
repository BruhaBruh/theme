import { ThemeConfig } from '@/types/theme';
import fs from 'node:fs';
import path from 'node:path';

export const readConfig = (pathToConfigFile: string): ThemeConfig => {
  const raw = fs.readFileSync(path.resolve(pathToConfigFile), {
    encoding: 'utf-8',
  });
  const data = JSON.parse(raw);
  return data;
};
