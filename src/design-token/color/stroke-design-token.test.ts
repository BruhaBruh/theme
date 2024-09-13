import { ColorDesignToken } from './color-design-token';
import { StrokeDesignToken } from './stroke-design-token';

describe('stroke-design-token', () => {
  let strokeDesignToken: StrokeDesignToken;

  beforeEach(() => {
    const colorDesignToken = new ColorDesignToken();
    colorDesignToken.generateColor('neutral', '#292B33', {
      type: 'neutral',
    });
    strokeDesignToken = new StrokeDesignToken(colorDesignToken);
  });

  describe('add stroke color', () => {
    test('css variables', () => {
      strokeDesignToken.addStrokeColor('primary', '{color.neutral.1000}');
      expect(strokeDesignToken.cssVariables).toStrictEqual({
        '--stroke-primary': 'var(--color-neutral-1000)',
      });
    });

    test('css', () => {
      strokeDesignToken.addStrokeColor('primary', '{color.neutral.1000}');
      expect(strokeDesignToken.css()).toStrictEqual([
        '--stroke-primary: var(--color-neutral-1000);',
      ]);
    });

    test('tailwind config', () => {
      strokeDesignToken.addStrokeColor('primary', '{color.neutral.1000}');
      expect(strokeDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'primary-stroke':
                'rgb(from var(--stroke-primary) r g b / <alpha-value>) /* #000105 */',
            },
            strokeColor: {
              primary:
                'rgb(from var(--stroke-primary) r g b / <alpha-value>) /* #000105 */',
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
        strokeDesignToken = new StrokeDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        strokeDesignToken.addStrokeColor('primary', '{color.neutral.1000}');
        expect(strokeDesignToken.cssVariables).toStrictEqual({
          '--pw-stroke-primary': 'var(--pw-color-neutral-1000)',
        });
      });

      test('css', () => {
        strokeDesignToken.addStrokeColor('primary', '{color.neutral.1000}');
        expect(strokeDesignToken.css()).toStrictEqual([
          '--pw-stroke-primary: var(--pw-color-neutral-1000);',
        ]);
      });

      test('tailwind config', () => {
        strokeDesignToken.addStrokeColor('primary', '{color.neutral.1000}');
        expect(strokeDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-stroke':
                  'rgb(from var(--pw-stroke-primary) r g b / <alpha-value>) /* #000105 */',
              },
              strokeColor: {
                primary:
                  'rgb(from var(--pw-stroke-primary) r g b / <alpha-value>) /* #000105 */',
              },
            },
          },
        });
      });
    });
  });

  describe('add stroke color w/ reference', () => {
    test('css variables', () => {
      strokeDesignToken.addStrokeColor('stroke', '{color.neutral.1000}');
      strokeDesignToken.addStrokeColor('button', '{stroke.stroke}');
      expect(strokeDesignToken.cssVariables).toStrictEqual({
        '--stroke-stroke': 'var(--color-neutral-1000)',
        '--stroke-button': 'var(--stroke-stroke)',
      });
    });

    test('css', () => {
      strokeDesignToken.addStrokeColor('stroke', '{color.neutral.1000}');
      strokeDesignToken.addStrokeColor('button', '{stroke.stroke}');
      expect(strokeDesignToken.css()).toStrictEqual([
        '--stroke-stroke: var(--color-neutral-1000);',
        '--stroke-button: var(--stroke-stroke);',
      ]);
    });

    test('tailwind config', () => {
      strokeDesignToken.addStrokeColor('stroke', '{color.neutral.1000}');
      strokeDesignToken.addStrokeColor('button', '{stroke.stroke}');
      expect(strokeDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'stroke-stroke':
                'rgb(from var(--stroke-stroke) r g b / <alpha-value>) /* #000105 */',
              'button-stroke':
                'rgb(from var(--stroke-button) r g b / <alpha-value>) /* #000105 */',
            },
            strokeColor: {
              stroke:
                'rgb(from var(--stroke-stroke) r g b / <alpha-value>) /* #000105 */',
              button:
                'rgb(from var(--stroke-button) r g b / <alpha-value>) /* #000105 */',
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
        strokeDesignToken = new StrokeDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        strokeDesignToken.addStrokeColor('primary', '{color.neutral.1000}');
        strokeDesignToken.addStrokeColor('button', '{stroke.primary}');
        expect(strokeDesignToken.cssVariables).toStrictEqual({
          '--pw-stroke-primary': 'var(--pw-color-neutral-1000)',
          '--pw-stroke-button': 'var(--pw-stroke-primary)',
        });
      });

      test('css', () => {
        strokeDesignToken.addStrokeColor('primary', '{color.neutral.1000}');
        strokeDesignToken.addStrokeColor('button', '{stroke.primary}');
        expect(strokeDesignToken.css()).toStrictEqual([
          '--pw-stroke-primary: var(--pw-color-neutral-1000);',
          '--pw-stroke-button: var(--pw-stroke-primary);',
        ]);
      });

      test('tailwind config', () => {
        strokeDesignToken.addStrokeColor('primary', '{color.neutral.1000}');
        strokeDesignToken.addStrokeColor('button', '{stroke.primary}');
        expect(strokeDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-stroke':
                  'rgb(from var(--pw-stroke-primary) r g b / <alpha-value>) /* #000105 */',
                'button-stroke':
                  'rgb(from var(--pw-stroke-button) r g b / <alpha-value>) /* #000105 */',
              },
              strokeColor: {
                primary:
                  'rgb(from var(--pw-stroke-primary) r g b / <alpha-value>) /* #000105 */',
                button:
                  'rgb(from var(--pw-stroke-button) r g b / <alpha-value>) /* #000105 */',
              },
            },
          },
        });
      });
    });
  });
});
