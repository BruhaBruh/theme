import { configSchema } from './config';

describe('config schema', () => {
  test('default', () => {
    const result = configSchema.safeParse({});
    expect(result.success).toBeTruthy();
    expect(result.data).toStrictEqual({
      prefix: '',
      content: './themes/*.theme.yaml',
      absolute: false,
      output: {
        all: {
          css: [],
          tailwind: [],
        },
        themes: {},
      },
    });
  });
});
