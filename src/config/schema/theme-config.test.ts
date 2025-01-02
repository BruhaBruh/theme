import { themeConfigSchema } from './theme-config';

describe('theme-config schema', () => {
  test('default', () => {
    const result = themeConfigSchema.safeParse({});
    expect(result.success).toBeTruthy();
    expect(result.data).toStrictEqual({
      dependencies: [],
      selectors: [],
      radius: [],
      color: [],
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
