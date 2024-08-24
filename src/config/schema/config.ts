import { z } from 'zod';

export const configSchema = z.object({
  prefix: z.string().default(''),
  content: z.string().default('./themes/*.theme.yaml'),
  output: z
    .object({
      all: z
        .object({
          css: z.string().nullish(),
          json: z.string().nullish(),
          js: z.string().nullish(),
          ts: z.string().nullish(),
        })
        .default({}),
      themes: z
        .record(
          z
            .object({
              css: z.string().nullish(),
              json: z.string().nullish(),
              js: z.string().nullish(),
              ts: z.string().nullish(),
            })
            .default({}),
        )
        .default({}),
    })
    .default({ all: {}, themes: {} }),
});

export type Config = z.infer<typeof configSchema>;
