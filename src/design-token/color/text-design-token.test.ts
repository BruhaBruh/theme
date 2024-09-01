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
      textDesignToken.addTextColor('foreground', '{color.neutral.1000}');
      expect(textDesignToken.cssVariables).toStrictEqual({
        '--text-foreground': 'var(--color-neutral-1000)',
      });
    });

    test('css', () => {
      textDesignToken.addTextColor('foreground', '{color.neutral.1000}');
      expect(textDesignToken.css()).toStrictEqual([
        '--text-foreground: var(--color-neutral-1000);',
      ]);
    });

    test('tailwind config', () => {
      textDesignToken.addTextColor('foreground', '{color.neutral.1000}');
      expect(textDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            textColor: {
              foreground: 'var(--text-foreground) /* #000105 */',
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
        textDesignToken.addTextColor('foreground', '{color.neutral.1000}');
        expect(textDesignToken.cssVariables).toStrictEqual({
          '--pw-text-foreground': 'var(--pw-color-neutral-1000)',
        });
      });

      test('css', () => {
        textDesignToken.addTextColor('foreground', '{color.neutral.1000}');
        expect(textDesignToken.css()).toStrictEqual([
          '--pw-text-foreground: var(--pw-color-neutral-1000);',
        ]);
      });

      test('tailwind config', () => {
        textDesignToken.addTextColor('foreground', '{color.neutral.1000}');
        expect(textDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              textColor: {
                foreground: 'var(--pw-text-foreground) /* #000105 */',
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
            textColor: {
              text: 'var(--text-text) /* #000105 */',
              button: 'var(--text-button) /* #000105 */',
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
        textDesignToken.addTextColor('foreground', '{color.neutral.1000}');
        textDesignToken.addTextColor('button', '{text.foreground}');
        expect(textDesignToken.cssVariables).toStrictEqual({
          '--pw-text-foreground': 'var(--pw-color-neutral-1000)',
          '--pw-text-button': 'var(--pw-text-foreground)',
        });
      });

      test('css', () => {
        textDesignToken.addTextColor('foreground', '{color.neutral.1000}');
        textDesignToken.addTextColor('button', '{text.foreground}');
        expect(textDesignToken.css()).toStrictEqual([
          '--pw-text-foreground: var(--pw-color-neutral-1000);',
          '--pw-text-button: var(--pw-text-foreground);',
        ]);
      });

      test('tailwind config', () => {
        textDesignToken.addTextColor('foreground', '{color.neutral.1000}');
        textDesignToken.addTextColor('button', '{text.foreground}');
        expect(textDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              textColor: {
                foreground: 'var(--pw-text-foreground) /* #000105 */',
                button: 'var(--pw-text-button) /* #000105 */',
              },
            },
          },
        });
      });
    });
  });
});
