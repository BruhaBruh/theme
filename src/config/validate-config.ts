import type { Result, ZodFlattenError } from '@bruhabruh/type-safe';
import { Err, Ok, zodFlattenError } from '@bruhabruh/type-safe';
import type { Config } from './schema/config';
import { configSchema } from './schema/config';

export const validateConfig = (
  data: unknown,
): Result<Config, ZodFlattenError<Config>> => {
  const result = configSchema.safeParse(data);
  if (result.success) {
    return Ok(result.data);
  }

  return Err(zodFlattenError(result.error));
};
