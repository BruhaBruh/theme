import { BackgroundDesignToken } from './background-design-token';
import { ColorDesignToken } from './color-design-token';

describe('background-design-token', () => {
  let backgroundDesignToken: BackgroundDesignToken;

  beforeEach(() => {
    const colorDesignToken = new ColorDesignToken();
    colorDesignToken.generateColor('neutral', '#292B33');
    backgroundDesignToken = new BackgroundDesignToken(colorDesignToken);
  });

  describe('add background color', () => {
    test('css variables', () => {
      backgroundDesignToken.addBackgroundColor(
        'background',
        '{color.neutral.950}',
      );
      expect(backgroundDesignToken.cssVariables).toStrictEqual({
        '--bg-background': 'var(--color-neutral-950)',
      });
    });

    test('css', () => {
      backgroundDesignToken.addBackgroundColor(
        'background',
        '{color.neutral.950}',
      );
      expect(backgroundDesignToken.css()).toStrictEqual([
        '--bg-background: var(--color-neutral-950);',
      ]);
    });

    test('tailwind config', () => {
      backgroundDesignToken.addBackgroundColor(
        'background',
        '{color.neutral.950}',
      );
      expect(backgroundDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'background-bg':
                'rgb(from var(--bg-background) r g b / <alpha-value>) /* #000000 */',
            },
            backgroundColor: {
              background:
                'rgb(from var(--bg-background) r g b / <alpha-value>) /* #000000 */',
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
        backgroundDesignToken = new BackgroundDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        backgroundDesignToken.addBackgroundColor(
          'background',
          '{color.neutral.950}',
        );
        expect(backgroundDesignToken.cssVariables).toStrictEqual({
          '--pw-bg-background': 'var(--pw-color-neutral-950)',
        });
      });

      test('css', () => {
        backgroundDesignToken.addBackgroundColor(
          'background',
          '{color.neutral.950}',
        );
        expect(backgroundDesignToken.css()).toStrictEqual([
          '--pw-bg-background: var(--pw-color-neutral-950);',
        ]);
      });

      test('tailwind config', () => {
        backgroundDesignToken.addBackgroundColor(
          'background',
          '{color.neutral.950}',
        );
        expect(backgroundDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'background-bg':
                  'rgb(from var(--pw-bg-background) r g b / <alpha-value>) /* #000000 */',
              },
              backgroundColor: {
                background:
                  'rgb(from var(--pw-bg-background) r g b / <alpha-value>) /* #000000 */',
              },
            },
          },
        });
      });
    });
  });

  describe('add background color w/ reference', () => {
    test('css variables', () => {
      backgroundDesignToken.addBackgroundColor(
        'background',
        '{color.neutral.950}',
      );
      backgroundDesignToken.addBackgroundColor('button', '{bg.background}');
      expect(backgroundDesignToken.cssVariables).toStrictEqual({
        '--bg-background': 'var(--color-neutral-950)',
        '--bg-button': 'var(--bg-background)',
      });
    });

    test('css', () => {
      backgroundDesignToken.addBackgroundColor(
        'background',
        '{color.neutral.950}',
      );
      backgroundDesignToken.addBackgroundColor('button', '{bg.background}');
      expect(backgroundDesignToken.css()).toStrictEqual([
        '--bg-background: var(--color-neutral-950);',
        '--bg-button: var(--bg-background);',
      ]);
    });

    test('tailwind config', () => {
      backgroundDesignToken.addBackgroundColor(
        'background',
        '{color.neutral.950}',
      );
      backgroundDesignToken.addBackgroundColor('button', '{bg.background}');
      expect(backgroundDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'background-bg':
                'rgb(from var(--bg-background) r g b / <alpha-value>) /* #000000 */',
              'button-bg':
                'rgb(from var(--bg-button) r g b / <alpha-value>) /* #000000 */',
            },
            backgroundColor: {
              background:
                'rgb(from var(--bg-background) r g b / <alpha-value>) /* #000000 */',
              button:
                'rgb(from var(--bg-button) r g b / <alpha-value>) /* #000000 */',
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
        backgroundDesignToken = new BackgroundDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        backgroundDesignToken.addBackgroundColor(
          'background',
          '{color.neutral.950}',
        );
        backgroundDesignToken.addBackgroundColor('button', '{bg.background}');
        expect(backgroundDesignToken.cssVariables).toStrictEqual({
          '--pw-bg-background': 'var(--pw-color-neutral-950)',
          '--pw-bg-button': 'var(--pw-bg-background)',
        });
      });

      test('css', () => {
        backgroundDesignToken.addBackgroundColor(
          'background',
          '{color.neutral.950}',
        );
        backgroundDesignToken.addBackgroundColor('button', '{bg.background}');
        expect(backgroundDesignToken.css()).toStrictEqual([
          '--pw-bg-background: var(--pw-color-neutral-950);',
          '--pw-bg-button: var(--pw-bg-background);',
        ]);
      });

      test('tailwind config', () => {
        backgroundDesignToken.addBackgroundColor(
          'background',
          '{color.neutral.950}',
        );
        backgroundDesignToken.addBackgroundColor('button', '{bg.background}');
        expect(backgroundDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'background-bg':
                  'rgb(from var(--pw-bg-background) r g b / <alpha-value>) /* #000000 */',
                'button-bg':
                  'rgb(from var(--pw-bg-button) r g b / <alpha-value>) /* #000000 */',
              },
              backgroundColor: {
                background:
                  'rgb(from var(--pw-bg-background) r g b / <alpha-value>) /* #000000 */',
                button:
                  'rgb(from var(--pw-bg-button) r g b / <alpha-value>) /* #000000 */',
              },
            },
          },
        });
      });
    });
  });
});
