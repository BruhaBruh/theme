import { TailwindPluginApi } from '@/types/tailwind';
import { FontFamilyDesignToken } from './font-family-design-token';
import { FontSizeDesignToken } from './font-size-design-token';
import { FontWeightDesignToken } from './font-weight-design-token';
import { LetterSpacingDesignToken } from './letter-spacing-design-token';
import { LineHeightDesignToken } from './line-height-design-token';
import { ParagraphSpacingDesignToken } from './paragraph-spacing-design-token';
import { TypographyDesignToken } from './typography-design-token';

describe('typography-design-token', () => {
  let typographyDesignToken: TypographyDesignToken;
  let pluginApi: TailwindPluginApi;
  let components: Record<string, Record<string, string>> = {};

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
    const paragraphSpacingDesignToken = new ParagraphSpacingDesignToken();
    paragraphSpacingDesignToken.addParagraphSpacing('xs', '0.75rem');
    const letterSpacingDesignToken = new LetterSpacingDesignToken();
    typographyDesignToken = new TypographyDesignToken(
      fontFamilyDesignToken,
      fontWeightDesignToken,
      lineHeightDesignToken,
      fontSizeDesignToken,
      paragraphSpacingDesignToken,
      letterSpacingDesignToken,
    );
    components = {};
    pluginApi = {
      addUtilities() {},
      matchUtilities: () => {},
      addComponents: (c) => {
        Object.assign(components, c);
      },
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

  describe('add paragraph spacing', () => {
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
      typographyDesignToken.addTypography('only-paragraph-spacing', {
        paragraphSpacing: '0.5rem',
      });
      typographyDesignToken.addTypography('only-letter-spacing', {
        letterSpacing: '-0.01em',
      });
      typographyDesignToken.addTypography('h1', {
        paragraphSpacing: '1.5rem',
        fontSize: '3rem',
        letterSpacing: '0.125em',
        fontFamily: 'sans-serif',
        fontWeight: '700',
      });
      typographyDesignToken.addTypography('p', {
        paragraphSpacing: '0.5rem',
        fontSize: '1rem',
        fontWeight: '500',
      });
      typographyDesignToken.applyTailwind(pluginApi);
      expect(components).toStrictEqual({
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
        '.typography-only-paragraph-spacing': {
          'margin-bottom': '0.5rem',
          'margin-top': '0.5rem',
        },
        '.typography-only-letter-spacing': {
          'letter-spacing': '-0.01em',
        },
        '.typography-h1': {
          'margin-bottom': '1.5rem',
          'margin-top': '1.5rem',
          'font-size': '3rem',
          'letter-spacing': '0.125em',
          'font-family': 'sans-serif',
          'font-weight': '700',
        },
        '.typography-p': {
          'margin-bottom': '0.5rem',
          'margin-top': '0.5rem',
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
      typographyDesignToken.addTypography('only-paragraph-spacing', {
        paragraphSpacing: '0.5rem',
      });
      typographyDesignToken.addTypography('only-letter-spacing', {
        letterSpacing: '-0.01em',
      });
      typographyDesignToken.addTypography('h1', {
        paragraphSpacing: '1.5rem',
        fontSize: '3rem',
        letterSpacing: '0.125em',
        fontFamily: 'sans-serif',
        fontWeight: '700',
      });
      typographyDesignToken.addTypography('p', {
        paragraphSpacing: '0.5rem',
        fontSize: '1rem',
        fontWeight: '500',
      });
      expect(typographyDesignToken.css()).toStrictEqual([
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
        '.typography-only-paragraph-spacing {',
        '  margin-top: 0.5rem;',
        '  margin-bottom: 0.5rem;',
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
        '  margin-top: 1.5rem;',
        '  margin-bottom: 1.5rem;',
        '  letter-spacing: 0.125em;',
        '}',
        '',
        '.typography-p {',
        '  font-weight: 500;',
        '  font-size: 1rem;',
        '  margin-top: 0.5rem;',
        '  margin-bottom: 0.5rem;',
        '}',
      ]);
    });
  });

  describe('add paragraph spacing w/ reference', () => {
    test('apply tailwind', () => {
      typographyDesignToken.addTypography('all', {
        paragraphSpacing: '{paragraph-spacing.xs}',
        fontSize: '{font-size.xs}',
        letterSpacing: '{letter-spacing.normal}',
        fontFamily: '{font-family.serif}',
        fontWeight: '{font-weight.medium}',
        lineHeight: '{line-height.normal}',
      });
      typographyDesignToken.applyTailwind(pluginApi);
      expect(components).toStrictEqual({
        '.typography-all': {
          'font-family': 'var(--font-family-serif)',
          'font-size': 'var(--font-size-xs)',
          'font-weight': '500',
          'letter-spacing': '0em',
          'line-height': '1.5',
          'margin-bottom': 'var(--paragraph-spacing-xs)',
          'margin-top': 'var(--paragraph-spacing-xs)',
        },
      });
    });

    test('css', () => {
      typographyDesignToken.addTypography('all', {
        paragraphSpacing: '{paragraph-spacing.xs}',
        fontSize: '{font-size.xs}',
        letterSpacing: '{letter-spacing.normal}',
        fontFamily: '{font-family.serif}',
        fontWeight: '{font-weight.medium}',
        lineHeight: '{line-height.normal}',
      });
      expect(typographyDesignToken.css()).toStrictEqual([
        '.typography-all {',
        '  font-family: var(--font-family-serif);',
        '  font-weight: 500;',
        '  line-height: 1.5;',
        '  font-size: var(--font-size-xs);',
        '  margin-top: var(--paragraph-spacing-xs);',
        '  margin-bottom: var(--paragraph-spacing-xs);',
        '  letter-spacing: 0em;',
        '}',
      ]);
    });
  });
});
