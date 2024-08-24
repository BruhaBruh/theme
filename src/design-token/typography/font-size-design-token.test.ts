import { FontSizeDesignToken } from './font-size-design-token';

describe('font-size-design-token', () => {
  let fontSizeDesignToken: FontSizeDesignToken;

  beforeEach(() => {
    fontSizeDesignToken = new FontSizeDesignToken();
  });

  describe('add font size', () => {
    test('css variables', () => {
      fontSizeDesignToken.addFontSize('xs', '0.75rem');
      expect(fontSizeDesignToken.cssVariables).toStrictEqual({
        '--font-size-xs': '0.75rem',
      });
    });

    test('css', () => {
      fontSizeDesignToken.addFontSize('xs', '0.75rem');
      expect(fontSizeDesignToken.css()).toStrictEqual([
        '--font-size-xs: 0.75rem;',
      ]);
    });

    test('tailwind config', () => {
      fontSizeDesignToken.addFontSize('xs', '0.75rem');
      expect(fontSizeDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          fontSize: {
            xs: 'var(--font-size-xs) /* 0.75rem */',
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
        expect(fontSizeDesignToken.cssVariables).toStrictEqual({
          '--pw-font-size-xs': '0.75rem',
        });
      });

      test('css', () => {
        fontSizeDesignToken.addFontSize('xs', '0.75rem');
        expect(fontSizeDesignToken.css()).toStrictEqual([
          '--pw-font-size-xs: 0.75rem;',
        ]);
      });

      test('tailwind config', () => {
        fontSizeDesignToken.addFontSize('xs', '0.75rem');
        expect(fontSizeDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            fontSize: {
              xs: 'var(--pw-font-size-xs) /* 0.75rem */',
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
      expect(fontSizeDesignToken.cssVariables).toStrictEqual({
        '--font-size-xs': '0.75rem',
        '--font-size-sm': '0.875rem',
      });
    });

    test('css', () => {
      fontSizeDesignToken.addFontSize('xs', '0.75rem');
      fontSizeDesignToken.addFontSize('sm', '0.75rem + 0.125rem');
      expect(fontSizeDesignToken.css()).toStrictEqual([
        '--font-size-xs: 0.75rem;',
        '--font-size-sm: 0.875rem;',
      ]);
    });

    test('tailwind config', () => {
      fontSizeDesignToken.addFontSize('xs', '0.75rem');
      fontSizeDesignToken.addFontSize('sm', '0.75rem + 0.125rem');
      expect(fontSizeDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          fontSize: {
            xs: 'var(--font-size-xs) /* 0.75rem */',
            sm: 'var(--font-size-sm) /* 0.875rem */',
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
        expect(fontSizeDesignToken.cssVariables).toStrictEqual({
          '--pw-font-size-xs': '0.75rem',
          '--pw-font-size-sm': '0.875rem',
        });
      });

      test('css', () => {
        fontSizeDesignToken.addFontSize('xs', '0.75rem');
        fontSizeDesignToken.addFontSize('sm', '0.75rem + 0.125rem');
        expect(fontSizeDesignToken.css()).toStrictEqual([
          '--pw-font-size-xs: 0.75rem;',
          '--pw-font-size-sm: 0.875rem;',
        ]);
      });

      test('tailwind config', () => {
        fontSizeDesignToken.addFontSize('xs', '0.75rem');
        fontSizeDesignToken.addFontSize('sm', '0.75rem + 0.125rem');
        expect(fontSizeDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            fontSize: {
              xs: 'var(--pw-font-size-xs) /* 0.75rem */',
              sm: 'var(--pw-font-size-sm) /* 0.875rem */',
            },
          },
        });
      });
    });
  });
});
