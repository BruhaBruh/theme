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
      expect(spacingDesignToken.css(false)).toStrictEqual([
        '--spacing-base: 1rem;',
      ]);
    });

    test('tailwind config', () => {
      spacingDesignToken.addSpacing('base', '1rem');
      expect(spacingDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          spacing: {
            base: '/* 16px = 1rem */ var(--spacing-base)',
          },
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
        expect(spacingDesignToken.css(false)).toStrictEqual([
          '--pw-spacing-base: 1rem;',
        ]);
      });

      test('tailwind config', () => {
        spacingDesignToken.addSpacing('base', '1rem');
        expect(spacingDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            spacing: {
              base: '/* 16px = 1rem */ var(--pw-spacing-base)',
            },
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
      expect(spacingDesignToken.css(false)).toStrictEqual([
        '--spacing-base: 1rem;',
        '--spacing-sm: 0.75rem;',
      ]);
    });

    test('tailwind config', () => {
      spacingDesignToken.addSpacing('base', '1rem');
      spacingDesignToken.addSpacing('sm', '{spacing.base} - 4px');
      expect(spacingDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          spacing: {
            base: '/* 16px = 1rem */ var(--spacing-base)',
            sm: '/* 12px = 0.75rem */ var(--spacing-sm)',
          },
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
      expect(spacingDesignToken.css(false)).toStrictEqual([
        '--spacing-1: 1rem;',
        '--spacing-0\\.5: 0.5rem;',
        '--spacing-0\\.25: 0.25rem;',
      ]);
    });

    test('tailwind config', () => {
      spacingDesignToken.addSpacing('1', '1rem');
      spacingDesignToken.addSpacing('0.5', '{spacing.1} / 2');
      spacingDesignToken.addSpacing('0.25', '{spacing.0.5} / 2');
      expect(spacingDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          spacing: {
            '1': '/* 16px = 1rem */ var(--spacing-1)',
            '0.5': '/* 8px = 0.5rem */ var(--spacing-0\\.5)',
            '0.25': '/* 4px = 0.25rem */ var(--spacing-0\\.25)',
          },
        },
      });
    });
  });
});
