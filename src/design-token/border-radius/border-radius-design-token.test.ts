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
        '--border-radius-base': '1rem',
      });
    });

    test('css', () => {
      borderRadiusDesignToken.addBorderRadius('base', '1rem');
      expect(borderRadiusDesignToken.css(false)).toStrictEqual([
        '--border-radius-base: 1rem;',
      ]);
    });

    test('tailwind config', () => {
      borderRadiusDesignToken.addBorderRadius('base', '1rem');
      expect(borderRadiusDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          borderRadius: {
            base: '/* 16px = 1rem */ var(--border-radius-base)',
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
        expect(borderRadiusDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-border-radius-base': '1rem',
        });
      });

      test('css', () => {
        borderRadiusDesignToken.addBorderRadius('base', '1rem');
        expect(borderRadiusDesignToken.css(false)).toStrictEqual([
          '--pw-border-radius-base: 1rem;',
        ]);
      });

      test('tailwind config', () => {
        borderRadiusDesignToken.addBorderRadius('base', '1rem');
        expect(borderRadiusDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            borderRadius: {
              base: '/* 16px = 1rem */ var(--pw-border-radius-base)',
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
      expect(borderRadiusDesignToken.cssVariables(false)).toStrictEqual({
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
      expect(borderRadiusDesignToken.css(false)).toStrictEqual([
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
      expect(borderRadiusDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          borderRadius: {
            base: '/* 16px = 1rem */ var(--border-radius-base)',
            sm: '/* 12px = 0.75rem */ var(--border-radius-sm)',
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
        expect(borderRadiusDesignToken.cssVariables(false)).toStrictEqual({
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
        expect(borderRadiusDesignToken.css(false)).toStrictEqual([
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
        expect(borderRadiusDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            borderRadius: {
              base: '/* 16px = 1rem */ var(--pw-border-radius-base)',
              sm: '/* 12px = 0.75rem */ var(--pw-border-radius-sm)',
              full: '9999px',
              none: '0px',
            },
          },
        });
      });
    });
  });
});
