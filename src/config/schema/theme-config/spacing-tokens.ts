import { z } from 'zod';
import { keyType } from './key-type';

export const spacingTokens = z
  .array(
    z.record(
      keyType.describe('Spacing name'),
      z.union([
        z
          .string()
          .describe(
            'Spacing value or reference like {spacing.base}.\nSupport calculation like {spacing.base} + 2px',
          ),
        z
          .object({
            start: z.number().describe('Start token'),
            end: z.number().describe('End token'),
            step: z.number().default(1).describe('Step token'),
            namePattern: z.string().default('{i}').describe('Name pattern'),
            valuePattern: z.string().default('{i}px').describe('Value pattern'),
          })
          .describe('Spacing token generator'),
      ]),
    ),
  )
  .default([])
  .describe('Spacing tokens');
