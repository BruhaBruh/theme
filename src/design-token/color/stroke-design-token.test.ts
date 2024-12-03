import { ColorDesignToken } from './color-design-token';
import { StrokeDesignToken } from './stroke-design-token';

describe('stroke-design-token', () => {
  let strokeDesignToken: StrokeDesignToken;

  beforeEach(() => {
    const colorDesignToken = new ColorDesignToken();
    colorDesignToken.generateColor('neutral', '#292B33');
    strokeDesignToken = new StrokeDesignToken(colorDesignToken);
  });

  describe('add stroke color', () => {
    test('css variables', () => {
      strokeDesignToken.addStrokeColor('primary', '{color.neutral.950}');
      expect(strokeDesignToken.cssVariables(false)).toStrictEqual({
        '--stroke-primary': 'var(--color-neutral-950)',
      });
    });

    test('css', () => {
      strokeDesignToken.addStrokeColor('primary', '{color.neutral.950}');
      expect(strokeDesignToken.css(false)).toStrictEqual([
        '--stroke-primary: var(--color-neutral-950);',
      ]);
    });

    test('tailwind config', () => {
      strokeDesignToken.addStrokeColor('primary', '{color.neutral.950}');
      expect(strokeDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'primary-stroke':
                '/* #000000 */ rgb(from var(--stroke-primary) r g b / <alpha-value>)',
            },
            strokeColor: {
              primary:
                '/* #000000 */ rgb(from var(--stroke-primary) r g b / <alpha-value>)',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('neutral', '#292B33');
        strokeDesignToken = new StrokeDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        strokeDesignToken.addStrokeColor('primary', '{color.neutral.950}');
        expect(strokeDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-stroke-primary': 'var(--pw-color-neutral-950)',
        });
      });

      test('css', () => {
        strokeDesignToken.addStrokeColor('primary', '{color.neutral.950}');
        expect(strokeDesignToken.css(false)).toStrictEqual([
          '--pw-stroke-primary: var(--pw-color-neutral-950);',
        ]);
      });

      test('tailwind config', () => {
        strokeDesignToken.addStrokeColor('primary', '{color.neutral.950}');
        expect(strokeDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-stroke':
                  '/* #000000 */ rgb(from var(--pw-stroke-primary) r g b / <alpha-value>)',
              },
              strokeColor: {
                primary:
                  '/* #000000 */ rgb(from var(--pw-stroke-primary) r g b / <alpha-value>)',
              },
            },
          },
        });
      });
    });
  });

  describe('add stroke color w/ reference', () => {
    test('css variables', () => {
      strokeDesignToken.addStrokeColor('stroke', '{color.neutral.950}');
      strokeDesignToken.addStrokeColor('button', '{stroke.stroke}');
      expect(strokeDesignToken.cssVariables(false)).toStrictEqual({
        '--stroke-stroke': 'var(--color-neutral-950)',
        '--stroke-button': 'var(--stroke-stroke)',
      });
    });

    test('css', () => {
      strokeDesignToken.addStrokeColor('stroke', '{color.neutral.950}');
      strokeDesignToken.addStrokeColor('button', '{stroke.stroke}');
      expect(strokeDesignToken.css(false)).toStrictEqual([
        '--stroke-stroke: var(--color-neutral-950);',
        '--stroke-button: var(--stroke-stroke);',
      ]);
    });

    test('tailwind config', () => {
      strokeDesignToken.addStrokeColor('stroke', '{color.neutral.950}');
      strokeDesignToken.addStrokeColor('button', '{stroke.stroke}');
      expect(strokeDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'stroke-stroke':
                '/* #000000 */ rgb(from var(--stroke-stroke) r g b / <alpha-value>)',
              'button-stroke':
                '/* #000000 */ rgb(from var(--stroke-button) r g b / <alpha-value>)',
            },
            strokeColor: {
              stroke:
                '/* #000000 */ rgb(from var(--stroke-stroke) r g b / <alpha-value>)',
              button:
                '/* #000000 */ rgb(from var(--stroke-button) r g b / <alpha-value>)',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('neutral', '#292B33');
        strokeDesignToken = new StrokeDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        strokeDesignToken.addStrokeColor('primary', '{color.neutral.950}');
        strokeDesignToken.addStrokeColor('button', '{stroke.primary}');
        expect(strokeDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-stroke-primary': 'var(--pw-color-neutral-950)',
          '--pw-stroke-button': 'var(--pw-stroke-primary)',
        });
      });

      test('css', () => {
        strokeDesignToken.addStrokeColor('primary', '{color.neutral.950}');
        strokeDesignToken.addStrokeColor('button', '{stroke.primary}');
        expect(strokeDesignToken.css(false)).toStrictEqual([
          '--pw-stroke-primary: var(--pw-color-neutral-950);',
          '--pw-stroke-button: var(--pw-stroke-primary);',
        ]);
      });

      test('tailwind config', () => {
        strokeDesignToken.addStrokeColor('primary', '{color.neutral.950}');
        strokeDesignToken.addStrokeColor('button', '{stroke.primary}');
        expect(strokeDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-stroke':
                  '/* #000000 */ rgb(from var(--pw-stroke-primary) r g b / <alpha-value>)',
                'button-stroke':
                  '/* #000000 */ rgb(from var(--pw-stroke-button) r g b / <alpha-value>)',
              },
              strokeColor: {
                primary:
                  '/* #000000 */ rgb(from var(--pw-stroke-primary) r g b / <alpha-value>)',
                button:
                  '/* #000000 */ rgb(from var(--pw-stroke-button) r g b / <alpha-value>)',
              },
            },
          },
        });
      });
    });
  });
});
