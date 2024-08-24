import { themesConfigSchema } from './themes-config';

describe('themes-config schema', () => {
  test('default', () => {
    const result = themesConfigSchema.safeParse({});
    expect(result.success).toBeTruthy();
    expect(result.data).toStrictEqual({
      prefix: '',
      themes: {},
    });
  });
});
