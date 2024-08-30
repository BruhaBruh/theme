import { ColorDesignToken } from './color-design-token';
import { RingDesignToken } from './ring-design-token';

describe('ring-design-token', () => {
  let ringDesignToken: RingDesignToken;

  beforeEach(() => {
    const colorDesignToken = new ColorDesignToken();
    colorDesignToken.generateColor('white', '#ffffff', { type: 'alpha' });
    ringDesignToken = new RingDesignToken(colorDesignToken);
  });

  describe('add ring color', () => {
    test('css variables', () => {
      ringDesignToken.addRingColor('primary', '{color.white.1000}');
      expect(ringDesignToken.cssVariables).toStrictEqual({
        '--ring-primary': 'var(--color-white-1000)',
      });
    });

    test('css', () => {
      ringDesignToken.addRingColor('primary', '{color.white.1000}');
      expect(ringDesignToken.css()).toStrictEqual([
        '--ring-primary: var(--color-white-1000);',
      ]);
    });

    test('tailwind config', () => {
      ringDesignToken.addRingColor('primary', '{color.white.1000}');
      expect(ringDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            ringColor: {
              primary: 'var(--ring-primary) /* hsl(0 0% 100% / 1) */',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('white', '#ffffff', { type: 'alpha' });
        ringDesignToken = new RingDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        ringDesignToken.addRingColor('primary', '{color.white.1000}');
        expect(ringDesignToken.cssVariables).toStrictEqual({
          '--pw-ring-primary': 'var(--pw-color-white-1000)',
        });
      });

      test('css', () => {
        ringDesignToken.addRingColor('primary', '{color.white.1000}');
        expect(ringDesignToken.css()).toStrictEqual([
          '--pw-ring-primary: var(--pw-color-white-1000);',
        ]);
      });

      test('tailwind config', () => {
        ringDesignToken.addRingColor('primary', '{color.white.1000}');
        expect(ringDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              ringColor: {
                primary: 'var(--pw-ring-primary) /* hsl(0 0% 100% / 1) */',
              },
            },
          },
        });
      });
    });
  });

  describe('add ring color w/ reference', () => {
    test('css variables', () => {
      ringDesignToken.addRingColor('ring', '{color.white.1000}');
      ringDesignToken.addRingColor('button', '{ring.ring}');
      expect(ringDesignToken.cssVariables).toStrictEqual({
        '--ring-ring': 'var(--color-white-1000)',
        '--ring-button': 'var(--ring-ring)',
      });
    });

    test('css', () => {
      ringDesignToken.addRingColor('ring', '{color.white.1000}');
      ringDesignToken.addRingColor('button', '{ring.ring}');
      expect(ringDesignToken.css()).toStrictEqual([
        '--ring-ring: var(--color-white-1000);',
        '--ring-button: var(--ring-ring);',
      ]);
    });

    test('tailwind config', () => {
      ringDesignToken.addRingColor('ring', '{color.white.1000}');
      ringDesignToken.addRingColor('button', '{ring.ring}');
      expect(ringDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            ringColor: {
              button: 'var(--ring-button) /* hsl(0 0% 100% / 1) */',
              ring: 'var(--ring-ring) /* hsl(0 0% 100% / 1) */',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('white', '#ffffff', { type: 'alpha' });
        ringDesignToken = new RingDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        ringDesignToken.addRingColor('primary', '{color.white.1000}');
        ringDesignToken.addRingColor('button', '{ring.primary}');
        expect(ringDesignToken.cssVariables).toStrictEqual({
          '--pw-ring-primary': 'var(--pw-color-white-1000)',
          '--pw-ring-button': 'var(--pw-ring-primary)',
        });
      });

      test('css', () => {
        ringDesignToken.addRingColor('primary', '{color.white.1000}');
        ringDesignToken.addRingColor('button', '{ring.primary}');
        expect(ringDesignToken.css()).toStrictEqual([
          '--pw-ring-primary: var(--pw-color-white-1000);',
          '--pw-ring-button: var(--pw-ring-primary);',
        ]);
      });

      test('tailwind config', () => {
        ringDesignToken.addRingColor('primary', '{color.white.1000}');
        ringDesignToken.addRingColor('button', '{ring.primary}');
        expect(ringDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              ringColor: {
                button: 'var(--pw-ring-button) /* hsl(0 0% 100% / 1) */',
                primary: 'var(--pw-ring-primary) /* hsl(0 0% 100% / 1) */',
              },
            },
          },
        });
      });
    });
  });
});
