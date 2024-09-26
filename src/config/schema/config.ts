import { z } from 'zod';

export const configSchema = z
  .object({
    prefix: z
      .string()
      .describe('Prefix in css variables.\nDefault: ""')
      .default(''),
    content: z
      .string()
      .describe('Path to theme configs.\nDefault: "./themes/*.theme.yaml"')
      .default('./themes/*.theme.yaml'),
    output: z
      .object({
        all: z
          .object({
            css: z
              .string()
              .describe('CSS output path of theme.\nOptional')
              .nullish(),
            json: z
              .string()
              .describe('TailwindCSS JSON output path of theme.\nOptional')
              .nullish(),
            js: z
              .string()
              .describe('TailwindCSS JS output path of theme.\nOptional')
              .nullish(),
            ts: z
              .string()
              .describe('TailwindCSS TS output path of theme.\nOptional')
              .nullish(),
          })
          .describe('Output for combined all themes.\nDefault: {}')
          .default({}),
        themes: z
          .record(
            z
              .object({
                css: z
                  .string()
                  .describe('CSS output path of theme.\nOptional')
                  .nullish(),
                json: z
                  .string()
                  .describe('TailwindCSS JSON output path of theme.\nOptional')
                  .nullish(),
                js: z
                  .string()
                  .describe('TailwindCSS JS output path of theme.\nOptional')
                  .nullish(),
                ts: z
                  .string()
                  .describe('TailwindCSS TS output path of theme.\nOptional')
                  .nullish(),
              })
              .describe('Output for theme.\nDefault: {}')
              .default({}),
          )
          .default({}),
      })
      .describe('Output configuration.\nDefault: { all: {}, themes: {} }')
      .default({ all: {}, themes: {} }),
  })
  .describe('Main Config for @bruhabruh/theme');

export type Config = z.infer<typeof configSchema>;
