import { DesignTokenType } from '@/types/design-token-type';
import { TailwindConfig } from '@/types/tailwind';
import { Oklch, formatHex, interpolate, oklch } from 'culori';
import { DesignToken } from '../design-token';

type ColorGenerateOptions = {
  modifierGenerator?: {
    min?: number;
    max?: number;
    step?: number;
  };
};

export class ColorDesignToken extends DesignToken {
  static type: DesignTokenType = 'color' as const;

  constructor({ prefix = '' }: { prefix?: string } = {}) {
    super({ type: ColorDesignToken.type, prefix });
    this.addToken('inherit', 'inherit');
    this.addToken('transparent', 'transparent');
    this.addToken('initial', 'initial');
    this.addToken('current', 'currentColor');
    this.addToken('unset', 'unset');
  }

  addColor(name: string, color: string): void {
    const cssValue = this.resolveReferences(color);
    this.addToken(name, this.resolveAbsoluteValue(cssValue), {
      key: [name],
      value: cssValue,
    });
  }

  generateColor(
    name: string,
    baseColor: string,
    options: ColorGenerateOptions = {},
  ) {
    const baseColorOklch = this.oklchFromStringWithReferences(baseColor);
    const color = this.color(baseColorOklch, options);

    Object.entries(color).forEach(([key, value]) => {
      this.addColor(`${name}-${key}`, value);
    });
  }

  override tailwindConfig(): TailwindConfig {
    const colors: Record<string, string | Record<string, string>> = {};

    this.tokens.forEach((token) => {
      const value = token.css
        ? `rgb(from ${token.css.keyVariable} r g b / <alpha-value>) /* ${token.value} */`
        : `${token.value}`;

      if (!token.name.includes('-')) {
        colors[token.name] = value;
        return;
      }

      const split = token.name.split('-');
      const name = split.slice(0, -1).join('-');
      const modifier = split.slice(-1).join('-');
      if (typeof colors[name] === 'string')
        colors[name] = { DEFAULT: colors[name] };
      if (!colors[name]) colors[name] = {};
      colors[name][modifier] = value;
    });

    return {
      theme: {
        colors,
      },
    };
  }

  override resolveAbsoluteValue(value: string): string {
    if (!(value.startsWith('var(') && value.endsWith(')'))) return value;
    const cssVar = value.slice(4, -1);
    const token = this.tokens.find((t) => t.css && t.css.key === cssVar);
    if (!token) return super.resolveAbsoluteValue(value);
    return token.value;
  }

  protected override variable({
    type = 'key',
    parts = [],
  }: Partial<{
    type: 'key' | 'value';
    parts: (string | undefined)[];
  }>): string {
    return super.variable({ type, parts: [this.type, ...parts] });
  }

  private oklchFromStringWithReferences(ref: string): Oklch {
    const reference = this.resolveReferences(ref);
    const value = this.resolveAbsoluteValue(reference);
    try {
      const color = oklch(value);
      if (!color) throw new Error();
      return color;
    } catch (ignore) {
      throw new Error(`fail convert ${reference} with ${value} to rgb object`);
    }
  }

  private color(
    base: Oklch,
    { modifierGenerator = {} }: ColorGenerateOptions,
  ): Record<string, string> {
    const result: Record<string, string> = {};

    const { min = 50, max = 950, step = 50 } = modifierGenerator;

    const interpolator = interpolate(['#ffffff', base, '#000000'], 'cubehelix');

    for (let modifier = min; modifier <= max; modifier += step) {
      const color = interpolator(
        this.normalize(modifier, {
          minInput: min,
          maxInput: max,
        }),
      );
      if (!color) throw new Error(`invalid color: ${color}`);
      result[modifier] = formatHex(color);
    }

    return result;
  }

  private normalize(
    value: number,
    {
      minInput,
      maxInput,
      minOutput = 0,
      maxOutput = 1,
    }: {
      minInput: number;
      maxInput: number;
      minOutput?: number;
      maxOutput?: number;
    },
  ): number {
    if (minInput === maxInput) {
      throw new Error('minInput and maxInput should not be equal');
    }
    if (minInput > maxInput) {
      throw new Error('minInput should be less than maxInput');
    }
    if (minOutput === maxOutput) {
      throw new Error('minOutput and maxOutput should not be equal');
    }
    if (minOutput > maxOutput) {
      throw new Error('minOutput should be less than maxOutput');
    }

    const normalized =
      ((value - minInput) * (maxOutput - minOutput)) / (maxInput - minInput) +
      minOutput;

    return Math.max(Math.min(normalized, maxOutput), minOutput);
  }

  private easeOutSine(t: number): number {
    return Math.sin((t * Math.PI) / 2);
  }

  private easeInOutSine(t: number): number {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  }
}
