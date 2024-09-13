import { BorderDesignToken } from './border-design-token';
import { ColorDesignToken } from './color-design-token';

describe('border-design-token', () => {
  let borderDesignToken: BorderDesignToken;

  beforeEach(() => {
    const colorDesignToken = new ColorDesignToken();
    colorDesignToken.generateColor('neutral', '#292B33', {
      type: 'neutral',
    });
    borderDesignToken = new BorderDesignToken(colorDesignToken);
  });

  describe('add border color', () => {
    test('css variables', () => {
      borderDesignToken.addBorderColor('primary', '{color.neutral.1000}');
      expect(borderDesignToken.cssVariables).toStrictEqual({
        '--border-primary': 'var(--color-neutral-1000)',
      });
    });

    test('css', () => {
      borderDesignToken.addBorderColor('primary', '{color.neutral.1000}');
      expect(borderDesignToken.css()).toStrictEqual([
        '--border-primary: var(--color-neutral-1000);',
      ]);
    });

    test('tailwind config', () => {
      borderDesignToken.addBorderColor('primary', '{color.neutral.1000}');
      expect(borderDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'primary-border':
                'rgb(from var(--border-primary) r g b / <alpha-value>) /* #000105 */',
            },
            borderColor: {
              primary:
                'rgb(from var(--border-primary) r g b / <alpha-value>) /* #000105 */',
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
        borderDesignToken = new BorderDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        borderDesignToken.addBorderColor('primary', '{color.neutral.1000}');
        expect(borderDesignToken.cssVariables).toStrictEqual({
          '--pw-border-primary': 'var(--pw-color-neutral-1000)',
        });
      });

      test('css', () => {
        borderDesignToken.addBorderColor('primary', '{color.neutral.1000}');
        expect(borderDesignToken.css()).toStrictEqual([
          '--pw-border-primary: var(--pw-color-neutral-1000);',
        ]);
      });

      test('tailwind config', () => {
        borderDesignToken.addBorderColor('primary', '{color.neutral.1000}');
        expect(borderDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-border':
                  'rgb(from var(--pw-border-primary) r g b / <alpha-value>) /* #000105 */',
              },
              borderColor: {
                primary:
                  'rgb(from var(--pw-border-primary) r g b / <alpha-value>) /* #000105 */',
              },
            },
          },
        });
      });
    });
  });

  describe('add border color w/ reference', () => {
    test('css variables', () => {
      borderDesignToken.addBorderColor('border', '{color.neutral.1000}');
      borderDesignToken.addBorderColor('button', '{border.border}');
      expect(borderDesignToken.cssVariables).toStrictEqual({
        '--border-border': 'var(--color-neutral-1000)',
        '--border-button': 'var(--border-border)',
      });
    });

    test('css', () => {
      borderDesignToken.addBorderColor('border', '{color.neutral.1000}');
      borderDesignToken.addBorderColor('button', '{border.border}');
      expect(borderDesignToken.css()).toStrictEqual([
        '--border-border: var(--color-neutral-1000);',
        '--border-button: var(--border-border);',
      ]);
    });

    test('tailwind config', () => {
      borderDesignToken.addBorderColor('border', '{color.neutral.1000}');
      borderDesignToken.addBorderColor('button', '{border.border}');
      expect(borderDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'border-border':
                'rgb(from var(--border-border) r g b / <alpha-value>) /* #000105 */',
              'button-border':
                'rgb(from var(--border-button) r g b / <alpha-value>) /* #000105 */',
            },
            borderColor: {
              border:
                'rgb(from var(--border-border) r g b / <alpha-value>) /* #000105 */',
              button:
                'rgb(from var(--border-button) r g b / <alpha-value>) /* #000105 */',
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
        borderDesignToken = new BorderDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        borderDesignToken.addBorderColor('primary', '{color.neutral.1000}');
        borderDesignToken.addBorderColor('button', '{border.primary}');
        expect(borderDesignToken.cssVariables).toStrictEqual({
          '--pw-border-primary': 'var(--pw-color-neutral-1000)',
          '--pw-border-button': 'var(--pw-border-primary)',
        });
      });

      test('css', () => {
        borderDesignToken.addBorderColor('primary', '{color.neutral.1000}');
        borderDesignToken.addBorderColor('button', '{border.primary}');
        expect(borderDesignToken.css()).toStrictEqual([
          '--pw-border-primary: var(--pw-color-neutral-1000);',
          '--pw-border-button: var(--pw-border-primary);',
        ]);
      });

      test('tailwind config', () => {
        borderDesignToken.addBorderColor('primary', '{color.neutral.1000}');
        borderDesignToken.addBorderColor('button', '{border.primary}');
        expect(borderDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-border':
                  'rgb(from var(--pw-border-primary) r g b / <alpha-value>) /* #000105 */',
                'button-border':
                  'rgb(from var(--pw-border-button) r g b / <alpha-value>) /* #000105 */',
              },
              borderColor: {
                primary:
                  'rgb(from var(--pw-border-primary) r g b / <alpha-value>) /* #000105 */',
                button:
                  'rgb(from var(--pw-border-button) r g b / <alpha-value>) /* #000105 */',
              },
            },
          },
        });
      });
    });
  });
});
