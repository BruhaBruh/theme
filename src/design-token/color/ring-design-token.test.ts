import { ColorDesignToken } from './color-design-token';
import { RingDesignToken } from './ring-design-token';

describe('ring-design-token', () => {
  let ringDesignToken: RingDesignToken;

  beforeEach(() => {
    const colorDesignToken = new ColorDesignToken();
    colorDesignToken.generateColor('neutral', '#292B33', {
      type: 'neutral',
    });
    ringDesignToken = new RingDesignToken(colorDesignToken);
  });

  describe('add ring color', () => {
    test('css variables', () => {
      ringDesignToken.addRingColor('primary', '{color.neutral.1000}');
      expect(ringDesignToken.cssVariables).toStrictEqual({
        '--ring-primary': 'var(--color-neutral-1000)',
      });
    });

    test('css', () => {
      ringDesignToken.addRingColor('primary', '{color.neutral.1000}');
      expect(ringDesignToken.css()).toStrictEqual([
        '--ring-primary: var(--color-neutral-1000);',
      ]);
    });

    test('tailwind config', () => {
      ringDesignToken.addRingColor('primary', '{color.neutral.1000}');
      expect(ringDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            ringColor: {
              primary: 'var(--ring-primary) /* #000105 */',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('neutral', '#292B33', {
          type: 'neutral',
        });
        ringDesignToken = new RingDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        ringDesignToken.addRingColor('primary', '{color.neutral.1000}');
        expect(ringDesignToken.cssVariables).toStrictEqual({
          '--pw-ring-primary': 'var(--pw-color-neutral-1000)',
        });
      });

      test('css', () => {
        ringDesignToken.addRingColor('primary', '{color.neutral.1000}');
        expect(ringDesignToken.css()).toStrictEqual([
          '--pw-ring-primary: var(--pw-color-neutral-1000);',
        ]);
      });

      test('tailwind config', () => {
        ringDesignToken.addRingColor('primary', '{color.neutral.1000}');
        expect(ringDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              ringColor: {
                primary: 'var(--pw-ring-primary) /* #000105 */',
              },
            },
          },
        });
      });
    });
  });

  describe('add ring color w/ reference', () => {
    test('css variables', () => {
      ringDesignToken.addRingColor('ring', '{color.neutral.1000}');
      ringDesignToken.addRingColor('button', '{ring.ring}');
      expect(ringDesignToken.cssVariables).toStrictEqual({
        '--ring-ring': 'var(--color-neutral-1000)',
        '--ring-button': 'var(--ring-ring)',
      });
    });

    test('css', () => {
      ringDesignToken.addRingColor('ring', '{color.neutral.1000}');
      ringDesignToken.addRingColor('button', '{ring.ring}');
      expect(ringDesignToken.css()).toStrictEqual([
        '--ring-ring: var(--color-neutral-1000);',
        '--ring-button: var(--ring-ring);',
      ]);
    });

    test('tailwind config', () => {
      ringDesignToken.addRingColor('ring', '{color.neutral.1000}');
      ringDesignToken.addRingColor('button', '{ring.ring}');
      expect(ringDesignToken.tailwindConfig()).toStrictEqual({
        theme: {
          extend: {
            ringColor: {
              button: 'var(--ring-button) /* #000105 */',
              ring: 'var(--ring-ring) /* #000105 */',
            },
          },
        },
      });
    });

    describe('with prefix', () => {
      beforeEach(() => {
        const colorDesignToken = new ColorDesignToken({ prefix: 'pw' });
        colorDesignToken.generateColor('neutral', '#292B33', {
          type: 'neutral',
        });
        ringDesignToken = new RingDesignToken(colorDesignToken, {
          prefix: 'pw',
        });
      });

      test('css variables', () => {
        ringDesignToken.addRingColor('primary', '{color.neutral.1000}');
        ringDesignToken.addRingColor('button', '{ring.primary}');
        expect(ringDesignToken.cssVariables).toStrictEqual({
          '--pw-ring-primary': 'var(--pw-color-neutral-1000)',
          '--pw-ring-button': 'var(--pw-ring-primary)',
        });
      });

      test('css', () => {
        ringDesignToken.addRingColor('primary', '{color.neutral.1000}');
        ringDesignToken.addRingColor('button', '{ring.primary}');
        expect(ringDesignToken.css()).toStrictEqual([
          '--pw-ring-primary: var(--pw-color-neutral-1000);',
          '--pw-ring-button: var(--pw-ring-primary);',
        ]);
      });

      test('tailwind config', () => {
        ringDesignToken.addRingColor('primary', '{color.neutral.1000}');
        ringDesignToken.addRingColor('button', '{ring.primary}');
        expect(ringDesignToken.tailwindConfig()).toStrictEqual({
          theme: {
            extend: {
              ringColor: {
                button: 'var(--pw-ring-button) /* #000105 */',
                primary: 'var(--pw-ring-primary) /* #000105 */',
              },
            },
          },
        });
      });
    });
  });
});
