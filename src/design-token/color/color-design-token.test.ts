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
      expect(colorDesignToken.css(false)).toStrictEqual([
        '--color-white: #ffffff;',
      ]);
    });

    test('tailwind config', () => {
      colorDesignToken.addColor('white', '#ffffff');
      expect(colorDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          colors: {
            current: 'currentColor',
            inherit: 'inherit',
            initial: 'initial',
            transparent: 'transparent',
            unset: 'unset',
            white:
              '/* #ffffff */ rgb(from var(--color-white) r g b / <alpha-value>)',
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
      });

      test('css variables', () => {
        colorDesignToken.addColor('white', '#ffffff');
        colorDesignToken.addColor('white-example', '#ffffff');
        expect(colorDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-color-white': '#ffffff',
          '--pw-color-white-example': '#ffffff',
        });
      });

      test('css', () => {
        colorDesignToken.addColor('white', '#ffffff');
        expect(colorDesignToken.css(false)).toStrictEqual([
          '--pw-color-white: #ffffff;',
        ]);
      });

      test('tailwind config', () => {
        colorDesignToken.addColor('white', '#ffffff');
        expect(colorDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            colors: {
              current: 'currentColor',
              inherit: 'inherit',
              initial: 'initial',
              transparent: 'transparent',
              unset: 'unset',
              white:
                '/* #ffffff */ rgb(from var(--pw-color-white) r g b / <alpha-value>)',
            },
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
        '--color-background': 'var(--color-white)',
      });
    });

    test('css', () => {
      colorDesignToken.addColor('white', '#ffffff');
      colorDesignToken.addColor('background', '{color.white}');
      expect(colorDesignToken.css(false)).toStrictEqual([
        '--color-white: #ffffff;',
        '--color-background: var(--color-white);',
      ]);
    });

    test('tailwind config', () => {
      colorDesignToken.addColor('white', '#ffffff');
      colorDesignToken.addColor('background', '{color.white}');
      colorDesignToken.addColor('button', '{color.background}');
      expect(colorDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          colors: {
            current: 'currentColor',
            inherit: 'inherit',
            initial: 'initial',
            transparent: 'transparent',
            unset: 'unset',
            white:
              '/* #ffffff */ rgb(from var(--color-white) r g b / <alpha-value>)',
            background:
              '/* #ffffff */ rgb(from var(--color-background) r g b / <alpha-value>)',
            button:
              '/* #ffffff */ rgb(from var(--color-button) r g b / <alpha-value>)',
          },
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
          '--pw-color-background': 'var(--pw-color-white)',
        });
      });

      test('css', () => {
        colorDesignToken.addColor('white', '#ffffff');
        colorDesignToken.addColor('background', '{color.white}');
        expect(colorDesignToken.css(false)).toStrictEqual([
          '--pw-color-white: #ffffff;',
          '--pw-color-background: var(--pw-color-white);',
        ]);
      });

      test('tailwind config', () => {
        colorDesignToken.addColor('white', '#ffffff');
        colorDesignToken.addColor('background', '{color.white}');
        colorDesignToken.addColor('button', '{color.background}');
        expect(colorDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            colors: {
              current: 'currentColor',
              inherit: 'inherit',
              initial: 'initial',
              transparent: 'transparent',
              unset: 'unset',
              white:
                '/* #ffffff */ rgb(from var(--pw-color-white) r g b / <alpha-value>)',
              background:
                '/* #ffffff */ rgb(from var(--pw-color-background) r g b / <alpha-value>)',
              button:
                '/* #ffffff */ rgb(from var(--pw-color-button) r g b / <alpha-value>)',
            },
          },
        });
      });
    });
  });

  describe('generate color', () => {
    test('css variables', () => {
      colorDesignToken.generateColor('neutral', '#292B33');
      colorDesignToken.generateColor('green', '#29CC29');
      expect(colorDesignToken.cssVariables(false)).toStrictEqual({
        '--color-green-100': '#dfffdf',
        '--color-green-150': '#c1fec1',
        '--color-green-200': '#a5fba5',
        '--color-green-250': '#8bf78b',
        '--color-green-300': '#74f174',
        '--color-green-350': '#5eea5e',
        '--color-green-400': '#4ae14a',
        '--color-green-450': '#39d739',
        '--color-green-50': '#ffffff',
        '--color-green-500': '#29cc29',
        '--color-green-550': '#19bd19',
        '--color-green-600': '#0dac0d',
        '--color-green-650': '#029902',
        '--color-green-700': '#008500',
        '--color-green-750': '#006e00',
        '--color-green-800': '#005500',
        '--color-green-850': '#003b00',
        '--color-green-900': '#001e00',
        '--color-green-950': '#000000',
        '--color-neutral-100': '#e6e7ec',
        '--color-neutral-150': '#ced0d8',
        '--color-neutral-200': '#b5b8c3',
        '--color-neutral-250': '#9da0ae',
        '--color-neutral-300': '#858997',
        '--color-neutral-350': '#6e717f',
        '--color-neutral-400': '#575a67',
        '--color-neutral-450': '#40424d',
        '--color-neutral-50': '#ffffff',
        '--color-neutral-500': '#292b33',
        '--color-neutral-550': '#24262d',
        '--color-neutral-600': '#202128',
        '--color-neutral-650': '#1b1d22',
        '--color-neutral-700': '#17181d',
        '--color-neutral-750': '#121317',
        '--color-neutral-800': '#0e0e11',
        '--color-neutral-850': '#090a0c',
        '--color-neutral-900': '#050506',
        '--color-neutral-950': '#000000',
      });
    });

    test('css', () => {
      colorDesignToken.generateColor('neutral', '#292B33');
      colorDesignToken.generateColor('green', '#29CC29');
      expect(colorDesignToken.css(false)).toStrictEqual([
        '--color-neutral-50: #ffffff;',
        '--color-neutral-100: #e6e7ec;',
        '--color-neutral-150: #ced0d8;',
        '--color-neutral-200: #b5b8c3;',
        '--color-neutral-250: #9da0ae;',
        '--color-neutral-300: #858997;',
        '--color-neutral-350: #6e717f;',
        '--color-neutral-400: #575a67;',
        '--color-neutral-450: #40424d;',
        '--color-neutral-500: #292b33;',
        '--color-neutral-550: #24262d;',
        '--color-neutral-600: #202128;',
        '--color-neutral-650: #1b1d22;',
        '--color-neutral-700: #17181d;',
        '--color-neutral-750: #121317;',
        '--color-neutral-800: #0e0e11;',
        '--color-neutral-850: #090a0c;',
        '--color-neutral-900: #050506;',
        '--color-neutral-950: #000000;',
        '--color-green-50: #ffffff;',
        '--color-green-100: #dfffdf;',
        '--color-green-150: #c1fec1;',
        '--color-green-200: #a5fba5;',
        '--color-green-250: #8bf78b;',
        '--color-green-300: #74f174;',
        '--color-green-350: #5eea5e;',
        '--color-green-400: #4ae14a;',
        '--color-green-450: #39d739;',
        '--color-green-500: #29cc29;',
        '--color-green-550: #19bd19;',
        '--color-green-600: #0dac0d;',
        '--color-green-650: #029902;',
        '--color-green-700: #008500;',
        '--color-green-750: #006e00;',
        '--color-green-800: #005500;',
        '--color-green-850: #003b00;',
        '--color-green-900: #001e00;',
        '--color-green-950: #000000;',
      ]);
    });

    test('tailwind config', () => {
      colorDesignToken.generateColor('neutral', '#292B33');
      colorDesignToken.generateColor('green', '#29CC29');
      expect(colorDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          colors: {
            current: 'currentColor',
            green: {
              '100':
                '/* #dfffdf */ rgb(from var(--color-green-100) r g b / <alpha-value>)',
              '150':
                '/* #c1fec1 */ rgb(from var(--color-green-150) r g b / <alpha-value>)',
              '200':
                '/* #a5fba5 */ rgb(from var(--color-green-200) r g b / <alpha-value>)',
              '250':
                '/* #8bf78b */ rgb(from var(--color-green-250) r g b / <alpha-value>)',
              '300':
                '/* #74f174 */ rgb(from var(--color-green-300) r g b / <alpha-value>)',
              '350':
                '/* #5eea5e */ rgb(from var(--color-green-350) r g b / <alpha-value>)',
              '400':
                '/* #4ae14a */ rgb(from var(--color-green-400) r g b / <alpha-value>)',
              '450':
                '/* #39d739 */ rgb(from var(--color-green-450) r g b / <alpha-value>)',
              '50': '/* #ffffff */ rgb(from var(--color-green-50) r g b / <alpha-value>)',
              '500':
                '/* #29cc29 */ rgb(from var(--color-green-500) r g b / <alpha-value>)',
              '550':
                '/* #19bd19 */ rgb(from var(--color-green-550) r g b / <alpha-value>)',
              '600':
                '/* #0dac0d */ rgb(from var(--color-green-600) r g b / <alpha-value>)',
              '650':
                '/* #029902 */ rgb(from var(--color-green-650) r g b / <alpha-value>)',
              '700':
                '/* #008500 */ rgb(from var(--color-green-700) r g b / <alpha-value>)',
              '750':
                '/* #006e00 */ rgb(from var(--color-green-750) r g b / <alpha-value>)',
              '800':
                '/* #005500 */ rgb(from var(--color-green-800) r g b / <alpha-value>)',
              '850':
                '/* #003b00 */ rgb(from var(--color-green-850) r g b / <alpha-value>)',
              '900':
                '/* #001e00 */ rgb(from var(--color-green-900) r g b / <alpha-value>)',
              '950':
                '/* #000000 */ rgb(from var(--color-green-950) r g b / <alpha-value>)',
            },
            inherit: 'inherit',
            initial: 'initial',
            neutral: {
              '100':
                '/* #e6e7ec */ rgb(from var(--color-neutral-100) r g b / <alpha-value>)',
              '150':
                '/* #ced0d8 */ rgb(from var(--color-neutral-150) r g b / <alpha-value>)',
              '200':
                '/* #b5b8c3 */ rgb(from var(--color-neutral-200) r g b / <alpha-value>)',
              '250':
                '/* #9da0ae */ rgb(from var(--color-neutral-250) r g b / <alpha-value>)',
              '300':
                '/* #858997 */ rgb(from var(--color-neutral-300) r g b / <alpha-value>)',
              '350':
                '/* #6e717f */ rgb(from var(--color-neutral-350) r g b / <alpha-value>)',
              '400':
                '/* #575a67 */ rgb(from var(--color-neutral-400) r g b / <alpha-value>)',
              '450':
                '/* #40424d */ rgb(from var(--color-neutral-450) r g b / <alpha-value>)',
              '50': '/* #ffffff */ rgb(from var(--color-neutral-50) r g b / <alpha-value>)',
              '500':
                '/* #292b33 */ rgb(from var(--color-neutral-500) r g b / <alpha-value>)',
              '550':
                '/* #24262d */ rgb(from var(--color-neutral-550) r g b / <alpha-value>)',
              '600':
                '/* #202128 */ rgb(from var(--color-neutral-600) r g b / <alpha-value>)',
              '650':
                '/* #1b1d22 */ rgb(from var(--color-neutral-650) r g b / <alpha-value>)',
              '700':
                '/* #17181d */ rgb(from var(--color-neutral-700) r g b / <alpha-value>)',
              '750':
                '/* #121317 */ rgb(from var(--color-neutral-750) r g b / <alpha-value>)',
              '800':
                '/* #0e0e11 */ rgb(from var(--color-neutral-800) r g b / <alpha-value>)',
              '850':
                '/* #090a0c */ rgb(from var(--color-neutral-850) r g b / <alpha-value>)',
              '900':
                '/* #050506 */ rgb(from var(--color-neutral-900) r g b / <alpha-value>)',
              '950':
                '/* #000000 */ rgb(from var(--color-neutral-950) r g b / <alpha-value>)',
            },
            transparent: 'transparent',
            unset: 'unset',
          },
        },
      });
    });
  });
});
