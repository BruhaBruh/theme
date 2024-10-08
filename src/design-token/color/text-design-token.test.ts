import { ColorDesignToken } from './color-design-token';
import { TextDesignToken } from './text-design-token';

describe('text-design-token', () => {
  let textDesignToken: TextDesignToken;

  beforeEach(() => {
    const colorDesignToken = new ColorDesignToken();
    colorDesignToken.generateColor('neutral', '#292B33', {
      type: 'neutral',
    });
    textDesignToken = new TextDesignToken(colorDesignToken);
  });

  describe('add text color', () => {
    test('css variables', () => {
      textDesignToken.addTextColor('primary', '{color.neutral.950}');
      expect(textDesignToken.cssVariables).toStrictEqual({
        '--text-primary': 'var(--color-neutral-950)',
      });
    });

    test('css', () => {
      textDesignToken.addTextColor('primary', '{color.neutral.950}');
      expect(textDesignToken.css()).toStrictEqual([
        '--text-primary: var(--color-neutral-950);',
      ]);
    });

    test('tailwind config', () => {
      textDesignToken.addTextColor('primary', '{color.neutral.950}');
      expect(textDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'primary-text':
                'rgb(from var(--text-primary) r g b / <alpha-value>) /* #000000 */',
            },
            textColor: {
              primary:
                'rgb(from var(--text-primary) r g b / <alpha-value>) /* #000000 */',
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
        textDesignToken = new TextDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        textDesignToken.addTextColor('primary', '{color.neutral.950}');
        expect(textDesignToken.cssVariables).toStrictEqual({
          '--pw-text-primary': 'var(--pw-color-neutral-950)',
        });
      });

      test('css', () => {
        textDesignToken.addTextColor('primary', '{color.neutral.950}');
        expect(textDesignToken.css()).toStrictEqual([
          '--pw-text-primary: var(--pw-color-neutral-950);',
        ]);
      });

      test('tailwind config', () => {
        textDesignToken.addTextColor('primary', '{color.neutral.950}');
        expect(textDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-text':
                  'rgb(from var(--pw-text-primary) r g b / <alpha-value>) /* #000000 */',
              },
              textColor: {
                primary:
                  'rgb(from var(--pw-text-primary) r g b / <alpha-value>) /* #000000 */',
              },
            },
          },
        });
      });
    });
  });

  describe('add text color w/ reference', () => {
    test('css variables', () => {
      textDesignToken.addTextColor('text', '{color.neutral.950}');
      textDesignToken.addTextColor('button', '{text.text}');
      expect(textDesignToken.cssVariables).toStrictEqual({
        '--text-text': 'var(--color-neutral-950)',
        '--text-button': 'var(--text-text)',
      });
    });

    test('css', () => {
      textDesignToken.addTextColor('text', '{color.neutral.950}');
      textDesignToken.addTextColor('button', '{text.text}');
      expect(textDesignToken.css()).toStrictEqual([
        '--text-text: var(--color-neutral-950);',
        '--text-button: var(--text-text);',
      ]);
    });

    test('tailwind config', () => {
      textDesignToken.addTextColor('text', '{color.neutral.950}');
      textDesignToken.addTextColor('button', '{text.text}');
      expect(textDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'text-text':
                'rgb(from var(--text-text) r g b / <alpha-value>) /* #000000 */',
              'button-text':
                'rgb(from var(--text-button) r g b / <alpha-value>) /* #000000 */',
            },
            textColor: {
              text: 'rgb(from var(--text-text) r g b / <alpha-value>) /* #000000 */',
              button:
                'rgb(from var(--text-button) r g b / <alpha-value>) /* #000000 */',
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
        textDesignToken = new TextDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        textDesignToken.addTextColor('primary', '{color.neutral.950}');
        textDesignToken.addTextColor('button', '{text.primary}');
        expect(textDesignToken.cssVariables).toStrictEqual({
          '--pw-text-primary': 'var(--pw-color-neutral-950)',
          '--pw-text-button': 'var(--pw-text-primary)',
        });
      });

      test('css', () => {
        textDesignToken.addTextColor('primary', '{color.neutral.950}');
        textDesignToken.addTextColor('button', '{text.primary}');
        expect(textDesignToken.css()).toStrictEqual([
          '--pw-text-primary: var(--pw-color-neutral-950);',
          '--pw-text-button: var(--pw-text-primary);',
        ]);
      });

      test('tailwind config', () => {
        textDesignToken.addTextColor('primary', '{color.neutral.950}');
        textDesignToken.addTextColor('button', '{text.primary}');
        expect(textDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-text':
                  'rgb(from var(--pw-text-primary) r g b / <alpha-value>) /* #000000 */',
                'button-text':
                  'rgb(from var(--pw-text-button) r g b / <alpha-value>) /* #000000 */',
              },
              textColor: {
                primary:
                  'rgb(from var(--pw-text-primary) r g b / <alpha-value>) /* #000000 */',
                button:
                  'rgb(from var(--pw-text-button) r g b / <alpha-value>) /* #000000 */',
              },
            },
          },
        });
      });
    });
  });
});
