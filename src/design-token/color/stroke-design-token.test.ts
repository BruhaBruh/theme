import { ColorDesignToken } from './color-design-token';
import { StrokeDesignToken } from './stroke-design-token';

describe('stroke-design-token', () => {
  let strokeDesignToken: StrokeDesignToken;

  beforeEach(() => {
    const colorDesignToken = new ColorDesignToken();
    colorDesignToken.generateColor('white', '#ffffff');
    strokeDesignToken = new StrokeDesignToken(colorDesignToken);
  });

  describe('add stroke color', () => {
    test('css variables', () => {
      strokeDesignToken.addStrokeColor('primary', '{color.white.1000}');
      expect(strokeDesignToken.cssVariables).toStrictEqual({
        '--stroke-primary': 'var(--color-white-1000)',
      });
    });

    test('css', () => {
      strokeDesignToken.addStrokeColor('primary', '{color.white.1000}');
      expect(strokeDesignToken.css()).toStrictEqual([
        '--stroke-primary: var(--color-white-1000);',
      ]);
    });

    test('tailwind config', () => {
      strokeDesignToken.addStrokeColor('primary', '{color.white.1000}');
      expect(strokeDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            strokeColor: {
              primary: 'var(--stroke-primary) /* hsl(0 0% 100% / 1) */',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('white', '#ffffff');
        strokeDesignToken = new StrokeDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        strokeDesignToken.addStrokeColor('primary', '{color.white.1000}');
        expect(strokeDesignToken.cssVariables).toStrictEqual({
          '--pw-stroke-primary': 'var(--pw-color-white-1000)',
        });
      });

      test('css', () => {
        strokeDesignToken.addStrokeColor('primary', '{color.white.1000}');
        expect(strokeDesignToken.css()).toStrictEqual([
          '--pw-stroke-primary: var(--pw-color-white-1000);',
        ]);
      });

      test('tailwind config', () => {
        strokeDesignToken.addStrokeColor('primary', '{color.white.1000}');
        expect(strokeDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              strokeColor: {
                primary: 'var(--pw-stroke-primary) /* hsl(0 0% 100% / 1) */',
              },
            },
          },
        });
      });
    });
  });

  describe('add stroke color w/ reference', () => {
    test('css variables', () => {
      strokeDesignToken.addStrokeColor('stroke', '{color.white.1000}');
      strokeDesignToken.addStrokeColor('button', '{stroke.stroke}');
      expect(strokeDesignToken.cssVariables).toStrictEqual({
        '--stroke-stroke': 'var(--color-white-1000)',
        '--stroke-button': 'var(--stroke-stroke)',
      });
    });

    test('css', () => {
      strokeDesignToken.addStrokeColor('stroke', '{color.white.1000}');
      strokeDesignToken.addStrokeColor('button', '{stroke.stroke}');
      expect(strokeDesignToken.css()).toStrictEqual([
        '--stroke-stroke: var(--color-white-1000);',
        '--stroke-button: var(--stroke-stroke);',
      ]);
    });

    test('tailwind config', () => {
      strokeDesignToken.addStrokeColor('stroke', '{color.white.1000}');
      strokeDesignToken.addStrokeColor('button', '{stroke.stroke}');
      expect(strokeDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            strokeColor: {
              stroke: 'var(--stroke-stroke) /* hsl(0 0% 100% / 1) */',
              button: 'var(--stroke-button) /* hsl(0 0% 100% / 1) */',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('white', '#ffffff');
        strokeDesignToken = new StrokeDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        strokeDesignToken.addStrokeColor('primary', '{color.white.1000}');
        strokeDesignToken.addStrokeColor('button', '{stroke.primary}');
        expect(strokeDesignToken.cssVariables).toStrictEqual({
          '--pw-stroke-primary': 'var(--pw-color-white-1000)',
          '--pw-stroke-button': 'var(--pw-stroke-primary)',
        });
      });

      test('css', () => {
        strokeDesignToken.addStrokeColor('primary', '{color.white.1000}');
        strokeDesignToken.addStrokeColor('button', '{stroke.primary}');
        expect(strokeDesignToken.css()).toStrictEqual([
          '--pw-stroke-primary: var(--pw-color-white-1000);',
          '--pw-stroke-button: var(--pw-stroke-primary);',
        ]);
      });

      test('tailwind config', () => {
        strokeDesignToken.addStrokeColor('primary', '{color.white.1000}');
        strokeDesignToken.addStrokeColor('button', '{stroke.primary}');
        expect(strokeDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              strokeColor: {
                primary: 'var(--pw-stroke-primary) /* hsl(0 0% 100% / 1) */',
                button: 'var(--pw-stroke-button) /* hsl(0 0% 100% / 1) */',
              },
            },
          },
        });
      });
    });
  });
});
