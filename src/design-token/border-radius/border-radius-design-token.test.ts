import { BorderRadiusDesignToken } from './border-radius-design-token';

describe('border-radius-design-token', () => {
  let borderRadiusDesignToken: BorderRadiusDesignToken;

  beforeEach(() => {
    borderRadiusDesignToken = new BorderRadiusDesignToken();
  });

  describe('add border radius', () => {
    test('css variables', () => {
      borderRadiusDesignToken.addBorderRadius('base', '1rem');
      expect(borderRadiusDesignToken.cssVariables).toStrictEqual({
        '--border-radius-base': '1rem',
      });
    });

    test('css', () => {
      borderRadiusDesignToken.addBorderRadius('base', '1rem');
      expect(borderRadiusDesignToken.css()).toStrictEqual([
        '--border-radius-base: 1rem;',
      ]);
    });

    test('tailwind config', () => {
      borderRadiusDesignToken.addBorderRadius('base', '1rem');
      expect(borderRadiusDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          borderRadius: {
            base: 'var(--border-radius-base) /* 1rem */',
            full: '9999px',
            none: '0px',
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        borderRadiusDesignToken = new BorderRadiusDesignToken({ prefix: 'pw' });
      });

      test('css variables', () => {
        borderRadiusDesignToken.addBorderRadius('base', '1rem');
        expect(borderRadiusDesignToken.cssVariables).toStrictEqual({
          '--pw-border-radius-base': '1rem',
        });
      });

      test('css', () => {
        borderRadiusDesignToken.addBorderRadius('base', '1rem');
        expect(borderRadiusDesignToken.css()).toStrictEqual([
          '--pw-border-radius-base: 1rem;',
        ]);
      });

      test('tailwind config', () => {
        borderRadiusDesignToken.addBorderRadius('base', '1rem');
        expect(borderRadiusDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            borderRadius: {
              base: 'var(--pw-border-radius-base) /* 1rem */',
              full: '9999px',
              none: '0px',
            },
          },
        });
      });
    });
  });

  describe('add border radius w/ reference', () => {
    test('css variables', () => {
      borderRadiusDesignToken.addBorderRadius('base', '1rem');
      borderRadiusDesignToken.addBorderRadius(
        'sm',
        '{border-radius.base} - 4px',
      );
      expect(borderRadiusDesignToken.cssVariables).toStrictEqual({
        '--border-radius-base': '1rem',
        '--border-radius-sm': '0.75rem',
      });
    });

    test('css', () => {
      borderRadiusDesignToken.addBorderRadius('base', '1rem');
      borderRadiusDesignToken.addBorderRadius(
        'sm',
        '{border-radius.base} - 4px',
      );
      expect(borderRadiusDesignToken.css()).toStrictEqual([
        '--border-radius-base: 1rem;',
        '--border-radius-sm: 0.75rem;',
      ]);
    });

    test('tailwind config', () => {
      borderRadiusDesignToken.addBorderRadius('base', '1rem');
      borderRadiusDesignToken.addBorderRadius(
        'sm',
        '{border-radius.base} - 4px',
      );
      expect(borderRadiusDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          borderRadius: {
            base: 'var(--border-radius-base) /* 1rem */',
            sm: 'var(--border-radius-sm) /* 0.75rem */',
            full: '9999px',
            none: '0px',
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        borderRadiusDesignToken = new BorderRadiusDesignToken({ prefix: 'pw' });
      });

      test('css variables', () => {
        borderRadiusDesignToken.addBorderRadius('base', '1rem');
        borderRadiusDesignToken.addBorderRadius(
          'sm',
          '{border-radius.base} - 4px',
        );
        expect(borderRadiusDesignToken.cssVariables).toStrictEqual({
          '--pw-border-radius-base': '1rem',
          '--pw-border-radius-sm': '0.75rem',
        });
      });

      test('css', () => {
        borderRadiusDesignToken.addBorderRadius('base', '1rem');
        borderRadiusDesignToken.addBorderRadius(
          'sm',
          '{border-radius.base} - 4px',
        );
        expect(borderRadiusDesignToken.css()).toStrictEqual([
          '--pw-border-radius-base: 1rem;',
          '--pw-border-radius-sm: 0.75rem;',
        ]);
      });

      test('tailwind config', () => {
        borderRadiusDesignToken.addBorderRadius('base', '1rem');
        borderRadiusDesignToken.addBorderRadius(
          'sm',
          '{border-radius.base} - 4px',
        );
        expect(borderRadiusDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            borderRadius: {
              base: 'var(--pw-border-radius-base) /* 1rem */',
              sm: 'var(--pw-border-radius-sm) /* 0.75rem */',
              full: '9999px',
              none: '0px',
            },
          },
        });
      });
    });
  });
});
