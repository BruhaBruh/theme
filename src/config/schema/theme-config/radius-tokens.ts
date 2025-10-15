import z from 'zod';
import { keyType } from './key-type';

export const radiusTokens = z
  .array(
    z.record(
      keyType.describe('Border radius name'),
      z.union([
        z
          .string()
          .describe(
            'Border Radius value or reference like {radius.base}.\nSupport calculation like {radius.base} + 2px',
          ),
        z
          .object({
            start: z.number().describe('Start token'),
            end: z.number().describe('End token'),
            step: z.number().default(1).describe('Step token'),
            namePattern: z.string().default('{i}').describe('Name pattern'),
            valuePattern: z.string().default('{i}px').describe('Value pattern'),
          })
          .describe('Border Radius token generator'),
      ]),
    ),
  )
  .default([])
  .describe('Border Radius tokens');
