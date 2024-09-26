import {
  Err,
  Ok,
  Result,
  ZodFlattenError,
  zodFlattenError,
} from '@bruhabruh/type-safe';
import fs from 'node:fs';
import YAML from 'yaml';
import { ThemeConfig, themeConfigSchema } from './schema/theme-config';

export const readThemeConfig = (
  path: string,
): Result<ThemeConfig, ZodFlattenError<ThemeConfig>> => {
  const rawData = fs.readFileSync(path, { encoding: 'utf-8' });

  const data = YAML.parse(rawData);

  const result = themeConfigSchema.safeParse(data);
  if (result.success) {
    return Ok(result.data);
  }

  return Err(zodFlattenError(result.error));
};
