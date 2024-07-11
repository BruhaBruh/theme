import { Config } from '@/types/config';
import { z } from 'zod';
import { configSchema, configWithThemesSchema } from './schema';

export const validateConfig = (
  config: unknown,
): z.infer<typeof configSchema> => {
  const result = configSchema.safeParse(config);
  if (result.success) {
    return result.data;
  } else {
    const flattenError = result.error.issues;
    process.stderr.write(`${JSON.stringify(flattenError, null, 2)}\n`);
    return process.exit(1);
  }
};

export const validateConfigWithThemes = (config: unknown): Config => {
  const result = configWithThemesSchema.safeParse(config);
  if (result.success) {
    return result.data;
  } else {
    const flattenError = result.error.issues;
    process.stderr.write(`${JSON.stringify(flattenError, null, 2)}\n`);
    return process.exit(1);
  }
};
