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
            white: 'rgb(var(--color-white), <alpha-value>) /* #ffffff */',
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
              white: 'rgb(var(--pw-color-white), <alpha-value>) /* #ffffff */',
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
            white: 'rgb(var(--color-white), <alpha-value>) /* #ffffff */',
            background:
              'rgb(var(--color-background), <alpha-value>) /* #ffffff */',
            button: 'rgb(var(--color-button), <alpha-value>) /* #ffffff */',
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
              white: 'rgb(var(--pw-color-white), <alpha-value>) /* #ffffff */',
              background:
                'rgb(var(--pw-color-background), <alpha-value>) /* #ffffff */',
              button:
                'rgb(var(--pw-color-button), <alpha-value>) /* #ffffff */',
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
              '100': 'rgb(var(--color-green-100), <alpha-value>) /* #E6FFE6 */',
              '1000':
                'rgb(var(--color-green-1000), <alpha-value>) /* #001A00 */',
              '150': 'rgb(var(--color-green-150), <alpha-value>) /* #CDF9CD */',
              '200': 'rgb(var(--color-green-200), <alpha-value>) /* #B5F4B5 */',
              '250': 'rgb(var(--color-green-250), <alpha-value>) /* #9FEE9F */',
              '300': 'rgb(var(--color-green-300), <alpha-value>) /* #89E889 */',
              '350': 'rgb(var(--color-green-350), <alpha-value>) /* #74E374 */',
              '400': 'rgb(var(--color-green-400), <alpha-value>) /* #60DD60 */',
              '450': 'rgb(var(--color-green-450), <alpha-value>) /* #4DD74D */',
              '500': 'rgb(var(--color-green-500), <alpha-value>) /* #3AD23A */',
              '550': 'rgb(var(--color-green-550), <alpha-value>) /* #29CC29 */',
              '600': 'rgb(var(--color-green-600), <alpha-value>) /* #21B821 */',
              '650': 'rgb(var(--color-green-650), <alpha-value>) /* #1AA41A */',
              '700': 'rgb(var(--color-green-700), <alpha-value>) /* #139113 */',
              '750': 'rgb(var(--color-green-750), <alpha-value>) /* #0E7D0E */',
              '800': 'rgb(var(--color-green-800), <alpha-value>) /* #096909 */',
              '850': 'rgb(var(--color-green-850), <alpha-value>) /* #065506 */',
              '900': 'rgb(var(--color-green-900), <alpha-value>) /* #034103 */',
              '950': 'rgb(var(--color-green-950), <alpha-value>) /* #012D01 */',
            },
            inherit: 'inherit',
            initial: 'initial',
            neutral: {
              '100':
                'rgb(var(--color-neutral-100), <alpha-value>) /* #F5F6FA */',
              '1000':
                'rgb(var(--color-neutral-1000), <alpha-value>) /* #000105 */',
              '150':
                'rgb(var(--color-neutral-150), <alpha-value>) /* #DBDDE4 */',
              '200':
                'rgb(var(--color-neutral-200), <alpha-value>) /* #C1C4CE */',
              '250':
                'rgb(var(--color-neutral-250), <alpha-value>) /* #A9ACB8 */',
              '300':
                'rgb(var(--color-neutral-300), <alpha-value>) /* #9195A2 */',
              '350':
                'rgb(var(--color-neutral-350), <alpha-value>) /* #7B7E8B */',
              '400':
                'rgb(var(--color-neutral-400), <alpha-value>) /* #656875 */',
              '450':
                'rgb(var(--color-neutral-450), <alpha-value>) /* #50535F */',
              '500':
                'rgb(var(--color-neutral-500), <alpha-value>) /* #3C3F49 */',
              '550':
                'rgb(var(--color-neutral-550), <alpha-value>) /* #292B33 */',
              '600':
                'rgb(var(--color-neutral-600), <alpha-value>) /* #21232E */',
              '650':
                'rgb(var(--color-neutral-650), <alpha-value>) /* #1A1D29 */',
              '700':
                'rgb(var(--color-neutral-700), <alpha-value>) /* #131724 */',
              '750':
                'rgb(var(--color-neutral-750), <alpha-value>) /* #0E111F */',
              '800':
                'rgb(var(--color-neutral-800), <alpha-value>) /* #090D1A */',
              '850':
                'rgb(var(--color-neutral-850), <alpha-value>) /* #060914 */',
              '900':
                'rgb(var(--color-neutral-900), <alpha-value>) /* #03050F */',
              '950':
                'rgb(var(--color-neutral-950), <alpha-value>) /* #01030A */',
            },
            transparent: 'transparent',
            unset: 'unset',
          },
        },
      });
    });
  });
});
