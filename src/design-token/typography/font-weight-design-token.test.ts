import { FontWeightDesignToken } from './font-weight-design-token';

describe('font-weight-design-token', () => {
  let fontWeightDesignToken: FontWeightDesignToken;

  beforeEach(() => {
    fontWeightDesignToken = new FontWeightDesignToken();
  });

  describe('add font family', () => {
    test('css variables', () => {
      fontWeightDesignToken.addFontWeight('regular', '400');
      expect(fontWeightDesignToken.cssVariables).toStrictEqual({
        '--font-weight-regular': '400',
      });
    });

    test('css', () => {
      fontWeightDesignToken.addFontWeight('regular', '400');
      expect(fontWeightDesignToken.css()).toStrictEqual([
        '--font-weight-regular: 400;',
      ]);
    });

    test('tailwind config', () => {
      fontWeightDesignToken.addFontWeight('regular', '400');
      expect(fontWeightDesignToken.tailwindConfig()).toStrictEqual({
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
            regular: 'var(--font-weight-regular) /* 400 */',
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
        expect(fontWeightDesignToken.cssVariables).toStrictEqual({
          '--pw-font-weight-regular': '400',
        });
      });

      test('css', () => {
        fontWeightDesignToken.addFontWeight('regular', '400');
        expect(fontWeightDesignToken.css()).toStrictEqual([
          '--pw-font-weight-regular: 400;',
        ]);
      });

      test('tailwind config', () => {
        fontWeightDesignToken.addFontWeight('regular', '400');
        expect(fontWeightDesignToken.tailwindConfig()).toStrictEqual({
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
              regular: 'var(--pw-font-weight-regular) /* 400 */',
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
      expect(fontWeightDesignToken.cssVariables).toStrictEqual({
        '--font-weight-regular': '400',
        '--font-weight-paragraph': 'var(--font-weight-regular)',
        '--font-weight-heading': '700',
      });
    });

    test('css', () => {
      fontWeightDesignToken.addFontWeight('regular', '400');
      fontWeightDesignToken.addFontWeight('paragraph', '{font-weight.regular}');
      fontWeightDesignToken.addFontWeight('heading', '{font-weight.bold}');
      expect(fontWeightDesignToken.css()).toStrictEqual([
        '--font-weight-regular: 400;',
        '--font-weight-paragraph: var(--font-weight-regular);',
        '--font-weight-heading: 700;',
      ]);
    });

    test('tailwind config', () => {
      fontWeightDesignToken.addFontWeight('regular', '400');
      fontWeightDesignToken.addFontWeight('paragraph', '{font-weight.regular}');
      fontWeightDesignToken.addFontWeight('heading', '{font-weight.bold}');
      expect(fontWeightDesignToken.tailwindConfig()).toStrictEqual({
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
            regular: 'var(--font-weight-regular) /* 400 */',
            paragraph: 'var(--font-weight-paragraph) /* 400 */',
            heading: 'var(--font-weight-heading) /* 700 */',
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
        expect(fontWeightDesignToken.cssVariables).toStrictEqual({
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
        expect(fontWeightDesignToken.css()).toStrictEqual([
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
        expect(fontWeightDesignToken.tailwindConfig()).toStrictEqual({
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
              regular: 'var(--pw-font-weight-regular) /* 400 */',
              paragraph: 'var(--pw-font-weight-paragraph) /* 400 */',
              heading: 'var(--pw-font-weight-heading) /* 700 */',
            },
          },
        });
      });
    });
  });
});
