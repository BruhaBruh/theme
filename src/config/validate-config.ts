import {
  Err,
  Ok,
  Result,
  ZodFlattenError,
  zodFlattenError,
} from '@bruhabruh/type-safe';
import { Config, configSchema } from './schema/config';

export const validateConfig = (
  data: unknown,
): Result<Config, ZodFlattenError<Config>> => {
  const result = configSchema.safeParse(data);
  if (result.success) {
    return Ok(result.data);
  }

  return Err(zodFlattenError(result.error));
};
