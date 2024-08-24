import { themeConfigSchema } from './theme-config';

describe('theme-config schema', () => {
  test('default', () => {
    const result = themeConfigSchema.safeParse({});
    expect(result.success).toBeTruthy();
    expect(result.data).toStrictEqual({
      dependencies: [],
      selectors: [],
      background: [],
      border: [],
      borderRadius: [],
      color: [],
      fill: [],
      fontFamily: [],
      fontSize: [],
      fontWeight: [],
      letterSpacing: [],
      lineHeight: [],
      outline: [],
      ring: [],
      spacing: [],
      stroke: [],
      text: [],
      typography: [],
      zIndex: [],
    });
  });
});
