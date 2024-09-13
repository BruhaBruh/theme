import { DesignTokenType } from '@/types/design-token-type';
import { TailwindConfig } from '@/types/tailwind';
import { ColorTranslator, RGBObject } from 'colortranslator';
import { DesignToken } from '../design-token';

type ColorGenerateOptions = {
  modifierGenerator?: {
    min: number;
    max: number;
    step: number;
  };
  hsbGenerator?: {
    min?: number;
    max?: number;
    middle?: number;
  };
  type?: 'color' | 'neutral';
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
    const baseColorRgb = this.rgbFromStringWithReferences(baseColor);
    const color = this.color(baseColorRgb, {
      type: 'color',
      ...options,
    });

    Object.entries(color).forEach(([key, value]) => {
      this.addColor(`${name}-${key}`, value);
    });
  }

  override tailwindConfig(): TailwindConfig {
    const colors: Record<string, string | Record<string, string>> = {};

    this.tokens.forEach((token) => {
      const value = token.css
        ? `rgb(${token.css.keyVariable}, <alpha-value>) /* ${token.value} */`
        : `${token.value}`;

      if (!token.name.includes('-')) {
        colors[token.name] = value;
        return;
      }

      const [name, ...modifier] = token.name.split('-');
      if (typeof colors[name] === 'string')
        colors[name] = { DEFAULT: colors[name] };
      if (!colors[name]) colors[name] = {};
      colors[name][modifier.join('-')] = value;
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

  private rgbFromStringWithReferences(ref: string): RGBObject {
    const reference = this.resolveReferences(ref);
    const value = this.resolveAbsoluteValue(reference);
    try {
      return ColorTranslator.toRGBObject(value);
    } catch (ignore) {
      throw new Error(`fail convert ${reference} with ${value} to rgb object`);
    }
  }

  private color(
    base: RGBObject,
    {
      type,
      modifierGenerator = {
        min: 100,
        max: 1000,
        step: 50,
      },
      hsbGenerator = {},
    }: ColorGenerateOptions,
  ): Record<string, string> {
    const result: Record<string, string> = {};

    for (
      let modifier = modifierGenerator.min;
      modifier <= modifierGenerator.max;
      modifier += modifierGenerator.step
    ) {
      const baseHSB = this.hsbFromRgb(base);

      const t = this.normalize(modifier, {
        minInput: modifierGenerator.min,
        maxInput: modifierGenerator.max,
        minOutput: -1,
      });

      let rgb: RGBObject = { R: 0, G: 0, B: 0 };
      if (type === 'color') {
        const { min = 10, middle = 80, max = 100 } = hsbGenerator;

        let saturation = middle;
        let brightness = middle;
        if (t <= 0) {
          const t0 = 1 + t;
          saturation = t0 * (middle - min) + min;
          brightness = max - t0 * min * 2;
        } else if (t > 0) {
          saturation = middle + t * min * 2;
          brightness = middle - t * min * 7;
        }

        rgb = this.rgbFromHsb({
          H: baseHSB.H,
          S: saturation,
          B: brightness,
        });
      } else if (type === 'neutral') {
        const { min = 2, middle = 20, max = 98 } = hsbGenerator;

        let saturation = middle;
        let brightness = middle;
        if (t <= 0) {
          const t0 = 1 + t;
          saturation = t0 * (middle - min) + min;
          brightness = max - t0 * (max - middle);
        } else if (t > 0) {
          saturation = middle + t * (max - middle);
          brightness = middle - t * (middle - min);
        }

        rgb = this.rgbFromHsb({
          H: baseHSB.H,
          S: saturation,
          B: brightness,
        });
      }

      result[modifier] = this.stringFromRgb(rgb);
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

  private hsbFromRgb({ R: red, G: green, B: blue }: RGBObject): {
    H: number;
    S: number;
    B: number;
  } {
    const R = Math.max(0, Math.min(red / 255, 1));
    const G = Math.max(0, Math.min(green / 255, 1));
    const B = Math.max(0, Math.min(blue / 255, 1));
    const max = Math.max(R, G, B);
    const min = Math.min(R, G, B);
    let H = 0;
    let S = 0;
    const V = max;
    if (max === min) return { H, S: S * 100, B: V * 100 };

    if (max === R && G >= B) {
      H = 60 * ((G - B) / (max - min));
    } else if (max === R && G < B) {
      H = 60 * ((G - B) / (max - min)) + 360;
    } else if (max === G) {
      H = 60 * ((B - R) / (max - min)) + 120;
    } else if (max === B) {
      H = 60 * ((R - G) / (max - min)) + 240;
    }

    if (max !== 0) {
      S = 1 - min / max;
    }

    return { H, S: S * 100, B: V * 100 };
  }

  private rgbFromHsb({
    H,
    S,
    B: V,
  }: {
    H: number;
    S: number;
    B: number;
  }): RGBObject {
    const h = Math.floor((H / 60) % 6);
    const min = ((100 - S) * V) / 100;
    const delta = (V - min) * ((H % 60) / 60);
    const inc = min + delta;
    const dec = V - delta;

    let R = 0;
    let G = 0;
    let B = 0;
    if (h === 0) {
      R = V;
      G = inc;
      B = min;
    } else if (h === 1) {
      R = dec;
      G = V;
      B = min;
    } else if (h === 2) {
      R = min;
      G = V;
      B = inc;
    } else if (h === 3) {
      R = min;
      G = dec;
      B = V;
    } else if (h === 4) {
      R = inc;
      G = min;
      B = V;
    } else if (h === 5) {
      R = V;
      G = min;
      B = dec;
    }

    return {
      R: Math.min(255, (R / 100) * 255),
      G: Math.min(255, (G / 100) * 255),
      B: Math.min(255, (B / 100) * 255),
      A: 1,
    };
  }

  private stringFromRgb(rgb: RGBObject): string {
    return ColorTranslator.toHEX(rgb);
  }
}
