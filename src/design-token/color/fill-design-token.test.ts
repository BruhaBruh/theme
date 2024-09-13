import { ColorDesignToken } from './color-design-token';
import { FillDesignToken } from './fill-design-token';

describe('fill-design-token', () => {
  let fillDesignToken: FillDesignToken;

  beforeEach(() => {
    const colorDesignToken = new ColorDesignToken();
    colorDesignToken.generateColor('neutral', '#292B33', {
      type: 'neutral',
    });
    fillDesignToken = new FillDesignToken(colorDesignToken);
  });

  describe('add fill color', () => {
    test('css variables', () => {
      fillDesignToken.addFillColor('primary', '{color.neutral.1000}');
      expect(fillDesignToken.cssVariables).toStrictEqual({
        '--fill-primary': 'var(--color-neutral-1000)',
      });
    });

    test('css', () => {
      fillDesignToken.addFillColor('primary', '{color.neutral.1000}');
      expect(fillDesignToken.css()).toStrictEqual([
        '--fill-primary: var(--color-neutral-1000);',
      ]);
    });

    test('tailwind config', () => {
      fillDesignToken.addFillColor('primary', '{color.neutral.1000}');
      expect(fillDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'primary-fill':
                'rgb(from var(--fill-primary) r g b / <alpha-value>) /* #000105 */',
            },
            fillColor: {
              primary:
                'rgb(from var(--fill-primary) r g b / <alpha-value>) /* #000105 */',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('neutral', '#292B33', {
          type: 'neutral',
        });
        fillDesignToken = new FillDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        fillDesignToken.addFillColor('primary', '{color.neutral.1000}');
        expect(fillDesignToken.cssVariables).toStrictEqual({
          '--pw-fill-primary': 'var(--pw-color-neutral-1000)',
        });
      });

      test('css', () => {
        fillDesignToken.addFillColor('primary', '{color.neutral.1000}');
        expect(fillDesignToken.css()).toStrictEqual([
          '--pw-fill-primary: var(--pw-color-neutral-1000);',
        ]);
      });

      test('tailwind config', () => {
        fillDesignToken.addFillColor('primary', '{color.neutral.1000}');
        expect(fillDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-fill':
                  'rgb(from var(--pw-fill-primary) r g b / <alpha-value>) /* #000105 */',
              },
              fillColor: {
                primary:
                  'rgb(from var(--pw-fill-primary) r g b / <alpha-value>) /* #000105 */',
              },
            },
          },
        });
      });
    });
  });

  describe('add fill color w/ reference', () => {
    test('css variables', () => {
      fillDesignToken.addFillColor('fill', '{color.neutral.1000}');
      fillDesignToken.addFillColor('button', '{fill.fill}');
      expect(fillDesignToken.cssVariables).toStrictEqual({
        '--fill-fill': 'var(--color-neutral-1000)',
        '--fill-button': 'var(--fill-fill)',
      });
    });

    test('css', () => {
      fillDesignToken.addFillColor('fill', '{color.neutral.1000}');
      fillDesignToken.addFillColor('button', '{fill.fill}');
      expect(fillDesignToken.css()).toStrictEqual([
        '--fill-fill: var(--color-neutral-1000);',
        '--fill-button: var(--fill-fill);',
      ]);
    });

    test('tailwind config', () => {
      fillDesignToken.addFillColor('fill', '{color.neutral.1000}');
      fillDesignToken.addFillColor('button', '{fill.fill}');
      expect(fillDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'fill-fill':
                'rgb(from var(--fill-fill) r g b / <alpha-value>) /* #000105 */',
              'button-fill':
                'rgb(from var(--fill-button) r g b / <alpha-value>) /* #000105 */',
            },
            fillColor: {
              fill: 'rgb(from var(--fill-fill) r g b / <alpha-value>) /* #000105 */',
              button:
                'rgb(from var(--fill-button) r g b / <alpha-value>) /* #000105 */',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('neutral', '#292B33', {
          type: 'neutral',
        });
        fillDesignToken = new FillDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        fillDesignToken.addFillColor('primary', '{color.neutral.1000}');
        fillDesignToken.addFillColor('button', '{fill.primary}');
        expect(fillDesignToken.cssVariables).toStrictEqual({
          '--pw-fill-primary': 'var(--pw-color-neutral-1000)',
          '--pw-fill-button': 'var(--pw-fill-primary)',
        });
      });

      test('css', () => {
        fillDesignToken.addFillColor('primary', '{color.neutral.1000}');
        fillDesignToken.addFillColor('button', '{fill.primary}');
        expect(fillDesignToken.css()).toStrictEqual([
          '--pw-fill-primary: var(--pw-color-neutral-1000);',
          '--pw-fill-button: var(--pw-fill-primary);',
        ]);
      });

      test('tailwind config', () => {
        fillDesignToken.addFillColor('primary', '{color.neutral.1000}');
        fillDesignToken.addFillColor('button', '{fill.primary}');
        expect(fillDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-fill':
                  'rgb(from var(--pw-fill-primary) r g b / <alpha-value>) /* #000105 */',
                'button-fill':
                  'rgb(from var(--pw-fill-button) r g b / <alpha-value>) /* #000105 */',
              },
              fillColor: {
                primary:
                  'rgb(from var(--pw-fill-primary) r g b / <alpha-value>) /* #000105 */',
                button:
                  'rgb(from var(--pw-fill-button) r g b / <alpha-value>) /* #000105 */',
              },
            },
          },
        });
      });
    });
  });
});
