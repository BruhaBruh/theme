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
      colorDesignToken.generateColor('white', '#ffffff');
      colorDesignToken.generateColor('black', '#000000');
      colorDesignToken.generateColor('green', '#34ff63', {
        baseLightColor: '{color.white.1000}',
        baseDarkColor: '#000000',
      });
      expect(colorDesignToken.cssVariables).toStrictEqual({
        '--color-black-100': 'hsl(0 0% 0% / 0.04)',
        '--color-black-100-sl': 'hsl(0 0% 95.69% / 1)',
        '--color-black-1000': 'hsl(0 0% 0% / 1)',
        '--color-black-1000-sl': 'hsl(0 0% 0% / 1)',
        '--color-black-150': 'hsl(0 0% 0% / 0.06)',
        '--color-black-150-sl': 'hsl(0 0% 93.33% / 1)',
        '--color-black-200': 'hsl(0 0% 0% / 0.09)',
        '--color-black-200-sl': 'hsl(0 0% 90.59% / 1)',
        '--color-black-250': 'hsl(0 0% 0% / 0.12)',
        '--color-black-250-sl': 'hsl(0 0% 87.45% / 1)',
        '--color-black-300': 'hsl(0 0% 0% / 0.16)',
        '--color-black-300-sl': 'hsl(0 0% 83.92% / 1)',
        '--color-black-350': 'hsl(0 0% 0% / 0.2)',
        '--color-black-350-sl': 'hsl(0 0% 80% / 1)',
        '--color-black-400': 'hsl(0 0% 0% / 0.25)',
        '--color-black-400-sl': 'hsl(0 0% 75.29% / 1)',
        '--color-black-450': 'hsl(0 0% 0% / 0.3)',
        '--color-black-450-sl': 'hsl(0 0% 70.59% / 1)',
        '--color-black-50': 'hsl(0 0% 0% / 0.02)',
        '--color-black-50-sl': 'hsl(0 0% 97.65% / 1)',
        '--color-black-500': 'hsl(0 0% 0% / 0.35)',
        '--color-black-500-sl': 'hsl(0 0% 65.1% / 1)',
        '--color-black-550': 'hsl(0 0% 0% / 0.4)',
        '--color-black-550-sl': 'hsl(0 0% 59.61% / 1)',
        '--color-black-600': 'hsl(0 0% 0% / 0.46)',
        '--color-black-600-sl': 'hsl(0 0% 53.73% / 1)',
        '--color-black-650': 'hsl(0 0% 0% / 0.52)',
        '--color-black-650-sl': 'hsl(0 0% 47.84% / 1)',
        '--color-black-700': 'hsl(0 0% 0% / 0.59)',
        '--color-black-700-sl': 'hsl(0 0% 41.57% / 1)',
        '--color-black-750': 'hsl(0 0% 0% / 0.65)',
        '--color-black-750-sl': 'hsl(0 0% 34.9% / 1)',
        '--color-black-800': 'hsl(0 0% 0% / 0.72)',
        '--color-black-800-sl': 'hsl(0 0% 28.24% / 1)',
        '--color-black-850': 'hsl(0 0% 0% / 0.79)',
        '--color-black-850-sl': 'hsl(0 0% 21.18% / 1)',
        '--color-black-900': 'hsl(0 0% 0% / 0.86)',
        '--color-black-900-sl': 'hsl(0 0% 14.12% / 1)',
        '--color-black-950': 'hsl(0 0% 0% / 0.93)',
        '--color-black-950-sl': 'hsl(0 0% 7.06% / 1)',
        '--color-green-100': 'hsl(133.89 100% 60.2% / 0.05)',
        '--color-green-100-sd': 'hsl(132 62.5% 3.14% / 1)',
        '--color-green-100-sl': 'hsl(132 100% 98.04% / 1)',
        '--color-green-1000': 'hsl(140.22 100% 34.9% / 1)',
        '--color-green-1000-sd': 'hsl(140.22 100% 34.9% / 1)',
        '--color-green-1000-sl': 'hsl(140.22 100% 34.9% / 1)',
        '--color-green-150': 'hsl(133.89 100% 60.2% / 0.1)',
        '--color-green-150-sd': 'hsl(134.29 67.74% 6.08% / 1)',
        '--color-green-150-sl': 'hsl(134.29 100% 95.88% / 1)',
        '--color-green-200': 'hsl(133.89 100% 60.2% / 0.17)',
        '--color-green-200-sd': 'hsl(134.12 65.38% 10.2% / 1)',
        '--color-green-200-sl': 'hsl(133.71 100% 93.14% / 1)',
        '--color-green-250': 'hsl(133.89 100% 60.2% / 0.25)',
        '--color-green-250-sd': 'hsl(134.12 66.23% 15.1% / 1)',
        '--color-green-250-sl': 'hsl(134.12 100% 90% / 1)',
        '--color-green-300': 'hsl(133.89 100% 60.2% / 0.34)',
        '--color-green-300-sd': 'hsl(133.91 65.71% 20.59% / 1)',
        '--color-green-300-sl': 'hsl(134.57 100% 86.27% / 1)',
        '--color-green-350': 'hsl(133.89 100% 60.2% / 0.44)',
        '--color-green-350-sd': 'hsl(134.16 65.93% 26.47% / 1)',
        '--color-green-350-sl': 'hsl(133.48 100% 82.55% / 1)',
        '--color-green-400': 'hsl(133.89 100% 60.2% / 0.54)',
        '--color-green-400-sd': 'hsl(133.64 66.27% 32.55% / 1)',
        '--color-green-400-sl': 'hsl(134.18 100% 78.43% / 1)',
        '--color-green-450': 'hsl(133.89 100% 60.2% / 0.64)',
        '--color-green-450-sd': 'hsl(133.85 66.33% 38.43% / 1)',
        '--color-green-450-sl': 'hsl(133.85 100% 74.51% / 1)',
        '--color-green-50': 'hsl(133.89 100% 60.2% / 0.02)',
        '--color-green-50-sd': 'hsl(140 60% 0.98% / 1)',
        '--color-green-50-sl': 'hsl(140 100% 99.41% / 1)',
        '--color-green-500': 'hsl(133.89 100% 60.2% / 0.73)',
        '--color-green-500-sd': 'hsl(133.78 66.07% 43.92% / 1)',
        '--color-green-500-sl': 'hsl(133.78 100% 70.98% / 1)',
        '--color-green-550': 'hsl(133.89 100% 60.2% / 0.81)',
        '--color-green-550-sd': 'hsl(134.1 66.4% 49.02% / 1)',
        '--color-green-550-sl': 'hsl(133.82 100% 67.65% / 1)',
        '--color-green-600': 'hsl(133.89 100% 60.2% / 0.89)',
        '--color-green-600-sd': 'hsl(134 75.63% 53.33% / 1)',
        '--color-green-600-sl': 'hsl(134 100% 64.71% / 1)',
        '--color-green-650': 'hsl(138 88.71% 51.37% / 1)',
        '--color-green-650-sd': 'hsl(138 88.71% 51.37% / 1)',
        '--color-green-650-sl': 'hsl(138 88.71% 51.37% / 1)',
        '--color-green-700': 'hsl(140.97 100% 44.31% / 1)',
        '--color-green-700-sd': 'hsl(140.97 100% 44.31% / 1)',
        '--color-green-700-sl': 'hsl(140.97 100% 44.31% / 1)',
        '--color-green-750': 'hsl(140.85 100% 41.76% / 1)',
        '--color-green-750-sd': 'hsl(140.85 100% 41.76% / 1)',
        '--color-green-750-sl': 'hsl(140.85 100% 41.76% / 1)',
        '--color-green-800': 'hsl(140.6 100% 39.41% / 1)',
        '--color-green-800-sd': 'hsl(140.6 100% 39.41% / 1)',
        '--color-green-800-sl': 'hsl(140.6 100% 39.41% / 1)',
        '--color-green-850': 'hsl(140.42 100% 37.45% / 1)',
        '--color-green-850-sd': 'hsl(140.42 100% 37.45% / 1)',
        '--color-green-850-sl': 'hsl(140.42 100% 37.45% / 1)',
        '--color-green-900': 'hsl(140.54 100% 36.08% / 1)',
        '--color-green-900-sd': 'hsl(140.54 100% 36.08% / 1)',
        '--color-green-900-sl': 'hsl(140.54 100% 36.08% / 1)',
        '--color-green-950': 'hsl(140.33 100% 35.29% / 1)',
        '--color-green-950-sd': 'hsl(140.33 100% 35.29% / 1)',
        '--color-green-950-sl': 'hsl(140.33 100% 35.29% / 1)',
        '--color-white-100': 'hsl(0 0% 100% / 0.06)',
        '--color-white-100-sd': 'hsl(0 0% 5.49% / 1)',
        '--color-white-1000': 'hsl(0 0% 100% / 1)',
        '--color-white-1000-sd': 'hsl(0 0% 100% / 1)',
        '--color-white-150': 'hsl(0 0% 100% / 0.08)',
        '--color-white-150-sd': 'hsl(0 0% 8.24% / 1)',
        '--color-white-200': 'hsl(0 0% 100% / 0.11)',
        '--color-white-200-sd': 'hsl(0 0% 10.98% / 1)',
        '--color-white-250': 'hsl(0 0% 100% / 0.14)',
        '--color-white-250-sd': 'hsl(0 0% 14.12% / 1)',
        '--color-white-300': 'hsl(0 0% 100% / 0.18)',
        '--color-white-300-sd': 'hsl(0 0% 18.04% / 1)',
        '--color-white-350': 'hsl(0 0% 100% / 0.22)',
        '--color-white-350-sd': 'hsl(0 0% 22.35% / 1)',
        '--color-white-400': 'hsl(0 0% 100% / 0.27)',
        '--color-white-400-sd': 'hsl(0 0% 26.67% / 1)',
        '--color-white-450': 'hsl(0 0% 100% / 0.31)',
        '--color-white-450-sd': 'hsl(0 0% 31.37% / 1)',
        '--color-white-50': 'hsl(0 0% 100% / 0.04)',
        '--color-white-50-sd': 'hsl(0 0% 3.53% / 1)',
        '--color-white-500': 'hsl(0 0% 100% / 0.37)',
        '--color-white-500-sd': 'hsl(0 0% 36.47% / 1)',
        '--color-white-550': 'hsl(0 0% 100% / 0.42)',
        '--color-white-550-sd': 'hsl(0 0% 41.96% / 1)',
        '--color-white-600': 'hsl(0 0% 100% / 0.48)',
        '--color-white-600-sd': 'hsl(0 0% 47.84% / 1)',
        '--color-white-650': 'hsl(0 0% 100% / 0.54)',
        '--color-white-650-sd': 'hsl(0 0% 53.73% / 1)',
        '--color-white-700': 'hsl(0 0% 100% / 0.6)',
        '--color-white-700-sd': 'hsl(0 0% 60% / 1)',
        '--color-white-750': 'hsl(0 0% 100% / 0.66)',
        '--color-white-750-sd': 'hsl(0 0% 66.27% / 1)',
        '--color-white-800': 'hsl(0 0% 100% / 0.73)',
        '--color-white-800-sd': 'hsl(0 0% 72.94% / 1)',
        '--color-white-850': 'hsl(0 0% 100% / 0.8)',
        '--color-white-850-sd': 'hsl(0 0% 79.61% / 1)',
        '--color-white-900': 'hsl(0 0% 100% / 0.86)',
        '--color-white-900-sd': 'hsl(0 0% 86.27% / 1)',
        '--color-white-950': 'hsl(0 0% 100% / 0.93)',
        '--color-white-950-sd': 'hsl(0 0% 93.33% / 1)',
      });
    });

    test('css', () => {
      colorDesignToken.generateColor('white', '#ffffff');
      colorDesignToken.generateColor('black', '#000000');
      colorDesignToken.generateColor('green', '#34ff63', {
        baseLightColor: '{color.white.1000}',
        baseDarkColor: '#000000',
      });
      expect(colorDesignToken.css()).toStrictEqual([
        '--color-white-50: hsl(0 0% 100% / 0.04);',
        '--color-white-100: hsl(0 0% 100% / 0.06);',
        '--color-white-150: hsl(0 0% 100% / 0.08);',
        '--color-white-200: hsl(0 0% 100% / 0.11);',
        '--color-white-250: hsl(0 0% 100% / 0.14);',
        '--color-white-300: hsl(0 0% 100% / 0.18);',
        '--color-white-350: hsl(0 0% 100% / 0.22);',
        '--color-white-400: hsl(0 0% 100% / 0.27);',
        '--color-white-450: hsl(0 0% 100% / 0.31);',
        '--color-white-500: hsl(0 0% 100% / 0.37);',
        '--color-white-550: hsl(0 0% 100% / 0.42);',
        '--color-white-600: hsl(0 0% 100% / 0.48);',
        '--color-white-650: hsl(0 0% 100% / 0.54);',
        '--color-white-700: hsl(0 0% 100% / 0.6);',
        '--color-white-750: hsl(0 0% 100% / 0.66);',
        '--color-white-800: hsl(0 0% 100% / 0.73);',
        '--color-white-850: hsl(0 0% 100% / 0.8);',
        '--color-white-900: hsl(0 0% 100% / 0.86);',
        '--color-white-950: hsl(0 0% 100% / 0.93);',
        '--color-white-1000: hsl(0 0% 100% / 1);',
        '--color-white-50-sd: hsl(0 0% 3.53% / 1);',
        '--color-white-100-sd: hsl(0 0% 5.49% / 1);',
        '--color-white-150-sd: hsl(0 0% 8.24% / 1);',
        '--color-white-200-sd: hsl(0 0% 10.98% / 1);',
        '--color-white-250-sd: hsl(0 0% 14.12% / 1);',
        '--color-white-300-sd: hsl(0 0% 18.04% / 1);',
        '--color-white-350-sd: hsl(0 0% 22.35% / 1);',
        '--color-white-400-sd: hsl(0 0% 26.67% / 1);',
        '--color-white-450-sd: hsl(0 0% 31.37% / 1);',
        '--color-white-500-sd: hsl(0 0% 36.47% / 1);',
        '--color-white-550-sd: hsl(0 0% 41.96% / 1);',
        '--color-white-600-sd: hsl(0 0% 47.84% / 1);',
        '--color-white-650-sd: hsl(0 0% 53.73% / 1);',
        '--color-white-700-sd: hsl(0 0% 60% / 1);',
        '--color-white-750-sd: hsl(0 0% 66.27% / 1);',
        '--color-white-800-sd: hsl(0 0% 72.94% / 1);',
        '--color-white-850-sd: hsl(0 0% 79.61% / 1);',
        '--color-white-900-sd: hsl(0 0% 86.27% / 1);',
        '--color-white-950-sd: hsl(0 0% 93.33% / 1);',
        '--color-white-1000-sd: hsl(0 0% 100% / 1);',
        '--color-black-50: hsl(0 0% 0% / 0.02);',
        '--color-black-100: hsl(0 0% 0% / 0.04);',
        '--color-black-150: hsl(0 0% 0% / 0.06);',
        '--color-black-200: hsl(0 0% 0% / 0.09);',
        '--color-black-250: hsl(0 0% 0% / 0.12);',
        '--color-black-300: hsl(0 0% 0% / 0.16);',
        '--color-black-350: hsl(0 0% 0% / 0.2);',
        '--color-black-400: hsl(0 0% 0% / 0.25);',
        '--color-black-450: hsl(0 0% 0% / 0.3);',
        '--color-black-500: hsl(0 0% 0% / 0.35);',
        '--color-black-550: hsl(0 0% 0% / 0.4);',
        '--color-black-600: hsl(0 0% 0% / 0.46);',
        '--color-black-650: hsl(0 0% 0% / 0.52);',
        '--color-black-700: hsl(0 0% 0% / 0.59);',
        '--color-black-750: hsl(0 0% 0% / 0.65);',
        '--color-black-800: hsl(0 0% 0% / 0.72);',
        '--color-black-850: hsl(0 0% 0% / 0.79);',
        '--color-black-900: hsl(0 0% 0% / 0.86);',
        '--color-black-950: hsl(0 0% 0% / 0.93);',
        '--color-black-1000: hsl(0 0% 0% / 1);',
        '--color-black-50-sl: hsl(0 0% 97.65% / 1);',
        '--color-black-100-sl: hsl(0 0% 95.69% / 1);',
        '--color-black-150-sl: hsl(0 0% 93.33% / 1);',
        '--color-black-200-sl: hsl(0 0% 90.59% / 1);',
        '--color-black-250-sl: hsl(0 0% 87.45% / 1);',
        '--color-black-300-sl: hsl(0 0% 83.92% / 1);',
        '--color-black-350-sl: hsl(0 0% 80% / 1);',
        '--color-black-400-sl: hsl(0 0% 75.29% / 1);',
        '--color-black-450-sl: hsl(0 0% 70.59% / 1);',
        '--color-black-500-sl: hsl(0 0% 65.1% / 1);',
        '--color-black-550-sl: hsl(0 0% 59.61% / 1);',
        '--color-black-600-sl: hsl(0 0% 53.73% / 1);',
        '--color-black-650-sl: hsl(0 0% 47.84% / 1);',
        '--color-black-700-sl: hsl(0 0% 41.57% / 1);',
        '--color-black-750-sl: hsl(0 0% 34.9% / 1);',
        '--color-black-800-sl: hsl(0 0% 28.24% / 1);',
        '--color-black-850-sl: hsl(0 0% 21.18% / 1);',
        '--color-black-900-sl: hsl(0 0% 14.12% / 1);',
        '--color-black-950-sl: hsl(0 0% 7.06% / 1);',
        '--color-black-1000-sl: hsl(0 0% 0% / 1);',
        '--color-green-50: hsl(133.89 100% 60.2% / 0.02);',
        '--color-green-100: hsl(133.89 100% 60.2% / 0.05);',
        '--color-green-150: hsl(133.89 100% 60.2% / 0.1);',
        '--color-green-200: hsl(133.89 100% 60.2% / 0.17);',
        '--color-green-250: hsl(133.89 100% 60.2% / 0.25);',
        '--color-green-300: hsl(133.89 100% 60.2% / 0.34);',
        '--color-green-350: hsl(133.89 100% 60.2% / 0.44);',
        '--color-green-400: hsl(133.89 100% 60.2% / 0.54);',
        '--color-green-450: hsl(133.89 100% 60.2% / 0.64);',
        '--color-green-500: hsl(133.89 100% 60.2% / 0.73);',
        '--color-green-550: hsl(133.89 100% 60.2% / 0.81);',
        '--color-green-600: hsl(133.89 100% 60.2% / 0.89);',
        '--color-green-650: hsl(138 88.71% 51.37% / 1);',
        '--color-green-700: hsl(140.97 100% 44.31% / 1);',
        '--color-green-750: hsl(140.85 100% 41.76% / 1);',
        '--color-green-800: hsl(140.6 100% 39.41% / 1);',
        '--color-green-850: hsl(140.42 100% 37.45% / 1);',
        '--color-green-900: hsl(140.54 100% 36.08% / 1);',
        '--color-green-950: hsl(140.33 100% 35.29% / 1);',
        '--color-green-1000: hsl(140.22 100% 34.9% / 1);',
        '--color-green-50-sd: hsl(140 60% 0.98% / 1);',
        '--color-green-50-sl: hsl(140 100% 99.41% / 1);',
        '--color-green-100-sd: hsl(132 62.5% 3.14% / 1);',
        '--color-green-100-sl: hsl(132 100% 98.04% / 1);',
        '--color-green-150-sd: hsl(134.29 67.74% 6.08% / 1);',
        '--color-green-150-sl: hsl(134.29 100% 95.88% / 1);',
        '--color-green-200-sd: hsl(134.12 65.38% 10.2% / 1);',
        '--color-green-200-sl: hsl(133.71 100% 93.14% / 1);',
        '--color-green-250-sd: hsl(134.12 66.23% 15.1% / 1);',
        '--color-green-250-sl: hsl(134.12 100% 90% / 1);',
        '--color-green-300-sd: hsl(133.91 65.71% 20.59% / 1);',
        '--color-green-300-sl: hsl(134.57 100% 86.27% / 1);',
        '--color-green-350-sd: hsl(134.16 65.93% 26.47% / 1);',
        '--color-green-350-sl: hsl(133.48 100% 82.55% / 1);',
        '--color-green-400-sd: hsl(133.64 66.27% 32.55% / 1);',
        '--color-green-400-sl: hsl(134.18 100% 78.43% / 1);',
        '--color-green-450-sd: hsl(133.85 66.33% 38.43% / 1);',
        '--color-green-450-sl: hsl(133.85 100% 74.51% / 1);',
        '--color-green-500-sd: hsl(133.78 66.07% 43.92% / 1);',
        '--color-green-500-sl: hsl(133.78 100% 70.98% / 1);',
        '--color-green-550-sd: hsl(134.1 66.4% 49.02% / 1);',
        '--color-green-550-sl: hsl(133.82 100% 67.65% / 1);',
        '--color-green-600-sd: hsl(134 75.63% 53.33% / 1);',
        '--color-green-600-sl: hsl(134 100% 64.71% / 1);',
        '--color-green-650-sd: hsl(138 88.71% 51.37% / 1);',
        '--color-green-650-sl: hsl(138 88.71% 51.37% / 1);',
        '--color-green-700-sd: hsl(140.97 100% 44.31% / 1);',
        '--color-green-700-sl: hsl(140.97 100% 44.31% / 1);',
        '--color-green-750-sd: hsl(140.85 100% 41.76% / 1);',
        '--color-green-750-sl: hsl(140.85 100% 41.76% / 1);',
        '--color-green-800-sd: hsl(140.6 100% 39.41% / 1);',
        '--color-green-800-sl: hsl(140.6 100% 39.41% / 1);',
        '--color-green-850-sd: hsl(140.42 100% 37.45% / 1);',
        '--color-green-850-sl: hsl(140.42 100% 37.45% / 1);',
        '--color-green-900-sd: hsl(140.54 100% 36.08% / 1);',
        '--color-green-900-sl: hsl(140.54 100% 36.08% / 1);',
        '--color-green-950-sd: hsl(140.33 100% 35.29% / 1);',
        '--color-green-950-sl: hsl(140.33 100% 35.29% / 1);',
        '--color-green-1000-sd: hsl(140.22 100% 34.9% / 1);',
        '--color-green-1000-sl: hsl(140.22 100% 34.9% / 1);',
      ]);
    });

    test('tailwind config', () => {
      colorDesignToken.generateColor('white', '#ffffff');
      colorDesignToken.generateColor('black', '#000000');
      colorDesignToken.generateColor('green', '#34ff63', {
        baseLightColor: '{color.white.1000}',
        baseDarkColor: '#000000',
      });
      expect(colorDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          colors: {
            'black-100': 'var(--color-black-100) /* hsl(0 0% 0% / 0.04) */',
            'black-100-sl':
              'var(--color-black-100-sl) /* hsl(0 0% 95.69% / 1) */',
            'black-1000': 'var(--color-black-1000) /* hsl(0 0% 0% / 1) */',
            'black-1000-sl':
              'var(--color-black-1000-sl) /* hsl(0 0% 0% / 1) */',
            'black-150': 'var(--color-black-150) /* hsl(0 0% 0% / 0.06) */',
            'black-150-sl':
              'var(--color-black-150-sl) /* hsl(0 0% 93.33% / 1) */',
            'black-200': 'var(--color-black-200) /* hsl(0 0% 0% / 0.09) */',
            'black-200-sl':
              'var(--color-black-200-sl) /* hsl(0 0% 90.59% / 1) */',
            'black-250': 'var(--color-black-250) /* hsl(0 0% 0% / 0.12) */',
            'black-250-sl':
              'var(--color-black-250-sl) /* hsl(0 0% 87.45% / 1) */',
            'black-300': 'var(--color-black-300) /* hsl(0 0% 0% / 0.16) */',
            'black-300-sl':
              'var(--color-black-300-sl) /* hsl(0 0% 83.92% / 1) */',
            'black-350': 'var(--color-black-350) /* hsl(0 0% 0% / 0.2) */',
            'black-350-sl': 'var(--color-black-350-sl) /* hsl(0 0% 80% / 1) */',
            'black-400': 'var(--color-black-400) /* hsl(0 0% 0% / 0.25) */',
            'black-400-sl':
              'var(--color-black-400-sl) /* hsl(0 0% 75.29% / 1) */',
            'black-450': 'var(--color-black-450) /* hsl(0 0% 0% / 0.3) */',
            'black-450-sl':
              'var(--color-black-450-sl) /* hsl(0 0% 70.59% / 1) */',
            'black-50': 'var(--color-black-50) /* hsl(0 0% 0% / 0.02) */',
            'black-50-sl':
              'var(--color-black-50-sl) /* hsl(0 0% 97.65% / 1) */',
            'black-500': 'var(--color-black-500) /* hsl(0 0% 0% / 0.35) */',
            'black-500-sl':
              'var(--color-black-500-sl) /* hsl(0 0% 65.1% / 1) */',
            'black-550': 'var(--color-black-550) /* hsl(0 0% 0% / 0.4) */',
            'black-550-sl':
              'var(--color-black-550-sl) /* hsl(0 0% 59.61% / 1) */',
            'black-600': 'var(--color-black-600) /* hsl(0 0% 0% / 0.46) */',
            'black-600-sl':
              'var(--color-black-600-sl) /* hsl(0 0% 53.73% / 1) */',
            'black-650': 'var(--color-black-650) /* hsl(0 0% 0% / 0.52) */',
            'black-650-sl':
              'var(--color-black-650-sl) /* hsl(0 0% 47.84% / 1) */',
            'black-700': 'var(--color-black-700) /* hsl(0 0% 0% / 0.59) */',
            'black-700-sl':
              'var(--color-black-700-sl) /* hsl(0 0% 41.57% / 1) */',
            'black-750': 'var(--color-black-750) /* hsl(0 0% 0% / 0.65) */',
            'black-750-sl':
              'var(--color-black-750-sl) /* hsl(0 0% 34.9% / 1) */',
            'black-800': 'var(--color-black-800) /* hsl(0 0% 0% / 0.72) */',
            'black-800-sl':
              'var(--color-black-800-sl) /* hsl(0 0% 28.24% / 1) */',
            'black-850': 'var(--color-black-850) /* hsl(0 0% 0% / 0.79) */',
            'black-850-sl':
              'var(--color-black-850-sl) /* hsl(0 0% 21.18% / 1) */',
            'black-900': 'var(--color-black-900) /* hsl(0 0% 0% / 0.86) */',
            'black-900-sl':
              'var(--color-black-900-sl) /* hsl(0 0% 14.12% / 1) */',
            'black-950': 'var(--color-black-950) /* hsl(0 0% 0% / 0.93) */',
            'black-950-sl':
              'var(--color-black-950-sl) /* hsl(0 0% 7.06% / 1) */',
            current: 'currentColor',
            'green-100':
              'var(--color-green-100) /* hsl(133.89 100% 60.2% / 0.05) */',
            'green-100-sd':
              'var(--color-green-100-sd) /* hsl(132 62.5% 3.14% / 1) */',
            'green-100-sl':
              'var(--color-green-100-sl) /* hsl(132 100% 98.04% / 1) */',
            'green-1000':
              'var(--color-green-1000) /* hsl(140.22 100% 34.9% / 1) */',
            'green-1000-sd':
              'var(--color-green-1000-sd) /* hsl(140.22 100% 34.9% / 1) */',
            'green-1000-sl':
              'var(--color-green-1000-sl) /* hsl(140.22 100% 34.9% / 1) */',
            'green-150':
              'var(--color-green-150) /* hsl(133.89 100% 60.2% / 0.1) */',
            'green-150-sd':
              'var(--color-green-150-sd) /* hsl(134.29 67.74% 6.08% / 1) */',
            'green-150-sl':
              'var(--color-green-150-sl) /* hsl(134.29 100% 95.88% / 1) */',
            'green-200':
              'var(--color-green-200) /* hsl(133.89 100% 60.2% / 0.17) */',
            'green-200-sd':
              'var(--color-green-200-sd) /* hsl(134.12 65.38% 10.2% / 1) */',
            'green-200-sl':
              'var(--color-green-200-sl) /* hsl(133.71 100% 93.14% / 1) */',
            'green-250':
              'var(--color-green-250) /* hsl(133.89 100% 60.2% / 0.25) */',
            'green-250-sd':
              'var(--color-green-250-sd) /* hsl(134.12 66.23% 15.1% / 1) */',
            'green-250-sl':
              'var(--color-green-250-sl) /* hsl(134.12 100% 90% / 1) */',
            'green-300':
              'var(--color-green-300) /* hsl(133.89 100% 60.2% / 0.34) */',
            'green-300-sd':
              'var(--color-green-300-sd) /* hsl(133.91 65.71% 20.59% / 1) */',
            'green-300-sl':
              'var(--color-green-300-sl) /* hsl(134.57 100% 86.27% / 1) */',
            'green-350':
              'var(--color-green-350) /* hsl(133.89 100% 60.2% / 0.44) */',
            'green-350-sd':
              'var(--color-green-350-sd) /* hsl(134.16 65.93% 26.47% / 1) */',
            'green-350-sl':
              'var(--color-green-350-sl) /* hsl(133.48 100% 82.55% / 1) */',
            'green-400':
              'var(--color-green-400) /* hsl(133.89 100% 60.2% / 0.54) */',
            'green-400-sd':
              'var(--color-green-400-sd) /* hsl(133.64 66.27% 32.55% / 1) */',
            'green-400-sl':
              'var(--color-green-400-sl) /* hsl(134.18 100% 78.43% / 1) */',
            'green-450':
              'var(--color-green-450) /* hsl(133.89 100% 60.2% / 0.64) */',
            'green-450-sd':
              'var(--color-green-450-sd) /* hsl(133.85 66.33% 38.43% / 1) */',
            'green-450-sl':
              'var(--color-green-450-sl) /* hsl(133.85 100% 74.51% / 1) */',
            'green-50':
              'var(--color-green-50) /* hsl(133.89 100% 60.2% / 0.02) */',
            'green-50-sd':
              'var(--color-green-50-sd) /* hsl(140 60% 0.98% / 1) */',
            'green-50-sl':
              'var(--color-green-50-sl) /* hsl(140 100% 99.41% / 1) */',
            'green-500':
              'var(--color-green-500) /* hsl(133.89 100% 60.2% / 0.73) */',
            'green-500-sd':
              'var(--color-green-500-sd) /* hsl(133.78 66.07% 43.92% / 1) */',
            'green-500-sl':
              'var(--color-green-500-sl) /* hsl(133.78 100% 70.98% / 1) */',
            'green-550':
              'var(--color-green-550) /* hsl(133.89 100% 60.2% / 0.81) */',
            'green-550-sd':
              'var(--color-green-550-sd) /* hsl(134.1 66.4% 49.02% / 1) */',
            'green-550-sl':
              'var(--color-green-550-sl) /* hsl(133.82 100% 67.65% / 1) */',
            'green-600':
              'var(--color-green-600) /* hsl(133.89 100% 60.2% / 0.89) */',
            'green-600-sd':
              'var(--color-green-600-sd) /* hsl(134 75.63% 53.33% / 1) */',
            'green-600-sl':
              'var(--color-green-600-sl) /* hsl(134 100% 64.71% / 1) */',
            'green-650':
              'var(--color-green-650) /* hsl(138 88.71% 51.37% / 1) */',
            'green-650-sd':
              'var(--color-green-650-sd) /* hsl(138 88.71% 51.37% / 1) */',
            'green-650-sl':
              'var(--color-green-650-sl) /* hsl(138 88.71% 51.37% / 1) */',
            'green-700':
              'var(--color-green-700) /* hsl(140.97 100% 44.31% / 1) */',
            'green-700-sd':
              'var(--color-green-700-sd) /* hsl(140.97 100% 44.31% / 1) */',
            'green-700-sl':
              'var(--color-green-700-sl) /* hsl(140.97 100% 44.31% / 1) */',
            'green-750':
              'var(--color-green-750) /* hsl(140.85 100% 41.76% / 1) */',
            'green-750-sd':
              'var(--color-green-750-sd) /* hsl(140.85 100% 41.76% / 1) */',
            'green-750-sl':
              'var(--color-green-750-sl) /* hsl(140.85 100% 41.76% / 1) */',
            'green-800':
              'var(--color-green-800) /* hsl(140.6 100% 39.41% / 1) */',
            'green-800-sd':
              'var(--color-green-800-sd) /* hsl(140.6 100% 39.41% / 1) */',
            'green-800-sl':
              'var(--color-green-800-sl) /* hsl(140.6 100% 39.41% / 1) */',
            'green-850':
              'var(--color-green-850) /* hsl(140.42 100% 37.45% / 1) */',
            'green-850-sd':
              'var(--color-green-850-sd) /* hsl(140.42 100% 37.45% / 1) */',
            'green-850-sl':
              'var(--color-green-850-sl) /* hsl(140.42 100% 37.45% / 1) */',
            'green-900':
              'var(--color-green-900) /* hsl(140.54 100% 36.08% / 1) */',
            'green-900-sd':
              'var(--color-green-900-sd) /* hsl(140.54 100% 36.08% / 1) */',
            'green-900-sl':
              'var(--color-green-900-sl) /* hsl(140.54 100% 36.08% / 1) */',
            'green-950':
              'var(--color-green-950) /* hsl(140.33 100% 35.29% / 1) */',
            'green-950-sd':
              'var(--color-green-950-sd) /* hsl(140.33 100% 35.29% / 1) */',
            'green-950-sl':
              'var(--color-green-950-sl) /* hsl(140.33 100% 35.29% / 1) */',
            inherit: 'inherit',
            initial: 'initial',
            transparent: 'transparent',
            unset: 'unset',
            'white-100': 'var(--color-white-100) /* hsl(0 0% 100% / 0.06) */',
            'white-100-sd':
              'var(--color-white-100-sd) /* hsl(0 0% 5.49% / 1) */',
            'white-1000': 'var(--color-white-1000) /* hsl(0 0% 100% / 1) */',
            'white-1000-sd':
              'var(--color-white-1000-sd) /* hsl(0 0% 100% / 1) */',
            'white-150': 'var(--color-white-150) /* hsl(0 0% 100% / 0.08) */',
            'white-150-sd':
              'var(--color-white-150-sd) /* hsl(0 0% 8.24% / 1) */',
            'white-200': 'var(--color-white-200) /* hsl(0 0% 100% / 0.11) */',
            'white-200-sd':
              'var(--color-white-200-sd) /* hsl(0 0% 10.98% / 1) */',
            'white-250': 'var(--color-white-250) /* hsl(0 0% 100% / 0.14) */',
            'white-250-sd':
              'var(--color-white-250-sd) /* hsl(0 0% 14.12% / 1) */',
            'white-300': 'var(--color-white-300) /* hsl(0 0% 100% / 0.18) */',
            'white-300-sd':
              'var(--color-white-300-sd) /* hsl(0 0% 18.04% / 1) */',
            'white-350': 'var(--color-white-350) /* hsl(0 0% 100% / 0.22) */',
            'white-350-sd':
              'var(--color-white-350-sd) /* hsl(0 0% 22.35% / 1) */',
            'white-400': 'var(--color-white-400) /* hsl(0 0% 100% / 0.27) */',
            'white-400-sd':
              'var(--color-white-400-sd) /* hsl(0 0% 26.67% / 1) */',
            'white-450': 'var(--color-white-450) /* hsl(0 0% 100% / 0.31) */',
            'white-450-sd':
              'var(--color-white-450-sd) /* hsl(0 0% 31.37% / 1) */',
            'white-50': 'var(--color-white-50) /* hsl(0 0% 100% / 0.04) */',
            'white-50-sd': 'var(--color-white-50-sd) /* hsl(0 0% 3.53% / 1) */',
            'white-500': 'var(--color-white-500) /* hsl(0 0% 100% / 0.37) */',
            'white-500-sd':
              'var(--color-white-500-sd) /* hsl(0 0% 36.47% / 1) */',
            'white-550': 'var(--color-white-550) /* hsl(0 0% 100% / 0.42) */',
            'white-550-sd':
              'var(--color-white-550-sd) /* hsl(0 0% 41.96% / 1) */',
            'white-600': 'var(--color-white-600) /* hsl(0 0% 100% / 0.48) */',
            'white-600-sd':
              'var(--color-white-600-sd) /* hsl(0 0% 47.84% / 1) */',
            'white-650': 'var(--color-white-650) /* hsl(0 0% 100% / 0.54) */',
            'white-650-sd':
              'var(--color-white-650-sd) /* hsl(0 0% 53.73% / 1) */',
            'white-700': 'var(--color-white-700) /* hsl(0 0% 100% / 0.6) */',
            'white-700-sd': 'var(--color-white-700-sd) /* hsl(0 0% 60% / 1) */',
            'white-750': 'var(--color-white-750) /* hsl(0 0% 100% / 0.66) */',
            'white-750-sd':
              'var(--color-white-750-sd) /* hsl(0 0% 66.27% / 1) */',
            'white-800': 'var(--color-white-800) /* hsl(0 0% 100% / 0.73) */',
            'white-800-sd':
              'var(--color-white-800-sd) /* hsl(0 0% 72.94% / 1) */',
            'white-850': 'var(--color-white-850) /* hsl(0 0% 100% / 0.8) */',
            'white-850-sd':
              'var(--color-white-850-sd) /* hsl(0 0% 79.61% / 1) */',
            'white-900': 'var(--color-white-900) /* hsl(0 0% 100% / 0.86) */',
            'white-900-sd':
              'var(--color-white-900-sd) /* hsl(0 0% 86.27% / 1) */',
            'white-950': 'var(--color-white-950) /* hsl(0 0% 100% / 0.93) */',
            'white-950-sd':
              'var(--color-white-950-sd) /* hsl(0 0% 93.33% / 1) */',
          },
        },
      });
    });
  });
});
