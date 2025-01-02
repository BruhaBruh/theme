import { z } from 'zod';
import { outputSchema } from './config';
import { themeConfigSchema } from './theme-config';

export const themesConfigSchema = z.object({
  prefix: z.string().default(''),
  themes: z
    .object({})
    .catchall(
      z
        .object({
          _output: outputSchema,
        })
        .merge(themeConfigSchema),
    )
    .default({}),
});

export type ThemesConfig = z.infer<typeof themesConfigSchema>;
