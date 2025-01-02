import { SpacingDesignToken } from './spacing-design-token';

describe('spacing-design-token', () => {
  let spacingDesignToken: SpacingDesignToken;

  beforeEach(() => {
    spacingDesignToken = new SpacingDesignToken();
  });

  describe('add border radius', () => {
    test('css variables', () => {
      spacingDesignToken.addSpacing('base', '1rem');
      expect(spacingDesignToken.cssVariables(false)).toStrictEqual({
        '--spacing-base': '1rem',
      });
    });

    test('css', () => {
      spacingDesignToken.addSpacing('base', '1rem');
      expect(spacingDesignToken.css(':root', false)).toStrictEqual({
        ':root': {
          '--spacing-base': '1rem',
        },
      });
    });

    test('tailwind css', () => {
      spacingDesignToken.addSpacing('base', '1rem');
      expect(spacingDesignToken.tailwindCSS(':root', false)).toStrictEqual({
        ':root': {
          '--spacing-base': '1rem',
        },
        '@theme': {
          '--spacing-base': 'var(--spacing-base, 1rem)',
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        spacingDesignToken = new SpacingDesignToken({ prefix: 'pw' });
      });

      test('css variables', () => {
        spacingDesignToken.addSpacing('base', '1rem');
        expect(spacingDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-spacing-base': '1rem',
        });
      });

      test('css', () => {
        spacingDesignToken.addSpacing('base', '1rem');
        expect(spacingDesignToken.css(':root', false)).toStrictEqual({
          ':root': {
            '--pw-spacing-base': '1rem',
          },
        });
      });

      test('tailwind css', () => {
        spacingDesignToken.addSpacing('base', '1rem');
        expect(spacingDesignToken.tailwindCSS(':root', false)).toStrictEqual({
          ':root': {
            '--pw-spacing-base': '1rem',
          },
          '@theme': {
            '--spacing-base': 'var(--pw-spacing-base, 1rem)',
          },
        });
      });
    });
  });

  describe('add border radius w/ reference', () => {
    test('css variables', () => {
      spacingDesignToken.addSpacing('base', '1rem');
      spacingDesignToken.addSpacing('sm', '{spacing.base} - 4px');
      expect(spacingDesignToken.cssVariables(false)).toStrictEqual({
        '--spacing-base': '1rem',
        '--spacing-sm': '0.75rem',
      });
    });

    test('css', () => {
      spacingDesignToken.addSpacing('base', '1rem');
      spacingDesignToken.addSpacing('sm', '{spacing.base} - 4px');
      expect(spacingDesignToken.css(':root', false)).toStrictEqual({
        ':root': {
          '--spacing-base': '1rem',
          '--spacing-sm': '0.75rem',
        },
      });
    });

    test('tailwind css', () => {
      spacingDesignToken.addSpacing('base', '1rem');
      spacingDesignToken.addSpacing('sm', '{spacing.base} - 4px');
      expect(spacingDesignToken.tailwindCSS(':root', false)).toStrictEqual({
        ':root': {
          '--spacing-base': '1rem',
          '--spacing-sm': '0.75rem',
        },
        '@theme': {
          '--spacing-base': 'var(--spacing-base, 1rem)',
          '--spacing-sm': 'var(--spacing-sm, 0.75rem)',
        },
      });
    });
  });

  describe('add border radius w/ name contains point', () => {
    test('css variables', () => {
      spacingDesignToken.addSpacing('1', '1rem');
      spacingDesignToken.addSpacing('0.5', '{spacing.1} / 2');
      spacingDesignToken.addSpacing('0.25', '{spacing.0.5} / 2');
      expect(spacingDesignToken.cssVariables(false)).toStrictEqual({
        '--spacing-1': '1rem',
        '--spacing-0\\.5': '0.5rem',
        '--spacing-0\\.25': '0.25rem',
      });
    });

    test('css', () => {
      spacingDesignToken.addSpacing('1', '1rem');
      spacingDesignToken.addSpacing('0.5', '{spacing.1} / 2');
      spacingDesignToken.addSpacing('0.25', '{spacing.0.5} / 2');
      expect(spacingDesignToken.css(':root', false)).toStrictEqual({
        ':root': {
          '--spacing-1': '1rem',
          '--spacing-0\\.5': '0.5rem',
          '--spacing-0\\.25': '0.25rem',
        },
      });
    });

    test('tailwind css', () => {
      spacingDesignToken.addSpacing('1', '1rem');
      spacingDesignToken.addSpacing('0.5', '{spacing.1} / 2');
      spacingDesignToken.addSpacing('0.25', '{spacing.0.5} / 2');
      expect(spacingDesignToken.tailwindCSS(':root', false)).toStrictEqual({
        ':root': {
          '--spacing-1': '1rem',
          '--spacing-0\\.5': '0.5rem',
          '--spacing-0\\.25': '0.25rem',
        },
        '@theme': {
          '--spacing-1': 'var(--spacing-1, 1rem)',
          '--spacing-0\\.5': 'var(--spacing-0\\.5, 0.5rem)',
          '--spacing-0\\.25': 'var(--spacing-0\\.25, 0.25rem)',
        },
      });
    });
  });
});
