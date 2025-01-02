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
      expect(fontWeightDesignToken.css(':root', false)).toStrictEqual({
        ':root': {
          '--font-weight-regular': '400',
        },
      });
    });

    test('tailwind css', () => {
      fontWeightDesignToken.addFontWeight('regular', '400');
      expect(fontWeightDesignToken.tailwindCSS(':root', false)).toStrictEqual({
        ':root': {
          '--font-weight-regular': '400',
        },
        '@theme': {
          '--font-weight-black': '900',
          '--font-weight-extrabold': '800',
          '--font-weight-bold': '700',
          '--font-weight-semibold': '600',
          '--font-weight-medium': '500',
          '--font-weight-normal': '400',
          '--font-weight-light': '300',
          '--font-weight-extralight': '200',
          '--font-weight-thin': '100',
          '--font-weight-regular': 'var(--font-weight-regular, 400)',
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
        expect(fontWeightDesignToken.css(':root', false)).toStrictEqual({
          ':root': {
            '--pw-font-weight-regular': '400',
          },
        });
      });

      test('tailwind css', () => {
        fontWeightDesignToken.addFontWeight('regular', '400');
        expect(fontWeightDesignToken.tailwindCSS(':root', false)).toStrictEqual(
          {
            ':root': {
              '--pw-font-weight-regular': '400',
            },
            '@theme': {
              '--font-weight-black': '900',
              '--font-weight-extrabold': '800',
              '--font-weight-bold': '700',
              '--font-weight-semibold': '600',
              '--font-weight-medium': '500',
              '--font-weight-normal': '400',
              '--font-weight-light': '300',
              '--font-weight-extralight': '200',
              '--font-weight-thin': '100',
              '--font-weight-regular': 'var(--pw-font-weight-regular, 400)',
            },
          },
        );
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
        '--font-weight-paragraph': 'var(--font-weight-regular, 400)',
        '--font-weight-heading': '700',
      });
    });

    test('css', () => {
      fontWeightDesignToken.addFontWeight('regular', '400');
      fontWeightDesignToken.addFontWeight('paragraph', '{font-weight.regular}');
      fontWeightDesignToken.addFontWeight('heading', '{font-weight.bold}');
      expect(fontWeightDesignToken.css(':root', false)).toStrictEqual({
        ':root': {
          '--font-weight-regular': '400',
          '--font-weight-paragraph': 'var(--font-weight-regular, 400)',
          '--font-weight-heading': '700',
        },
      });
    });

    test('tailwind css', () => {
      fontWeightDesignToken.addFontWeight('regular', '400');
      fontWeightDesignToken.addFontWeight('paragraph', '{font-weight.regular}');
      fontWeightDesignToken.addFontWeight('heading', '{font-weight.bold}');
      expect(fontWeightDesignToken.tailwindCSS(':root', false)).toStrictEqual({
        ':root': {
          '--font-weight-regular': '400',
          '--font-weight-paragraph': 'var(--font-weight-regular, 400)',
          '--font-weight-heading': '700',
        },
        '@theme': {
          '--font-weight-black': '900',
          '--font-weight-extrabold': '800',
          '--font-weight-bold': '700',
          '--font-weight-semibold': '600',
          '--font-weight-medium': '500',
          '--font-weight-normal': '400',
          '--font-weight-light': '300',
          '--font-weight-extralight': '200',
          '--font-weight-thin': '100',
          '--font-weight-regular': 'var(--font-weight-regular, 400)',
          '--font-weight-paragraph': 'var(--font-weight-paragraph, 400)',
          '--font-weight-heading': 'var(--font-weight-heading, 700)',
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
          '--pw-font-weight-paragraph': 'var(--pw-font-weight-regular, 400)',
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
        expect(fontWeightDesignToken.css(':root', false)).toStrictEqual({
          ':root': {
            '--pw-font-weight-regular': '400',
            '--pw-font-weight-paragraph': 'var(--pw-font-weight-regular, 400)',
            '--pw-font-weight-heading': '700',
          },
        });
      });

      test('tailwind css', () => {
        fontWeightDesignToken.addFontWeight('regular', '400');
        fontWeightDesignToken.addFontWeight(
          'paragraph',
          '{font-weight.regular}',
        );
        fontWeightDesignToken.addFontWeight('heading', '{font-weight.bold}');
        expect(fontWeightDesignToken.tailwindCSS(':root', false)).toStrictEqual(
          {
            ':root': {
              '--pw-font-weight-regular': '400',
              '--pw-font-weight-paragraph':
                'var(--pw-font-weight-regular, 400)',
              '--pw-font-weight-heading': '700',
            },
            '@theme': {
              '--font-weight-black': '900',
              '--font-weight-extrabold': '800',
              '--font-weight-bold': '700',
              '--font-weight-semibold': '600',
              '--font-weight-medium': '500',
              '--font-weight-normal': '400',
              '--font-weight-light': '300',
              '--font-weight-extralight': '200',
              '--font-weight-thin': '100',
              '--font-weight-regular': 'var(--pw-font-weight-regular, 400)',
              '--font-weight-paragraph': 'var(--pw-font-weight-paragraph, 400)',
              '--font-weight-heading': 'var(--pw-font-weight-heading, 700)',
            },
          },
        );
      });
    });
  });
});
