import { z } from 'zod';

const baseColorTokens = z
  .record(
    z
      .string()
      .or(z.record(z.string().describe('Color value')))
      .describe('Color value or Color modifiers record'),
  )
  .describe('Color record. Name to value');

const materialColorTokensGenerator = z
  .object({
    source: z.string().describe('Source color value.\nRequired'),
    customColors: z
      .array(
        z.object({
          name: z.string().describe('Color name'),
          value: z.string().describe('Color value'),
          blend: z
            .boolean()
            .default(false)
            .describe('Color blend.\nDefault: false'),
        }),
      )
      .default([])
      .describe('Custom colors settings.\nDefault: []'),
  })
  .nullable()
  .describe('Material color generator options.\nDefault: null')
  .default(null);

export type MaterialColorGenerator = NonNullable<
  z.infer<typeof materialColorTokensGenerator>
>;

const colorTokensGenerator = z
  .record(
    z
      .object({
        base: z.string().describe('Base color value.\nRequired'),
        modifier: z
          .object({
            min: z
              .number()
              .default(50)
              .describe('Minimal token modifier.\nDefault: 50'),
            max: z
              .number()
              .default(1000)
              .describe('Maximum token modifier.\nDefault: 1000'),
            step: z
              .number()
              .default(50)
              .describe('Step for token modifier.\nDefault: 50'),
            reverse: z
              .boolean()
              .default(false)
              .describe('Reverse colors.\nDefault: false'),
          })
          .describe('Modifier generator settings.\nOptional')
          .default({}),
      })
      .describe('Color generator settings.\nRequired'),
  )
  .default({})
  .describe('Color generators by name.\nDefault: {}');

export type ColorGenerator = z.infer<
  typeof colorTokensGenerator
>[string]['modifier'];

const colorTokens = z
  .object({
    base: z
      .array(baseColorTokens)
      .describe('List of color records')
      .default([]),
    material: materialColorTokensGenerator,
    generator: z
      .array(colorTokensGenerator)
      .describe('List of color tokens generators')
      .default([]),
  })
  .describe('Color tokens.\nDefault: {}')
  .default({});

export const themeConfigSchema = z
  .object({
    dependencies: z
      .array(z.string())
      .describe('List of themes dependencies.\nDefault: []')
      .default([]),
    selectors: z
      .array(z.string())
      .describe('List of CSS selectors.\nDefault: []')
      .default([]),
    color: colorTokens,
    radius: z
      .array(
        z
          .record(
            z
              .string()
              .describe(
                'Border Radius value or reference like {radius.base}.\nSupport calculation like {radius.base} + 2px',
              ),
          )
          .describe('Border Radius token record name to value.\nRequired')
          .or(
            z
              .object({
                _generator: z
                  .object({
                    start: z.number().describe('Start number.\nRequired'),
                    end: z.number().describe('End number.\nRequired'),
                    namePattern: z
                      .string()
                      .describe('Name pattern.\nDefault: "{i}"')
                      .default(`{i}`),
                    valuePattern: z
                      .string()
                      .describe('Value pattern.\nDefault: "{i}px"')
                      .default(`{i}px`),
                    step: z.number().describe('Step.\nDefault: 1').default(1),
                  })
                  .describe('Border Radius generator settings.\nRequired'),
              })
              .describe('Border Radius token generator.\nRequired'),
          ),
      )
      .describe('List of Border Radius tokens.\nDefault: []')
      .default([]),
    spacing: z
      .array(
        z
          .record(
            z
              .string()
              .describe(
                'Spacing value or reference like {spacing.base}.\nSupport calculation like {spacing.base} + 2px',
              ),
          )
          .describe('Spacing token record name to value.\nRequired')
          .or(
            z
              .object({
                _generator: z
                  .object({
                    start: z.number().describe('Start number.\nRequired'),
                    end: z.number().describe('End number.\nRequired'),
                    namePattern: z
                      .string()
                      .describe('Name pattern.\nDefault: "{i}"')
                      .default(`{i}`),
                    valuePattern: z
                      .string()
                      .describe('Value pattern.\nDefault: "{i}px"')
                      .default(`{i}px`),
                    step: z.number().describe('Step.\nDefault: 1').default(1),
                  })
                  .describe('Spacing token generator.\nRequired'),
              })
              .describe('Spacing token generator.\nRequired'),
          ),
      )
      .describe('List of Spacing tokens.\nDefault: []')
      .default([]),
    font: z
      .array(
        z
          .record(
            z
              .string()
              .describe('Font Family value or reference like {font.base}'),
          )
          .describe('Font Family token record name to value.\nRequired'),
      )
      .describe('List of Font Family tokens.\nDefault: []')
      .default([]),
    fontWeight: z
      .array(
        z
          .record(
            z
              .string()
              .describe(
                'Font Weight value or reference like {font-weight.base}',
              ),
          )
          .describe('Font Weight token record name to value.\nRequired'),
      )
      .describe('List of Font Weight tokens.\nDefault: []')
      .default([]),
    leading: z
      .array(
        z
          .record(
            z
              .string()
              .describe('Line Height value or reference like {leading.base}'),
          )
          .describe('Line Height token record name to value.\nRequired')
          .or(
            z
              .object({
                _generator: z
                  .object({
                    start: z.number().describe('Start number.\nRequired'),
                    end: z.number().describe('End number.\nRequired'),
                    namePattern: z
                      .string()
                      .describe('Name pattern.\nDefault: "{i}"')
                      .default(`{i}`),
                    valuePattern: z
                      .string()
                      .describe('Value pattern.\nDefault: "{i}"')
                      .default(`{i}px`),
                    step: z.number().describe('Step.\nDefault: 1').default(1),
                  })
                  .describe('Line Height token generator.\nRequired'),
              })
              .describe('Line Height token generator.\nRequired'),
          ),
      )
      .describe('List of Line Height tokens.\nDefault: []')
      .default([]),
    text: z
      .array(
        z
          .record(
            z
              .string()
              .describe('Font Size value or reference like {text.base}'),
          )
          .describe('Font Size token record name to value.\nRequired')
          .or(
            z
              .object({
                _generator: z
                  .object({
                    start: z.number().describe('Start number.\nRequired'),
                    end: z.number().describe('End number.\nRequired'),
                    namePattern: z
                      .string()
                      .describe('Name pattern.\nDefault: "{i}"')
                      .default(`{i}`),
                    valuePattern: z
                      .string()
                      .describe('Value pattern.\nDefault: "{i}"')
                      .default(`{i}px`),
                    step: z.number().describe('Step.\nDefault: 1').default(1),
                  })
                  .describe('Font Size token generator.\nRequired'),
              })
              .describe('Font Size token generator.\nRequired'),
          ),
      )
      .describe('List of Font Size tokens.\nDefault: []')
      .default([]),
    tracking: z
      .array(
        z
          .record(
            z
              .string()
              .describe(
                'Letter Spacing value or reference like {tracking.base}',
              ),
          )
          .describe('Letter Spacing token record name to value.\nRequired'),
      )
      .describe('List of Letter Spacing tokens.\nDefault: []')
      .default([]),
    typography: z
      .array(
        z
          .record(
            z
              .object({
                font: z
                  .string()
                  .describe(
                    'Font Family value or reference like {font.base}.\nOptional',
                  )
                  .nullish(),
                fontWeight: z
                  .string()
                  .describe(
                    'Font Weight value or reference like {font-weight.base}.\nOptional',
                  )
                  .nullish(),
                leading: z
                  .string()
                  .describe(
                    'Line Height value or reference like {leading.base}.\nOptional',
                  )
                  .nullish(),
                text: z
                  .string()
                  .describe(
                    'Font Size value or reference like {text.base}.\nOptional',
                  )
                  .nullish(),
                tracking: z
                  .string()
                  .describe(
                    'Letter Spacing value or reference like {tracking.base}.\nOptional',
                  )
                  .nullish(),
              })
              .describe('Typography token settings.\nRequired'),
          )
          .describe('Typography token record name to settings.\nRequired'),
      )
      .describe('List of Typography tokens.\nDefault: []')
      .default([]),
  })
  .describe('Theme Config for @bruhabruh/theme');

export type ThemeConfig = z.infer<typeof themeConfigSchema>;
