import { SpacingDesignToken } from './spacing-design-token';

describe('spacing-design-token', () => {
  let spacingDesignToken: SpacingDesignToken;

  beforeEach(() => {
    spacingDesignToken = new SpacingDesignToken();
  });

  describe('add border radius', () => {
    test('css variables', () => {
      spacingDesignToken.addSpacing('base', '1rem');
      expect(spacingDesignToken.cssVariables).toStrictEqual({
        '--spacing-base': '1rem',
      });
    });

    test('css', () => {
      spacingDesignToken.addSpacing('base', '1rem');
      expect(spacingDesignToken.css()).toStrictEqual(['--spacing-base: 1rem;']);
    });

    test('tailwind config', () => {
      spacingDesignToken.addSpacing('base', '1rem');
      expect(spacingDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          spacing: {
            base: 'var(--spacing-base) /* 1rem */',
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
        expect(spacingDesignToken.cssVariables).toStrictEqual({
          '--pw-spacing-base': '1rem',
        });
      });

      test('css', () => {
        spacingDesignToken.addSpacing('base', '1rem');
        expect(spacingDesignToken.css()).toStrictEqual([
          '--pw-spacing-base: 1rem;',
        ]);
      });

      test('tailwind config', () => {
        spacingDesignToken.addSpacing('base', '1rem');
        expect(spacingDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            spacing: {
              base: 'var(--pw-spacing-base) /* 1rem */',
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
      expect(spacingDesignToken.cssVariables).toStrictEqual({
        '--spacing-base': '1rem',
        '--spacing-sm': '0.75rem',
      });
    });

    test('css', () => {
      spacingDesignToken.addSpacing('base', '1rem');
      spacingDesignToken.addSpacing('sm', '{spacing.base} - 4px');
      expect(spacingDesignToken.css()).toStrictEqual([
        '--spacing-base: 1rem;',
        '--spacing-sm: 0.75rem;',
      ]);
    });

    test('tailwind config', () => {
      spacingDesignToken.addSpacing('base', '1rem');
      spacingDesignToken.addSpacing('sm', '{spacing.base} - 4px');
      expect(spacingDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          spacing: {
            base: 'var(--spacing-base) /* 1rem */',
            sm: 'var(--spacing-sm) /* 0.75rem */',
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
      expect(spacingDesignToken.cssVariables).toStrictEqual({
        '--spacing-1': '1rem',
        '--spacing-0\\.5': '0.5rem',
        '--spacing-0\\.25': '0.25rem',
      });
    });

    test('css', () => {
      spacingDesignToken.addSpacing('1', '1rem');
      spacingDesignToken.addSpacing('0.5', '{spacing.1} / 2');
      spacingDesignToken.addSpacing('0.25', '{spacing.0.5} / 2');
      expect(spacingDesignToken.css()).toStrictEqual([
        '--spacing-1: 1rem;',
        '--spacing-0\\.5: 0.5rem;',
        '--spacing-0\\.25: 0.25rem;',
      ]);
    });

    test('tailwind config', () => {
      spacingDesignToken.addSpacing('1', '1rem');
      spacingDesignToken.addSpacing('0.5', '{spacing.1} / 2');
      spacingDesignToken.addSpacing('0.25', '{spacing.0.5} / 2');
      expect(spacingDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          spacing: {
            '1': 'var(--spacing-1) /* 1rem */',
            '0.5': 'var(--spacing-0\\.5) /* 0.5rem */',
            '0.25': 'var(--spacing-0\\.25) /* 0.25rem */',
          },
        },
      });
    });
  });
});
