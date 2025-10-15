import { z } from 'zod';
import { colorTokens } from './color';
import { radiusTokens } from './radius-tokens';
import { spacingTokens } from './spacing-tokens';
import { fontTokens } from './font-tokens';
import { fontWeightTokens } from './font-weight-tokens';
import { leadingTokens } from './leading-tokens';
import { textTokens } from './text-tokens';
import { trackingTokens } from './tracking-tokens';
import { typographyTokens } from './typography-tokens';

export const themeConfigSchema = z
  .object({
    dependencies: z
      .array(z.string())
      .optional()
      .default([])
      .describe('List of themes dependencies'),
    selectors: z
      .array(z.string())
      .optional()
      .default([])
      .describe('List of CSS selectors'),
    color: colorTokens,
    radius: radiusTokens,
    spacing: spacingTokens,
    font: fontTokens,
    fontWeight: fontWeightTokens,
    leading: leadingTokens,
    text: textTokens,
    tracking: trackingTokens,
    typography: typographyTokens,
  })
  .partial()
  .default({});

export type ThemeConfig = z.infer<typeof themeConfigSchema>;
