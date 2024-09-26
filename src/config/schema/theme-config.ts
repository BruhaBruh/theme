import { z } from 'zod';

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
    color: z
      .array(
        z
          .record(
            z
              .record(z.string().describe('Color value'))
              .describe('Color token record name to value.\nRequired')
              .or(
                z
                  .object({
                    _generator: z
                      .object({
                        base: z
                          .string()
                          .describe('Base color value.\nRequired'),
                        modifier: z
                          .object({
                            min: z
                              .number()
                              .default(50)
                              .describe('Minimal token modifier.\nDefault 50'),
                            max: z
                              .number()
                              .default(1000)
                              .describe(
                                'Maximum token modifier.\nDefault 1000',
                              ),
                            step: z
                              .number()
                              .default(50)
                              .describe('Step for token modifier.\nDefault 50'),
                          })
                          .nullish()
                          .describe('Modifier generator settings.\nOptional'),
                      })
                      .describe('Color generator settings.\nRequired'),
                  })
                  .describe('Color token generator.\nRequired'),
              ),
          )
          .describe('Color tokens.\nRequired'),
      )
      .describe('List of Color tokens.\nDefault: []')
      .default([]),
    background: z
      .array(
        z
          .record(
            z
              .string()
              .describe('Color value or reference like {color.white.100}'),
          )
          .describe('Background Color token record name to value.\nRequired'),
      )
      .describe('List of Background Color tokens.\nDefault: []')
      .default([]),
    text: z
      .array(
        z
          .record(
            z
              .string()
              .describe('Color value or reference like {color.white.100}'),
          )
          .describe('Text Color token record name to value.\nRequired'),
      )
      .describe('List of Text Color tokens.\nDefault: []')
      .default([]),
    border: z
      .array(
        z
          .record(
            z
              .string()
              .describe('Color value or reference like {color.white.100}'),
          )
          .describe('Border Color token record name to value.\nRequired'),
      )
      .describe('List of Border Color tokens.\nDefault: []')
      .default([]),
    ring: z
      .array(
        z
          .record(
            z
              .string()
              .describe('Color value or reference like {color.white.100}'),
          )
          .describe('Ring Color token record name to value.\nRequired'),
      )
      .describe('List of Ring Color tokens.\nDefault: []')
      .default([]),
    fill: z
      .array(
        z
          .record(
            z
              .string()
              .describe('Color value or reference like {color.white.100}'),
          )
          .describe('Fill Color token record name to value.\nRequired'),
      )
      .describe('List of Fill Color tokens.\nDefault: []')
      .default([]),
    outline: z
      .array(
        z
          .record(
            z
              .string()
              .describe('Color value or reference like {color.white.100}'),
          )
          .describe('Outline Color token record name to value.\nRequired'),
      )
      .describe('List of Outline Color tokens.\nDefault: []')
      .default([]),
    stroke: z
      .array(
        z
          .record(
            z
              .string()
              .describe('Color value or reference like {color.white.100}'),
          )
          .describe('Stroke Color token record name to value.\nRequired'),
      )
      .describe('List of Stroke Color tokens.\nDefault: []')
      .default([]),
    borderRadius: z
      .array(
        z
          .record(
            z
              .string()
              .describe(
                'Border Radius value or reference like {border-radius.base}.\nSupport calculation like {border-radius.base} + 2px',
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
    fontFamily: z
      .array(
        z
          .record(
            z
              .string()
              .describe(
                'Font Family value or reference like {font-family.base}',
              ),
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
    lineHeight: z
      .array(
        z
          .record(
            z
              .string()
              .describe(
                'Line Height value or reference like {line-height.base}',
              ),
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
    fontSize: z
      .array(
        z
          .record(
            z
              .string()
              .describe('Font Size value or reference like {font-size.base}'),
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
    letterSpacing: z
      .array(
        z
          .record(
            z
              .string()
              .describe(
                'Letter Spacing value or reference like {letter-spacing.base}',
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
                fontFamily: z
                  .string()
                  .describe(
                    'Font Family value or reference like {font-family.base}.\nOptional',
                  )
                  .nullish(),
                fontWeight: z
                  .string()
                  .describe(
                    'Font Weight value or reference like {font-weight.base}.\nOptional',
                  )
                  .nullish(),
                lineHeight: z
                  .string()
                  .describe(
                    'Line Height value or reference like {line-height.base}.\nOptional',
                  )
                  .nullish(),
                fontSize: z
                  .string()
                  .describe(
                    'Font Size value or reference like {font-size.base}.\nOptional',
                  )
                  .nullish(),
                letterSpacing: z
                  .string()
                  .describe(
                    'Letter Spacing value or reference like {letter-spacing.base}.\nOptional',
                  )
                  .nullish(),
              })
              .describe('Typography token settings.\nRequired'),
          )
          .describe('Typography token record name to settings.\nRequired'),
      )
      .describe('List of Typography tokens.\nDefault: []')
      .default([]),
    zIndex: z
      .array(
        z
          .record(
            z
              .string()
              .describe('Z-Index value or reference like {z-index.base}'),
          )
          .describe('Z-Index token record name to value.\nRequired')
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
                      .default(`{i}`),
                    step: z.number().describe('Step.\nDefault: 1').default(1),
                  })
                  .describe('Z-Index token generator.\nRequired'),
              })
              .describe('Z-Index token generator.\nRequired'),
          ),
      )
      .describe('List of Z-Index tokens.\nDefault: []')
      .default([]),
  })
  .describe('Theme Config for @bruhabruh/theme');

export type ThemeConfig = z.infer<typeof themeConfigSchema>;
