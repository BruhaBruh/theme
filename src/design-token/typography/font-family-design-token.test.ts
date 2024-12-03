import { FontFamilyDesignToken } from './font-family-design-token';

describe('font-family-design-token', () => {
  let fontFamilyDesignToken: FontFamilyDesignToken;

  beforeEach(() => {
    fontFamilyDesignToken = new FontFamilyDesignToken();
  });

  describe('add font family', () => {
    test('css variables', () => {
      fontFamilyDesignToken.addFontFamily(
        'serif',
        'ui-serif, Georgia, Cambria',
        '"Times New Roman"',
        'Times',
        'serif',
      );
      expect(fontFamilyDesignToken.cssVariables(false)).toStrictEqual({
        '--font-family-serif':
          'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      });
    });

    test('css', () => {
      fontFamilyDesignToken.addFontFamily(
        'serif',
        'ui-serif, Georgia, Cambria',
        '"Times New Roman"',
        'Times',
        'serif',
      );
      expect(fontFamilyDesignToken.css(false)).toStrictEqual([
        '--font-family-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;',
      ]);
    });

    test('tailwind config', () => {
      fontFamilyDesignToken.addFontFamily(
        'serif',
        'ui-serif, Georgia, Cambria',
        '"Times New Roman"',
        'Times',
        'serif',
      );
      expect(fontFamilyDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          fontFamily: {
            serif:
              '/* ui-serif, Georgia, Cambria, "Times New Roman", Times, serif */ var(--font-family-serif)',
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        fontFamilyDesignToken = new FontFamilyDesignToken({ prefix: 'pw' });
      });

      test('css variables', () => {
        fontFamilyDesignToken.addFontFamily(
          'serif',
          'ui-serif, Georgia, Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        );
        expect(fontFamilyDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-font-family-serif':
            'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        });
      });

      test('css', () => {
        fontFamilyDesignToken.addFontFamily(
          'serif',
          'ui-serif, Georgia, Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        );
        expect(fontFamilyDesignToken.css(false)).toStrictEqual([
          '--pw-font-family-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;',
        ]);
      });

      test('tailwind config', () => {
        fontFamilyDesignToken.addFontFamily(
          'serif',
          'ui-serif, Georgia, Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        );
        expect(fontFamilyDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            fontFamily: {
              serif:
                '/* ui-serif, Georgia, Cambria, "Times New Roman", Times, serif */ var(--pw-font-family-serif)',
            },
          },
        });
      });
    });
  });

  describe('add font family w/ reference', () => {
    test('css variables', () => {
      fontFamilyDesignToken.addFontFamily(
        'serif',
        'ui-serif, Georgia, Cambria',
        '"Times New Roman"',
        'Times',
        'serif',
      );
      fontFamilyDesignToken.addFontFamily(
        'heading',
        'Lora, {font-family.serif}',
      );
      expect(fontFamilyDesignToken.cssVariables(false)).toStrictEqual({
        '--font-family-serif':
          'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        '--font-family-heading': 'Lora, var(--font-family-serif)',
      });
    });

    test('css', () => {
      fontFamilyDesignToken.addFontFamily(
        'serif',
        'ui-serif, Georgia, Cambria',
        '"Times New Roman"',
        'Times',
        'serif',
      );
      fontFamilyDesignToken.addFontFamily(
        'heading',
        'Lora, {font-family.serif}',
      );
      expect(fontFamilyDesignToken.css(false)).toStrictEqual([
        '--font-family-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;',
        '--font-family-heading: Lora, var(--font-family-serif);',
      ]);
    });

    test('tailwind config', () => {
      fontFamilyDesignToken.addFontFamily(
        'serif',
        'ui-serif, Georgia, Cambria',
        '"Times New Roman"',
        'Times',
        'serif',
      );
      fontFamilyDesignToken.addFontFamily(
        'heading',
        'Lora, {font-family.serif}',
      );
      expect(fontFamilyDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          fontFamily: {
            serif:
              '/* ui-serif, Georgia, Cambria, "Times New Roman", Times, serif */ var(--font-family-serif)',
            heading:
              '/* Lora, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif */ var(--font-family-heading)',
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        fontFamilyDesignToken = new FontFamilyDesignToken({ prefix: 'pw' });
      });

      test('css variables', () => {
        fontFamilyDesignToken.addFontFamily(
          'serif',
          'ui-serif, Georgia, Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        );
        fontFamilyDesignToken.addFontFamily(
          'heading',
          'Lora, {font-family.serif}',
        );
        expect(fontFamilyDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-font-family-serif':
            'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
          '--pw-font-family-heading': 'Lora, var(--pw-font-family-serif)',
        });
      });

      test('css', () => {
        fontFamilyDesignToken.addFontFamily(
          'serif',
          'ui-serif, Georgia, Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        );
        fontFamilyDesignToken.addFontFamily(
          'heading',
          'Lora, {font-family.serif}',
        );
        expect(fontFamilyDesignToken.css(false)).toStrictEqual([
          '--pw-font-family-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;',
          '--pw-font-family-heading: Lora, var(--pw-font-family-serif);',
        ]);
      });

      test('tailwind config', () => {
        fontFamilyDesignToken.addFontFamily(
          'serif',
          'ui-serif, Georgia, Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        );
        fontFamilyDesignToken.addFontFamily(
          'heading',
          'Lora, {font-family.serif}',
        );
        expect(fontFamilyDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            fontFamily: {
              serif:
                '/* ui-serif, Georgia, Cambria, "Times New Roman", Times, serif */ var(--pw-font-family-serif)',
              heading:
                '/* Lora, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif */ var(--pw-font-family-heading)',
            },
          },
        });
      });
    });
  });
});
