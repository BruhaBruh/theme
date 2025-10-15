import { z } from 'zod';
import { keyType } from './key-type';

export const textTokens = z
  .array(
    z.record(
      keyType.describe('Font Size name'),
      z.union([
        z
          .string()
          .describe(
            'Font Size value or reference like {text.base}.\nSupport calculation like {text.base} + 2px',
          ),
        z
          .object({
            start: z.number().describe('Start token'),
            end: z.number().describe('End token'),
            step: z.number().default(1).describe('Step token'),
            namePattern: z.string().default('{i}').describe('Name pattern'),
            valuePattern: z.string().default('{i}px').describe('Value pattern'),
          })
          .describe('Font Size token generator'),
      ]),
    ),
  )
  .default([])
  .describe('Spacing tokens');
