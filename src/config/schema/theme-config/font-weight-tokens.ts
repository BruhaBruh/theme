import { z } from 'zod';
import { keyType } from './key-type';

export const fontWeightTokens = z
  .array(
    z.record(
      keyType.describe('Font Weight name'),
      z
        .string()
        .describe('Font Weight value or reference like {font-weight.base}'),
    ),
  )
  .default([])
  .describe('Font Weight tokens');
