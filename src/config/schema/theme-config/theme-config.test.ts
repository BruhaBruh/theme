import { themeConfigSchema } from './index';

describe('theme-config schema', () => {
  test('default', () => {
    const result = themeConfigSchema.safeParse({});
    expect(result.success).toBeTruthy();
    expect(result.data).toStrictEqual({
      dependencies: [],
      selectors: [],
      color: {
        base: [],
        material: null,
        generator: [],
      },
      radius: [],
      spacing: [],
      font: [],
      fontWeight: [],
      leading: [],
      text: [],
      tracking: [],
      typography: [],
    });
  });
});
