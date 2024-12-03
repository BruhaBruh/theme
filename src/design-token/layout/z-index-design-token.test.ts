import { ZIndexDesignToken } from './z-index-design-token';

describe('z-index-design-token', () => {
  let zIndexDesignToken: ZIndexDesignToken;

  beforeEach(() => {
    zIndexDesignToken = new ZIndexDesignToken();
  });

  describe('add z index', () => {
    test('tailwind config', () => {
      zIndexDesignToken.addZIndex('base', '1');
      expect(zIndexDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          zIndex: {
            base: '1',
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        zIndexDesignToken = new ZIndexDesignToken({ prefix: 'pw' });
      });

      test('tailwind config', () => {
        zIndexDesignToken.addZIndex('base', '1');
        expect(zIndexDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            zIndex: {
              base: '1',
            },
          },
        });
      });
    });
  });

  describe('add z index w/ reference', () => {
    test('tailwind config', () => {
      zIndexDesignToken.addZIndex('base', '1');
      zIndexDesignToken.addZIndex('2', '{z-index.base} + 1');
      expect(zIndexDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          zIndex: {
            base: '1',
            2: '2',
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        zIndexDesignToken = new ZIndexDesignToken({ prefix: 'pw' });
      });

      test('tailwind config', () => {
        zIndexDesignToken.addZIndex('base', '1');
        zIndexDesignToken.addZIndex('2', '{z-index.base} + 1');
        expect(zIndexDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            zIndex: {
              base: '1',
              2: '2',
            },
          },
        });
      });
    });
  });
});
