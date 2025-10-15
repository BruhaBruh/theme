import { z } from 'zod';
import { keyType } from './key-type';

export const leadingTokens = z
  .array(
    z.record(
      keyType.describe('Line Height name'),
      z.union([
        z
          .string()
          .describe(
            'Line Height value or reference like {leading.base}.\nSupport calculation like {leading.base} + 2px',
          ),
        z
          .object({
            start: z.number().describe('Start token'),
            end: z.number().describe('End token'),
            step: z.number().default(1).describe('Step token'),
            namePattern: z.string().default('{i}').describe('Name pattern'),
            valuePattern: z.string().default('{i}px').describe('Value pattern'),
          })
          .describe('Line Height generator'),
      ]),
    ),
  )
  .default([])
  .describe('Line Heights');
