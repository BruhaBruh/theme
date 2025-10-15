import { z } from 'zod';
import { keyType } from './key-type';

export const trackingTokens = z
  .array(
    z.record(
      keyType.describe('Letter Spacing name'),
      z
        .string()
        .describe(
          'Letter Spacing value or reference like {tracking.base}.\nSupport calculation like {tracking.base} + 2px',
        ),
    ),
  )
  .default([])
  .describe('Letter Spacing tokens');
