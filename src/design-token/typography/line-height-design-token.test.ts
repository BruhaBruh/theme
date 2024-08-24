import { LineHeightDesignToken } from './line-height-design-token';

describe('line-height-design-token', () => {
  let lineHeightDesignToken: LineHeightDesignToken;

  beforeEach(() => {
    lineHeightDesignToken = new LineHeightDesignToken();
  });

  describe('add line height', () => {
    test('css variables', () => {
      lineHeightDesignToken.addLineHeight('1', '0.25rem');
      expect(lineHeightDesignToken.cssVariables).toStrictEqual({
        '--line-height-1': '0.25rem',
      });
    });

    test('css', () => {
      lineHeightDesignToken.addLineHeight('1', '0.25rem');
      expect(lineHeightDesignToken.css()).toStrictEqual([
        '--line-height-1: 0.25rem;',
      ]);
    });

    test('tailwind config', () => {
      lineHeightDesignToken.addLineHeight('1', '0.25rem');
      expect(lineHeightDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          lineHeight: {
            none: '1',
            tight: '1.25',
            snug: '1.375',
            normal: '1.5',
            relaxed: '1.625',
            loose: '2',
            1: 'var(--line-height-1) /* 0.25rem */',
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        lineHeightDesignToken = new LineHeightDesignToken({ prefix: 'pw' });
      });

      test('css variables', () => {
        lineHeightDesignToken.addLineHeight('1', '0.25rem');
        expect(lineHeightDesignToken.cssVariables).toStrictEqual({
          '--pw-line-height-1': '0.25rem',
        });
      });

      test('css', () => {
        lineHeightDesignToken.addLineHeight('1', '0.25rem');
        expect(lineHeightDesignToken.css()).toStrictEqual([
          '--pw-line-height-1: 0.25rem;',
        ]);
      });

      test('tailwind config', () => {
        lineHeightDesignToken.addLineHeight('1', '0.25rem');
        expect(lineHeightDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            lineHeight: {
              none: '1',
              tight: '1.25',
              snug: '1.375',
              normal: '1.5',
              relaxed: '1.625',
              loose: '2',
              1: 'var(--pw-line-height-1) /* 0.25rem */',
            },
          },
        });
      });
    });
  });

  describe('add line height w/ reference', () => {
    test('css variables', () => {
      lineHeightDesignToken.addLineHeight('1', '0.25rem');
      lineHeightDesignToken.addLineHeight('2', '{line-height.1} * 2');
      expect(lineHeightDesignToken.cssVariables).toStrictEqual({
        '--line-height-1': '0.25rem',
        '--line-height-2': '0.5rem',
      });
    });

    test('css', () => {
      lineHeightDesignToken.addLineHeight('1', '0.25rem');
      lineHeightDesignToken.addLineHeight('2', '{line-height.1} * 2');
      expect(lineHeightDesignToken.css()).toStrictEqual([
        '--line-height-1: 0.25rem;',
        '--line-height-2: 0.5rem;',
      ]);
    });

    test('tailwind config', () => {
      lineHeightDesignToken.addLineHeight('1', '0.25rem');
      lineHeightDesignToken.addLineHeight('2', '{line-height.1} * 2');
      expect(lineHeightDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          lineHeight: {
            none: '1',
            tight: '1.25',
            snug: '1.375',
            normal: '1.5',
            relaxed: '1.625',
            loose: '2',
            1: 'var(--line-height-1) /* 0.25rem */',
            2: 'var(--line-height-2) /* 0.5rem */',
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        lineHeightDesignToken = new LineHeightDesignToken({ prefix: 'pw' });
      });

      test('css variables', () => {
        lineHeightDesignToken.addLineHeight('1', '0.25rem');
        lineHeightDesignToken.addLineHeight('2', '{line-height.1} * 2');
        expect(lineHeightDesignToken.cssVariables).toStrictEqual({
          '--pw-line-height-1': '0.25rem',
          '--pw-line-height-2': '0.5rem',
        });
      });

      test('css', () => {
        lineHeightDesignToken.addLineHeight('1', '0.25rem');
        lineHeightDesignToken.addLineHeight('2', '{line-height.1} * 2');
        expect(lineHeightDesignToken.css()).toStrictEqual([
          '--pw-line-height-1: 0.25rem;',
          '--pw-line-height-2: 0.5rem;',
        ]);
      });

      test('tailwind config', () => {
        lineHeightDesignToken.addLineHeight('1', '0.25rem');
        lineHeightDesignToken.addLineHeight('2', '{line-height.1} * 2');
        expect(lineHeightDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            lineHeight: {
              none: '1',
              tight: '1.25',
              snug: '1.375',
              normal: '1.5',
              relaxed: '1.625',
              loose: '2',
              1: 'var(--pw-line-height-1) /* 0.25rem */',
              2: 'var(--pw-line-height-2) /* 0.5rem */',
            },
          },
        });
      });
    });
  });
});
