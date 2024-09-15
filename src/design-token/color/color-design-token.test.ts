import { ColorDesignToken } from './color-design-token';

describe('color-design-token', () => {
  let colorDesignToken: ColorDesignToken;

  beforeEach(() => {
    colorDesignToken = new ColorDesignToken();
  });

  describe('add color', () => {
    test('css variables', () => {
      colorDesignToken.addColor('white', '#ffffff');
      expect(colorDesignToken.cssVariables).toStrictEqual({
        '--color-white': '#ffffff',
      });
    });

    test('css', () => {
      colorDesignToken.addColor('white', '#ffffff');
      expect(colorDesignToken.css()).toStrictEqual(['--color-white: #ffffff;']);
    });

    test('tailwind config', () => {
      colorDesignToken.addColor('white', '#ffffff');
      expect(colorDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          colors: {
            current: 'currentColor',
            inherit: 'inherit',
            initial: 'initial',
            transparent: 'transparent',
            unset: 'unset',
            white:
              'rgb(from var(--color-white) r g b / <alpha-value>) /* #ffffff */',
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
        expect(colorDesignToken.cssVariables).toStrictEqual({
          '--pw-color-white': '#ffffff',
          '--pw-color-white-example': '#ffffff',
        });
      });

      test('css', () => {
        colorDesignToken.addColor('white', '#ffffff');
        expect(colorDesignToken.css()).toStrictEqual([
          '--pw-color-white: #ffffff;',
        ]);
      });

      test('tailwind config', () => {
        colorDesignToken.addColor('white', '#ffffff');
        expect(colorDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            colors: {
              current: 'currentColor',
              inherit: 'inherit',
              initial: 'initial',
              transparent: 'transparent',
              unset: 'unset',
              white:
                'rgb(from var(--pw-color-white) r g b / <alpha-value>) /* #ffffff */',
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
      expect(colorDesignToken.cssVariables).toStrictEqual({
        '--color-white': '#ffffff',
        '--color-background': 'var(--color-white)',
      });
    });

    test('css', () => {
      colorDesignToken.addColor('white', '#ffffff');
      colorDesignToken.addColor('background', '{color.white}');
      expect(colorDesignToken.css()).toStrictEqual([
        '--color-white: #ffffff;',
        '--color-background: var(--color-white);',
      ]);
    });

    test('tailwind config', () => {
      colorDesignToken.addColor('white', '#ffffff');
      colorDesignToken.addColor('background', '{color.white}');
      colorDesignToken.addColor('button', '{color.background}');
      expect(colorDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          colors: {
            current: 'currentColor',
            inherit: 'inherit',
            initial: 'initial',
            transparent: 'transparent',
            unset: 'unset',
            white:
              'rgb(from var(--color-white) r g b / <alpha-value>) /* #ffffff */',
            background:
              'rgb(from var(--color-background) r g b / <alpha-value>) /* #ffffff */',
            button:
              'rgb(from var(--color-button) r g b / <alpha-value>) /* #ffffff */',
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
        expect(colorDesignToken.cssVariables).toStrictEqual({
          '--pw-color-white': '#ffffff',
          '--pw-color-background': 'var(--pw-color-white)',
        });
      });

      test('css', () => {
        colorDesignToken.addColor('white', '#ffffff');
        colorDesignToken.addColor('background', '{color.white}');
        expect(colorDesignToken.css()).toStrictEqual([
          '--pw-color-white: #ffffff;',
          '--pw-color-background: var(--pw-color-white);',
        ]);
      });

      test('tailwind config', () => {
        colorDesignToken.addColor('white', '#ffffff');
        colorDesignToken.addColor('background', '{color.white}');
        colorDesignToken.addColor('button', '{color.background}');
        expect(colorDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            colors: {
              current: 'currentColor',
              inherit: 'inherit',
              initial: 'initial',
              transparent: 'transparent',
              unset: 'unset',
              white:
                'rgb(from var(--pw-color-white) r g b / <alpha-value>) /* #ffffff */',
              background:
                'rgb(from var(--pw-color-background) r g b / <alpha-value>) /* #ffffff */',
              button:
                'rgb(from var(--pw-color-button) r g b / <alpha-value>) /* #ffffff */',
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
      expect(colorDesignToken.cssVariables).toStrictEqual({
        '--color-green-100': '#ebfae9',
        '--color-green-150': '#d6f5d3',
        '--color-green-200': '#c1efbd',
        '--color-green-250': '#ace9a6',
        '--color-green-300': '#95e38f',
        '--color-green-350': '#7ddd77',
        '--color-green-400': '#62d65d',
        '--color-green-450': '#41d03e',
        '--color-green-50': '#ffffff',
        '--color-green-500': '#29cc29',
        '--color-green-550': '#18af1a',
        '--color-green-600': '#039209',
        '--color-green-650': '#007700',
        '--color-green-700': '#005d00',
        '--color-green-750': '#004300',
        '--color-green-800': '#002c00',
        '--color-green-850': '#001600',
        '--color-green-900': '#000400',
        '--color-green-950': '#000000',
        '--color-neutral-100': '#e3e3e4',
        '--color-neutral-150': '#c7c8ca',
        '--color-neutral-200': '#adaeb1',
        '--color-neutral-250': '#929498',
        '--color-neutral-300': '#797b80',
        '--color-neutral-350': '#616369',
        '--color-neutral-400': '#4a4c53',
        '--color-neutral-450': '#34363d',
        '--color-neutral-50': '#ffffff',
        '--color-neutral-500': '#292b33',
        '--color-neutral-550': '#21232a',
        '--color-neutral-600': '#1a1c22',
        '--color-neutral-650': '#13141a',
        '--color-neutral-700': '#0c0d12',
        '--color-neutral-750': '#06070a',
        '--color-neutral-800': '#030304',
        '--color-neutral-850': '#010101',
        '--color-neutral-900': '#000000',
        '--color-neutral-950': '#000000',
      });
    });

    test('css', () => {
      colorDesignToken.generateColor('neutral', '#292B33');
      colorDesignToken.generateColor('green', '#29CC29');
      expect(colorDesignToken.css()).toStrictEqual([
        '--color-neutral-50: #ffffff;',
        '--color-neutral-100: #e3e3e4;',
        '--color-neutral-150: #c7c8ca;',
        '--color-neutral-200: #adaeb1;',
        '--color-neutral-250: #929498;',
        '--color-neutral-300: #797b80;',
        '--color-neutral-350: #616369;',
        '--color-neutral-400: #4a4c53;',
        '--color-neutral-450: #34363d;',
        '--color-neutral-500: #292b33;',
        '--color-neutral-550: #21232a;',
        '--color-neutral-600: #1a1c22;',
        '--color-neutral-650: #13141a;',
        '--color-neutral-700: #0c0d12;',
        '--color-neutral-750: #06070a;',
        '--color-neutral-800: #030304;',
        '--color-neutral-850: #010101;',
        '--color-neutral-900: #000000;',
        '--color-neutral-950: #000000;',
        '--color-green-50: #ffffff;',
        '--color-green-100: #ebfae9;',
        '--color-green-150: #d6f5d3;',
        '--color-green-200: #c1efbd;',
        '--color-green-250: #ace9a6;',
        '--color-green-300: #95e38f;',
        '--color-green-350: #7ddd77;',
        '--color-green-400: #62d65d;',
        '--color-green-450: #41d03e;',
        '--color-green-500: #29cc29;',
        '--color-green-550: #18af1a;',
        '--color-green-600: #039209;',
        '--color-green-650: #007700;',
        '--color-green-700: #005d00;',
        '--color-green-750: #004300;',
        '--color-green-800: #002c00;',
        '--color-green-850: #001600;',
        '--color-green-900: #000400;',
        '--color-green-950: #000000;',
      ]);
    });

    test('tailwind config', () => {
      colorDesignToken.generateColor('neutral', '#292B33');
      colorDesignToken.generateColor('green', '#29CC29');
      expect(colorDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          colors: {
            current: 'currentColor',
            green: {
              '100':
                'rgb(from var(--color-green-100) r g b / <alpha-value>) /* #ebfae9 */',
              '150':
                'rgb(from var(--color-green-150) r g b / <alpha-value>) /* #d6f5d3 */',
              '200':
                'rgb(from var(--color-green-200) r g b / <alpha-value>) /* #c1efbd */',
              '250':
                'rgb(from var(--color-green-250) r g b / <alpha-value>) /* #ace9a6 */',
              '300':
                'rgb(from var(--color-green-300) r g b / <alpha-value>) /* #95e38f */',
              '350':
                'rgb(from var(--color-green-350) r g b / <alpha-value>) /* #7ddd77 */',
              '400':
                'rgb(from var(--color-green-400) r g b / <alpha-value>) /* #62d65d */',
              '450':
                'rgb(from var(--color-green-450) r g b / <alpha-value>) /* #41d03e */',
              '50': 'rgb(from var(--color-green-50) r g b / <alpha-value>) /* #ffffff */',
              '500':
                'rgb(from var(--color-green-500) r g b / <alpha-value>) /* #29cc29 */',
              '550':
                'rgb(from var(--color-green-550) r g b / <alpha-value>) /* #18af1a */',
              '600':
                'rgb(from var(--color-green-600) r g b / <alpha-value>) /* #039209 */',
              '650':
                'rgb(from var(--color-green-650) r g b / <alpha-value>) /* #007700 */',
              '700':
                'rgb(from var(--color-green-700) r g b / <alpha-value>) /* #005d00 */',
              '750':
                'rgb(from var(--color-green-750) r g b / <alpha-value>) /* #004300 */',
              '800':
                'rgb(from var(--color-green-800) r g b / <alpha-value>) /* #002c00 */',
              '850':
                'rgb(from var(--color-green-850) r g b / <alpha-value>) /* #001600 */',
              '900':
                'rgb(from var(--color-green-900) r g b / <alpha-value>) /* #000400 */',
              '950':
                'rgb(from var(--color-green-950) r g b / <alpha-value>) /* #000000 */',
            },
            inherit: 'inherit',
            initial: 'initial',
            neutral: {
              '100':
                'rgb(from var(--color-neutral-100) r g b / <alpha-value>) /* #e3e3e4 */',
              '150':
                'rgb(from var(--color-neutral-150) r g b / <alpha-value>) /* #c7c8ca */',
              '200':
                'rgb(from var(--color-neutral-200) r g b / <alpha-value>) /* #adaeb1 */',
              '250':
                'rgb(from var(--color-neutral-250) r g b / <alpha-value>) /* #929498 */',
              '300':
                'rgb(from var(--color-neutral-300) r g b / <alpha-value>) /* #797b80 */',
              '350':
                'rgb(from var(--color-neutral-350) r g b / <alpha-value>) /* #616369 */',
              '400':
                'rgb(from var(--color-neutral-400) r g b / <alpha-value>) /* #4a4c53 */',
              '450':
                'rgb(from var(--color-neutral-450) r g b / <alpha-value>) /* #34363d */',
              '50': 'rgb(from var(--color-neutral-50) r g b / <alpha-value>) /* #ffffff */',
              '500':
                'rgb(from var(--color-neutral-500) r g b / <alpha-value>) /* #292b33 */',
              '550':
                'rgb(from var(--color-neutral-550) r g b / <alpha-value>) /* #21232a */',
              '600':
                'rgb(from var(--color-neutral-600) r g b / <alpha-value>) /* #1a1c22 */',
              '650':
                'rgb(from var(--color-neutral-650) r g b / <alpha-value>) /* #13141a */',
              '700':
                'rgb(from var(--color-neutral-700) r g b / <alpha-value>) /* #0c0d12 */',
              '750':
                'rgb(from var(--color-neutral-750) r g b / <alpha-value>) /* #06070a */',
              '800':
                'rgb(from var(--color-neutral-800) r g b / <alpha-value>) /* #030304 */',
              '850':
                'rgb(from var(--color-neutral-850) r g b / <alpha-value>) /* #010101 */',
              '900':
                'rgb(from var(--color-neutral-900) r g b / <alpha-value>) /* #000000 */',
              '950':
                'rgb(from var(--color-neutral-950) r g b / <alpha-value>) /* #000000 */',
            },
            transparent: 'transparent',
            unset: 'unset',
          },
        },
      });
    });
  });
});
