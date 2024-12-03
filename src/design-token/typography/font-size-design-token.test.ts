import { FontSizeDesignToken } from './font-size-design-token';

describe('font-size-design-token', () => {
  let fontSizeDesignToken: FontSizeDesignToken;

  beforeEach(() => {
    fontSizeDesignToken = new FontSizeDesignToken();
  });

  describe('add font size', () => {
    test('css variables', () => {
      fontSizeDesignToken.addFontSize('xs', '0.75rem');
      expect(fontSizeDesignToken.cssVariables(false)).toStrictEqual({
        '--font-size-xs': '0.75rem',
      });
    });

    test('css', () => {
      fontSizeDesignToken.addFontSize('xs', '0.75rem');
      expect(fontSizeDesignToken.css(false)).toStrictEqual([
        '--font-size-xs: 0.75rem;',
      ]);
    });

    test('tailwind config', () => {
      fontSizeDesignToken.addFontSize('xs', '0.75rem');
      expect(fontSizeDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          fontSize: {
            xs: '/* 12px = 0.75rem */ var(--font-size-xs)',
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        fontSizeDesignToken = new FontSizeDesignToken({ prefix: 'pw' });
      });

      test('css variables', () => {
        fontSizeDesignToken.addFontSize('xs', '0.75rem');
        expect(fontSizeDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-font-size-xs': '0.75rem',
        });
      });

      test('css', () => {
        fontSizeDesignToken.addFontSize('xs', '0.75rem');
        expect(fontSizeDesignToken.css(false)).toStrictEqual([
          '--pw-font-size-xs: 0.75rem;',
        ]);
      });

      test('tailwind config', () => {
        fontSizeDesignToken.addFontSize('xs', '0.75rem');
        expect(fontSizeDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            fontSize: {
              xs: '/* 12px = 0.75rem */ var(--pw-font-size-xs)',
            },
          },
        });
      });
    });
  });

  describe('add font size w/ reference', () => {
    test('css variables', () => {
      fontSizeDesignToken.addFontSize('xs', '0.75rem');
      fontSizeDesignToken.addFontSize('sm', '0.75rem + 0.125rem');
      expect(fontSizeDesignToken.cssVariables(false)).toStrictEqual({
        '--font-size-xs': '0.75rem',
        '--font-size-sm': '0.875rem',
      });
    });

    test('css', () => {
      fontSizeDesignToken.addFontSize('xs', '0.75rem');
      fontSizeDesignToken.addFontSize('sm', '0.75rem + 0.125rem');
      expect(fontSizeDesignToken.css(false)).toStrictEqual([
        '--font-size-xs: 0.75rem;',
        '--font-size-sm: 0.875rem;',
      ]);
    });

    test('tailwind config', () => {
      fontSizeDesignToken.addFontSize('xs', '0.75rem');
      fontSizeDesignToken.addFontSize('sm', '0.75rem + 0.125rem');
      expect(fontSizeDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          fontSize: {
            xs: '/* 12px = 0.75rem */ var(--font-size-xs)',
            sm: '/* 14px = 0.875rem */ var(--font-size-sm)',
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        fontSizeDesignToken = new FontSizeDesignToken({ prefix: 'pw' });
      });

      test('css variables', () => {
        fontSizeDesignToken.addFontSize('xs', '0.75rem');
        fontSizeDesignToken.addFontSize('sm', '0.75rem + 0.125rem');
        expect(fontSizeDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-font-size-xs': '0.75rem',
          '--pw-font-size-sm': '0.875rem',
        });
      });

      test('css', () => {
        fontSizeDesignToken.addFontSize('xs', '0.75rem');
        fontSizeDesignToken.addFontSize('sm', '0.75rem + 0.125rem');
        expect(fontSizeDesignToken.css(false)).toStrictEqual([
          '--pw-font-size-xs: 0.75rem;',
          '--pw-font-size-sm: 0.875rem;',
        ]);
      });

      test('tailwind config', () => {
        fontSizeDesignToken.addFontSize('xs', '0.75rem');
        fontSizeDesignToken.addFontSize('sm', '0.75rem + 0.125rem');
        expect(fontSizeDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            fontSize: {
              xs: '/* 12px = 0.75rem */ var(--pw-font-size-xs)',
              sm: '/* 14px = 0.875rem */ var(--pw-font-size-sm)',
            },
          },
        });
      });
    });
  });
});
