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
        '--text-xs': '0.75rem',
      });
    });

    test('css', () => {
      fontSizeDesignToken.addFontSize('xs', '0.75rem');
      expect(fontSizeDesignToken.css(':root', false)).toStrictEqual({
        ':root': {
          '--text-xs': '0.75rem',
        },
      });
    });

    test('tailwind css', () => {
      fontSizeDesignToken.addFontSize('xs', '0.75rem');
      expect(fontSizeDesignToken.tailwindCSS(':root', false)).toStrictEqual({
        ':root': {
          '--text-xs': '0.75rem',
        },
        '@theme': {
          '--text-xs': 'var(--text-xs, 0.75rem)',
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
          '--pw-text-xs': '0.75rem',
        });
      });

      test('css', () => {
        fontSizeDesignToken.addFontSize('xs', '0.75rem');
        expect(fontSizeDesignToken.css(':root', false)).toStrictEqual({
          ':root': {
            '--pw-text-xs': '0.75rem',
          },
        });
      });

      test('tailwind css', () => {
        fontSizeDesignToken.addFontSize('xs', '0.75rem');
        expect(fontSizeDesignToken.tailwindCSS(':root', false)).toStrictEqual({
          ':root': {
            '--pw-text-xs': '0.75rem',
          },
          '@theme': {
            '--text-xs': 'var(--pw-text-xs, 0.75rem)',
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
        '--text-xs': '0.75rem',
        '--text-sm': '0.875rem',
      });
    });

    test('css', () => {
      fontSizeDesignToken.addFontSize('xs', '0.75rem');
      fontSizeDesignToken.addFontSize('sm', '0.75rem + 0.125rem');
      expect(fontSizeDesignToken.css(':root', false)).toStrictEqual({
        ':root': {
          '--text-xs': '0.75rem',
          '--text-sm': '0.875rem',
        },
      });
    });

    test('tailwind css', () => {
      fontSizeDesignToken.addFontSize('xs', '0.75rem');
      fontSizeDesignToken.addFontSize('sm', '0.75rem + 0.125rem');
      expect(fontSizeDesignToken.tailwindCSS(':root', false)).toStrictEqual({
        ':root': {
          '--text-xs': '0.75rem',
          '--text-sm': '0.875rem',
        },
        '@theme': {
          '--text-xs': 'var(--text-xs, 0.75rem)',
          '--text-sm': 'var(--text-sm, 0.875rem)',
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
          '--pw-text-xs': '0.75rem',
          '--pw-text-sm': '0.875rem',
        });
      });

      test('css', () => {
        fontSizeDesignToken.addFontSize('xs', '0.75rem');
        fontSizeDesignToken.addFontSize('sm', '0.75rem + 0.125rem');
        expect(fontSizeDesignToken.css(':root', false)).toStrictEqual({
          ':root': {
            '--pw-text-xs': '0.75rem',
            '--pw-text-sm': '0.875rem',
          },
        });
      });

      test('tailwind css', () => {
        fontSizeDesignToken.addFontSize('xs', '0.75rem');
        fontSizeDesignToken.addFontSize('sm', '0.75rem + 0.125rem');
        expect(fontSizeDesignToken.tailwindCSS(':root', false)).toStrictEqual({
          ':root': {
            '--pw-text-xs': '0.75rem',
            '--pw-text-sm': '0.875rem',
          },
          '@theme': {
            '--text-xs': 'var(--pw-text-xs, 0.75rem)',
            '--text-sm': 'var(--pw-text-sm, 0.875rem)',
          },
        });
      });
    });
  });
});
