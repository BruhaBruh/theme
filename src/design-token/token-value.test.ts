import { TokenValue } from './token-value';

describe('token-value', () => {
  test('create', () => {
    const token = TokenValue.create({
      name: 'name',
      value: 'value',
    });
    expect(token.name).toBe('name');
    expect(token.value).toBe('value');
    expect(token.css.isNone()).toBeTruthy();
  });

  test('create w/ css', () => {
    const token = TokenValue.create({
      name: 'name',
      value: 'value',
      css: {
        key: 'css-key',
        value: 'css-value',
      },
    });
    expect(token.name).toBe('name');
    expect(token.value).toBe('value');
    expect(token.css.isSome()).toBeTruthy();
    expect(token.css.unwrap().key).toBe('css-key');
    expect(token.css.unwrap().value).toBe('css-value');
    expect(token.css.unwrap().keyVariable).toBe('var(css-key)');
  });

  test('toTailwindString', () => {
    const token = TokenValue.create({
      name: 'name',
      value: 'value',
    });
    expect(
      token.toTailwindString({
        absolute: false,
      }),
    ).toBe('value');
    expect(
      token.toTailwindString({
        absolute: true,
      }),
    ).toBe('value');
  });

  test('toTailwindString w/ humanReadableValue', () => {
    const token = TokenValue.create({
      name: 'name',
      value: 'value',
      humanReadableValue: 'second-value',
    });
    expect(
      token.toTailwindString({
        absolute: false,
      }),
    ).toBe('value');
    expect(
      token.toTailwindString({
        absolute: true,
      }),
    ).toBe('value');
  });

  test('toTailwindString w/ css', () => {
    const token = TokenValue.create({
      name: 'name',
      value: 'value',
      css: {
        key: 'css-key',
        value: 'css-value',
      },
    });
    expect(
      token.toTailwindString({
        absolute: false,
      }),
    ).toBe('/* value */ var(css-key)');
    expect(
      token.toTailwindString({
        absolute: true,
      }),
    ).toBe('value');
  });

  test('toTailwindString w/ css and humanReadableValue', () => {
    const token = TokenValue.create({
      name: 'name',
      value: 'value',
      humanReadableValue: 'second-value',
      css: {
        key: 'css-key',
        value: 'css-value',
      },
    });
    expect(
      token.toTailwindString({
        absolute: false,
      }),
    ).toBe('/* second-value = value */ var(css-key)');
    expect(
      token.toTailwindString({
        absolute: true,
      }),
    ).toBe('value');
  });

  test('toTailwindString w/ css and humanReadableValue same as value', () => {
    const token = TokenValue.create({
      name: 'name',
      value: 'value',
      humanReadableValue: 'value',
      css: {
        key: 'css-key',
        value: 'css-value',
      },
    });
    expect(
      token.toTailwindString({
        absolute: false,
      }),
    ).toBe('/* value */ var(css-key)');
    expect(
      token.toTailwindString({
        absolute: true,
      }),
    ).toBe('value');
  });
});
