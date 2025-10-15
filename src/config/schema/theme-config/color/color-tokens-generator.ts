import { z } from 'zod';
import { keyType } from '../key-type';

export const colorTokensGenerator = z
  .record(
    keyType.describe('Color name'),
    z.object({
      source: z.string().describe('Source color value'),
      modifier: z
        .object({
          min: z.number().default(50).describe('Minimal token'),
          max: z.number().default(1000).describe('Maximum token'),
          step: z.number().default(50).describe('Step for token'),
          reverse: z.boolean().default(false).describe('Reverse colors'),
        })
        .partial()
        .default({})
        .describe('Generator modifiers'),
    }),
  )
  .default({})
  .describe('Custom color generator by name');

export type ColorGenerator = z.infer<
  typeof colorTokensGenerator
>[string]['modifier'];
