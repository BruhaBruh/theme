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
                      destination: z
                        .string()
                        .describe('CSS output path of theme.\nOptional')
                        .nullish(),
                      absolute: z
                        .boolean()
                        .describe('CSS output w/ absolute values.\nOptional')
                        .nullish(),
                    })
                    .describe('CSS output options.\nDefault: {}')
                    .default({}),
                )
                .describe('CSS output options.\nDefault: []')
                .default([]),
              tailwind: z
                .array(
                  z
                    .object({
                      destination: z
                        .string()
                        .describe('TailwindCSS output path of theme.\nOptional')
                        .nullish(),
                      absolute: z
                        .boolean()
                        .describe(
                          'TailwindCSS output w/ absolute values.\nOptional',
                        )
                        .nullish(),
                    })
                    .describe('TailwindCSS output options.\nDefault: {}')
                    .default({}),
                )
                .describe('TailwindCSS JSON output options.\nDefault: []')
                .default([]),
            })
            .describe('Output for combined all themes.\nDefault: {}')
            .default({}),
        })
        .merge(themeConfigSchema),
    )
    .default({}),
});

export type ThemesConfig = z.infer<typeof themesConfigSchema>;
