import { ColorDesignToken } from './color-design-token';
import { OutlineDesignToken } from './outline-design-token';

describe('outline-design-token', () => {
  let outlineDesignToken: OutlineDesignToken;

  beforeEach(() => {
    const colorDesignToken = new ColorDesignToken();
    colorDesignToken.generateColor('neutral', '#292B33');
    outlineDesignToken = new OutlineDesignToken(colorDesignToken);
  });

  describe('add outline color', () => {
    test('css variables', () => {
      outlineDesignToken.addOutlineColor('primary', '{color.neutral.950}');
      expect(outlineDesignToken.cssVariables(false)).toStrictEqual({
        '--outline-primary': 'var(--color-neutral-950)',
      });
    });

    test('css', () => {
      outlineDesignToken.addOutlineColor('primary', '{color.neutral.950}');
      expect(outlineDesignToken.css(false)).toStrictEqual([
        '--outline-primary: var(--color-neutral-950);',
      ]);
    });

    test('tailwind config', () => {
      outlineDesignToken.addOutlineColor('primary', '{color.neutral.950}');
      expect(outlineDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'primary-outline':
                '/* #000000 */ rgb(from var(--outline-primary) r g b / <alpha-value>)',
            },
            outlineColor: {
              primary:
                '/* #000000 */ rgb(from var(--outline-primary) r g b / <alpha-value>)',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('neutral', '#292B33');
        outlineDesignToken = new OutlineDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        outlineDesignToken.addOutlineColor('primary', '{color.neutral.950}');
        expect(outlineDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-outline-primary': 'var(--pw-color-neutral-950)',
        });
      });

      test('css', () => {
        outlineDesignToken.addOutlineColor('primary', '{color.neutral.950}');
        expect(outlineDesignToken.css(false)).toStrictEqual([
          '--pw-outline-primary: var(--pw-color-neutral-950);',
        ]);
      });

      test('tailwind config', () => {
        outlineDesignToken.addOutlineColor('primary', '{color.neutral.950}');
        expect(outlineDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-outline':
                  '/* #000000 */ rgb(from var(--pw-outline-primary) r g b / <alpha-value>)',
              },
              outlineColor: {
                primary:
                  '/* #000000 */ rgb(from var(--pw-outline-primary) r g b / <alpha-value>)',
              },
            },
          },
        });
      });
    });
  });

  describe('add outline color w/ reference', () => {
    test('css variables', () => {
      outlineDesignToken.addOutlineColor('outline', '{color.neutral.950}');
      outlineDesignToken.addOutlineColor('button', '{outline.outline}');
      expect(outlineDesignToken.cssVariables(false)).toStrictEqual({
        '--outline-outline': 'var(--color-neutral-950)',
        '--outline-button': 'var(--outline-outline)',
      });
    });

    test('css', () => {
      outlineDesignToken.addOutlineColor('outline', '{color.neutral.950}');
      outlineDesignToken.addOutlineColor('button', '{outline.outline}');
      expect(outlineDesignToken.css(false)).toStrictEqual([
        '--outline-outline: var(--color-neutral-950);',
        '--outline-button: var(--outline-outline);',
      ]);
    });

    test('tailwind config', () => {
      outlineDesignToken.addOutlineColor('outline', '{color.neutral.950}');
      outlineDesignToken.addOutlineColor('button', '{outline.outline}');
      expect(outlineDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'outline-outline':
                '/* #000000 */ rgb(from var(--outline-outline) r g b / <alpha-value>)',
              'button-outline':
                '/* #000000 */ rgb(from var(--outline-button) r g b / <alpha-value>)',
            },
            outlineColor: {
              outline:
                '/* #000000 */ rgb(from var(--outline-outline) r g b / <alpha-value>)',
              button:
                '/* #000000 */ rgb(from var(--outline-button) r g b / <alpha-value>)',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('neutral', '#292B33');
        outlineDesignToken = new OutlineDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        outlineDesignToken.addOutlineColor('primary', '{color.neutral.950}');
        outlineDesignToken.addOutlineColor('button', '{outline.primary}');
        expect(outlineDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-outline-primary': 'var(--pw-color-neutral-950)',
          '--pw-outline-button': 'var(--pw-outline-primary)',
        });
      });

      test('css', () => {
        outlineDesignToken.addOutlineColor('primary', '{color.neutral.950}');
        outlineDesignToken.addOutlineColor('button', '{outline.primary}');
        expect(outlineDesignToken.css(false)).toStrictEqual([
          '--pw-outline-primary: var(--pw-color-neutral-950);',
          '--pw-outline-button: var(--pw-outline-primary);',
        ]);
      });

      test('tailwind config', () => {
        outlineDesignToken.addOutlineColor('primary', '{color.neutral.950}');
        outlineDesignToken.addOutlineColor('button', '{outline.primary}');
        expect(outlineDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-outline':
                  '/* #000000 */ rgb(from var(--pw-outline-primary) r g b / <alpha-value>)',
                'button-outline':
                  '/* #000000 */ rgb(from var(--pw-outline-button) r g b / <alpha-value>)',
              },
              outlineColor: {
                primary:
                  '/* #000000 */ rgb(from var(--pw-outline-primary) r g b / <alpha-value>)',
                button:
                  '/* #000000 */ rgb(from var(--pw-outline-button) r g b / <alpha-value>)',
              },
            },
          },
        });
      });
    });
  });
});
