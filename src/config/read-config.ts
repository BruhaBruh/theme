import {
  Err,
  Ok,
  Result,
  ZodFlattenError,
  zodFlattenError,
} from '@bruhabruh/type-safe';
import fs from 'node:fs';
import YAML from 'yaml';
import { Config, configSchema } from './schema/config';

export const readConfig = (
  path: string,
): Result<Config, string | ZodFlattenError<Config>> => {
  try {
    const rawData = fs.readFileSync(path, { encoding: 'utf-8' });

    const data = YAML.parse(rawData);

    const result = configSchema.safeParse(data);
    if (result.success) {
      return Ok(result.data);
    }

    return Err(zodFlattenError(result.error));
  } catch (e) {
    return Err(`Fail read file at ${path}`);
  }
};
