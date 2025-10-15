import { z } from 'zod';
import { baseColorTokens } from './base-color-tokens';
import { materialColorTokensGenerator } from './material-color-tokens-generator';
import { colorTokensGenerator } from './color-tokens-generator';

export const colorTokens = z
  .object({
    base: z
      .array(baseColorTokens)
      .describe('List of color records')
      .default([]),
    material: materialColorTokensGenerator.nullable().default(null),
    generator: z
      .array(colorTokensGenerator)
      .describe('List of color tokens generators')
      .default([]),
  })
  .partial()
  .default({
    base: [],
    material: null,
    generator: [],
  })
  .describe('Color tokens');
