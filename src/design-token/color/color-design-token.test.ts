import { ColorDesignToken } from './color-design-token';

describe('color-design-token', () => {
  let colorDesignToken: ColorDesignToken;

  beforeEach(() => {
    colorDesignToken = new ColorDesignToken();
  });

  describe('add color', () => {
    test('css variables', () => {
      colorDesignToken.addColor('white', '#ffffff');
      expect(colorDesignToken.cssVariables(false)).toStrictEqual({
        '--color-white': '#ffffff',
      });
    });

    test('css', () => {
      colorDesignToken.addColor('white', '#ffffff');
      expect(colorDesignToken.css(':root', false)).toStrictEqual({
        ':root': {
          '--color-white': '#ffffff',
        },
      });
    });

    test('tailwind css', () => {
      colorDesignToken.addColor('white', '#ffffff');
      expect(colorDesignToken.tailwindCSS(':root', false)).toStrictEqual({
        ':root': {
          '--color-white': '#ffffff',
        },
        '@theme': {
          '--color-current': 'currentColor',
          '--color-inherit': 'inherit',
          '--color-initial': 'initial',
          '--color-transparent': 'transparent',
          '--color-unset': 'unset',
          '--color-white': 'var(--color-white, #ffffff)',
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
      });

      test('css variables', () => {
        colorDesignToken.addColor('white', '#ffffff');
        expect(colorDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-color-white': '#ffffff',
        });
      });

      test('css', () => {
        colorDesignToken.addColor('white', '#ffffff');
        expect(colorDesignToken.css(':root', false)).toStrictEqual({
          ':root': {
            '--pw-color-white': '#ffffff',
          },
        });
      });

      test('tailwind css', () => {
        colorDesignToken.addColor('white', '#ffffff');
        expect(colorDesignToken.tailwindCSS(':root', false)).toStrictEqual({
          ':root': {
            '--pw-color-white': '#ffffff',
          },
          '@theme': {
            '--color-current': 'currentColor',
            '--color-inherit': 'inherit',
            '--color-initial': 'initial',
            '--color-transparent': 'transparent',
            '--color-unset': 'unset',
            '--color-white': 'var(--pw-color-white, #ffffff)',
          },
        });
      });
    });
  });

  describe('add color w/ reference', () => {
    test('css variables', () => {
      colorDesignToken.addColor('white', '#ffffff');
      colorDesignToken.addColor('background', '{color.white}');
      expect(colorDesignToken.cssVariables(false)).toStrictEqual({
        '--color-white': '#ffffff',
        '--color-background': 'var(--color-white, #ffffff)',
      });
    });

    test('css', () => {
      colorDesignToken.addColor('white', '#ffffff');
      colorDesignToken.addColor('background', '{color.white}');
      expect(colorDesignToken.css(':root', false)).toStrictEqual({
        ':root': {
          '--color-white': '#ffffff',
          '--color-background': 'var(--color-white, #ffffff)',
        },
      });
    });

    test('tailwind css', () => {
      colorDesignToken.addColor('white', '#ffffff');
      colorDesignToken.addColor('background', '{color.white}');

      expect(colorDesignToken.tailwindCSS(':root', false)).toStrictEqual({
        ':root': {
          '--color-white': '#ffffff',
          '--color-background': 'var(--color-white, #ffffff)',
        },
        '@theme': {
          '--color-current': 'currentColor',
          '--color-inherit': 'inherit',
          '--color-initial': 'initial',
          '--color-transparent': 'transparent',
          '--color-unset': 'unset',
          '--color-white': 'var(--color-white, #ffffff)',
          '--color-background':
            'var(--color-background, var(--color-white, #ffffff))',
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
      });

      test('css variables', () => {
        colorDesignToken.addColor('white', '#ffffff');
        colorDesignToken.addColor('background', '{color.white}');
        expect(colorDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-color-white': '#ffffff',
          '--pw-color-background': 'var(--pw-color-white, #ffffff)',
        });
      });

      test('css', () => {
        colorDesignToken.addColor('white', '#ffffff');
        colorDesignToken.addColor('background', '{color.white}');
        expect(colorDesignToken.css(':root', false)).toStrictEqual({
          ':root': {
            '--pw-color-white': '#ffffff',
            '--pw-color-background': 'var(--pw-color-white, #ffffff)',
          },
        });
      });

      test('tailwind css', () => {
        colorDesignToken.addColor('white', '#ffffff');
        colorDesignToken.addColor('background', '{color.white}');

        expect(colorDesignToken.tailwindCSS(':root', false)).toStrictEqual({
          ':root': {
            '--pw-color-white': '#ffffff',
            '--pw-color-background': 'var(--pw-color-white, #ffffff)',
          },
          '@theme': {
            '--color-current': 'currentColor',
            '--color-inherit': 'inherit',
            '--color-initial': 'initial',
            '--color-transparent': 'transparent',
            '--color-unset': 'unset',
            '--color-white': 'var(--pw-color-white, #ffffff)',
            '--color-background':
              'var(--pw-color-background, var(--pw-color-white, #ffffff))',
          },
        });
      });
    });
  });

  describe('generate color', () => {
    test('css variables', () => {
      colorDesignToken.generateColor('neutral', '#292B33', {
        modifierGenerator: {
          min: 0,
          max: 5,
          step: 1,
          reverse: true,
        },
      });
      colorDesignToken.generateColor('neutral-alt', '#292B33', {
        modifierGenerator: {
          min: 0,
          max: 5,
          step: 1,
          reverse: false,
        },
      });
      expect(colorDesignToken.cssVariables(false)).toStrictEqual({
        '--color-neutral-0': '#000000',
        '--color-neutral-1': '#101115',
        '--color-neutral-2': '#212229',
        '--color-neutral-3': '#525562',
        '--color-neutral-4': '#a7aab6',
        '--color-neutral-5': '#ffffff',
        '--color-neutral-alt-0': '#ffffff',
        '--color-neutral-alt-1': '#a7aab6',
        '--color-neutral-alt-2': '#525562',
        '--color-neutral-alt-3': '#212229',
        '--color-neutral-alt-4': '#101115',
        '--color-neutral-alt-5': '#000000',
      });
    });

    test('css', () => {
      colorDesignToken.generateColor('neutral', '#292B33', {
        modifierGenerator: {
          min: 0,
          max: 5,
          step: 1,
          reverse: true,
        },
      });
      colorDesignToken.generateColor('neutral-alt', '#292B33', {
        modifierGenerator: {
          min: 0,
          max: 5,
          step: 1,
          reverse: false,
        },
      });
      expect(colorDesignToken.css(':root', false)).toStrictEqual({
        ':root': {
          '--color-neutral-0': '#000000',
          '--color-neutral-1': '#101115',
          '--color-neutral-2': '#212229',
          '--color-neutral-3': '#525562',
          '--color-neutral-4': '#a7aab6',
          '--color-neutral-5': '#ffffff',
          '--color-neutral-alt-0': '#ffffff',
          '--color-neutral-alt-1': '#a7aab6',
          '--color-neutral-alt-2': '#525562',
          '--color-neutral-alt-3': '#212229',
          '--color-neutral-alt-4': '#101115',
          '--color-neutral-alt-5': '#000000',
        },
      });
    });

    test('tailwind css', () => {
      colorDesignToken.generateColor('neutral', '#292B33', {
        modifierGenerator: {
          min: 0,
          max: 5,
          step: 1,
          reverse: true,
        },
      });
      colorDesignToken.generateColor('neutral-alt', '#292B33', {
        modifierGenerator: {
          min: 0,
          max: 5,
          step: 1,
          reverse: false,
        },
      });
      expect(colorDesignToken.tailwindCSS(':root', false)).toStrictEqual({
        ':root': {
          '--color-neutral-0': '#000000',
          '--color-neutral-1': '#101115',
          '--color-neutral-2': '#212229',
          '--color-neutral-3': '#525562',
          '--color-neutral-4': '#a7aab6',
          '--color-neutral-5': '#ffffff',
          '--color-neutral-alt-0': '#ffffff',
          '--color-neutral-alt-1': '#a7aab6',
          '--color-neutral-alt-2': '#525562',
          '--color-neutral-alt-3': '#212229',
          '--color-neutral-alt-4': '#101115',
          '--color-neutral-alt-5': '#000000',
        },
        '@theme': {
          '--color-current': 'currentColor',
          '--color-inherit': 'inherit',
          '--color-initial': 'initial',
          '--color-transparent': 'transparent',
          '--color-unset': 'unset',
          '--color-neutral-0': 'var(--color-neutral-0, #000000)',
          '--color-neutral-1': 'var(--color-neutral-1, #101115)',
          '--color-neutral-2': 'var(--color-neutral-2, #212229)',
          '--color-neutral-3': 'var(--color-neutral-3, #525562)',
          '--color-neutral-4': 'var(--color-neutral-4, #a7aab6)',
          '--color-neutral-5': 'var(--color-neutral-5, #ffffff)',
          '--color-neutral-alt-0': 'var(--color-neutral-alt-0, #ffffff)',
          '--color-neutral-alt-1': 'var(--color-neutral-alt-1, #a7aab6)',
          '--color-neutral-alt-2': 'var(--color-neutral-alt-2, #525562)',
          '--color-neutral-alt-3': 'var(--color-neutral-alt-3, #212229)',
          '--color-neutral-alt-4': 'var(--color-neutral-alt-4, #101115)',
          '--color-neutral-alt-5': 'var(--color-neutral-alt-5, #000000)',
        },
      });
    });
  });
});
