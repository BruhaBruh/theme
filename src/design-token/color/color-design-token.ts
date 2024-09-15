import { DesignTokenType } from '@/types/design-token-type';
import { TailwindConfig } from '@/types/tailwind';
import { Hsv, formatHex, hsv, oklch } from 'culori';
import { DesignToken } from '../design-token';

type ColorGenerateOptions = {
  modifierGenerator?: {
    min?: number;
    max?: number;
    step?: number;
  };
  tintChromaMultiplier?: number;
  shadeChromaMultiplier?: number;
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
    const baseColorHsv = this.hsvFromStringWithReferences(baseColor);
    const color = this.color(baseColorHsv, options);

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

  private hsvFromStringWithReferences(ref: string): Hsv {
    const reference = this.resolveReferences(ref);
    const value = this.resolveAbsoluteValue(reference);
    try {
      const color = hsv(value);
      if (!color) throw new Error();
      return color;
    } catch (ignore) {
      throw new Error(`fail convert ${reference} with ${value} to rgb object`);
    }
  }

  private color(
    base: Hsv,
    {
      modifierGenerator = {},
      tintChromaMultiplier = 1,
      shadeChromaMultiplier = 0.8,
    }: ColorGenerateOptions,
  ): Record<string, string> {
    const result: Record<string, string> = {};

    const { min = 50, max = 950, step = 50 } = modifierGenerator;
    const middle = max / 2;

    for (let modifier = min; modifier <= middle; modifier += step) {
      const color = oklch(base);
      const factor =
        1 -
        this.normalize(modifier, {
          minInput: min,
          maxInput: middle,
        });
      color.l = color.l + (1 - color.l) * factor;
      color.c = color.c * (1 - tintChromaMultiplier * factor);
      result[modifier] = formatHex(color);
    }

    let nearest = max;
    let nearestDelta = Math.abs(nearest - middle);
    for (let modifier = min; modifier <= max; modifier += step) {
      const delta = Math.abs(modifier - middle);
      if (delta < nearestDelta && modifier > middle) {
        nearest = modifier;
        nearestDelta = delta;
      }
    }

    for (let modifier = nearest; modifier <= max; modifier += step) {
      const color = oklch(base);
      const factor = this.normalize(modifier, {
        minInput: nearest,
        maxInput: max,
      });
      color.l = color.l * (1 - factor);
      color.c = color.c * (1 - shadeChromaMultiplier * factor);
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
}
