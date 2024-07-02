import { Config } from '@/types/config';
import { configSchema } from './schema';

export const validateConfig = (config: unknown): Config => {
  const result = configSchema.safeParse(config);
  if (result.success) {
    return result.data;
  } else {
    const flattenError = result.error.issues;
    process.stderr.write(`${JSON.stringify(flattenError, null, 2)}\n`);
    return process.exit(1);
  }
};
