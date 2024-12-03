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
    json: z
      .array(
        z
          .object({
            destination: z
              .string()
              .describe('TailwindCSS JSON output path of theme.\nOptional')
              .nullish(),
            absolute: z
              .boolean()
              .describe('TailwindCSS JSON output w/ absolute values.\nOptional')
              .nullish(),
          })
          .describe('TailwindCSS JSON output options.\nDefault: {}')
          .default({}),
      )
      .describe('TailwindCSS JSON output options.\nDefault: []')
      .default([]),
    js: z
      .array(
        z
          .object({
            destination: z
              .string()
              .describe('TailwindCSS JS output path of theme.\nOptional')
              .nullish(),
            absolute: z
              .boolean()
              .describe('TailwindCSS JS output w/ absolute values.\nOptional')
              .nullish(),
          })
          .describe('TailwindCSS JS output options.\nDefault: {}')
          .default({}),
      )
      .describe('TailwindCSS JS output options.\nDefault: []')
      .default([]),
    ts: z
      .array(
        z
          .object({
            destination: z
              .string()
              .describe('TailwindCSS TS output path of theme.\nOptional')
              .nullish(),
            absolute: z
              .boolean()
              .describe('TailwindCSS TS output w/ absolute values.\\nOptional')
              .nullish(),
          })
          .describe('TailwindCSS TS output options.\nDefault: {}')
          .default({}),
      )
      .describe('TailwindCSS TS output options.\nDefault: []')
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
