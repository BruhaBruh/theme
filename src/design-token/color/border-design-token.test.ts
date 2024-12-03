import { BorderDesignToken } from './border-design-token';
import { ColorDesignToken } from './color-design-token';

describe('border-design-token', () => {
  let borderDesignToken: BorderDesignToken;

  beforeEach(() => {
    const colorDesignToken = new ColorDesignToken();
    colorDesignToken.generateColor('neutral', '#292B33');
    borderDesignToken = new BorderDesignToken(colorDesignToken);
  });

  describe('add border color', () => {
    test('css variables', () => {
      borderDesignToken.addBorderColor('primary', '{color.neutral.950}');
      expect(borderDesignToken.cssVariables(false)).toStrictEqual({
        '--border-primary': 'var(--color-neutral-950)',
      });
    });

    test('css', () => {
      borderDesignToken.addBorderColor('primary', '{color.neutral.950}');
      expect(borderDesignToken.css(false)).toStrictEqual([
        '--border-primary: var(--color-neutral-950);',
      ]);
    });

    test('tailwind config', () => {
      borderDesignToken.addBorderColor('primary', '{color.neutral.950}');
      expect(borderDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'primary-border':
                '/* #000000 */ rgb(from var(--border-primary) r g b / <alpha-value>)',
            },
            borderColor: {
              primary:
                '/* #000000 */ rgb(from var(--border-primary) r g b / <alpha-value>)',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('neutral', '#292B33');
        borderDesignToken = new BorderDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        borderDesignToken.addBorderColor('primary', '{color.neutral.950}');
        expect(borderDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-border-primary': 'var(--pw-color-neutral-950)',
        });
      });

      test('css', () => {
        borderDesignToken.addBorderColor('primary', '{color.neutral.950}');
        expect(borderDesignToken.css(false)).toStrictEqual([
          '--pw-border-primary: var(--pw-color-neutral-950);',
        ]);
      });

      test('tailwind config', () => {
        borderDesignToken.addBorderColor('primary', '{color.neutral.950}');
        expect(borderDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-border':
                  '/* #000000 */ rgb(from var(--pw-border-primary) r g b / <alpha-value>)',
              },
              borderColor: {
                primary:
                  '/* #000000 */ rgb(from var(--pw-border-primary) r g b / <alpha-value>)',
              },
            },
          },
        });
      });
    });
  });

  describe('add border color w/ reference', () => {
    test('css variables', () => {
      borderDesignToken.addBorderColor('border', '{color.neutral.950}');
      borderDesignToken.addBorderColor('button', '{border.border}');
      expect(borderDesignToken.cssVariables(false)).toStrictEqual({
        '--border-border': 'var(--color-neutral-950)',
        '--border-button': 'var(--border-border)',
      });
    });

    test('css', () => {
      borderDesignToken.addBorderColor('border', '{color.neutral.950}');
      borderDesignToken.addBorderColor('button', '{border.border}');
      expect(borderDesignToken.css(false)).toStrictEqual([
        '--border-border: var(--color-neutral-950);',
        '--border-button: var(--border-border);',
      ]);
    });

    test('tailwind config', () => {
      borderDesignToken.addBorderColor('border', '{color.neutral.950}');
      borderDesignToken.addBorderColor('button', '{border.border}');
      expect(borderDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'border-border':
                '/* #000000 */ rgb(from var(--border-border) r g b / <alpha-value>)',
              'button-border':
                '/* #000000 */ rgb(from var(--border-button) r g b / <alpha-value>)',
            },
            borderColor: {
              border:
                '/* #000000 */ rgb(from var(--border-border) r g b / <alpha-value>)',
              button:
                '/* #000000 */ rgb(from var(--border-button) r g b / <alpha-value>)',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('neutral', '#292B33');
        borderDesignToken = new BorderDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        borderDesignToken.addBorderColor('primary', '{color.neutral.950}');
        borderDesignToken.addBorderColor('button', '{border.primary}');
        expect(borderDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-border-primary': 'var(--pw-color-neutral-950)',
          '--pw-border-button': 'var(--pw-border-primary)',
        });
      });

      test('css', () => {
        borderDesignToken.addBorderColor('primary', '{color.neutral.950}');
        borderDesignToken.addBorderColor('button', '{border.primary}');
        expect(borderDesignToken.css(false)).toStrictEqual([
          '--pw-border-primary: var(--pw-color-neutral-950);',
          '--pw-border-button: var(--pw-border-primary);',
        ]);
      });

      test('tailwind config', () => {
        borderDesignToken.addBorderColor('primary', '{color.neutral.950}');
        borderDesignToken.addBorderColor('button', '{border.primary}');
        expect(borderDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-border':
                  '/* #000000 */ rgb(from var(--pw-border-primary) r g b / <alpha-value>)',
                'button-border':
                  '/* #000000 */ rgb(from var(--pw-border-button) r g b / <alpha-value>)',
              },
              borderColor: {
                primary:
                  '/* #000000 */ rgb(from var(--pw-border-primary) r g b / <alpha-value>)',
                button:
                  '/* #000000 */ rgb(from var(--pw-border-button) r g b / <alpha-value>)',
              },
            },
          },
        });
      });
    });
  });
});
