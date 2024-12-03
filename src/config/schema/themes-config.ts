import { z } from 'zod';
import { themeConfigSchema } from './theme-config';

export const themesConfigSchema = z.object({
  prefix: z.string().default(''),
  themes: z
    .object({})
    .catchall(
      z
        .object({
          _output: z
            .object({
              css: z
                .array(
                  z
                    .object({
                      destination: z.string().nullish(),
                      absolute: z.boolean().nullish(),
                    })
                    .default({}),
                )
                .default([]),
              json: z
                .array(
                  z
                    .object({
                      destination: z.string().nullish(),
                      absolute: z.boolean().nullish(),
                    })
                    .default({}),
                )
                .default([]),
              js: z
                .array(
                  z
                    .object({
                      destination: z.string().nullish(),
                      absolute: z.boolean().nullish(),
                    })
                    .default({}),
                )
                .describe('TailwindCSS JS output options.\nDefault: []')
                .default([]),
              ts: z
                .array(
                  z
                    .object({
                      destination: z.string().nullish(),
                      absolute: z.boolean().nullish(),
                    })
                    .default({}),
                )
                .default([]),
            })
            .default({}),
        })
        .merge(themeConfigSchema),
    )
    .default({}),
});

export type ThemesConfig = z.infer<typeof themesConfigSchema>;
