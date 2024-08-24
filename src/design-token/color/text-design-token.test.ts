import { ColorDesignToken } from './color-design-token';
import { TextDesignToken } from './text-design-token';

describe('text-design-token', () => {
  let textDesignToken: TextDesignToken;

  beforeEach(() => {
    const colorDesignToken = new ColorDesignToken();
    colorDesignToken.generateColor('white', '#ffffff');
    textDesignToken = new TextDesignToken(colorDesignToken);
  });

  describe('add text color', () => {
    test('css variables', () => {
      textDesignToken.addTextColor('foreground', '{color.white.1000}');
      expect(textDesignToken.cssVariables).toStrictEqual({
        '--text-foreground': 'var(--color-white-1000)',
      });
    });

    test('css', () => {
      textDesignToken.addTextColor('foreground', '{color.white.1000}');
      expect(textDesignToken.css()).toStrictEqual([
        '--text-foreground: var(--color-white-1000);',
      ]);
    });

    test('tailwind config', () => {
      textDesignToken.addTextColor('foreground', '{color.white.1000}');
      expect(textDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            textColor: {
              foreground: 'var(--text-foreground) /* hsl(0 0% 100% / 1) */',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('white', '#ffffff');
        textDesignToken = new TextDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        textDesignToken.addTextColor('foreground', '{color.white.1000}');
        expect(textDesignToken.cssVariables).toStrictEqual({
          '--pw-text-foreground': 'var(--pw-color-white-1000)',
        });
      });

      test('css', () => {
        textDesignToken.addTextColor('foreground', '{color.white.1000}');
        expect(textDesignToken.css()).toStrictEqual([
          '--pw-text-foreground: var(--pw-color-white-1000);',
        ]);
      });

      test('tailwind config', () => {
        textDesignToken.addTextColor('foreground', '{color.white.1000}');
        expect(textDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              textColor: {
                foreground:
                  'var(--pw-text-foreground) /* hsl(0 0% 100% / 1) */',
              },
            },
          },
        });
      });
    });
  });

  describe('add text color w/ reference', () => {
    test('css variables', () => {
      textDesignToken.addTextColor('text', '{color.white.1000}');
      textDesignToken.addTextColor('button', '{text.text}');
      expect(textDesignToken.cssVariables).toStrictEqual({
        '--text-text': 'var(--color-white-1000)',
        '--text-button': 'var(--text-text)',
      });
    });

    test('css', () => {
      textDesignToken.addTextColor('text', '{color.white.1000}');
      textDesignToken.addTextColor('button', '{text.text}');
      expect(textDesignToken.css()).toStrictEqual([
        '--text-text: var(--color-white-1000);',
        '--text-button: var(--text-text);',
      ]);
    });

    test('tailwind config', () => {
      textDesignToken.addTextColor('text', '{color.white.1000}');
      textDesignToken.addTextColor('button', '{text.text}');
      expect(textDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            textColor: {
              text: 'var(--text-text) /* hsl(0 0% 100% / 1) */',
              button: 'var(--text-button) /* hsl(0 0% 100% / 1) */',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('white', '#ffffff');
        textDesignToken = new TextDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        textDesignToken.addTextColor('foreground', '{color.white.1000}');
        textDesignToken.addTextColor('button', '{text.foreground}');
        expect(textDesignToken.cssVariables).toStrictEqual({
          '--pw-text-foreground': 'var(--pw-color-white-1000)',
          '--pw-text-button': 'var(--pw-text-foreground)',
        });
      });

      test('css', () => {
        textDesignToken.addTextColor('foreground', '{color.white.1000}');
        textDesignToken.addTextColor('button', '{text.foreground}');
        expect(textDesignToken.css()).toStrictEqual([
          '--pw-text-foreground: var(--pw-color-white-1000);',
          '--pw-text-button: var(--pw-text-foreground);',
        ]);
      });

      test('tailwind config', () => {
        textDesignToken.addTextColor('foreground', '{color.white.1000}');
        textDesignToken.addTextColor('button', '{text.foreground}');
        expect(textDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              textColor: {
                foreground:
                  'var(--pw-text-foreground) /* hsl(0 0% 100% / 1) */',
                button: 'var(--pw-text-button) /* hsl(0 0% 100% / 1) */',
              },
            },
          },
        });
      });
    });
  });
});
