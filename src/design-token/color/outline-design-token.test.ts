import { ColorDesignToken } from './color-design-token';
import { OutlineDesignToken } from './outline-design-token';

describe('outline-design-token', () => {
  let outlineDesignToken: OutlineDesignToken;

  beforeEach(() => {
    const colorDesignToken = new ColorDesignToken();
    colorDesignToken.generateColor('white', '#ffffff');
    outlineDesignToken = new OutlineDesignToken(colorDesignToken);
  });

  describe('add outline color', () => {
    test('css variables', () => {
      outlineDesignToken.addOutlineColor('primary', '{color.white.1000}');
      expect(outlineDesignToken.cssVariables).toStrictEqual({
        '--outline-primary': 'var(--color-white-1000)',
      });
    });

    test('css', () => {
      outlineDesignToken.addOutlineColor('primary', '{color.white.1000}');
      expect(outlineDesignToken.css()).toStrictEqual([
        '--outline-primary: var(--color-white-1000);',
      ]);
    });

    test('tailwind config', () => {
      outlineDesignToken.addOutlineColor('primary', '{color.white.1000}');
      expect(outlineDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            outlineColor: {
              primary: 'var(--outline-primary) /* hsl(0 0% 100% / 1) */',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('white', '#ffffff');
        outlineDesignToken = new OutlineDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        outlineDesignToken.addOutlineColor('primary', '{color.white.1000}');
        expect(outlineDesignToken.cssVariables).toStrictEqual({
          '--pw-outline-primary': 'var(--pw-color-white-1000)',
        });
      });

      test('css', () => {
        outlineDesignToken.addOutlineColor('primary', '{color.white.1000}');
        expect(outlineDesignToken.css()).toStrictEqual([
          '--pw-outline-primary: var(--pw-color-white-1000);',
        ]);
      });

      test('tailwind config', () => {
        outlineDesignToken.addOutlineColor('primary', '{color.white.1000}');
        expect(outlineDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              outlineColor: {
                primary: 'var(--pw-outline-primary) /* hsl(0 0% 100% / 1) */',
              },
            },
          },
        });
      });
    });
  });

  describe('add outline color w/ reference', () => {
    test('css variables', () => {
      outlineDesignToken.addOutlineColor('outline', '{color.white.1000}');
      outlineDesignToken.addOutlineColor('button', '{outline.outline}');
      expect(outlineDesignToken.cssVariables).toStrictEqual({
        '--outline-outline': 'var(--color-white-1000)',
        '--outline-button': 'var(--outline-outline)',
      });
    });

    test('css', () => {
      outlineDesignToken.addOutlineColor('outline', '{color.white.1000}');
      outlineDesignToken.addOutlineColor('button', '{outline.outline}');
      expect(outlineDesignToken.css()).toStrictEqual([
        '--outline-outline: var(--color-white-1000);',
        '--outline-button: var(--outline-outline);',
      ]);
    });

    test('tailwind config', () => {
      outlineDesignToken.addOutlineColor('outline', '{color.white.1000}');
      outlineDesignToken.addOutlineColor('button', '{outline.outline}');
      expect(outlineDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            outlineColor: {
              outline: 'var(--outline-outline) /* hsl(0 0% 100% / 1) */',
              button: 'var(--outline-button) /* hsl(0 0% 100% / 1) */',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('white', '#ffffff');
        outlineDesignToken = new OutlineDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        outlineDesignToken.addOutlineColor('primary', '{color.white.1000}');
        outlineDesignToken.addOutlineColor('button', '{outline.primary}');
        expect(outlineDesignToken.cssVariables).toStrictEqual({
          '--pw-outline-primary': 'var(--pw-color-white-1000)',
          '--pw-outline-button': 'var(--pw-outline-primary)',
        });
      });

      test('css', () => {
        outlineDesignToken.addOutlineColor('primary', '{color.white.1000}');
        outlineDesignToken.addOutlineColor('button', '{outline.primary}');
        expect(outlineDesignToken.css()).toStrictEqual([
          '--pw-outline-primary: var(--pw-color-white-1000);',
          '--pw-outline-button: var(--pw-outline-primary);',
        ]);
      });

      test('tailwind config', () => {
        outlineDesignToken.addOutlineColor('primary', '{color.white.1000}');
        outlineDesignToken.addOutlineColor('button', '{outline.primary}');
        expect(outlineDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              outlineColor: {
                primary: 'var(--pw-outline-primary) /* hsl(0 0% 100% / 1) */',
                button: 'var(--pw-outline-button) /* hsl(0 0% 100% / 1) */',
              },
            },
          },
        });
      });
    });
  });
});
