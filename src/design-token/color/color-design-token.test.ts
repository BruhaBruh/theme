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
            white: 'var(--color-white) /* #ffffff */',
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
              white: 'var(--pw-color-white) /* #ffffff */',
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
            white: 'var(--color-white) /* #ffffff */',
            background: 'var(--color-background) /* #ffffff */',
            button: 'var(--color-button) /* #ffffff */',
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
              white: 'var(--pw-color-white) /* #ffffff */',
              background: 'var(--pw-color-background) /* #ffffff */',
              button: 'var(--pw-color-button) /* #ffffff */',
            },
          },
        });
      });
    });
  });

  describe('generate color', () => {
    test('css variables', () => {
      colorDesignToken.generateColor('neutral', '#292B33', { type: 'neutral' });
      colorDesignToken.generateColor('green', '#29CC29');
      expect(colorDesignToken.cssVariables).toStrictEqual({
        '--color-green-100': '#E6FFE6',
        '--color-green-1000': '#001A00',
        '--color-green-150': '#CDF9CD',
        '--color-green-200': '#B5F4B5',
        '--color-green-250': '#9FEE9F',
        '--color-green-300': '#89E889',
        '--color-green-350': '#74E374',
        '--color-green-400': '#60DD60',
        '--color-green-450': '#4DD74D',
        '--color-green-500': '#3AD23A',
        '--color-green-550': '#29CC29',
        '--color-green-600': '#21B821',
        '--color-green-650': '#1AA41A',
        '--color-green-700': '#139113',
        '--color-green-750': '#0E7D0E',
        '--color-green-800': '#096909',
        '--color-green-850': '#065506',
        '--color-green-900': '#034103',
        '--color-green-950': '#012D01',
        '--color-neutral-100': '#F5F6FA',
        '--color-neutral-1000': '#000105',
        '--color-neutral-150': '#DBDDE4',
        '--color-neutral-200': '#C1C4CE',
        '--color-neutral-250': '#A9ACB8',
        '--color-neutral-300': '#9195A2',
        '--color-neutral-350': '#7B7E8B',
        '--color-neutral-400': '#656875',
        '--color-neutral-450': '#50535F',
        '--color-neutral-500': '#3C3F49',
        '--color-neutral-550': '#292B33',
        '--color-neutral-600': '#21232E',
        '--color-neutral-650': '#1A1D29',
        '--color-neutral-700': '#131724',
        '--color-neutral-750': '#0E111F',
        '--color-neutral-800': '#090D1A',
        '--color-neutral-850': '#060914',
        '--color-neutral-900': '#03050F',
        '--color-neutral-950': '#01030A',
      });
    });

    test('css', () => {
      colorDesignToken.generateColor('neutral', '#292B33', { type: 'neutral' });
      colorDesignToken.generateColor('green', '#29CC29');
      expect(colorDesignToken.css()).toStrictEqual([
        '--color-neutral-100: #F5F6FA;',
        '--color-neutral-150: #DBDDE4;',
        '--color-neutral-200: #C1C4CE;',
        '--color-neutral-250: #A9ACB8;',
        '--color-neutral-300: #9195A2;',
        '--color-neutral-350: #7B7E8B;',
        '--color-neutral-400: #656875;',
        '--color-neutral-450: #50535F;',
        '--color-neutral-500: #3C3F49;',
        '--color-neutral-550: #292B33;',
        '--color-neutral-600: #21232E;',
        '--color-neutral-650: #1A1D29;',
        '--color-neutral-700: #131724;',
        '--color-neutral-750: #0E111F;',
        '--color-neutral-800: #090D1A;',
        '--color-neutral-850: #060914;',
        '--color-neutral-900: #03050F;',
        '--color-neutral-950: #01030A;',
        '--color-neutral-1000: #000105;',
        '--color-green-100: #E6FFE6;',
        '--color-green-150: #CDF9CD;',
        '--color-green-200: #B5F4B5;',
        '--color-green-250: #9FEE9F;',
        '--color-green-300: #89E889;',
        '--color-green-350: #74E374;',
        '--color-green-400: #60DD60;',
        '--color-green-450: #4DD74D;',
        '--color-green-500: #3AD23A;',
        '--color-green-550: #29CC29;',
        '--color-green-600: #21B821;',
        '--color-green-650: #1AA41A;',
        '--color-green-700: #139113;',
        '--color-green-750: #0E7D0E;',
        '--color-green-800: #096909;',
        '--color-green-850: #065506;',
        '--color-green-900: #034103;',
        '--color-green-950: #012D01;',
        '--color-green-1000: #001A00;',
      ]);
    });

    test('tailwind config', () => {
      colorDesignToken.generateColor('neutral', '#292B33', { type: 'neutral' });
      colorDesignToken.generateColor('green', '#29CC29');
      expect(colorDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          colors: {
            current: 'currentColor',
            green: {
              '100': 'var(--color-green-100) /* #E6FFE6 */',
              '1000': 'var(--color-green-1000) /* #001A00 */',
              '150': 'var(--color-green-150) /* #CDF9CD */',
              '200': 'var(--color-green-200) /* #B5F4B5 */',
              '250': 'var(--color-green-250) /* #9FEE9F */',
              '300': 'var(--color-green-300) /* #89E889 */',
              '350': 'var(--color-green-350) /* #74E374 */',
              '400': 'var(--color-green-400) /* #60DD60 */',
              '450': 'var(--color-green-450) /* #4DD74D */',
              '500': 'var(--color-green-500) /* #3AD23A */',
              '550': 'var(--color-green-550) /* #29CC29 */',
              '600': 'var(--color-green-600) /* #21B821 */',
              '650': 'var(--color-green-650) /* #1AA41A */',
              '700': 'var(--color-green-700) /* #139113 */',
              '750': 'var(--color-green-750) /* #0E7D0E */',
              '800': 'var(--color-green-800) /* #096909 */',
              '850': 'var(--color-green-850) /* #065506 */',
              '900': 'var(--color-green-900) /* #034103 */',
              '950': 'var(--color-green-950) /* #012D01 */',
            },
            inherit: 'inherit',
            initial: 'initial',
            neutral: {
              '100': 'var(--color-neutral-100) /* #F5F6FA */',
              '1000': 'var(--color-neutral-1000) /* #000105 */',
              '150': 'var(--color-neutral-150) /* #DBDDE4 */',
              '200': 'var(--color-neutral-200) /* #C1C4CE */',
              '250': 'var(--color-neutral-250) /* #A9ACB8 */',
              '300': 'var(--color-neutral-300) /* #9195A2 */',
              '350': 'var(--color-neutral-350) /* #7B7E8B */',
              '400': 'var(--color-neutral-400) /* #656875 */',
              '450': 'var(--color-neutral-450) /* #50535F */',
              '500': 'var(--color-neutral-500) /* #3C3F49 */',
              '550': 'var(--color-neutral-550) /* #292B33 */',
              '600': 'var(--color-neutral-600) /* #21232E */',
              '650': 'var(--color-neutral-650) /* #1A1D29 */',
              '700': 'var(--color-neutral-700) /* #131724 */',
              '750': 'var(--color-neutral-750) /* #0E111F */',
              '800': 'var(--color-neutral-800) /* #090D1A */',
              '850': 'var(--color-neutral-850) /* #060914 */',
              '900': 'var(--color-neutral-900) /* #03050F */',
              '950': 'var(--color-neutral-950) /* #01030A */',
            },
            transparent: 'transparent',
            unset: 'unset',
          },
        },
      });
    });
  });
});
