import { themeConfigSchema } from './theme-config';

describe('theme-config schema', () => {
  test('default', () => {
    const result = themeConfigSchema.safeParse({});
    expect(result.success).toBeTruthy();
    expect(result.data).toStrictEqual({
      color: {
        base: [],
        generator: [],
        material: {
          customColors: [],
          disable: {
            error: false,
            neutral: false,
            'neutral-variant': false,
            primary: false,
            secondary: false,
            tertiary: false,
          },
          overrides: {
            error: 'critical',
            neutral: 'neutral',
            'neutral-variant': 'neutral-variant',
            primary: 'primary',
            secondary: 'secondary',
            tertiary: 'tertiary',
          },
          source: '#ffffff',
        },
      },
      dependencies: [],
      selectors: [],
      radius: [],
      font: [],
      text: [],
      fontWeight: [],
      tracking: [],
      leading: [],
      spacing: [],
      typography: [],
    });
  });
});
