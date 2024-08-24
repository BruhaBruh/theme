import { BackgroundDesignToken } from './background-design-token';
import { ColorDesignToken } from './color-design-token';

describe('background-design-token', () => {
  let backgroundDesignToken: BackgroundDesignToken;

  beforeEach(() => {
    const colorDesignToken = new ColorDesignToken();
    colorDesignToken.generateColor('white', '#ffffff');
    backgroundDesignToken = new BackgroundDesignToken(colorDesignToken);
  });

  describe('add background color', () => {
    test('css variables', () => {
      backgroundDesignToken.addBackgroundColor(
        'background',
        '{color.white.1000}',
      );
      expect(backgroundDesignToken.cssVariables).toStrictEqual({
        '--bg-background': 'var(--color-white-1000)',
      });
    });

    test('css', () => {
      backgroundDesignToken.addBackgroundColor(
        'background',
        '{color.white.1000}',
      );
      expect(backgroundDesignToken.css()).toStrictEqual([
        '--bg-background: var(--color-white-1000);',
      ]);
    });

    test('tailwind config', () => {
      backgroundDesignToken.addBackgroundColor(
        'background',
        '{color.white.1000}',
      );
      expect(backgroundDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            backgroundColor: {
              background: 'var(--bg-background) /* hsl(0 0% 100% / 1) */',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('white', '#ffffff');
        backgroundDesignToken = new BackgroundDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        backgroundDesignToken.addBackgroundColor(
          'background',
          '{color.white.1000}',
        );
        expect(backgroundDesignToken.cssVariables).toStrictEqual({
          '--pw-bg-background': 'var(--pw-color-white-1000)',
        });
      });

      test('css', () => {
        backgroundDesignToken.addBackgroundColor(
          'background',
          '{color.white.1000}',
        );
        expect(backgroundDesignToken.css()).toStrictEqual([
          '--pw-bg-background: var(--pw-color-white-1000);',
        ]);
      });

      test('tailwind config', () => {
        backgroundDesignToken.addBackgroundColor(
          'background',
          '{color.white.1000}',
        );
        expect(backgroundDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              backgroundColor: {
                background: 'var(--pw-bg-background) /* hsl(0 0% 100% / 1) */',
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
        '{color.white.1000}',
      );
      backgroundDesignToken.addBackgroundColor('button', '{bg.background}');
      expect(backgroundDesignToken.cssVariables).toStrictEqual({
        '--bg-background': 'var(--color-white-1000)',
        '--bg-button': 'var(--bg-background)',
      });
    });

    test('css', () => {
      backgroundDesignToken.addBackgroundColor(
        'background',
        '{color.white.1000}',
      );
      backgroundDesignToken.addBackgroundColor('button', '{bg.background}');
      expect(backgroundDesignToken.css()).toStrictEqual([
        '--bg-background: var(--color-white-1000);',
        '--bg-button: var(--bg-background);',
      ]);
    });

    test('tailwind config', () => {
      backgroundDesignToken.addBackgroundColor(
        'background',
        '{color.white.1000}',
      );
      backgroundDesignToken.addBackgroundColor('button', '{bg.background}');
      expect(backgroundDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            backgroundColor: {
              background: 'var(--bg-background) /* hsl(0 0% 100% / 1) */',
              button: 'var(--bg-button) /* hsl(0 0% 100% / 1) */',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('white', '#ffffff');
        backgroundDesignToken = new BackgroundDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        backgroundDesignToken.addBackgroundColor(
          'background',
          '{color.white.1000}',
        );
        backgroundDesignToken.addBackgroundColor('button', '{bg.background}');
        expect(backgroundDesignToken.cssVariables).toStrictEqual({
          '--pw-bg-background': 'var(--pw-color-white-1000)',
          '--pw-bg-button': 'var(--pw-bg-background)',
        });
      });

      test('css', () => {
        backgroundDesignToken.addBackgroundColor(
          'background',
          '{color.white.1000}',
        );
        backgroundDesignToken.addBackgroundColor('button', '{bg.background}');
        expect(backgroundDesignToken.css()).toStrictEqual([
          '--pw-bg-background: var(--pw-color-white-1000);',
          '--pw-bg-button: var(--pw-bg-background);',
        ]);
      });

      test('tailwind config', () => {
        backgroundDesignToken.addBackgroundColor(
          'background',
          '{color.white.1000}',
        );
        backgroundDesignToken.addBackgroundColor('button', '{bg.background}');
        expect(backgroundDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              backgroundColor: {
                background: 'var(--pw-bg-background) /* hsl(0 0% 100% / 1) */',
                button: 'var(--pw-bg-button) /* hsl(0 0% 100% / 1) */',
              },
            },
          },
        });
      });
    });
  });
});
