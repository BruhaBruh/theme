import { ColorDesignToken } from './color-design-token';
import { RingDesignToken } from './ring-design-token';

describe('ring-design-token', () => {
  let ringDesignToken: RingDesignToken;

  beforeEach(() => {
    const colorDesignToken = new ColorDesignToken();
    colorDesignToken.generateColor('neutral', '#292B33');
    ringDesignToken = new RingDesignToken(colorDesignToken);
  });

  describe('add ring color', () => {
    test('css variables', () => {
      ringDesignToken.addRingColor('primary', '{color.neutral.950}');
      expect(ringDesignToken.cssVariables(false)).toStrictEqual({
        '--ring-primary': 'var(--color-neutral-950)',
      });
    });

    test('css', () => {
      ringDesignToken.addRingColor('primary', '{color.neutral.950}');
      expect(ringDesignToken.css(false)).toStrictEqual([
        '--ring-primary: var(--color-neutral-950);',
      ]);
    });

    test('tailwind config', () => {
      ringDesignToken.addRingColor('primary', '{color.neutral.950}');
      expect(ringDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'primary-ring':
                '/* #000000 */ rgb(from var(--ring-primary) r g b / <alpha-value>)',
            },
            ringColor: {
              primary:
                '/* #000000 */ rgb(from var(--ring-primary) r g b / <alpha-value>)',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('neutral', '#292B33');
        ringDesignToken = new RingDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        ringDesignToken.addRingColor('primary', '{color.neutral.950}');
        expect(ringDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-ring-primary': 'var(--pw-color-neutral-950)',
        });
      });

      test('css', () => {
        ringDesignToken.addRingColor('primary', '{color.neutral.950}');
        expect(ringDesignToken.css(false)).toStrictEqual([
          '--pw-ring-primary: var(--pw-color-neutral-950);',
        ]);
      });

      test('tailwind config', () => {
        ringDesignToken.addRingColor('primary', '{color.neutral.950}');
        expect(ringDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-ring':
                  '/* #000000 */ rgb(from var(--pw-ring-primary) r g b / <alpha-value>)',
              },
              ringColor: {
                primary:
                  '/* #000000 */ rgb(from var(--pw-ring-primary) r g b / <alpha-value>)',
              },
            },
          },
        });
      });
    });
  });

  describe('add ring color w/ reference', () => {
    test('css variables', () => {
      ringDesignToken.addRingColor('ring', '{color.neutral.950}');
      ringDesignToken.addRingColor('button', '{ring.ring}');
      expect(ringDesignToken.cssVariables(false)).toStrictEqual({
        '--ring-ring': 'var(--color-neutral-950)',
        '--ring-button': 'var(--ring-ring)',
      });
    });

    test('css', () => {
      ringDesignToken.addRingColor('ring', '{color.neutral.950}');
      ringDesignToken.addRingColor('button', '{ring.ring}');
      expect(ringDesignToken.css(false)).toStrictEqual([
        '--ring-ring: var(--color-neutral-950);',
        '--ring-button: var(--ring-ring);',
      ]);
    });

    test('tailwind config', () => {
      ringDesignToken.addRingColor('ring', '{color.neutral.950}');
      ringDesignToken.addRingColor('button', '{ring.ring}');
      expect(ringDesignToken.tailwindConfig(false)).toStrictEqual({
        theme: {
          extend: {
            colors: {
              'ring-ring':
                '/* #000000 */ rgb(from var(--ring-ring) r g b / <alpha-value>)',
              'button-ring':
                '/* #000000 */ rgb(from var(--ring-button) r g b / <alpha-value>)',
            },
            ringColor: {
              ring: '/* #000000 */ rgb(from var(--ring-ring) r g b / <alpha-value>)',
              button:
                '/* #000000 */ rgb(from var(--ring-button) r g b / <alpha-value>)',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('neutral', '#292B33');
        ringDesignToken = new RingDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        ringDesignToken.addRingColor('primary', '{color.neutral.950}');
        ringDesignToken.addRingColor('button', '{ring.primary}');
        expect(ringDesignToken.cssVariables(false)).toStrictEqual({
          '--pw-ring-primary': 'var(--pw-color-neutral-950)',
          '--pw-ring-button': 'var(--pw-ring-primary)',
        });
      });

      test('css', () => {
        ringDesignToken.addRingColor('primary', '{color.neutral.950}');
        ringDesignToken.addRingColor('button', '{ring.primary}');
        expect(ringDesignToken.css(false)).toStrictEqual([
          '--pw-ring-primary: var(--pw-color-neutral-950);',
          '--pw-ring-button: var(--pw-ring-primary);',
        ]);
      });

      test('tailwind config', () => {
        ringDesignToken.addRingColor('primary', '{color.neutral.950}');
        ringDesignToken.addRingColor('button', '{ring.primary}');
        expect(ringDesignToken.tailwindConfig(false)).toStrictEqual({
          theme: {
            extend: {
              colors: {
                'primary-ring':
                  '/* #000000 */ rgb(from var(--pw-ring-primary) r g b / <alpha-value>)',
                'button-ring':
                  '/* #000000 */ rgb(from var(--pw-ring-button) r g b / <alpha-value>)',
              },
              ringColor: {
                primary:
                  '/* #000000 */ rgb(from var(--pw-ring-primary) r g b / <alpha-value>)',
                button:
                  '/* #000000 */ rgb(from var(--pw-ring-button) r g b / <alpha-value>)',
              },
            },
          },
        });
      });
    });
  });
});
