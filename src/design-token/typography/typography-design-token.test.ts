import { FontFamilyDesignToken } from './font-family-design-token';
import { FontSizeDesignToken } from './font-size-design-token';
import { FontWeightDesignToken } from './font-weight-design-token';
import { LetterSpacingDesignToken } from './letter-spacing-design-token';
import { LineHeightDesignToken } from './line-height-design-token';
import { TypographyDesignToken } from './typography-design-token';

describe('typography-design-token', () => {
  let typographyDesignToken: TypographyDesignToken;

  beforeEach(() => {
    const fontFamilyDesignToken = new FontFamilyDesignToken();
    fontFamilyDesignToken.addFontFamily(
      'serif',
      'ui-serif, Georgia, Cambria',
      '"Times New Roman"',
      'Times',
      'serif',
    );
    const fontWeightDesignToken = new FontWeightDesignToken();
    const lineHeightDesignToken = new LineHeightDesignToken();
    const fontSizeDesignToken = new FontSizeDesignToken();
    fontSizeDesignToken.addFontSize('xs', '0.75rem');
    const letterSpacingDesignToken = new LetterSpacingDesignToken();
    typographyDesignToken = new TypographyDesignToken(
      fontFamilyDesignToken,
      fontWeightDesignToken,
      lineHeightDesignToken,
      fontSizeDesignToken,
      letterSpacingDesignToken,
    );
  });

  describe('add typography', () => {
    test('css', () => {
      typographyDesignToken.addTypography('only-font-family', {
        fontFamily: 'serif',
      });
      typographyDesignToken.addTypography('only-font-weight', {
        fontWeight: '600',
      });
      typographyDesignToken.addTypography('only-line-height', {
        lineHeight: '1.5',
      });
      typographyDesignToken.addTypography('only-font-size', {
        fontSize: '0.75rem',
      });
      typographyDesignToken.addTypography('only-letter-spacing', {
        letterSpacing: '-0.01em',
      });
      typographyDesignToken.addTypography('h1', {
        fontSize: '3rem',
        letterSpacing: '0.125em',
        fontFamily: 'sans-serif',
        fontWeight: '700',
      });
      typographyDesignToken.addTypography('p', {
        fontSize: '1rem',
        fontWeight: '500',
      });
      expect(typographyDesignToken.css(':root', false)).toStrictEqual({
        '.typography-only-font-family': {
          'font-family': 'serif',
        },
        '.typography-only-font-weight': {
          'font-weight': '600',
        },
        '.typography-only-line-height': {
          'line-height': '1.5',
        },
        '.typography-only-font-size': {
          'font-size': '0.75rem',
        },
        '.typography-only-letter-spacing': {
          'letter-spacing': '-0.01em',
        },
        '.typography-h1': {
          'font-size': '3rem',
          'letter-spacing': '0.125em',
          'font-family': 'sans-serif',
          'font-weight': '700',
        },
        '.typography-p': {
          'font-size': '1rem',
          'font-weight': '500',
        },
      });
    });

    test('tailwind css', () => {
      typographyDesignToken.addTypography('only-font-family', {
        fontFamily: 'serif',
      });
      typographyDesignToken.addTypography('only-font-weight', {
        fontWeight: '600',
      });
      typographyDesignToken.addTypography('only-line-height', {
        lineHeight: '1.5',
      });
      typographyDesignToken.addTypography('only-font-size', {
        fontSize: '0.75rem',
      });
      typographyDesignToken.addTypography('only-letter-spacing', {
        letterSpacing: '-0.01em',
      });
      typographyDesignToken.addTypography('h1', {
        fontSize: '3rem',
        letterSpacing: '0.125em',
        fontFamily: 'sans-serif',
        fontWeight: '700',
      });
      typographyDesignToken.addTypography('p', {
        fontSize: '1rem',
        fontWeight: '500',
      });
      expect(typographyDesignToken.tailwindCSS(':root', false)).toStrictEqual({
        '@utility typography-only-font-family': {
          'font-family': 'serif',
        },
        '@utility typography-only-font-weight': {
          'font-weight': '600',
        },
        '@utility typography-only-line-height': {
          'line-height': '1.5',
        },
        '@utility typography-only-font-size': {
          'font-size': '0.75rem',
        },
        '@utility typography-only-letter-spacing': {
          'letter-spacing': '-0.01em',
        },
        '@utility typography-h1': {
          'font-size': '3rem',
          'letter-spacing': '0.125em',
          'font-family': 'sans-serif',
          'font-weight': '700',
        },
        '@utility typography-p': {
          'font-size': '1rem',
          'font-weight': '500',
        },
      });
    });
  });

  describe('add typography w/ reference', () => {
    test('css', () => {
      typographyDesignToken.addTypography('all', {
        fontSize: '{text.xs}',
        letterSpacing: '{tracking.normal}',
        fontFamily: '{font.serif}',
        fontWeight: '{font-weight.medium}',
        lineHeight: '{leading.normal}',
      });
      expect(typographyDesignToken.css(':root', false)).toStrictEqual({
        '.typography-all': {
          'font-family':
            'var(--font-serif, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif)',
          'font-size': 'var(--text-xs, 0.75rem)',
          'font-weight': '500',
          'letter-spacing': '0em',
          'line-height': '1.5',
        },
      });
    });

    test('tailwind css', () => {
      typographyDesignToken.addTypography('all', {
        fontSize: '{text.xs}',
        letterSpacing: '{tracking.normal}',
        fontFamily: '{font.serif}',
        fontWeight: '{font-weight.medium}',
        lineHeight: '{leading.normal}',
      });
      expect(typographyDesignToken.tailwindCSS(':root', false)).toStrictEqual({
        '@utility typography-all': {
          'font-family':
            'var(--font-serif, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif)',
          'font-size': 'var(--text-xs, 0.75rem)',
          'font-weight': '500',
          'letter-spacing': '0em',
          'line-height': '1.5',
        },
      });
    });
  });
});
