import { z } from 'zod';

export const materialColorTokensGenerator = z.object({
  source: z.string().describe('Source color value'),
  disable: z
    .object({
      neutral: z.boolean().default(false),
      'neutral-variant': z.boolean().default(false),
      primary: z.boolean().default(false),
      secondary: z.boolean().default(false),
      tertiary: z.boolean().default(false),
      error: z.boolean().default(false),
    })
    .partial()
    .default({})
    .describe('Disable generate specific color'),
  overrides: z
    .object({
      neutral: z.string().default('neutral'),
      'neutral-variant': z.string().default('neutral-variant'),
      primary: z.string().default('primary'),
      secondary: z.string().default('secondary'),
      tertiary: z.string().default('tertiary'),
      error: z.string().default('critical'),
    })
    .partial()
    .default({})
    .describe('Material color name overrides'),
  customColors: z
    .array(
      z.object({
        name: z.string().describe('Color name'),
        value: z.string().describe('Color value'),
        blend: z.boolean().optional().default(false).describe('Color blend'),
      }),
    )
    .default([])
    .describe('Custom material colors'),
});

export type MaterialColorGenerator = z.output<
  typeof materialColorTokensGenerator
>;
