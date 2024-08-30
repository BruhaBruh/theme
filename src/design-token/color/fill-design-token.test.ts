import { ColorDesignToken } from './color-design-token';
import { FillDesignToken } from './fill-design-token';

describe('fill-design-token', () => {
  let fillDesignToken: FillDesignToken;

  beforeEach(() => {
    const colorDesignToken = new ColorDesignToken();
    colorDesignToken.generateColor('white', '#ffffff', { type: 'alpha' });
    fillDesignToken = new FillDesignToken(colorDesignToken);
  });

  describe('add fill color', () => {
    test('css variables', () => {
      fillDesignToken.addFillColor('primary', '{color.white.1000}');
      expect(fillDesignToken.cssVariables).toStrictEqual({
        '--fill-primary': 'var(--color-white-1000)',
      });
    });

    test('css', () => {
      fillDesignToken.addFillColor('primary', '{color.white.1000}');
      expect(fillDesignToken.css()).toStrictEqual([
        '--fill-primary: var(--color-white-1000);',
      ]);
    });

    test('tailwind config', () => {
      fillDesignToken.addFillColor('primary', '{color.white.1000}');
      expect(fillDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            fillColor: {
              primary: 'var(--fill-primary) /* hsl(0 0% 100% / 1) */',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('white', '#ffffff', { type: 'alpha' });
        fillDesignToken = new FillDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        fillDesignToken.addFillColor('primary', '{color.white.1000}');
        expect(fillDesignToken.cssVariables).toStrictEqual({
          '--pw-fill-primary': 'var(--pw-color-white-1000)',
        });
      });

      test('css', () => {
        fillDesignToken.addFillColor('primary', '{color.white.1000}');
        expect(fillDesignToken.css()).toStrictEqual([
          '--pw-fill-primary: var(--pw-color-white-1000);',
        ]);
      });

      test('tailwind config', () => {
        fillDesignToken.addFillColor('primary', '{color.white.1000}');
        expect(fillDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              fillColor: {
                primary: 'var(--pw-fill-primary) /* hsl(0 0% 100% / 1) */',
              },
            },
          },
        });
      });
    });
  });

  describe('add fill color w/ reference', () => {
    test('css variables', () => {
      fillDesignToken.addFillColor('fill', '{color.white.1000}');
      fillDesignToken.addFillColor('button', '{fill.fill}');
      expect(fillDesignToken.cssVariables).toStrictEqual({
        '--fill-fill': 'var(--color-white-1000)',
        '--fill-button': 'var(--fill-fill)',
      });
    });

    test('css', () => {
      fillDesignToken.addFillColor('fill', '{color.white.1000}');
      fillDesignToken.addFillColor('button', '{fill.fill}');
      expect(fillDesignToken.css()).toStrictEqual([
        '--fill-fill: var(--color-white-1000);',
        '--fill-button: var(--fill-fill);',
      ]);
    });

    test('tailwind config', () => {
      fillDesignToken.addFillColor('fill', '{color.white.1000}');
      fillDesignToken.addFillColor('button', '{fill.fill}');
      expect(fillDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            fillColor: {
              fill: 'var(--fill-fill) /* hsl(0 0% 100% / 1) */',
              button: 'var(--fill-button) /* hsl(0 0% 100% / 1) */',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('white', '#ffffff', { type: 'alpha' });
        fillDesignToken = new FillDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        fillDesignToken.addFillColor('primary', '{color.white.1000}');
        fillDesignToken.addFillColor('button', '{fill.primary}');
        expect(fillDesignToken.cssVariables).toStrictEqual({
          '--pw-fill-primary': 'var(--pw-color-white-1000)',
          '--pw-fill-button': 'var(--pw-fill-primary)',
        });
      });

      test('css', () => {
        fillDesignToken.addFillColor('primary', '{color.white.1000}');
        fillDesignToken.addFillColor('button', '{fill.primary}');
        expect(fillDesignToken.css()).toStrictEqual([
          '--pw-fill-primary: var(--pw-color-white-1000);',
          '--pw-fill-button: var(--pw-fill-primary);',
        ]);
      });

      test('tailwind config', () => {
        fillDesignToken.addFillColor('primary', '{color.white.1000}');
        fillDesignToken.addFillColor('button', '{fill.primary}');
        expect(fillDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              fillColor: {
                primary: 'var(--pw-fill-primary) /* hsl(0 0% 100% / 1) */',
                button: 'var(--pw-fill-button) /* hsl(0 0% 100% / 1) */',
              },
            },
          },
        });
      });
    });
  });
});
