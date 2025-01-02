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
    expect(token.css.unwrap().keyVariable).toBe('var(css-key, value)');
  });
});
