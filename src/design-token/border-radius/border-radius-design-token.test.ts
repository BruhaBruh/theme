import { BorderRadiusDesignToken } from './border-radius-design-token';

describe('border-radius-design-token', () => {
  let borderRadiusDesignToken: BorderRadiusDesignToken;

  beforeEach(() => {
    borderRadiusDesignToken = new BorderRadiusDesignToken();
  });

  describe('add border radius', () => {
    test('css variables', () => {
      borderRadiusDesignToken.addBorderRadius('base', '1rem');
      expect(borderRadiusDesignToken.cssVariables(false)).toStrictEqual({
        '--radius-base': '1rem',
      });
    });

    test('css', () => {
      borderRadiusDesignToken.addBorderRadius('base', '1rem');
      expect(borderRadiusDesignToken.css(':root', false)).toStrictEqual({
        ':root': {
          '--radius-base': '1rem',
        },
      });
    });

    test('tailwind css', () => {
      borderRadiusDesignToken.addBorderRadius('base', '1rem');
      expect(borderRadiusDesignToken.tailwindCSS(':root', false)).toStrictEqual(
        {
          ':root': {
            '--radius-base': '1rem',
          },
          '@theme': {
            '--radius-base': 'var(--radius-base, 1rem)',
            '--radius-full': '9999px',
            '--radius-none': '0px',
          },
        },
      );
    });

    describe('with prefix', () => {
      beforeEach(() => {
        borderRadiusDesignToken = new BorderRadiusDesignToken({ prefix: 'pw' });
      });

      test('css variables', () => {
        borderRadiusDesignToken.addBorderRadius('base', '1rem');
        expect(borderRadiusDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-radius-base': '1rem',
        });
      });

      test('css', () => {
        borderRadiusDesignToken.addBorderRadius('base', '1rem');
        expect(borderRadiusDesignToken.css(':root', false)).toStrictEqual({
          ':root': {
            '--pw-radius-base': '1rem',
          },
        });
      });

      test('tailwind css', () => {
        borderRadiusDesignToken.addBorderRadius('base', '1rem');
        expect(
          borderRadiusDesignToken.tailwindCSS(':root', false),
        ).toStrictEqual({
          ':root': {
            '--pw-radius-base': '1rem',
          },
          '@theme': {
            '--radius-base': 'var(--pw-radius-base, 1rem)',
            '--radius-full': '9999px',
            '--radius-none': '0px',
          },
        });
      });
    });
  });

  describe('add border radius w/ reference', () => {
    test('css variables', () => {
      borderRadiusDesignToken.addBorderRadius('base', '1rem');
      borderRadiusDesignToken.addBorderRadius('sm', '{radius.base} - 4px');
      expect(borderRadiusDesignToken.cssVariables(false)).toStrictEqual({
        '--radius-base': '1rem',
        '--radius-sm': '0.75rem',
      });
    });

    test('css', () => {
      borderRadiusDesignToken.addBorderRadius('base', '1rem');
      borderRadiusDesignToken.addBorderRadius('sm', '{radius.base} - 4px');
      expect(borderRadiusDesignToken.css(':root', false)).toStrictEqual({
        ':root': {
          '--radius-base': '1rem',
          '--radius-sm': '0.75rem',
        },
      });
    });

    test('tailwind css', () => {
      borderRadiusDesignToken.addBorderRadius('base', '1rem');
      borderRadiusDesignToken.addBorderRadius('sm', '{radius.base} - 4px');
      expect(borderRadiusDesignToken.tailwindCSS(':root', false)).toStrictEqual(
        {
          ':root': {
            '--radius-base': '1rem',
            '--radius-sm': '0.75rem',
          },
          '@theme': {
            '--radius-base': 'var(--radius-base, 1rem)',
            '--radius-sm': 'var(--radius-sm, 0.75rem)',
            '--radius-full': '9999px',
            '--radius-none': '0px',
          },
        },
      );
    });

    describe('with prefix', () => {
      beforeEach(() => {
        borderRadiusDesignToken = new BorderRadiusDesignToken({ prefix: 'pw' });
      });

      test('css variables', () => {
        borderRadiusDesignToken.addBorderRadius('base', '1rem');
        borderRadiusDesignToken.addBorderRadius('sm', '{radius.base} - 4px');
        expect(borderRadiusDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-radius-base': '1rem',
          '--pw-radius-sm': '0.75rem',
        });
      });

      test('css', () => {
        borderRadiusDesignToken.addBorderRadius('base', '1rem');
        borderRadiusDesignToken.addBorderRadius('sm', '{radius.base} - 4px');
        expect(borderRadiusDesignToken.css(':root', false)).toStrictEqual({
          ':root': {
            '--pw-radius-base': '1rem',
            '--pw-radius-sm': '0.75rem',
          },
        });
      });

      test('tailwind css', () => {
        borderRadiusDesignToken.addBorderRadius('base', '1rem');
        borderRadiusDesignToken.addBorderRadius('sm', '{radius.base} - 4px');
        expect(
          borderRadiusDesignToken.tailwindCSS(':root', false),
        ).toStrictEqual({
          ':root': {
            '--pw-radius-base': '1rem',
            '--pw-radius-sm': '0.75rem',
          },
          '@theme': {
            '--radius-base': 'var(--pw-radius-base, 1rem)',
            '--radius-sm': 'var(--pw-radius-sm, 0.75rem)',
            '--radius-full': '9999px',
            '--radius-none': '0px',
          },
        });
      });
    });
  });
});
