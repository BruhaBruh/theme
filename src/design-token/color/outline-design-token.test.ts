import { ColorDesignToken } from './color-design-token';
import { OutlineDesignToken } from './outline-design-token';

describe('outline-design-token', () => {
  let outlineDesignToken: OutlineDesignToken;

  beforeEach(() => {
    const colorDesignToken = new ColorDesignToken();
    colorDesignToken.generateColor('neutral', '#292B33', {
      type: 'neutral',
    });
    outlineDesignToken = new OutlineDesignToken(colorDesignToken);
  });

  describe('add outline color', () => {
    test('css variables', () => {
      outlineDesignToken.addOutlineColor('primary', '{color.neutral.1000}');
      expect(outlineDesignToken.cssVariables).toStrictEqual({
        '--outline-primary': 'var(--color-neutral-1000)',
      });
    });

    test('css', () => {
      outlineDesignToken.addOutlineColor('primary', '{color.neutral.1000}');
      expect(outlineDesignToken.css()).toStrictEqual([
        '--outline-primary: var(--color-neutral-1000);',
      ]);
    });

    test('tailwind config', () => {
      outlineDesignToken.addOutlineColor('primary', '{color.neutral.1000}');
      expect(outlineDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'primary-outline':
                'rgb(from var(--outline-primary) r g b / <alpha-value>) /* #000105 */',
            },
            outlineColor: {
              primary:
                'rgb(from var(--outline-primary) r g b / <alpha-value>) /* #000105 */',
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
        outlineDesignToken = new OutlineDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        outlineDesignToken.addOutlineColor('primary', '{color.neutral.1000}');
        expect(outlineDesignToken.cssVariables).toStrictEqual({
          '--pw-outline-primary': 'var(--pw-color-neutral-1000)',
        });
      });

      test('css', () => {
        outlineDesignToken.addOutlineColor('primary', '{color.neutral.1000}');
        expect(outlineDesignToken.css()).toStrictEqual([
          '--pw-outline-primary: var(--pw-color-neutral-1000);',
        ]);
      });

      test('tailwind config', () => {
        outlineDesignToken.addOutlineColor('primary', '{color.neutral.1000}');
        expect(outlineDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-outline':
                  'rgb(from var(--pw-outline-primary) r g b / <alpha-value>) /* #000105 */',
              },
              outlineColor: {
                primary:
                  'rgb(from var(--pw-outline-primary) r g b / <alpha-value>) /* #000105 */',
              },
            },
          },
        });
      });
    });
  });

  describe('add outline color w/ reference', () => {
    test('css variables', () => {
      outlineDesignToken.addOutlineColor('outline', '{color.neutral.1000}');
      outlineDesignToken.addOutlineColor('button', '{outline.outline}');
      expect(outlineDesignToken.cssVariables).toStrictEqual({
        '--outline-outline': 'var(--color-neutral-1000)',
        '--outline-button': 'var(--outline-outline)',
      });
    });

    test('css', () => {
      outlineDesignToken.addOutlineColor('outline', '{color.neutral.1000}');
      outlineDesignToken.addOutlineColor('button', '{outline.outline}');
      expect(outlineDesignToken.css()).toStrictEqual([
        '--outline-outline: var(--color-neutral-1000);',
        '--outline-button: var(--outline-outline);',
      ]);
    });

    test('tailwind config', () => {
      outlineDesignToken.addOutlineColor('outline', '{color.neutral.1000}');
      outlineDesignToken.addOutlineColor('button', '{outline.outline}');
      expect(outlineDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'outline-outline':
                'rgb(from var(--outline-outline) r g b / <alpha-value>) /* #000105 */',
              'button-outline':
                'rgb(from var(--outline-button) r g b / <alpha-value>) /* #000105 */',
            },
            outlineColor: {
              outline:
                'rgb(from var(--outline-outline) r g b / <alpha-value>) /* #000105 */',
              button:
                'rgb(from var(--outline-button) r g b / <alpha-value>) /* #000105 */',
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
        outlineDesignToken = new OutlineDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        outlineDesignToken.addOutlineColor('primary', '{color.neutral.1000}');
        outlineDesignToken.addOutlineColor('button', '{outline.primary}');
        expect(outlineDesignToken.cssVariables).toStrictEqual({
          '--pw-outline-primary': 'var(--pw-color-neutral-1000)',
          '--pw-outline-button': 'var(--pw-outline-primary)',
        });
      });

      test('css', () => {
        outlineDesignToken.addOutlineColor('primary', '{color.neutral.1000}');
        outlineDesignToken.addOutlineColor('button', '{outline.primary}');
        expect(outlineDesignToken.css()).toStrictEqual([
          '--pw-outline-primary: var(--pw-color-neutral-1000);',
          '--pw-outline-button: var(--pw-outline-primary);',
        ]);
      });

      test('tailwind config', () => {
        outlineDesignToken.addOutlineColor('primary', '{color.neutral.1000}');
        outlineDesignToken.addOutlineColor('button', '{outline.primary}');
        expect(outlineDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-outline':
                  'rgb(from var(--pw-outline-primary) r g b / <alpha-value>) /* #000105 */',
                'button-outline':
                  'rgb(from var(--pw-outline-button) r g b / <alpha-value>) /* #000105 */',
              },
              outlineColor: {
                primary:
                  'rgb(from var(--pw-outline-primary) r g b / <alpha-value>) /* #000105 */',
                button:
                  'rgb(from var(--pw-outline-button) r g b / <alpha-value>) /* #000105 */',
              },
            },
          },
        });
      });
    });
  });
});
