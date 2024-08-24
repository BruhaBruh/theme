import { ZIndexDesignToken } from './z-index-design-token';

describe('z-index-design-token', () => {
  let zIndexDesignToken: ZIndexDesignToken;

  beforeEach(() => {
    zIndexDesignToken = new ZIndexDesignToken();
  });

  describe('add z index', () => {
    test('css variables', () => {
      zIndexDesignToken.addZIndex('base', '1');
      expect(zIndexDesignToken.cssVariables).toStrictEqual({
        '--z-index-base': '1',
      });
    });

    test('css', () => {
      zIndexDesignToken.addZIndex('base', '1');
      expect(zIndexDesignToken.css()).toStrictEqual(['--z-index-base: 1;']);
    });

    test('tailwind config', () => {
      zIndexDesignToken.addZIndex('base', '1');
      expect(zIndexDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          zIndex: {
            base: 'var(--z-index-base) /* 1 */',
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        zIndexDesignToken = new ZIndexDesignToken({ prefix: 'pw' });
      });

      test('css variables', () => {
        zIndexDesignToken.addZIndex('base', '1');
        expect(zIndexDesignToken.cssVariables).toStrictEqual({
          '--pw-z-index-base': '1',
        });
      });

      test('css', () => {
        zIndexDesignToken.addZIndex('base', '1');
        expect(zIndexDesignToken.css()).toStrictEqual([
          '--pw-z-index-base: 1;',
        ]);
      });

      test('tailwind config', () => {
        zIndexDesignToken.addZIndex('base', '1');
        expect(zIndexDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            zIndex: {
              base: 'var(--pw-z-index-base) /* 1 */',
            },
          },
        });
      });
    });
  });

  describe('add z index w/ reference', () => {
    test('css variables', () => {
      zIndexDesignToken.addZIndex('base', '1');
      zIndexDesignToken.addZIndex('2', '{z-index.base} + 1');
      expect(zIndexDesignToken.cssVariables).toStrictEqual({
        '--z-index-base': '1',
        '--z-index-2': '2',
      });
    });

    test('css', () => {
      zIndexDesignToken.addZIndex('base', '1');
      zIndexDesignToken.addZIndex('2', '{z-index.base} + 1');
      expect(zIndexDesignToken.css()).toStrictEqual([
        '--z-index-base: 1;',
        '--z-index-2: 2;',
      ]);
    });

    test('tailwind config', () => {
      zIndexDesignToken.addZIndex('base', '1');
      zIndexDesignToken.addZIndex('2', '{z-index.base} + 1');
      expect(zIndexDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          zIndex: {
            base: 'var(--z-index-base) /* 1 */',
            2: 'var(--z-index-2) /* 2 */',
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        zIndexDesignToken = new ZIndexDesignToken({ prefix: 'pw' });
      });

      test('css variables', () => {
        zIndexDesignToken.addZIndex('base', '1');
        zIndexDesignToken.addZIndex('2', '{z-index.base} + 1');
        expect(zIndexDesignToken.cssVariables).toStrictEqual({
          '--pw-z-index-base': '1',
          '--pw-z-index-2': '2',
        });
      });

      test('css', () => {
        zIndexDesignToken.addZIndex('base', '1');
        zIndexDesignToken.addZIndex('2', '{z-index.base} + 1');
        expect(zIndexDesignToken.css()).toStrictEqual([
          '--pw-z-index-base: 1;',
          '--pw-z-index-2: 2;',
        ]);
      });

      test('tailwind config', () => {
        zIndexDesignToken.addZIndex('base', '1');
        zIndexDesignToken.addZIndex('2', '{z-index.base} + 1');
        expect(zIndexDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            zIndex: {
              base: 'var(--pw-z-index-base) /* 1 */',
              2: 'var(--pw-z-index-2) /* 2 */',
            },
          },
        });
      });
    });
  });
});
