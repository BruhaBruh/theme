import { z } from 'zod';

export const outputSchema = z
  .object({
    css: z
      .array(
        z
          .object({
            destination: z
              .string()
              .describe('CSS output path of theme.\nRequired'),
            absolute: z
              .boolean()
              .default(false)
              .describe('CSS output w/ absolute values.\nDefault: false'),
            options: z
              .object({
                disableTypography: z.boolean().default(false),
              })
              .default({}),
          })
          .describe('CSS output options.\nRequired'),
      )
      .describe('CSS output options.\nDefault: []')
      .default([]),
    tailwind: z
      .array(
        z
          .object({
            destination: z
              .string()
              .describe('Tailwind output path of theme.\nRequired'),
            absolute: z
              .boolean()
              .default(false)
              .describe('Tailwind output w/ absolute values.\nDefault: false'),
          })
          .describe('Tailwind output options.\nRequired'),
      )
      .describe('Tailwind output options.\nDefault: []')
      .default([]),
  })
  .describe('Output for combined all themes.\nDefault: {}')
  .default({});

export type CSSOutputOptions = z.infer<
  typeof outputSchema
>['css'][number]['options'];

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
