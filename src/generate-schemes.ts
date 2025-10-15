import { writeToFile } from './cli/write-to-file';
import { configSchema } from './config/schema/config';
import { themeConfigSchema } from './config/schema/theme-config';
import { z } from 'zod';

writeToFile(
  './schema/config.schema.json',
  JSON.stringify(
    z.toJSONSchema(configSchema, {
      io: 'input',
      target: 'draft-7',
      unrepresentable: 'throw',
      reused: 'ref',
    }),
    null,
    2,
  ),
);

writeToFile(
  './schema/theme-config.schema.json',
  JSON.stringify(
    z.toJSONSchema(themeConfigSchema, {
      io: 'input',
      target: 'draft-7',
      unrepresentable: 'throw',
      reused: 'ref',
    }),
    null,
    2,
  ),
);
