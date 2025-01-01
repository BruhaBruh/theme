import { z } from 'zod';

const outputSchema = z
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
              .describe('TailwindCSS output w/ absolute values.\nOptional')
              .nullish(),
          })
          .describe('TailwindCSS output options.\nDefault: {}')
          .default({}),
      )
      .describe('TailwindCSS JSON output options.\nDefault: []')
      .default([]),
  })
  .describe('Output for combined all themes.\nDefault: {}')
  .default({});

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
    absolute: z
      .boolean()
      .describe('Output w/ absolute values.\nDefault: false')
      .default(false),
    output: z
      .object({
        all: outputSchema,
        themes: z.record(outputSchema).default({}),
      })
      .describe('Output configuration.\nDefault: { all: {}, themes: {} }')
      .default({}),
  })
  .describe('Main Config for @bruhabruh/theme');

export type Config = z.infer<typeof configSchema>;
