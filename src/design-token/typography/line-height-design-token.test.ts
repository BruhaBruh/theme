import { LineHeightDesignToken } from './line-height-design-token';

describe('line-height-design-token', () => {
  let lineHeightDesignToken: LineHeightDesignToken;

  beforeEach(() => {
    lineHeightDesignToken = new LineHeightDesignToken();
  });

  describe('add line height', () => {
    test('css variables', () => {
      lineHeightDesignToken.addLineHeight('1', '0.25rem');
      expect(lineHeightDesignToken.cssVariables(false)).toStrictEqual({
        '--leading-1': '0.25rem',
      });
    });

    test('css', () => {
      lineHeightDesignToken.addLineHeight('1', '0.25rem');
      expect(lineHeightDesignToken.css(':root', false)).toStrictEqual({
        ':root': {
          '--leading-1': '0.25rem',
        },
      });
    });

    test('tailwind css', () => {
      lineHeightDesignToken.addLineHeight('1', '0.25rem');
      expect(lineHeightDesignToken.tailwindCSS(':root', false)).toStrictEqual({
        ':root': {
          '--leading-1': '0.25rem',
        },
        '@theme': {
          '--leading-loose': '2',
          '--leading-none': '1',
          '--leading-normal': '1.5',
          '--leading-relaxed': '1.625',
          '--leading-snug': '1.375',
          '--leading-tight': '1.25',
          '--leading-1': 'var(--leading-1, 0.25rem)',
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        lineHeightDesignToken = new LineHeightDesignToken({ prefix: 'pw' });
      });

      test('css variables', () => {
        lineHeightDesignToken.addLineHeight('1', '0.25rem');
        expect(lineHeightDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-leading-1': '0.25rem',
        });
      });

      test('css', () => {
        lineHeightDesignToken.addLineHeight('1', '0.25rem');
        expect(lineHeightDesignToken.css(':root', false)).toStrictEqual({
          ':root': {
            '--pw-leading-1': '0.25rem',
          },
        });
      });

      test('tailwind css', () => {
        lineHeightDesignToken.addLineHeight('1', '0.25rem');
        expect(lineHeightDesignToken.tailwindCSS(':root', false)).toStrictEqual(
          {
            ':root': {
              '--pw-leading-1': '0.25rem',
            },
            '@theme': {
              '--leading-loose': '2',
              '--leading-none': '1',
              '--leading-normal': '1.5',
              '--leading-relaxed': '1.625',
              '--leading-snug': '1.375',
              '--leading-tight': '1.25',
              '--leading-1': 'var(--pw-leading-1, 0.25rem)',
            },
          },
        );
      });
    });
  });

  describe('add line height w/ reference', () => {
    test('css variables', () => {
      lineHeightDesignToken.addLineHeight('1', '0.25rem');
      lineHeightDesignToken.addLineHeight('2', '{leading.1} * 2');
      expect(lineHeightDesignToken.cssVariables(false)).toStrictEqual({
        '--leading-1': '0.25rem',
        '--leading-2': '0.5rem',
      });
    });

    test('css', () => {
      lineHeightDesignToken.addLineHeight('1', '0.25rem');
      lineHeightDesignToken.addLineHeight('2', '{leading.1} * 2');
      expect(lineHeightDesignToken.css(':root', false)).toStrictEqual({
        ':root': {
          '--leading-1': '0.25rem',
          '--leading-2': '0.5rem',
        },
      });
    });

    test('tailwind css', () => {
      lineHeightDesignToken.addLineHeight('1', '0.25rem');
      lineHeightDesignToken.addLineHeight('2', '{leading.1} * 2');
      expect(lineHeightDesignToken.tailwindCSS(':root', false)).toStrictEqual({
        ':root': {
          '--leading-1': '0.25rem',
          '--leading-2': '0.5rem',
        },
        '@theme': {
          '--leading-loose': '2',
          '--leading-none': '1',
          '--leading-normal': '1.5',
          '--leading-relaxed': '1.625',
          '--leading-snug': '1.375',
          '--leading-tight': '1.25',
          '--leading-1': 'var(--leading-1, 0.25rem)',
          '--leading-2': 'var(--leading-2, 0.5rem)',
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        lineHeightDesignToken = new LineHeightDesignToken({ prefix: 'pw' });
      });

      test('css variables', () => {
        lineHeightDesignToken.addLineHeight('1', '0.25rem');
        lineHeightDesignToken.addLineHeight('2', '{leading.1} * 2');
        expect(lineHeightDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-leading-1': '0.25rem',
          '--pw-leading-2': '0.5rem',
        });
      });

      test('css', () => {
        lineHeightDesignToken.addLineHeight('1', '0.25rem');
        lineHeightDesignToken.addLineHeight('2', '{leading.1} * 2');
        expect(lineHeightDesignToken.css(':root', false)).toStrictEqual({
          ':root': {
            '--pw-leading-1': '0.25rem',
            '--pw-leading-2': '0.5rem',
          },
        });
      });

      test('tailwind css', () => {
        lineHeightDesignToken.addLineHeight('1', '0.25rem');
        lineHeightDesignToken.addLineHeight('2', '{leading.1} * 2');
        expect(lineHeightDesignToken.tailwindCSS(':root', false)).toStrictEqual(
          {
            ':root': {
              '--pw-leading-1': '0.25rem',
              '--pw-leading-2': '0.5rem',
            },
            '@theme': {
              '--leading-loose': '2',
              '--leading-none': '1',
              '--leading-normal': '1.5',
              '--leading-relaxed': '1.625',
              '--leading-snug': '1.375',
              '--leading-tight': '1.25',
              '--leading-1': 'var(--pw-leading-1, 0.25rem)',
              '--leading-2': 'var(--pw-leading-2, 0.5rem)',
            },
          },
        );
      });
    });
  });
});
