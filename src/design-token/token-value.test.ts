import { TokenValue } from './token-value';

describe('token-value', () => {
  test('create', () => {
    const token = TokenValue.create('name', 'value');
    expect(token.name).toBe('name');
    expect(token.value).toBe('value');
    expect(token.css).toBe(null);
  });

  test('create w/ css', () => {
    const token = TokenValue.create('name', 'value', {
      key: 'css-key',
      value: 'css-value',
    });
    expect(token.name).toBe('name');
    expect(token.value).toBe('value');
    expect(token.css).not.toBe(null);
    expect(token.css?.key).toBe('css-key');
    expect(token.css?.value).toBe('css-value');
    expect(token.css?.keyVariable).toBe('var(css-key)');
  });
});
