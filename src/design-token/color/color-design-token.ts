import { Easing, EasingFn, easing } from '@/lib/easings';
import { DesignTokenType } from '@/types/design-token-type';
import { TailwindConfig } from '@/types/tailwind';
import { ColorTranslator, RGBObject } from 'colortranslator';
import { DesignToken } from '../design-token';

type ColorGenerateOptions = {
  solid?: Partial<{
    light: RGBObject;
    dark: RGBObject;
  }>;
  modifierGenerator?: {
    min: number;
    max: number;
    step: number;
  };
  type?: 'hsb' | 'alpha';
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
    options: Omit<ColorGenerateOptions, 'solid'> & {
      solid?: Partial<{
        light: string;
        dark: string;
      }>;
    } = {},
  ) {
    const baseColorRgb = this.rgbFromStringWithReferences(baseColor);
    const color = this.color(baseColorRgb, {
      type: 'hsb',
      ...options,
      solid: {
        light: options.solid?.light
          ? this.rgbFromStringWithReferences(options.solid.light)
          : undefined,
        dark: options.solid?.dark
          ? this.rgbFromStringWithReferences(options.solid.dark)
          : undefined,
      },
    });

    this.addColor(`${name}-DEFAULT`, this.hslStringFromRgb(baseColorRgb));
    Object.entries(color).forEach(([key, value]) => {
      this.addColor(`${name}-${key}`, value);
    });
  }

  override tailwindConfig(): TailwindConfig {
    const colors: Record<string, string | Record<string, string>> = {};

    this.tokens.forEach((token) => {
      const value = token.css
        ? `${token.css.keyVariable} /* ${token.value} */`
        : token.value;

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
      solid,
      modifierGenerator = {
        min: 50,
        max: 1000,
        step: 50,
      },
    }: ColorGenerateOptions,
  ): Record<string, string> {
    const result: Record<string, string> = {};

    for (
      let modifier = modifierGenerator.min;
      modifier <= modifierGenerator.max;
      modifier += modifierGenerator.step
    ) {
      if (type === 'hsb') {
        const baseHSB = this.hsbFromRgb(base);

        const normalizedSaturation = this.normalize(modifier, {
          minInput: modifierGenerator.min,
          maxInput: modifierGenerator.max,
          minOutput: 0.05,
        });
        const saturationWithBezier = Math.max(
          0,
          Math.min(this.bezier(normalizedSaturation), 1),
        );
        const saturation = saturationWithBezier * 100;
        const normalizedBrightness = this.normalize(modifier, {
          minInput: modifierGenerator.min,
          maxInput: modifierGenerator.max,
          minOutput: 0.05,
          maxOutput: 0.98,
        });
        const brightnessWithBezier = Math.max(
          0,
          Math.min(this.easingByName('easeInQuint')(normalizedBrightness)),
        );
        const brightness = (1 - brightnessWithBezier) * 100;

        const rgb = this.rgbFromHsb({
          H: baseHSB.H,
          S: saturation,
          B: brightness,
        });

        const transparent = this.solidToTransparent(rgb);

        result[modifier] = this.hslStringFromRgb(transparent);
        if (solid?.dark) {
          result[`${modifier}-sd`] = this.hslStringFromRgb(
            this.transparentOnBackground(transparent, solid.dark),
          );
        }
        if (solid?.light) {
          result[`${modifier}-sl`] = this.hslStringFromRgb(
            this.transparentOnBackground(transparent, solid.light),
          );
        }
      } else if (type === 'alpha') {
        const normalizedAlpha = this.normalize(modifier, {
          minInput: modifierGenerator.min,
          maxInput: modifierGenerator.max,
          minOutput: 0.15,
          maxOutput: 1,
        });

        const transparent = this.withAlpha(
          base,
          this.easingByName('easeInSine')(normalizedAlpha),
        );

        result[modifier] = this.hslStringFromRgb(transparent);
        if (solid?.dark) {
          result[`${modifier}-sd`] = this.hslStringFromRgb(
            this.transparentOnBackground(transparent, solid.dark),
          );
        }
        if (solid?.light) {
          result[`${modifier}-sl`] = this.hslStringFromRgb(
            this.transparentOnBackground(transparent, solid.light),
          );
        }
      }
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

  private bezier(n: number): number {
    const p0 = 0;
    const p1 = 0.8;
    const p2 = 0.2;
    const p3 = 1;

    const result =
      Math.pow(1 - n, 3) * p0 +
      3 * Math.pow(1 - n, 2) * n * p1 +
      3 * (1 - n) * Math.pow(n, 2) * p2 +
      Math.pow(n, 3) * p3;

    return result;
  }

  private easingByName(name: Easing): EasingFn {
    return easing(name);
  }

  private withAlpha(rgb: RGBObject, alpha: number): RGBObject {
    if (alpha < 0 || alpha > 1) {
      throw new Error('alpha should be between 0 and 1');
    }

    return {
      ...rgb,
      A: alpha,
    };
  }

  private transparentOnBackground(
    rgb: RGBObject,
    background: RGBObject,
  ): RGBObject {
    const { R, G, B, A = 1 } = rgb;
    const { R: BR, G: BG, B: BB } = background;

    return {
      R: Math.floor((1 - A) * BR + A * R + 0.5),
      G: Math.floor((1 - A) * BG + A * G + 0.5),
      B: Math.floor((1 - A) * BB + A * B + 0.5),
      A: 1,
    };
  }

  private solidToTransparent({ R, G, B }: RGBObject): RGBObject {
    const A = 1 - Math.min(R, G, B) / 255;

    if (A === 0) {
      return {
        R: 0,
        G: 0,
        B: 0,
        A: 0,
      };
    }
    const newR = Math.round((1 - (1 - R / 255) / A) * 255);
    const newG = Math.round((1 - (1 - G / 255) / A) * 255);
    const newB = Math.round((1 - (1 - B / 255) / A) * 255);

    return {
      R: Math.max(0, Math.min(255, newR)),
      G: Math.max(0, Math.min(255, newG)),
      B: Math.max(0, Math.min(255, newB)),
      A,
    };
  }

  private hsbFromRgb({ R, G, B }: RGBObject): {
    H: number;
    S: number;
    B: number;
  } {
    const max = Math.max(R, G, B);
    const min = Math.min(R, G, B);
    const delta = max - min;

    let h = 0;
    if (delta !== 0) {
      if (max === R) {
        h = ((G - B) / delta) % 6;
      } else if (max === G) {
        h = (B - R) / delta + 2;
      } else {
        h = (R - G) / delta + 4;
      }
      h *= 60;
      if (h < 0) h += 360;
    }

    const s = max === 0 ? 0 : delta / max;
    const brightness = max / 255;

    return {
      H: Math.round(h),
      S: Number((s * 100).toFixed(2)),
      B: Number((brightness * 100).toFixed(2)),
    };
  }

  private rgbFromHsb({
    H,
    S,
    B,
  }: {
    H: number;
    S: number;
    B: number;
  }): RGBObject {
    const saturation = S / 100;
    const brightness = B / 100;
    const c = brightness * saturation;
    const x = c * (1 - Math.abs(((H / 60) % 2) - 1));
    const m = brightness - c;

    let r = 0;
    let g = 0;
    let b = 0;

    if (H >= 0 && H < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (H >= 60 && H < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (H >= 120 && H < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (H >= 180 && H < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (H >= 240 && H < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (H >= 300 && H < 360) {
      r = c;
      g = 0;
      b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { R: r, G: g, B: b, A: 1 };
  }

  private hslStringFromRgb(rgb: RGBObject): string {
    const { H, S, L, A } = ColorTranslator.toHSLAObject(rgb);
    const hue = parseFloat(H.toFixed(2));
    const saturation = parseFloat(S.toFixed(2));
    const lightness = parseFloat(L.toFixed(2));
    const alpha = A ? parseFloat(A.toFixed(2)) : 1;
    return `hsl(${hue} ${saturation}% ${lightness}% / ${alpha})`;
  }
}
