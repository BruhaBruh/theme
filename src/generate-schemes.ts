import zodToJsonSchema from 'zod-to-json-schema';
import { writeToFile } from './cli/write-to-file';
import { configSchema } from './config/schema/config';
import { themeConfigSchema } from './config/schema/theme-config';

writeToFile(
  './schema/config.schema.json',
  JSON.stringify(zodToJsonSchema(configSchema, 'config'), null, 2),
);

writeToFile(
  './schema/theme-config.schema.json',
  JSON.stringify(zodToJsonSchema(themeConfigSchema, 'theme-config'), null, 2),
);
