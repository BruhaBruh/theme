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
        '--font-serif':
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
      expect(fontFamilyDesignToken.css(':root', false)).toStrictEqual({
        ':root': {
          '--font-serif':
            'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        },
      });
    });

    test('tailwind css', () => {
      fontFamilyDesignToken.addFontFamily(
        'serif',
        'ui-serif, Georgia, Cambria',
        '"Times New Roman"',
        'Times',
        'serif',
      );
      expect(fontFamilyDesignToken.tailwindCSS(':root', false)).toStrictEqual({
        ':root': {
          '--font-serif':
            'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        },
        '@theme': {
          '--font-serif':
            'var(--font-serif, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif)',
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
          '--pw-font-serif':
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
        expect(fontFamilyDesignToken.css(':root', false)).toStrictEqual({
          ':root': {
            '--pw-font-serif':
              'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
          },
        });
      });

      test('tailwind css', () => {
        fontFamilyDesignToken.addFontFamily(
          'serif',
          'ui-serif, Georgia, Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        );
        expect(fontFamilyDesignToken.tailwindCSS(':root', false)).toStrictEqual(
          {
            ':root': {
              '--pw-font-serif':
                'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
            },
            '@theme': {
              '--font-serif':
                'var(--pw-font-serif, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif)',
            },
          },
        );
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
      fontFamilyDesignToken.addFontFamily('heading', 'Lora, {font.serif}');
      expect(fontFamilyDesignToken.cssVariables(false)).toStrictEqual({
        '--font-serif':
          'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        '--font-heading':
          'Lora, var(--font-serif, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif)',
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
      fontFamilyDesignToken.addFontFamily('heading', 'Lora, {font.serif}');
      expect(fontFamilyDesignToken.css(':root', false)).toStrictEqual({
        ':root': {
          '--font-serif':
            'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
          '--font-heading':
            'Lora, var(--font-serif, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif)',
        },
      });
    });

    test('tailwind css', () => {
      fontFamilyDesignToken.addFontFamily(
        'serif',
        'ui-serif, Georgia, Cambria',
        '"Times New Roman"',
        'Times',
        'serif',
      );
      fontFamilyDesignToken.addFontFamily('heading', 'Lora, {font.serif}');
      expect(fontFamilyDesignToken.tailwindCSS(':root', false)).toStrictEqual({
        ':root': {
          '--font-serif':
            'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
          '--font-heading':
            'Lora, var(--font-serif, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif)',
        },
        '@theme': {
          '--font-serif':
            'var(--font-serif, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif)',
          '--font-heading':
            'var(--font-heading, Lora, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif)',
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
        fontFamilyDesignToken.addFontFamily('heading', 'Lora, {font.serif}');
        expect(fontFamilyDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-font-serif':
            'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
          '--pw-font-heading':
            'Lora, var(--pw-font-serif, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif)',
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
        fontFamilyDesignToken.addFontFamily('heading', 'Lora, {font.serif}');
        expect(fontFamilyDesignToken.css(':root', false)).toStrictEqual({
          ':root': {
            '--pw-font-serif':
              'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
            '--pw-font-heading':
              'Lora, var(--pw-font-serif, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif)',
          },
        });
      });

      test('tailwind css', () => {
        fontFamilyDesignToken.addFontFamily(
          'serif',
          'ui-serif, Georgia, Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        );
        fontFamilyDesignToken.addFontFamily('heading', 'Lora, {font.serif}');
        expect(fontFamilyDesignToken.tailwindCSS(':root', false)).toStrictEqual(
          {
            ':root': {
              '--pw-font-serif':
                'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
              '--pw-font-heading':
                'Lora, var(--pw-font-serif, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif)',
            },
            '@theme': {
              '--font-serif':
                'var(--pw-font-serif, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif)',
              '--font-heading':
                'var(--pw-font-heading, Lora, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif)',
            },
          },
        );
      });
    });
  });
});
