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
      textDesignToken.addTextColor('primary', '{color.neutral.1000}');
      expect(textDesignToken.cssVariables).toStrictEqual({
        '--text-primary': 'var(--color-neutral-1000)',
      });
    });

    test('css', () => {
      textDesignToken.addTextColor('primary', '{color.neutral.1000}');
      expect(textDesignToken.css()).toStrictEqual([
        '--text-primary: var(--color-neutral-1000);',
      ]);
    });

    test('tailwind config', () => {
      textDesignToken.addTextColor('primary', '{color.neutral.1000}');
      expect(textDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'primary-text':
                'rgb(var(--text-primary), <alpha-value>) /* #000105 */',
            },
            textColor: {
              primary: 'rgb(var(--text-primary), <alpha-value>) /* #000105 */',
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
        textDesignToken.addTextColor('primary', '{color.neutral.1000}');
        expect(textDesignToken.cssVariables).toStrictEqual({
          '--pw-text-primary': 'var(--pw-color-neutral-1000)',
        });
      });

      test('css', () => {
        textDesignToken.addTextColor('primary', '{color.neutral.1000}');
        expect(textDesignToken.css()).toStrictEqual([
          '--pw-text-primary: var(--pw-color-neutral-1000);',
        ]);
      });

      test('tailwind config', () => {
        textDesignToken.addTextColor('primary', '{color.neutral.1000}');
        expect(textDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-text':
                  'rgb(var(--pw-text-primary), <alpha-value>) /* #000105 */',
              },
              textColor: {
                primary:
                  'rgb(var(--pw-text-primary), <alpha-value>) /* #000105 */',
              },
            },
          },
        });
      });
    });
  });

  describe('add text color w/ reference', () => {
    test('css variables', () => {
      textDesignToken.addTextColor('text', '{color.neutral.1000}');
      textDesignToken.addTextColor('button', '{text.text}');
      expect(textDesignToken.cssVariables).toStrictEqual({
        '--text-text': 'var(--color-neutral-1000)',
        '--text-button': 'var(--text-text)',
      });
    });

    test('css', () => {
      textDesignToken.addTextColor('text', '{color.neutral.1000}');
      textDesignToken.addTextColor('button', '{text.text}');
      expect(textDesignToken.css()).toStrictEqual([
        '--text-text: var(--color-neutral-1000);',
        '--text-button: var(--text-text);',
      ]);
    });

    test('tailwind config', () => {
      textDesignToken.addTextColor('text', '{color.neutral.1000}');
      textDesignToken.addTextColor('button', '{text.text}');
      expect(textDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'text-text': 'rgb(var(--text-text), <alpha-value>) /* #000105 */',
              'button-text':
                'rgb(var(--text-button), <alpha-value>) /* #000105 */',
            },
            textColor: {
              text: 'rgb(var(--text-text), <alpha-value>) /* #000105 */',
              button: 'rgb(var(--text-button), <alpha-value>) /* #000105 */',
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
        textDesignToken.addTextColor('primary', '{color.neutral.1000}');
        textDesignToken.addTextColor('button', '{text.primary}');
        expect(textDesignToken.cssVariables).toStrictEqual({
          '--pw-text-primary': 'var(--pw-color-neutral-1000)',
          '--pw-text-button': 'var(--pw-text-primary)',
        });
      });

      test('css', () => {
        textDesignToken.addTextColor('primary', '{color.neutral.1000}');
        textDesignToken.addTextColor('button', '{text.primary}');
        expect(textDesignToken.css()).toStrictEqual([
          '--pw-text-primary: var(--pw-color-neutral-1000);',
          '--pw-text-button: var(--pw-text-primary);',
        ]);
      });

      test('tailwind config', () => {
        textDesignToken.addTextColor('primary', '{color.neutral.1000}');
        textDesignToken.addTextColor('button', '{text.primary}');
        expect(textDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-text':
                  'rgb(var(--pw-text-primary), <alpha-value>) /* #000105 */',
                'button-text':
                  'rgb(var(--pw-text-button), <alpha-value>) /* #000105 */',
              },
              textColor: {
                primary:
                  'rgb(var(--pw-text-primary), <alpha-value>) /* #000105 */',
                button:
                  'rgb(var(--pw-text-button), <alpha-value>) /* #000105 */',
              },
            },
          },
        });
      });
    });
  });
});
