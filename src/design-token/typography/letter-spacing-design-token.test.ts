import { LetterSpacingDesignToken } from './letter-spacing-design-token';

describe('letter-spacing-design-token', () => {
  let letterSpacingDesignToken: LetterSpacingDesignToken;

  beforeEach(() => {
    letterSpacingDesignToken = new LetterSpacingDesignToken();
  });

  describe('add letter spacing', () => {
    test('css variables', () => {
      letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
      expect(letterSpacingDesignToken.cssVariables).toStrictEqual({
        '--letter-spacing-xs': '0.75rem',
      });
    });

    test('css', () => {
      letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
      expect(letterSpacingDesignToken.css()).toStrictEqual([
        '--letter-spacing-xs: 0.75rem;',
      ]);
    });

    test('tailwind config', () => {
      letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
      expect(letterSpacingDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          letterSpacing: {
            tighter: '-0.05em',
            tight: '-0.025em',
            normal: '0em',
            wide: '0.025em',
            wider: '0.05em',
            widest: '0.1em',
            xs: 'var(--letter-spacing-xs) /* 0.75rem */',
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        letterSpacingDesignToken = new LetterSpacingDesignToken({
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
        expect(letterSpacingDesignToken.cssVariables).toStrictEqual({
          '--pw-letter-spacing-xs': '0.75rem',
        });
      });

      test('css', () => {
        letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
        expect(letterSpacingDesignToken.css()).toStrictEqual([
          '--pw-letter-spacing-xs: 0.75rem;',
        ]);
      });

      test('tailwind config', () => {
        letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
        expect(letterSpacingDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            letterSpacing: {
              tighter: '-0.05em',
              tight: '-0.025em',
              normal: '0em',
              wide: '0.025em',
              wider: '0.05em',
              widest: '0.1em',
              xs: 'var(--pw-letter-spacing-xs) /* 0.75rem */',
            },
          },
        });
      });
    });
  });

  describe('add letter spacing w/ reference', () => {
    test('css variables', () => {
      letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
      letterSpacingDesignToken.addLetterSpacing('sm', '0.75rem + 0.125rem');
      expect(letterSpacingDesignToken.cssVariables).toStrictEqual({
        '--letter-spacing-xs': '0.75rem',
        '--letter-spacing-sm': '0.875rem',
      });
    });

    test('css', () => {
      letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
      letterSpacingDesignToken.addLetterSpacing('sm', '0.75rem + 0.125rem');
      expect(letterSpacingDesignToken.css()).toStrictEqual([
        '--letter-spacing-xs: 0.75rem;',
        '--letter-spacing-sm: 0.875rem;',
      ]);
    });

    test('tailwind config', () => {
      letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
      letterSpacingDesignToken.addLetterSpacing('sm', '0.75rem + 0.125rem');
      expect(letterSpacingDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          letterSpacing: {
            tighter: '-0.05em',
            tight: '-0.025em',
            normal: '0em',
            wide: '0.025em',
            wider: '0.05em',
            widest: '0.1em',
            xs: 'var(--letter-spacing-xs) /* 0.75rem */',
            sm: 'var(--letter-spacing-sm) /* 0.875rem */',
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        letterSpacingDesignToken = new LetterSpacingDesignToken({
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
        letterSpacingDesignToken.addLetterSpacing('sm', '0.75rem + 0.125rem');
        expect(letterSpacingDesignToken.cssVariables).toStrictEqual({
          '--pw-letter-spacing-xs': '0.75rem',
          '--pw-letter-spacing-sm': '0.875rem',
        });
      });

      test('css', () => {
        letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
        letterSpacingDesignToken.addLetterSpacing('sm', '0.75rem + 0.125rem');
        expect(letterSpacingDesignToken.css()).toStrictEqual([
          '--pw-letter-spacing-xs: 0.75rem;',
          '--pw-letter-spacing-sm: 0.875rem;',
        ]);
      });

      test('tailwind config', () => {
        letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
        letterSpacingDesignToken.addLetterSpacing('sm', '0.75rem + 0.125rem');
        expect(letterSpacingDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            letterSpacing: {
              tighter: '-0.05em',
              tight: '-0.025em',
              normal: '0em',
              wide: '0.025em',
              wider: '0.05em',
              widest: '0.1em',
              xs: 'var(--pw-letter-spacing-xs) /* 0.75rem */',
              sm: 'var(--pw-letter-spacing-sm) /* 0.875rem */',
            },
          },
        });
      });
    });
  });
});
