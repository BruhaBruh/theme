import { FontWeightDesignToken } from './font-weight-design-token';

describe('font-weight-design-token', () => {
  let fontWeightDesignToken: FontWeightDesignToken;

  beforeEach(() => {
    fontWeightDesignToken = new FontWeightDesignToken();
  });

  describe('add font family', () => {
    test('css variables', () => {
      fontWeightDesignToken.addFontWeight('regular', '400');
      expect(fontWeightDesignToken.cssVariables(false)).toStrictEqual({
        '--font-weight-regular': '400',
      });
    });

    test('css', () => {
      fontWeightDesignToken.addFontWeight('regular', '400');
      expect(fontWeightDesignToken.css(false)).toStrictEqual([
        '--font-weight-regular: 400;',
      ]);
    });

    test('tailwind config', () => {
      fontWeightDesignToken.addFontWeight('regular', '400');
      expect(fontWeightDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          fontWeight: {
            thin: '100',
            extralight: '200',
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800',
            black: '900',
            regular: '/* 400 */ var(--font-weight-regular)',
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        fontWeightDesignToken = new FontWeightDesignToken({ prefix: 'pw' });
      });

      test('css variables', () => {
        fontWeightDesignToken.addFontWeight('regular', '400');
        expect(fontWeightDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-font-weight-regular': '400',
        });
      });

      test('css', () => {
        fontWeightDesignToken.addFontWeight('regular', '400');
        expect(fontWeightDesignToken.css(false)).toStrictEqual([
          '--pw-font-weight-regular: 400;',
        ]);
      });

      test('tailwind config', () => {
        fontWeightDesignToken.addFontWeight('regular', '400');
        expect(fontWeightDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            fontWeight: {
              thin: '100',
              extralight: '200',
              light: '300',
              normal: '400',
              medium: '500',
              semibold: '600',
              bold: '700',
              extrabold: '800',
              black: '900',
              regular: '/* 400 */ var(--pw-font-weight-regular)',
            },
          },
        });
      });
    });
  });

  describe('add font family w/ reference', () => {
    test('css variables', () => {
      fontWeightDesignToken.addFontWeight('regular', '400');
      fontWeightDesignToken.addFontWeight('paragraph', '{font-weight.regular}');
      fontWeightDesignToken.addFontWeight('heading', '{font-weight.bold}');
      expect(fontWeightDesignToken.cssVariables(false)).toStrictEqual({
        '--font-weight-regular': '400',
        '--font-weight-paragraph': 'var(--font-weight-regular)',
        '--font-weight-heading': '700',
      });
    });

    test('css', () => {
      fontWeightDesignToken.addFontWeight('regular', '400');
      fontWeightDesignToken.addFontWeight('paragraph', '{font-weight.regular}');
      fontWeightDesignToken.addFontWeight('heading', '{font-weight.bold}');
      expect(fontWeightDesignToken.css(false)).toStrictEqual([
        '--font-weight-regular: 400;',
        '--font-weight-paragraph: var(--font-weight-regular);',
        '--font-weight-heading: 700;',
      ]);
    });

    test('tailwind config', () => {
      fontWeightDesignToken.addFontWeight('regular', '400');
      fontWeightDesignToken.addFontWeight('paragraph', '{font-weight.regular}');
      fontWeightDesignToken.addFontWeight('heading', '{font-weight.bold}');
      expect(fontWeightDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          fontWeight: {
            thin: '100',
            extralight: '200',
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800',
            black: '900',
            regular: '/* 400 */ var(--font-weight-regular)',
            paragraph: '/* 400 */ var(--font-weight-paragraph)',
            heading: '/* 700 */ var(--font-weight-heading)',
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        fontWeightDesignToken = new FontWeightDesignToken({ prefix: 'pw' });
      });

      test('css variables', () => {
        fontWeightDesignToken.addFontWeight('regular', '400');
        fontWeightDesignToken.addFontWeight(
          'paragraph',
          '{font-weight.regular}',
        );
        fontWeightDesignToken.addFontWeight('heading', '{font-weight.bold}');
        expect(fontWeightDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-font-weight-regular': '400',
          '--pw-font-weight-paragraph': 'var(--pw-font-weight-regular)',
          '--pw-font-weight-heading': '700',
        });
      });

      test('css', () => {
        fontWeightDesignToken.addFontWeight('regular', '400');
        fontWeightDesignToken.addFontWeight(
          'paragraph',
          '{font-weight.regular}',
        );
        fontWeightDesignToken.addFontWeight('heading', '{font-weight.bold}');
        expect(fontWeightDesignToken.css(false)).toStrictEqual([
          '--pw-font-weight-regular: 400;',
          '--pw-font-weight-paragraph: var(--pw-font-weight-regular);',
          '--pw-font-weight-heading: 700;',
        ]);
      });

      test('tailwind config', () => {
        fontWeightDesignToken.addFontWeight('regular', '400');
        fontWeightDesignToken.addFontWeight(
          'paragraph',
          '{font-weight.regular}',
        );
        fontWeightDesignToken.addFontWeight('heading', '{font-weight.bold}');
        expect(fontWeightDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            fontWeight: {
              thin: '100',
              extralight: '200',
              light: '300',
              normal: '400',
              medium: '500',
              semibold: '600',
              bold: '700',
              extrabold: '800',
              black: '900',
              regular: '/* 400 */ var(--pw-font-weight-regular)',
              paragraph: '/* 400 */ var(--pw-font-weight-paragraph)',
              heading: '/* 700 */ var(--pw-font-weight-heading)',
            },
          },
        });
      });
    });
  });
});
