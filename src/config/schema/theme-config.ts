import { z } from 'zod';

export const themeConfigSchema = z.object({
  dependencies: z.array(z.string()).default([]),
  selectors: z.array(z.string()).default([]),
  color: z
    .array(
      z.record(
        z.record(z.string()).or(
          z.object({
            _generator: z.object({
              base: z.string(),
              type: z
                .union([z.literal('hsb'), z.literal('alpha')])
                .default('hsb'),
              solid: z
                .object({
                  light: z.string().nullish(),
                  dark: z.string().nullish(),
                })
                .nullish(),
              modifier: z
                .object({
                  min: z.number().default(50),
                  max: z.number().default(1000),
                  step: z.number().default(50),
                })
                .nullish(),
            }),
          }),
        ),
      ),
    )
    .default([]),
  background: z.array(z.record(z.string())).default([]),
  text: z.array(z.record(z.string())).default([]),
  border: z.array(z.record(z.string())).default([]),
  ring: z.array(z.record(z.string())).default([]),
  fill: z.array(z.record(z.string())).default([]),
  outline: z.array(z.record(z.string())).default([]),
  stroke: z.array(z.record(z.string())).default([]),
  borderRadius: z
    .array(
      z.record(z.string()).or(
        z.object({
          _generator: z.object({
            start: z.number(),
            end: z.number(),
            namePattern: z.string().default(`{i}`),
            valuePattern: z.string().default(`{i}px`),
            step: z.number().default(1),
          }),
        }),
      ),
    )
    .default([]),
  spacing: z
    .array(
      z.record(z.string()).or(
        z.object({
          _generator: z.object({
            start: z.number(),
            end: z.number(),
            namePattern: z.string().default(`{i}`),
            valuePattern: z.string().default(`{i}px`),
            step: z.number().default(1),
          }),
        }),
      ),
    )
    .default([]),
  fontFamily: z.array(z.record(z.string())).default([]),
  fontWeight: z.array(z.record(z.string())).default([]),
  lineHeight: z
    .array(
      z.record(z.string()).or(
        z.object({
          _generator: z.object({
            start: z.number(),
            end: z.number(),
            namePattern: z.string().default(`{i}`),
            valuePattern: z.string().default(`{i}px`),
            step: z.number().default(1),
          }),
        }),
      ),
    )
    .default([]),
  fontSize: z
    .array(
      z.record(z.string()).or(
        z.object({
          _generator: z.object({
            start: z.number(),
            end: z.number(),
            namePattern: z.string().default(`{i}`),
            valuePattern: z.string().default(`{i}px`),
            step: z.number().default(1),
          }),
        }),
      ),
    )
    .default([]),
  letterSpacing: z.array(z.record(z.string())).default([]),
  typography: z
    .array(
      z.record(
        z.object({
          fontFamily: z.string().nullish(),
          fontWeight: z.string().nullish(),
          lineHeight: z.string().nullish(),
          fontSize: z.string().nullish(),
          paragraphSpacing: z.string().nullish(),
          letterSpacing: z.string().nullish(),
        }),
      ),
    )
    .default([]),
  zIndex: z
    .array(
      z.record(z.string()).or(
        z.object({
          _generator: z.object({
            start: z.number(),
            end: z.number(),
            namePattern: z.string().default(`{i}`),
            valuePattern: z.string().default(`{i}`),
            step: z.number().default(1),
          }),
        }),
      ),
    )
    .default([]),
});

export type ThemeConfig = z.infer<typeof themeConfigSchema>;
