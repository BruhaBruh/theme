import { z } from 'zod';
import { keyType } from './key-type';

export const typographyTokens = z
  .array(
    z.record(
      keyType.describe('Typography name'),
      z
        .object({
          font: z
            .string()
            .describe('Font Family value or reference like {font.base}'),
          fontWeight: z
            .string()
            .describe('Font Weight value or reference like {font-weight.base}'),
          leading: z
            .string()
            .describe('Line Height value or reference like {leading.base}'),
          text: z
            .string()
            .describe('Font Size value or reference like {text.base}'),
          tracking: z
            .string()
            .describe('Letter Spacing value or reference like {tracking.base}'),
        })
        .describe('Typography settings'),
    ),
  )
  .default([])
  .describe('Typography tokens');
