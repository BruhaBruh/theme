import { TailwindPluginApi } from '@/types/tailwind';
import { FontFamilyDesignToken } from './font-family-design-token';
import { FontSizeDesignToken } from './font-size-design-token';
import { FontWeightDesignToken } from './font-weight-design-token';
import { LetterSpacingDesignToken } from './letter-spacing-design-token';
import { LineHeightDesignToken } from './line-height-design-token';
import { TypographyDesignToken } from './typography-design-token';

describe('typography-design-token', () => {
  let typographyDesignToken: TypographyDesignToken;
  let pluginApi: TailwindPluginApi;
  let utilities: Record<string, Record<string, string>> = {};

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
    utilities = {};
    pluginApi = {
      addUtilities: (c) => {
        Object.assign(utilities, c);
      },
      matchUtilities: () => {},
      addComponents: () => {},
      matchComponents: () => {},
      addBase: () => {},
      addVariant: () => {},
      matchVariant: () => {},
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      theme: (_, defaultValue) => defaultValue!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      config: (_, defaultValue) => defaultValue!,
      corePlugins: () => true,
      e: (v) => v,
    };
  });

  describe('add typography', () => {
    test('apply tailwind', () => {
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
      typographyDesignToken.applyTailwind(false, pluginApi);
      expect(utilities).toStrictEqual({
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
      expect(typographyDesignToken.css(false)).toStrictEqual([
        '.typography-only-font-family {',
        '  font-family: serif;',
        '}',
        '',
        '.typography-only-font-weight {',
        '  font-weight: 600;',
        '}',
        '',
        '.typography-only-line-height {',
        '  line-height: 1.5;',
        '}',
        '',
        '.typography-only-font-size {',
        '  font-size: 0.75rem;',
        '}',
        '',
        '.typography-only-letter-spacing {',
        '  letter-spacing: -0.01em;',
        '}',
        '',
        '.typography-h1 {',
        '  font-family: sans-serif;',
        '  font-weight: 700;',
        '  font-size: 3rem;',
        '  letter-spacing: 0.125em;',
        '}',
        '',
        '.typography-p {',
        '  font-weight: 500;',
        '  font-size: 1rem;',
        '}',
      ]);
    });
  });

  describe('add typography w/ reference', () => {
    test('apply tailwind', () => {
      typographyDesignToken.addTypography('all', {
        fontSize: '{font-size.xs}',
        letterSpacing: '{letter-spacing.normal}',
        fontFamily: '{font-family.serif}',
        fontWeight: '{font-weight.medium}',
        lineHeight: '{line-height.normal}',
      });
      typographyDesignToken.applyTailwind(false, pluginApi);
      expect(utilities).toStrictEqual({
        '.typography-all': {
          'font-family': 'var(--font-family-serif)',
          'font-size': 'var(--font-size-xs)',
          'font-weight': '500',
          'letter-spacing': '0em',
          'line-height': '1.5',
        },
      });
    });

    test('css', () => {
      typographyDesignToken.addTypography('all', {
        fontSize: '{font-size.xs}',
        letterSpacing: '{letter-spacing.normal}',
        fontFamily: '{font-family.serif}',
        fontWeight: '{font-weight.medium}',
        lineHeight: '{line-height.normal}',
      });
      expect(typographyDesignToken.css(false)).toStrictEqual([
        '.typography-all {',
        '  font-family: var(--font-family-serif);',
        '  font-weight: 500;',
        '  line-height: 1.5;',
        '  font-size: var(--font-size-xs);',
        '  letter-spacing: 0em;',
        '}',
      ]);
    });
  });
});
