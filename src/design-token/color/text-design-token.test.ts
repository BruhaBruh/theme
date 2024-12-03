import { ColorDesignToken } from './color-design-token';
import { TextDesignToken } from './text-design-token';

describe('text-design-token', () => {
  let textDesignToken: TextDesignToken;

  beforeEach(() => {
    const colorDesignToken = new ColorDesignToken();
    colorDesignToken.generateColor('neutral', '#292B33');
    textDesignToken = new TextDesignToken(colorDesignToken);
  });

  describe('add text color', () => {
    test('css variables', () => {
      textDesignToken.addTextColor('primary', '{color.neutral.950}');
      expect(textDesignToken.cssVariables(false)).toStrictEqual({
        '--text-primary': 'var(--color-neutral-950)',
      });
    });

    test('css', () => {
      textDesignToken.addTextColor('primary', '{color.neutral.950}');
      expect(textDesignToken.css(false)).toStrictEqual([
        '--text-primary: var(--color-neutral-950);',
      ]);
    });

    test('tailwind config', () => {
      textDesignToken.addTextColor('primary', '{color.neutral.950}');
      expect(textDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'primary-text':
                '/* #000000 */ rgb(from var(--text-primary) r g b / <alpha-value>)',
            },
            textColor: {
              primary:
                '/* #000000 */ rgb(from var(--text-primary) r g b / <alpha-value>)',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('neutral', '#292B33');
        textDesignToken = new TextDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        textDesignToken.addTextColor('primary', '{color.neutral.950}');
        expect(textDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-text-primary': 'var(--pw-color-neutral-950)',
        });
      });

      test('css', () => {
        textDesignToken.addTextColor('primary', '{color.neutral.950}');
        expect(textDesignToken.css(false)).toStrictEqual([
          '--pw-text-primary: var(--pw-color-neutral-950);',
        ]);
      });

      test('tailwind config', () => {
        textDesignToken.addTextColor('primary', '{color.neutral.950}');
        expect(textDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-text':
                  '/* #000000 */ rgb(from var(--pw-text-primary) r g b / <alpha-value>)',
              },
              textColor: {
                primary:
                  '/* #000000 */ rgb(from var(--pw-text-primary) r g b / <alpha-value>)',
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
      expect(textDesignToken.cssVariables(false)).toStrictEqual({
        '--text-text': 'var(--color-neutral-950)',
        '--text-button': 'var(--text-text)',
      });
    });

    test('css', () => {
      textDesignToken.addTextColor('text', '{color.neutral.950}');
      textDesignToken.addTextColor('button', '{text.text}');
      expect(textDesignToken.css(false)).toStrictEqual([
        '--text-text: var(--color-neutral-950);',
        '--text-button: var(--text-text);',
      ]);
    });

    test('tailwind config', () => {
      textDesignToken.addTextColor('text', '{color.neutral.950}');
      textDesignToken.addTextColor('button', '{text.text}');
      expect(textDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'text-text':
                '/* #000000 */ rgb(from var(--text-text) r g b / <alpha-value>)',
              'button-text':
                '/* #000000 */ rgb(from var(--text-button) r g b / <alpha-value>)',
            },
            textColor: {
              text: '/* #000000 */ rgb(from var(--text-text) r g b / <alpha-value>)',
              button:
                '/* #000000 */ rgb(from var(--text-button) r g b / <alpha-value>)',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('neutral', '#292B33');
        textDesignToken = new TextDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        textDesignToken.addTextColor('primary', '{color.neutral.950}');
        textDesignToken.addTextColor('button', '{text.primary}');
        expect(textDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-text-primary': 'var(--pw-color-neutral-950)',
          '--pw-text-button': 'var(--pw-text-primary)',
        });
      });

      test('css', () => {
        textDesignToken.addTextColor('primary', '{color.neutral.950}');
        textDesignToken.addTextColor('button', '{text.primary}');
        expect(textDesignToken.css(false)).toStrictEqual([
          '--pw-text-primary: var(--pw-color-neutral-950);',
          '--pw-text-button: var(--pw-text-primary);',
        ]);
      });

      test('tailwind config', () => {
        textDesignToken.addTextColor('primary', '{color.neutral.950}');
        textDesignToken.addTextColor('button', '{text.primary}');
        expect(textDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-text':
                  '/* #000000 */ rgb(from var(--pw-text-primary) r g b / <alpha-value>)',
                'button-text':
                  '/* #000000 */ rgb(from var(--pw-text-button) r g b / <alpha-value>)',
              },
              textColor: {
                primary:
                  '/* #000000 */ rgb(from var(--pw-text-primary) r g b / <alpha-value>)',
                button:
                  '/* #000000 */ rgb(from var(--pw-text-button) r g b / <alpha-value>)',
              },
            },
          },
        });
      });
    });
  });
});
