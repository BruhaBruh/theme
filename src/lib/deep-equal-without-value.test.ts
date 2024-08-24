import { deepEqualWithoutValue } from './deep-equal-without-value';

describe('deep-equal-without-value', () => {
  test('should return true', () => {
    expect(
      deepEqualWithoutValue(
        { a: 1, nested: { a: 1 }, array: [1, { example: 2 }, 3] },
        { a: 2, nested: { a: 5 }, array: [3, { example: 1 }, 1] },
      ),
    ).toStrictEqual([true, null]);
  });

  test('should return false', () => {
    expect(
      deepEqualWithoutValue(
        { a: 1, nested: { a: 1 }, array: [1, 2, 3] },
        { b: 1, nested: { a: 1 }, array: [3, 2, 1] },
      ),
    ).toStrictEqual([
      false,
      {
        type: 'not-found',
        path: 'a',
      },
    ]);
    expect(
      deepEqualWithoutValue(
        { a: 1, nested: { a: 1 }, array: [1, 2, 3] },
        { a: 1, nested: { b: 1 }, array: [3, 2, {}] },
      ),
    ).toStrictEqual([
      false,
      {
        type: 'not-found',
        path: 'nested.a',
      },
    ]);

    expect(
      deepEqualWithoutValue(
        { a: 1, nested: { a: 1 }, array: [1, 2, 3] },
        { a: 1, b: 1, nested: { a: 1 }, array: [3, 2, 1] },
      ),
    ).toStrictEqual([
      false,
      {
        type: 'not-found',
        path: 'b',
      },
    ]);

    expect(
      deepEqualWithoutValue(
        { a: 1, nested: { a: 1 }, array: [1, { a: 0 }, 3] },
        { a: 1, b: 1, nested: { a: 1 }, array: [3, {}, 1] },
      ),
    ).toStrictEqual([
      false,
      {
        type: 'not-found',
        path: 'array[1].a',
      },
    ]);
  });
});
