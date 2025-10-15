import { z } from 'zod';
import { keyType } from './key-type';

export const fontTokens = z
  .array(
    z.record(
      keyType.describe('Font Family name'),
      z.string().describe('Font Family value or reference like {font.base}'),
    ),
  )
  .default([])
  .describe('Font Family tokens');
