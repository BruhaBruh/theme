import { ParagraphSpacingDesignToken } from './paragraph-spacing-design-token';

describe('paragraph-spacing-design-token', () => {
  let paragraphSpacingDesignToken: ParagraphSpacingDesignToken;

  beforeEach(() => {
    paragraphSpacingDesignToken = new ParagraphSpacingDesignToken();
  });

  describe('add paragraph spacing', () => {
    test('css variables', () => {
      paragraphSpacingDesignToken.addParagraphSpacing('xs', '0.75rem');
      expect(paragraphSpacingDesignToken.cssVariables).toStrictEqual({
        '--paragraph-spacing-xs': '0.75rem',
      });
    });

    test('css', () => {
      paragraphSpacingDesignToken.addParagraphSpacing('xs', '0.75rem');
      expect(paragraphSpacingDesignToken.css()).toStrictEqual([
        '--paragraph-spacing-xs: 0.75rem;',
      ]);
    });

    test('tailwind config', () => {
      paragraphSpacingDesignToken.addParagraphSpacing('xs', '0.75rem');
      expect(paragraphSpacingDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            margin: {
              'ps-xs': 'var(--paragraph-spacing-xs) /* 0.75rem */',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        paragraphSpacingDesignToken = new ParagraphSpacingDesignToken({
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        paragraphSpacingDesignToken.addParagraphSpacing('xs', '0.75rem');
        expect(paragraphSpacingDesignToken.cssVariables).toStrictEqual({
          '--pw-paragraph-spacing-xs': '0.75rem',
        });
      });

      test('css', () => {
        paragraphSpacingDesignToken.addParagraphSpacing('xs', '0.75rem');
        expect(paragraphSpacingDesignToken.css()).toStrictEqual([
          '--pw-paragraph-spacing-xs: 0.75rem;',
        ]);
      });

      test('tailwind config', () => {
        paragraphSpacingDesignToken.addParagraphSpacing('xs', '0.75rem');
        expect(paragraphSpacingDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              margin: {
                'ps-xs': 'var(--pw-paragraph-spacing-xs) /* 0.75rem */',
              },
            },
          },
        });
      });
    });
  });

  describe('add paragraph spacing w/ reference', () => {
    test('css variables', () => {
      paragraphSpacingDesignToken.addParagraphSpacing('xs', '0.75rem');
      paragraphSpacingDesignToken.addParagraphSpacing(
        'sm',
        '0.75rem + 0.125rem',
      );
      expect(paragraphSpacingDesignToken.cssVariables).toStrictEqual({
        '--paragraph-spacing-xs': '0.75rem',
        '--paragraph-spacing-sm': '0.875rem',
      });
    });

    test('css', () => {
      paragraphSpacingDesignToken.addParagraphSpacing('xs', '0.75rem');
      paragraphSpacingDesignToken.addParagraphSpacing(
        'sm',
        '0.75rem + 0.125rem',
      );
      expect(paragraphSpacingDesignToken.css()).toStrictEqual([
        '--paragraph-spacing-xs: 0.75rem;',
        '--paragraph-spacing-sm: 0.875rem;',
      ]);
    });

    test('tailwind config', () => {
      paragraphSpacingDesignToken.addParagraphSpacing('xs', '0.75rem');
      paragraphSpacingDesignToken.addParagraphSpacing(
        'sm',
        '0.75rem + 0.125rem',
      );
      expect(paragraphSpacingDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            margin: {
              'ps-xs': 'var(--paragraph-spacing-xs) /* 0.75rem */',
              'ps-sm': 'var(--paragraph-spacing-sm) /* 0.875rem */',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        paragraphSpacingDesignToken = new ParagraphSpacingDesignToken({
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        paragraphSpacingDesignToken.addParagraphSpacing('xs', '0.75rem');
        paragraphSpacingDesignToken.addParagraphSpacing(
          'sm',
          '0.75rem + 0.125rem',
        );
        expect(paragraphSpacingDesignToken.cssVariables).toStrictEqual({
          '--pw-paragraph-spacing-xs': '0.75rem',
          '--pw-paragraph-spacing-sm': '0.875rem',
        });
      });

      test('css', () => {
        paragraphSpacingDesignToken.addParagraphSpacing('xs', '0.75rem');
        paragraphSpacingDesignToken.addParagraphSpacing(
          'sm',
          '0.75rem + 0.125rem',
        );
        expect(paragraphSpacingDesignToken.css()).toStrictEqual([
          '--pw-paragraph-spacing-xs: 0.75rem;',
          '--pw-paragraph-spacing-sm: 0.875rem;',
        ]);
      });

      test('tailwind config', () => {
        paragraphSpacingDesignToken.addParagraphSpacing('xs', '0.75rem');
        paragraphSpacingDesignToken.addParagraphSpacing(
          'sm',
          '0.75rem + 0.125rem',
        );
        expect(paragraphSpacingDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              margin: {
                'ps-xs': 'var(--pw-paragraph-spacing-xs) /* 0.75rem */',
                'ps-sm': 'var(--pw-paragraph-spacing-sm) /* 0.875rem */',
              },
            },
          },
        });
      });
    });
  });
});
