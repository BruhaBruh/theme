import { z } from 'zod';
import { themeConfigSchema } from './theme-config';

export const themesConfigSchema = z.object({
  default: z.string().nullish(),
  prefix: z.string().default(''),
  themes: z
    .object({})
    .catchall(
      z
        .object({
          _output: z
            .object({
              css: z.string().nullish(),
              json: z.string().nullish(),
              js: z.string().nullish(),
              ts: z.string().nullish(),
            })
            .default({}),
        })
        .merge(themeConfigSchema),
    )
    .default({}),
});

export type ThemesConfig = z.infer<typeof themesConfigSchema>;
