import { ColorDesignToken } from './color-design-token';
import { FillDesignToken } from './fill-design-token';

describe('fill-design-token', () => {
  let fillDesignToken: FillDesignToken;

  beforeEach(() => {
    const colorDesignToken = new ColorDesignToken();
    colorDesignToken.generateColor('neutral', '#292B33');
    fillDesignToken = new FillDesignToken(colorDesignToken);
  });

  describe('add fill color', () => {
    test('css variables', () => {
      fillDesignToken.addFillColor('primary', '{color.neutral.950}');
      expect(fillDesignToken.cssVariables(false)).toStrictEqual({
        '--fill-primary': 'var(--color-neutral-950)',
      });
    });

    test('css', () => {
      fillDesignToken.addFillColor('primary', '{color.neutral.950}');
      expect(fillDesignToken.css(false)).toStrictEqual([
        '--fill-primary: var(--color-neutral-950);',
      ]);
    });

    test('tailwind config', () => {
      fillDesignToken.addFillColor('primary', '{color.neutral.950}');
      expect(fillDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'primary-fill':
                '/* #000000 */ rgb(from var(--fill-primary) r g b / <alpha-value>)',
            },
            fillColor: {
              primary:
                '/* #000000 */ rgb(from var(--fill-primary) r g b / <alpha-value>)',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('neutral', '#292B33');
        fillDesignToken = new FillDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        fillDesignToken.addFillColor('primary', '{color.neutral.950}');
        expect(fillDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-fill-primary': 'var(--pw-color-neutral-950)',
        });
      });

      test('css', () => {
        fillDesignToken.addFillColor('primary', '{color.neutral.950}');
        expect(fillDesignToken.css(false)).toStrictEqual([
          '--pw-fill-primary: var(--pw-color-neutral-950);',
        ]);
      });

      test('tailwind config', () => {
        fillDesignToken.addFillColor('primary', '{color.neutral.950}');
        expect(fillDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-fill':
                  '/* #000000 */ rgb(from var(--pw-fill-primary) r g b / <alpha-value>)',
              },
              fillColor: {
                primary:
                  '/* #000000 */ rgb(from var(--pw-fill-primary) r g b / <alpha-value>)',
              },
            },
          },
        });
      });
    });
  });

  describe('add fill color w/ reference', () => {
    test('css variables', () => {
      fillDesignToken.addFillColor('fill', '{color.neutral.950}');
      fillDesignToken.addFillColor('button', '{fill.fill}');
      expect(fillDesignToken.cssVariables(false)).toStrictEqual({
        '--fill-fill': 'var(--color-neutral-950)',
        '--fill-button': 'var(--fill-fill)',
      });
    });

    test('css', () => {
      fillDesignToken.addFillColor('fill', '{color.neutral.950}');
      fillDesignToken.addFillColor('button', '{fill.fill}');
      expect(fillDesignToken.css(false)).toStrictEqual([
        '--fill-fill: var(--color-neutral-950);',
        '--fill-button: var(--fill-fill);',
      ]);
    });

    test('tailwind config', () => {
      fillDesignToken.addFillColor('fill', '{color.neutral.950}');
      fillDesignToken.addFillColor('button', '{fill.fill}');
      expect(fillDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'fill-fill':
                '/* #000000 */ rgb(from var(--fill-fill) r g b / <alpha-value>)',
              'button-fill':
                '/* #000000 */ rgb(from var(--fill-button) r g b / <alpha-value>)',
            },
            fillColor: {
              fill: '/* #000000 */ rgb(from var(--fill-fill) r g b / <alpha-value>)',
              button:
                '/* #000000 */ rgb(from var(--fill-button) r g b / <alpha-value>)',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('neutral', '#292B33');
        fillDesignToken = new FillDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        fillDesignToken.addFillColor('primary', '{color.neutral.950}');
        fillDesignToken.addFillColor('button', '{fill.primary}');
        expect(fillDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-fill-primary': 'var(--pw-color-neutral-950)',
          '--pw-fill-button': 'var(--pw-fill-primary)',
        });
      });

      test('css', () => {
        fillDesignToken.addFillColor('primary', '{color.neutral.950}');
        fillDesignToken.addFillColor('button', '{fill.primary}');
        expect(fillDesignToken.css(false)).toStrictEqual([
          '--pw-fill-primary: var(--pw-color-neutral-950);',
          '--pw-fill-button: var(--pw-fill-primary);',
        ]);
      });

      test('tailwind config', () => {
        fillDesignToken.addFillColor('primary', '{color.neutral.950}');
        fillDesignToken.addFillColor('button', '{fill.primary}');
        expect(fillDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-fill':
                  '/* #000000 */ rgb(from var(--pw-fill-primary) r g b / <alpha-value>)',
                'button-fill':
                  '/* #000000 */ rgb(from var(--pw-fill-button) r g b / <alpha-value>)',
              },
              fillColor: {
                primary:
                  '/* #000000 */ rgb(from var(--pw-fill-primary) r g b / <alpha-value>)',
                button:
                  '/* #000000 */ rgb(from var(--pw-fill-button) r g b / <alpha-value>)',
              },
            },
          },
        });
      });
    });
  });
});
