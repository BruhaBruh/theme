import { LetterSpacingDesignToken } from './letter-spacing-design-token';

describe('letter-spacing-design-token', () => {
  let letterSpacingDesignToken: LetterSpacingDesignToken;

  beforeEach(() => {
    letterSpacingDesignToken = new LetterSpacingDesignToken();
  });

  describe('add letter spacing', () => {
    test('css variables', () => {
      letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
      expect(letterSpacingDesignToken.cssVariables(false)).toStrictEqual({
        '--tracking-xs': '0.75rem',
      });
    });

    test('css', () => {
      letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
      expect(letterSpacingDesignToken.css(':root', false)).toStrictEqual({
        ':root': {
          '--tracking-xs': '0.75rem',
        },
      });
    });

    test('tailwind css', () => {
      letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
      expect(
        letterSpacingDesignToken.tailwindCSS(':root', false),
      ).toStrictEqual({
        ':root': {
          '--tracking-xs': '0.75rem',
        },
        '@theme': {
          '--tracking-normal': '0em',
          '--tracking-tight': '-0.025em',
          '--tracking-tighter': '-0.05em',
          '--tracking-wide': '0.025em',
          '--tracking-wider': '0.05em',
          '--tracking-widest': '0.1em',
          '--tracking-xs': 'var(--tracking-xs, 0.75rem)',
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
        expect(letterSpacingDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-tracking-xs': '0.75rem',
        });
      });

      test('css', () => {
        letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
        expect(letterSpacingDesignToken.css(':root', false)).toStrictEqual({
          ':root': {
            '--pw-tracking-xs': '0.75rem',
          },
        });
      });

      test('tailwind css', () => {
        letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
        expect(
          letterSpacingDesignToken.tailwindCSS(':root', false),
        ).toStrictEqual({
          ':root': {
            '--pw-tracking-xs': '0.75rem',
          },
          '@theme': {
            '--tracking-normal': '0em',
            '--tracking-tight': '-0.025em',
            '--tracking-tighter': '-0.05em',
            '--tracking-wide': '0.025em',
            '--tracking-wider': '0.05em',
            '--tracking-widest': '0.1em',
            '--tracking-xs': 'var(--pw-tracking-xs, 0.75rem)',
          },
        });
      });
    });
  });

  describe('add letter spacing w/ reference', () => {
    test('css variables', () => {
      letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
      letterSpacingDesignToken.addLetterSpacing(
        'sm',
        '{tracking.xs} + 0.125rem',
      );
      expect(letterSpacingDesignToken.cssVariables(false)).toStrictEqual({
        '--tracking-xs': '0.75rem',
        '--tracking-sm': '0.875rem',
      });
    });

    test('css', () => {
      letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
      letterSpacingDesignToken.addLetterSpacing(
        'sm',
        '{tracking.xs} + 0.125rem',
      );
      expect(letterSpacingDesignToken.css(':root', false)).toStrictEqual({
        ':root': {
          '--tracking-xs': '0.75rem',
          '--tracking-sm': '0.875rem',
        },
      });
    });

    test('tailwind css', () => {
      letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
      letterSpacingDesignToken.addLetterSpacing(
        'sm',
        '{tracking.xs} + 0.125rem',
      );
      expect(
        letterSpacingDesignToken.tailwindCSS(':root', false),
      ).toStrictEqual({
        ':root': {
          '--tracking-xs': '0.75rem',
          '--tracking-sm': '0.875rem',
        },
        '@theme': {
          '--tracking-normal': '0em',
          '--tracking-tight': '-0.025em',
          '--tracking-tighter': '-0.05em',
          '--tracking-wide': '0.025em',
          '--tracking-wider': '0.05em',
          '--tracking-widest': '0.1em',
          '--tracking-xs': 'var(--tracking-xs, 0.75rem)',
          '--tracking-sm': 'var(--tracking-sm, 0.875rem)',
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
        letterSpacingDesignToken.addLetterSpacing(
          'sm',
          '{tracking.xs} + 0.125rem',
        );
        expect(letterSpacingDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-tracking-xs': '0.75rem',
          '--pw-tracking-sm': '0.875rem',
        });
      });

      test('css', () => {
        letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
        letterSpacingDesignToken.addLetterSpacing(
          'sm',
          '{tracking.xs} + 0.125rem',
        );
        expect(letterSpacingDesignToken.css(':root', false)).toStrictEqual({
          ':root': {
            '--pw-tracking-xs': '0.75rem',
            '--pw-tracking-sm': '0.875rem',
          },
        });
      });

      test('tailwind css', () => {
        letterSpacingDesignToken.addLetterSpacing('xs', '0.75rem');
        letterSpacingDesignToken.addLetterSpacing(
          'sm',
          '{tracking.xs} + 0.125rem',
        );
        expect(
          letterSpacingDesignToken.tailwindCSS(':root', false),
        ).toStrictEqual({
          ':root': {
            '--pw-tracking-xs': '0.75rem',
            '--pw-tracking-sm': '0.875rem',
          },
          '@theme': {
            '--tracking-normal': '0em',
            '--tracking-tight': '-0.025em',
            '--tracking-tighter': '-0.05em',
            '--tracking-wide': '0.025em',
            '--tracking-wider': '0.05em',
            '--tracking-widest': '0.1em',
            '--tracking-xs': 'var(--pw-tracking-xs, 0.75rem)',
            '--tracking-sm': 'var(--pw-tracking-sm, 0.875rem)',
          },
        });
      });
    });
  });
});
