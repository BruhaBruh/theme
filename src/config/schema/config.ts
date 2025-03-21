import { z } from 'zod';

export const configSchema = z
  .object({
    prefix: z
      .string()
      .describe('Prefix in css variables.\nDefault: ""')
      .default(''),
    content: z
      .string()
      .describe('Path to theme configs.\nDefault: "./themes/*.theme.yaml"')
      .default('./themes/*.theme.yaml'),
    absolute: z
      .boolean()
      .describe('Output w/ absolute values.\nDefault: false')
      .default(false),
    output: z.string().describe('Output path destination of scheme.\nRequired'),
  })
  .describe('Main Config for @bruhabruh/theme');

export type Config = z.infer<typeof configSchema>;
