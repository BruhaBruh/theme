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
      colorDesignToken.generateColor('white', '#ffffff', { type: 'alpha' });
      colorDesignToken.generateColor('black', '#000000', { type: 'alpha' });
      colorDesignToken.generateColor('green', '#34ff63', {
        solid: {
          light: '{color.white.1000}',
          dark: '{color.black.1000}',
        },
      });
      expect(colorDesignToken.cssVariables).toStrictEqual({
        '--color-black-100': 'hsl(0 0% 0% / 0.05)',
        '--color-black-1000': 'hsl(0 0% 0% / 1)',
        '--color-black-150': 'hsl(0 0% 0% / 0.07)',
        '--color-black-200': 'hsl(0 0% 0% / 0.1)',
        '--color-black-250': 'hsl(0 0% 0% / 0.13)',
        '--color-black-300': 'hsl(0 0% 0% / 0.17)',
        '--color-black-350': 'hsl(0 0% 0% / 0.21)',
        '--color-black-400': 'hsl(0 0% 0% / 0.25)',
        '--color-black-450': 'hsl(0 0% 0% / 0.3)',
        '--color-black-50': 'hsl(0 0% 0% / 0.03)',
        '--color-black-500': 'hsl(0 0% 0% / 0.35)',
        '--color-black-550': 'hsl(0 0% 0% / 0.41)',
        '--color-black-600': 'hsl(0 0% 0% / 0.47)',
        '--color-black-650': 'hsl(0 0% 0% / 0.53)',
        '--color-black-700': 'hsl(0 0% 0% / 0.59)',
        '--color-black-750': 'hsl(0 0% 0% / 0.66)',
        '--color-black-800': 'hsl(0 0% 0% / 0.72)',
        '--color-black-850': 'hsl(0 0% 0% / 0.79)',
        '--color-black-900': 'hsl(0 0% 0% / 0.86)',
        '--color-black-950': 'hsl(0 0% 0% / 0.93)',
        '--color-black-default': 'hsl(0 0% 0% / 1)',
        '--color-green-100': 'hsl(134.12 100% 50% / 0.2)',
        '--color-green-100-sd': 'hsl(134.12 100% 10% / 1)',
        '--color-green-100-sl': 'hsl(134.12 100% 90% / 1)',
        '--color-green-1000': 'hsl(134.4 100% 4.9% / 1)',
        '--color-green-1000-sd': 'hsl(134.4 100% 4.9% / 1)',
        '--color-green-1000-sl': 'hsl(134.4 100% 4.9% / 1)',
        '--color-green-150': 'hsl(133.65 100% 50% / 0.27)',
        '--color-green-150-sd': 'hsl(133.71 100% 13.73% / 1)',
        '--color-green-150-sl': 'hsl(133.71 100% 86.27% / 1)',
        '--color-green-200': 'hsl(134.12 100% 50% / 0.33)',
        '--color-green-200-sd': 'hsl(134.12 100% 16.67% / 1)',
        '--color-green-200-sl': 'hsl(134.12 100% 83.33% / 1)',
        '--color-green-250': 'hsl(133.65 100% 50% / 0.38)',
        '--color-green-250-sd': 'hsl(133.61 100% 19.02% / 1)',
        '--color-green-250-sl': 'hsl(133.61 100% 80.98% / 1)',
        '--color-green-300': 'hsl(134.23 100% 49.61% / 0.42)',
        '--color-green-300-sd': 'hsl(134.15 100% 20.78% / 1)',
        '--color-green-300-sl': 'hsl(134.15 98.15% 78.82% / 1)',
        '--color-green-350': 'hsl(133.75 100% 49.61% / 0.45)',
        '--color-green-350-sd': 'hsl(133.81 100% 22.16% / 1)',
        '--color-green-350-sl': 'hsl(133.81 98.26% 77.45% / 1)',
        '--color-green-400': 'hsl(133.63 100% 49.22% / 0.47)',
        '--color-green-400-sd': 'hsl(133.73 100% 23.14% / 1)',
        '--color-green-400-sl': 'hsl(133.73 96.72% 76.08% / 1)',
        '--color-green-450': 'hsl(134.33 100% 48.43% / 0.49)',
        '--color-green-450-sd': 'hsl(134.26 100% 23.92% / 1)',
        '--color-green-450-sl': 'hsl(134.26 93.85% 74.51% / 1)',
        '--color-green-50': 'hsl(135.06 100% 50% / 0.11)',
        '--color-green-50-sd': 'hsl(135 100% 5.49% / 1)',
        '--color-green-50-sl': 'hsl(135 100% 94.51% / 1)',
        '--color-green-500': 'hsl(133.94 100% 47.25% / 0.51)',
        '--color-green-500-sd': 'hsl(134.03 100% 24.31% / 1)',
        '--color-green-500-sl': 'hsl(134.03 89.86% 72.94% / 1)',
        '--color-green-550': 'hsl(133.91 100% 45.69% / 0.54)',
        '--color-green-550-sd': 'hsl(133.92 100% 24.51% / 1)',
        '--color-green-550-sl': 'hsl(133.92 83.89% 70.78% / 1)',
        '--color-green-600': 'hsl(133.72 100% 43.73% / 0.56)',
        '--color-green-600-sd': 'hsl(133.81 100% 24.71% / 1)',
        '--color-green-600-sl': 'hsl(133.81 77.78% 68.24% / 1)',
        '--color-green-650': 'hsl(133.71 100% 41.18% / 0.6)',
        '--color-green-650-sd': 'hsl(133.81 100% 24.71% / 1)',
        '--color-green-650-sl': 'hsl(133.81 70% 64.71% / 1)',
        '--color-green-700': 'hsl(134.15 100% 38.24% / 0.65)',
        '--color-green-700-sd': 'hsl(134.29 100% 24.71% / 1)',
        '--color-green-700-sl': 'hsl(134.29 61.76% 60% / 1)',
        '--color-green-750': 'hsl(133.9 100% 34.71% / 0.7)',
        '--color-green-750-sd': 'hsl(134.03 100% 24.31% / 1)',
        '--color-green-750-sl': 'hsl(134.03 52.99% 54.12% / 1)',
        '--color-green-800': 'hsl(134.23 100% 30.59% / 0.76)',
        '--color-green-800-sd': 'hsl(134.12 100% 23.33% / 1)',
        '--color-green-800-sl': 'hsl(134.12 49.79% 46.86% / 1)',
        '--color-green-850': 'hsl(133.98 100% 26.08% / 0.84)',
        '--color-green-850-sd': 'hsl(134.05 100% 21.76% / 1)',
        '--color-green-850-sl': 'hsl(134.05 56.92% 38.24% / 1)',
        '--color-green-900': 'hsl(133.71 100% 20.59% / 0.91)',
        '--color-green-900-sd': 'hsl(133.89 100% 18.63% / 1)',
        '--color-green-900-sl': 'hsl(133.89 66.43% 28.04% / 1)',
        '--color-green-950': 'hsl(134.37 100% 13.92% / 0.97)',
        '--color-green-950-sd': 'hsl(133.91 100% 13.53% / 1)',
        '--color-green-950-sl': 'hsl(133.91 81.18% 16.67% / 1)',
        '--color-green-default': 'hsl(133.89 100% 60.2% / 1)',
        '--color-white-100': 'hsl(0 0% 100% / 0.05)',
        '--color-white-1000': 'hsl(0 0% 100% / 1)',
        '--color-white-150': 'hsl(0 0% 100% / 0.07)',
        '--color-white-200': 'hsl(0 0% 100% / 0.1)',
        '--color-white-250': 'hsl(0 0% 100% / 0.13)',
        '--color-white-300': 'hsl(0 0% 100% / 0.17)',
        '--color-white-350': 'hsl(0 0% 100% / 0.21)',
        '--color-white-400': 'hsl(0 0% 100% / 0.25)',
        '--color-white-450': 'hsl(0 0% 100% / 0.3)',
        '--color-white-50': 'hsl(0 0% 100% / 0.03)',
        '--color-white-500': 'hsl(0 0% 100% / 0.35)',
        '--color-white-550': 'hsl(0 0% 100% / 0.41)',
        '--color-white-600': 'hsl(0 0% 100% / 0.47)',
        '--color-white-650': 'hsl(0 0% 100% / 0.53)',
        '--color-white-700': 'hsl(0 0% 100% / 0.59)',
        '--color-white-750': 'hsl(0 0% 100% / 0.66)',
        '--color-white-800': 'hsl(0 0% 100% / 0.72)',
        '--color-white-850': 'hsl(0 0% 100% / 0.79)',
        '--color-white-900': 'hsl(0 0% 100% / 0.86)',
        '--color-white-950': 'hsl(0 0% 100% / 0.93)',
        '--color-white-default': 'hsl(0 0% 100% / 1)',
      });
    });

    test('css', () => {
      colorDesignToken.generateColor('white', '#ffffff', { type: 'alpha' });
      colorDesignToken.generateColor('black', '#000000', { type: 'alpha' });
      colorDesignToken.generateColor('green', '#34ff63', {
        solid: {
          light: '{color.white.1000}',
          dark: '{color.black.1000}',
        },
      });
      expect(colorDesignToken.css()).toStrictEqual([
        '--color-white-default: hsl(0 0% 100% / 1);',
        '--color-white-50: hsl(0 0% 100% / 0.03);',
        '--color-white-100: hsl(0 0% 100% / 0.05);',
        '--color-white-150: hsl(0 0% 100% / 0.07);',
        '--color-white-200: hsl(0 0% 100% / 0.1);',
        '--color-white-250: hsl(0 0% 100% / 0.13);',
        '--color-white-300: hsl(0 0% 100% / 0.17);',
        '--color-white-350: hsl(0 0% 100% / 0.21);',
        '--color-white-400: hsl(0 0% 100% / 0.25);',
        '--color-white-450: hsl(0 0% 100% / 0.3);',
        '--color-white-500: hsl(0 0% 100% / 0.35);',
        '--color-white-550: hsl(0 0% 100% / 0.41);',
        '--color-white-600: hsl(0 0% 100% / 0.47);',
        '--color-white-650: hsl(0 0% 100% / 0.53);',
        '--color-white-700: hsl(0 0% 100% / 0.59);',
        '--color-white-750: hsl(0 0% 100% / 0.66);',
        '--color-white-800: hsl(0 0% 100% / 0.72);',
        '--color-white-850: hsl(0 0% 100% / 0.79);',
        '--color-white-900: hsl(0 0% 100% / 0.86);',
        '--color-white-950: hsl(0 0% 100% / 0.93);',
        '--color-white-1000: hsl(0 0% 100% / 1);',
        '--color-black-default: hsl(0 0% 0% / 1);',
        '--color-black-50: hsl(0 0% 0% / 0.03);',
        '--color-black-100: hsl(0 0% 0% / 0.05);',
        '--color-black-150: hsl(0 0% 0% / 0.07);',
        '--color-black-200: hsl(0 0% 0% / 0.1);',
        '--color-black-250: hsl(0 0% 0% / 0.13);',
        '--color-black-300: hsl(0 0% 0% / 0.17);',
        '--color-black-350: hsl(0 0% 0% / 0.21);',
        '--color-black-400: hsl(0 0% 0% / 0.25);',
        '--color-black-450: hsl(0 0% 0% / 0.3);',
        '--color-black-500: hsl(0 0% 0% / 0.35);',
        '--color-black-550: hsl(0 0% 0% / 0.41);',
        '--color-black-600: hsl(0 0% 0% / 0.47);',
        '--color-black-650: hsl(0 0% 0% / 0.53);',
        '--color-black-700: hsl(0 0% 0% / 0.59);',
        '--color-black-750: hsl(0 0% 0% / 0.66);',
        '--color-black-800: hsl(0 0% 0% / 0.72);',
        '--color-black-850: hsl(0 0% 0% / 0.79);',
        '--color-black-900: hsl(0 0% 0% / 0.86);',
        '--color-black-950: hsl(0 0% 0% / 0.93);',
        '--color-black-1000: hsl(0 0% 0% / 1);',
        '--color-green-default: hsl(133.89 100% 60.2% / 1);',
        '--color-green-50: hsl(135.06 100% 50% / 0.11);',
        '--color-green-100: hsl(134.12 100% 50% / 0.2);',
        '--color-green-150: hsl(133.65 100% 50% / 0.27);',
        '--color-green-200: hsl(134.12 100% 50% / 0.33);',
        '--color-green-250: hsl(133.65 100% 50% / 0.38);',
        '--color-green-300: hsl(134.23 100% 49.61% / 0.42);',
        '--color-green-350: hsl(133.75 100% 49.61% / 0.45);',
        '--color-green-400: hsl(133.63 100% 49.22% / 0.47);',
        '--color-green-450: hsl(134.33 100% 48.43% / 0.49);',
        '--color-green-500: hsl(133.94 100% 47.25% / 0.51);',
        '--color-green-550: hsl(133.91 100% 45.69% / 0.54);',
        '--color-green-600: hsl(133.72 100% 43.73% / 0.56);',
        '--color-green-650: hsl(133.71 100% 41.18% / 0.6);',
        '--color-green-700: hsl(134.15 100% 38.24% / 0.65);',
        '--color-green-750: hsl(133.9 100% 34.71% / 0.7);',
        '--color-green-800: hsl(134.23 100% 30.59% / 0.76);',
        '--color-green-850: hsl(133.98 100% 26.08% / 0.84);',
        '--color-green-900: hsl(133.71 100% 20.59% / 0.91);',
        '--color-green-950: hsl(134.37 100% 13.92% / 0.97);',
        '--color-green-1000: hsl(134.4 100% 4.9% / 1);',
        '--color-green-50-sd: hsl(135 100% 5.49% / 1);',
        '--color-green-50-sl: hsl(135 100% 94.51% / 1);',
        '--color-green-100-sd: hsl(134.12 100% 10% / 1);',
        '--color-green-100-sl: hsl(134.12 100% 90% / 1);',
        '--color-green-150-sd: hsl(133.71 100% 13.73% / 1);',
        '--color-green-150-sl: hsl(133.71 100% 86.27% / 1);',
        '--color-green-200-sd: hsl(134.12 100% 16.67% / 1);',
        '--color-green-200-sl: hsl(134.12 100% 83.33% / 1);',
        '--color-green-250-sd: hsl(133.61 100% 19.02% / 1);',
        '--color-green-250-sl: hsl(133.61 100% 80.98% / 1);',
        '--color-green-300-sd: hsl(134.15 100% 20.78% / 1);',
        '--color-green-300-sl: hsl(134.15 98.15% 78.82% / 1);',
        '--color-green-350-sd: hsl(133.81 100% 22.16% / 1);',
        '--color-green-350-sl: hsl(133.81 98.26% 77.45% / 1);',
        '--color-green-400-sd: hsl(133.73 100% 23.14% / 1);',
        '--color-green-400-sl: hsl(133.73 96.72% 76.08% / 1);',
        '--color-green-450-sd: hsl(134.26 100% 23.92% / 1);',
        '--color-green-450-sl: hsl(134.26 93.85% 74.51% / 1);',
        '--color-green-500-sd: hsl(134.03 100% 24.31% / 1);',
        '--color-green-500-sl: hsl(134.03 89.86% 72.94% / 1);',
        '--color-green-550-sd: hsl(133.92 100% 24.51% / 1);',
        '--color-green-550-sl: hsl(133.92 83.89% 70.78% / 1);',
        '--color-green-600-sd: hsl(133.81 100% 24.71% / 1);',
        '--color-green-600-sl: hsl(133.81 77.78% 68.24% / 1);',
        '--color-green-650-sd: hsl(133.81 100% 24.71% / 1);',
        '--color-green-650-sl: hsl(133.81 70% 64.71% / 1);',
        '--color-green-700-sd: hsl(134.29 100% 24.71% / 1);',
        '--color-green-700-sl: hsl(134.29 61.76% 60% / 1);',
        '--color-green-750-sd: hsl(134.03 100% 24.31% / 1);',
        '--color-green-750-sl: hsl(134.03 52.99% 54.12% / 1);',
        '--color-green-800-sd: hsl(134.12 100% 23.33% / 1);',
        '--color-green-800-sl: hsl(134.12 49.79% 46.86% / 1);',
        '--color-green-850-sd: hsl(134.05 100% 21.76% / 1);',
        '--color-green-850-sl: hsl(134.05 56.92% 38.24% / 1);',
        '--color-green-900-sd: hsl(133.89 100% 18.63% / 1);',
        '--color-green-900-sl: hsl(133.89 66.43% 28.04% / 1);',
        '--color-green-950-sd: hsl(133.91 100% 13.53% / 1);',
        '--color-green-950-sl: hsl(133.91 81.18% 16.67% / 1);',
        '--color-green-1000-sd: hsl(134.4 100% 4.9% / 1);',
        '--color-green-1000-sl: hsl(134.4 100% 4.9% / 1);',
      ]);
    });

    test('tailwind config', () => {
      colorDesignToken.generateColor('white', '#ffffff', { type: 'alpha' });
      colorDesignToken.generateColor('black', '#000000', { type: 'alpha' });
      colorDesignToken.generateColor('green', '#34ff63', {
        solid: {
          light: '{color.white.1000}',
          dark: '{color.black.1000}',
        },
      });
      expect(colorDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          colors: {
            black: {
              '100': 'var(--color-black-100) /* hsl(0 0% 0% / 0.05) */',
              '1000': 'var(--color-black-1000) /* hsl(0 0% 0% / 1) */',
              '150': 'var(--color-black-150) /* hsl(0 0% 0% / 0.07) */',
              '200': 'var(--color-black-200) /* hsl(0 0% 0% / 0.1) */',
              '250': 'var(--color-black-250) /* hsl(0 0% 0% / 0.13) */',
              '300': 'var(--color-black-300) /* hsl(0 0% 0% / 0.17) */',
              '350': 'var(--color-black-350) /* hsl(0 0% 0% / 0.21) */',
              '400': 'var(--color-black-400) /* hsl(0 0% 0% / 0.25) */',
              '450': 'var(--color-black-450) /* hsl(0 0% 0% / 0.3) */',
              '50': 'var(--color-black-50) /* hsl(0 0% 0% / 0.03) */',
              '500': 'var(--color-black-500) /* hsl(0 0% 0% / 0.35) */',
              '550': 'var(--color-black-550) /* hsl(0 0% 0% / 0.41) */',
              '600': 'var(--color-black-600) /* hsl(0 0% 0% / 0.47) */',
              '650': 'var(--color-black-650) /* hsl(0 0% 0% / 0.53) */',
              '700': 'var(--color-black-700) /* hsl(0 0% 0% / 0.59) */',
              '750': 'var(--color-black-750) /* hsl(0 0% 0% / 0.66) */',
              '800': 'var(--color-black-800) /* hsl(0 0% 0% / 0.72) */',
              '850': 'var(--color-black-850) /* hsl(0 0% 0% / 0.79) */',
              '900': 'var(--color-black-900) /* hsl(0 0% 0% / 0.86) */',
              '950': 'var(--color-black-950) /* hsl(0 0% 0% / 0.93) */',
              DEFAULT: 'var(--color-black-default) /* hsl(0 0% 0% / 1) */',
            },
            current: 'currentColor',
            green: {
              '100': 'var(--color-green-100) /* hsl(134.12 100% 50% / 0.2) */',
              '100-sd':
                'var(--color-green-100-sd) /* hsl(134.12 100% 10% / 1) */',
              '100-sl':
                'var(--color-green-100-sl) /* hsl(134.12 100% 90% / 1) */',
              '1000': 'var(--color-green-1000) /* hsl(134.4 100% 4.9% / 1) */',
              '1000-sd':
                'var(--color-green-1000-sd) /* hsl(134.4 100% 4.9% / 1) */',
              '1000-sl':
                'var(--color-green-1000-sl) /* hsl(134.4 100% 4.9% / 1) */',
              '150': 'var(--color-green-150) /* hsl(133.65 100% 50% / 0.27) */',
              '150-sd':
                'var(--color-green-150-sd) /* hsl(133.71 100% 13.73% / 1) */',
              '150-sl':
                'var(--color-green-150-sl) /* hsl(133.71 100% 86.27% / 1) */',
              '200': 'var(--color-green-200) /* hsl(134.12 100% 50% / 0.33) */',
              '200-sd':
                'var(--color-green-200-sd) /* hsl(134.12 100% 16.67% / 1) */',
              '200-sl':
                'var(--color-green-200-sl) /* hsl(134.12 100% 83.33% / 1) */',
              '250': 'var(--color-green-250) /* hsl(133.65 100% 50% / 0.38) */',
              '250-sd':
                'var(--color-green-250-sd) /* hsl(133.61 100% 19.02% / 1) */',
              '250-sl':
                'var(--color-green-250-sl) /* hsl(133.61 100% 80.98% / 1) */',
              '300':
                'var(--color-green-300) /* hsl(134.23 100% 49.61% / 0.42) */',
              '300-sd':
                'var(--color-green-300-sd) /* hsl(134.15 100% 20.78% / 1) */',
              '300-sl':
                'var(--color-green-300-sl) /* hsl(134.15 98.15% 78.82% / 1) */',
              '350':
                'var(--color-green-350) /* hsl(133.75 100% 49.61% / 0.45) */',
              '350-sd':
                'var(--color-green-350-sd) /* hsl(133.81 100% 22.16% / 1) */',
              '350-sl':
                'var(--color-green-350-sl) /* hsl(133.81 98.26% 77.45% / 1) */',
              '400':
                'var(--color-green-400) /* hsl(133.63 100% 49.22% / 0.47) */',
              '400-sd':
                'var(--color-green-400-sd) /* hsl(133.73 100% 23.14% / 1) */',
              '400-sl':
                'var(--color-green-400-sl) /* hsl(133.73 96.72% 76.08% / 1) */',
              '450':
                'var(--color-green-450) /* hsl(134.33 100% 48.43% / 0.49) */',
              '450-sd':
                'var(--color-green-450-sd) /* hsl(134.26 100% 23.92% / 1) */',
              '450-sl':
                'var(--color-green-450-sl) /* hsl(134.26 93.85% 74.51% / 1) */',
              '50': 'var(--color-green-50) /* hsl(135.06 100% 50% / 0.11) */',
              '50-sd': 'var(--color-green-50-sd) /* hsl(135 100% 5.49% / 1) */',
              '50-sl':
                'var(--color-green-50-sl) /* hsl(135 100% 94.51% / 1) */',
              '500':
                'var(--color-green-500) /* hsl(133.94 100% 47.25% / 0.51) */',
              '500-sd':
                'var(--color-green-500-sd) /* hsl(134.03 100% 24.31% / 1) */',
              '500-sl':
                'var(--color-green-500-sl) /* hsl(134.03 89.86% 72.94% / 1) */',
              '550':
                'var(--color-green-550) /* hsl(133.91 100% 45.69% / 0.54) */',
              '550-sd':
                'var(--color-green-550-sd) /* hsl(133.92 100% 24.51% / 1) */',
              '550-sl':
                'var(--color-green-550-sl) /* hsl(133.92 83.89% 70.78% / 1) */',
              '600':
                'var(--color-green-600) /* hsl(133.72 100% 43.73% / 0.56) */',
              '600-sd':
                'var(--color-green-600-sd) /* hsl(133.81 100% 24.71% / 1) */',
              '600-sl':
                'var(--color-green-600-sl) /* hsl(133.81 77.78% 68.24% / 1) */',
              '650':
                'var(--color-green-650) /* hsl(133.71 100% 41.18% / 0.6) */',
              '650-sd':
                'var(--color-green-650-sd) /* hsl(133.81 100% 24.71% / 1) */',
              '650-sl':
                'var(--color-green-650-sl) /* hsl(133.81 70% 64.71% / 1) */',
              '700':
                'var(--color-green-700) /* hsl(134.15 100% 38.24% / 0.65) */',
              '700-sd':
                'var(--color-green-700-sd) /* hsl(134.29 100% 24.71% / 1) */',
              '700-sl':
                'var(--color-green-700-sl) /* hsl(134.29 61.76% 60% / 1) */',
              '750':
                'var(--color-green-750) /* hsl(133.9 100% 34.71% / 0.7) */',
              '750-sd':
                'var(--color-green-750-sd) /* hsl(134.03 100% 24.31% / 1) */',
              '750-sl':
                'var(--color-green-750-sl) /* hsl(134.03 52.99% 54.12% / 1) */',
              '800':
                'var(--color-green-800) /* hsl(134.23 100% 30.59% / 0.76) */',
              '800-sd':
                'var(--color-green-800-sd) /* hsl(134.12 100% 23.33% / 1) */',
              '800-sl':
                'var(--color-green-800-sl) /* hsl(134.12 49.79% 46.86% / 1) */',
              '850':
                'var(--color-green-850) /* hsl(133.98 100% 26.08% / 0.84) */',
              '850-sd':
                'var(--color-green-850-sd) /* hsl(134.05 100% 21.76% / 1) */',
              '850-sl':
                'var(--color-green-850-sl) /* hsl(134.05 56.92% 38.24% / 1) */',
              '900':
                'var(--color-green-900) /* hsl(133.71 100% 20.59% / 0.91) */',
              '900-sd':
                'var(--color-green-900-sd) /* hsl(133.89 100% 18.63% / 1) */',
              '900-sl':
                'var(--color-green-900-sl) /* hsl(133.89 66.43% 28.04% / 1) */',
              '950':
                'var(--color-green-950) /* hsl(134.37 100% 13.92% / 0.97) */',
              '950-sd':
                'var(--color-green-950-sd) /* hsl(133.91 100% 13.53% / 1) */',
              '950-sl':
                'var(--color-green-950-sl) /* hsl(133.91 81.18% 16.67% / 1) */',
              DEFAULT:
                'var(--color-green-default) /* hsl(133.89 100% 60.2% / 1) */',
            },
            inherit: 'inherit',
            initial: 'initial',
            transparent: 'transparent',
            unset: 'unset',
            white: {
              '100': 'var(--color-white-100) /* hsl(0 0% 100% / 0.05) */',
              '1000': 'var(--color-white-1000) /* hsl(0 0% 100% / 1) */',
              '150': 'var(--color-white-150) /* hsl(0 0% 100% / 0.07) */',
              '200': 'var(--color-white-200) /* hsl(0 0% 100% / 0.1) */',
              '250': 'var(--color-white-250) /* hsl(0 0% 100% / 0.13) */',
              '300': 'var(--color-white-300) /* hsl(0 0% 100% / 0.17) */',
              '350': 'var(--color-white-350) /* hsl(0 0% 100% / 0.21) */',
              '400': 'var(--color-white-400) /* hsl(0 0% 100% / 0.25) */',
              '450': 'var(--color-white-450) /* hsl(0 0% 100% / 0.3) */',
              '50': 'var(--color-white-50) /* hsl(0 0% 100% / 0.03) */',
              '500': 'var(--color-white-500) /* hsl(0 0% 100% / 0.35) */',
              '550': 'var(--color-white-550) /* hsl(0 0% 100% / 0.41) */',
              '600': 'var(--color-white-600) /* hsl(0 0% 100% / 0.47) */',
              '650': 'var(--color-white-650) /* hsl(0 0% 100% / 0.53) */',
              '700': 'var(--color-white-700) /* hsl(0 0% 100% / 0.59) */',
              '750': 'var(--color-white-750) /* hsl(0 0% 100% / 0.66) */',
              '800': 'var(--color-white-800) /* hsl(0 0% 100% / 0.72) */',
              '850': 'var(--color-white-850) /* hsl(0 0% 100% / 0.79) */',
              '900': 'var(--color-white-900) /* hsl(0 0% 100% / 0.86) */',
              '950': 'var(--color-white-950) /* hsl(0 0% 100% / 0.93) */',
              DEFAULT: 'var(--color-white-default) /* hsl(0 0% 100% / 1) */',
            },
          },
        },
      });
    });
  });
});
