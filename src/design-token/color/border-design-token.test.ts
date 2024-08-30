import { BorderDesignToken } from './border-design-token';
import { ColorDesignToken } from './color-design-token';

describe('border-design-token', () => {
  let borderDesignToken: BorderDesignToken;

  beforeEach(() => {
    const colorDesignToken = new ColorDesignToken();
    colorDesignToken.generateColor('white', '#ffffff', { type: 'alpha' });
    borderDesignToken = new BorderDesignToken(colorDesignToken);
  });

  describe('add border color', () => {
    test('css variables', () => {
      borderDesignToken.addBorderColor('primary', '{color.white.1000}');
      expect(borderDesignToken.cssVariables).toStrictEqual({
        '--border-primary': 'var(--color-white-1000)',
      });
    });

    test('css', () => {
      borderDesignToken.addBorderColor('primary', '{color.white.1000}');
      expect(borderDesignToken.css()).toStrictEqual([
        '--border-primary: var(--color-white-1000);',
      ]);
    });

    test('tailwind config', () => {
      borderDesignToken.addBorderColor('primary', '{color.white.1000}');
      expect(borderDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            borderColor: {
              primary: 'var(--border-primary) /* hsl(0 0% 100% / 1) */',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('white', '#ffffff', { type: 'alpha' });
        borderDesignToken = new BorderDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        borderDesignToken.addBorderColor('primary', '{color.white.1000}');
        expect(borderDesignToken.cssVariables).toStrictEqual({
          '--pw-border-primary': 'var(--pw-color-white-1000)',
        });
      });

      test('css', () => {
        borderDesignToken.addBorderColor('primary', '{color.white.1000}');
        expect(borderDesignToken.css()).toStrictEqual([
          '--pw-border-primary: var(--pw-color-white-1000);',
        ]);
      });

      test('tailwind config', () => {
        borderDesignToken.addBorderColor('primary', '{color.white.1000}');
        expect(borderDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              borderColor: {
                primary: 'var(--pw-border-primary) /* hsl(0 0% 100% / 1) */',
              },
            },
          },
        });
      });
    });
  });

  describe('add border color w/ reference', () => {
    test('css variables', () => {
      borderDesignToken.addBorderColor('border', '{color.white.1000}');
      borderDesignToken.addBorderColor('button', '{border.border}');
      expect(borderDesignToken.cssVariables).toStrictEqual({
        '--border-border': 'var(--color-white-1000)',
        '--border-button': 'var(--border-border)',
      });
    });

    test('css', () => {
      borderDesignToken.addBorderColor('border', '{color.white.1000}');
      borderDesignToken.addBorderColor('button', '{border.border}');
      expect(borderDesignToken.css()).toStrictEqual([
        '--border-border: var(--color-white-1000);',
        '--border-button: var(--border-border);',
      ]);
    });

    test('tailwind config', () => {
      borderDesignToken.addBorderColor('border', '{color.white.1000}');
      borderDesignToken.addBorderColor('button', '{border.border}');
      expect(borderDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            borderColor: {
              border: 'var(--border-border) /* hsl(0 0% 100% / 1) */',
              button: 'var(--border-button) /* hsl(0 0% 100% / 1) */',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('white', '#ffffff', { type: 'alpha' });
        borderDesignToken = new BorderDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        borderDesignToken.addBorderColor('primary', '{color.white.1000}');
        borderDesignToken.addBorderColor('button', '{border.primary}');
        expect(borderDesignToken.cssVariables).toStrictEqual({
          '--pw-border-primary': 'var(--pw-color-white-1000)',
          '--pw-border-button': 'var(--pw-border-primary)',
        });
      });

      test('css', () => {
        borderDesignToken.addBorderColor('primary', '{color.white.1000}');
        borderDesignToken.addBorderColor('button', '{border.primary}');
        expect(borderDesignToken.css()).toStrictEqual([
          '--pw-border-primary: var(--pw-color-white-1000);',
          '--pw-border-button: var(--pw-border-primary);',
        ]);
      });

      test('tailwind config', () => {
        borderDesignToken.addBorderColor('primary', '{color.white.1000}');
        borderDesignToken.addBorderColor('button', '{border.primary}');
        expect(borderDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              borderColor: {
                primary: 'var(--pw-border-primary) /* hsl(0 0% 100% / 1) */',
                button: 'var(--pw-border-button) /* hsl(0 0% 100% / 1) */',
              },
            },
          },
        });
      });
    });
  });
});
