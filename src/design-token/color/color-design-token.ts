import {
  Color,
  colorVariants,
  colorVariantsByAlpha,
  colorVariantsByDarken,
} from '@/types/color';
import { DesignTokenType } from '@/types/design-token-type';
import { TailwindConfig } from '@/types/tailwind';
import {
  Hct,
  argbFromRgb,
  blueFromArgb,
  greenFromArgb,
  redFromArgb,
} from '@material/material-color-utilities';
import { ColorTranslator, RGBObject } from 'colortranslator';
import { easeInOutSine, easeInSine, easeOutSine } from 'easing-utils';
import { DesignToken } from '../design-token';

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
    sourceColor: string,
    {
      baseLightColor = '#ffffff',
      baseDarkColor = '#000000',
      darkenRatio = 25,
    }: Partial<{
      baseLightColor: string;
      baseDarkColor: string;
      darkenRatio: number;
    }> = {},
  ) {
    let sourceColorRGBObject: RGBObject;
    const sourceColorReference = this.resolveReferences(sourceColor);
    try {
      const sourceAbsoluteValue =
        this.resolveAbsoluteValue(sourceColorReference);
      sourceColorRGBObject = ColorTranslator.toRGBObject(sourceAbsoluteValue);
    } catch (ignore) {
      throw new Error(`source color of "${baseLightColor}" is invalid`);
    }
    let baseLightColorRGBObject: RGBObject;
    const baseLightColorReference = this.resolveReferences(baseLightColor);
    try {
      const baseLightAbsoluteValue = this.resolveAbsoluteValue(
        baseLightColorReference,
      );
      baseLightColorRGBObject = ColorTranslator.toRGBObject(
        baseLightAbsoluteValue,
      );
    } catch (ignore) {
      throw new Error(`base light color of "${baseLightColor}" is invalid`);
    }
    let baseDarkColorRGBObject: RGBObject;
    const baseDarkColorReference = this.resolveReferences(baseDarkColor);
    try {
      const baseDarkAbsoluteValue = this.resolveAbsoluteValue(
        baseDarkColorReference,
      );
      baseDarkColorRGBObject = ColorTranslator.toRGBObject(
        baseDarkAbsoluteValue,
      );
    } catch (ignore) {
      throw new Error(`base dark color of "${baseDarkColor}" is invalid`);
    }
    const color = this.color(
      name,
      sourceColorRGBObject,
      baseLightColorRGBObject,
      baseDarkColorRGBObject,
      darkenRatio,
    );

    Object.entries(color).forEach(([key, value]) => {
      this.addColor(`${name}-${key}`, value);
    });
  }

  override tailwindConfig(): TailwindConfig {
    const colors: Record<string, string> = {};

    this.tokens.forEach((token) => {
      colors[token.name] = token.css
        ? `${token.css.keyVariable} /* ${token.value} */`
        : token.value;
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

  private color(
    name: string,
    sourceColor: RGBObject,
    lightBaseColor: RGBObject,
    darkBaseColor: RGBObject,
    darkenRatio: number,
  ): Color {
    const result = {} as Color;

    const color = ColorTranslator.toRGBObject(sourceColor);
    if (name === 'white') {
      colorVariants.forEach((variant) => {
        const withAlpha = this.withAlpha(
          color,
          easeInSine(
            this.normalize(variant, {
              minInput: 50,
              maxInput: 1000,
              minOutput: 0.17,
              maxOutput: 1,
            }),
          ),
        );

        result[variant] = this.toHSL(withAlpha);
        result[variant + '-sd'] = this.toHSL(
          this.toRGB(withAlpha, darkBaseColor),
        );
        result[variant + '-sl'] = this.toHSL(
          this.toRGB(withAlpha, lightBaseColor),
        );
      });
    } else if (name === 'black') {
      colorVariants.forEach((variant) => {
        const withAlpha = this.withAlpha(
          color,
          easeInSine(
            this.normalize(variant, {
              minInput: 50,
              maxInput: 1000,
              minOutput: 0.14,
              maxOutput: 1,
            }),
          ),
        );

        result[variant] = this.toHSL(withAlpha);
        result[variant + '-sd'] = this.toHSL(
          this.toRGB(withAlpha, darkBaseColor),
        );
        result[variant + '-sl'] = this.toHSL(
          this.toRGB(withAlpha, lightBaseColor),
        );
      });
    } else {
      colorVariantsByAlpha.forEach((variant) => {
        const withAlpha = this.withAlpha(
          color,
          easeInOutSine(
            this.normalize(variant, {
              minInput: 50,
              maxInput: 600,
              minOutput: 0.08,
              maxOutput: 0.78,
            }),
          ),
        );
        result[variant] = this.toHSL(withAlpha);
        result[variant + '-sd'] = this.toHSL(
          this.toRGB(withAlpha, darkBaseColor),
        );
        result[variant + '-sl'] = this.toHSL(
          this.toRGB(withAlpha, lightBaseColor),
        );
      });
      colorVariantsByDarken.forEach((variant) => {
        const colorWithSubtractTone = this.toHSL(
          this.withSubtractTone(
            color,
            darkenRatio *
              easeOutSine(
                this.normalize(variant, {
                  minInput: 650,
                  maxInput: 1000,
                  minOutput: 0.12,
                  maxOutput: 1,
                }),
              ),
          ),
        );
        result[variant] = colorWithSubtractTone;
        result[variant + '-sd'] = colorWithSubtractTone;
        result[variant + '-sl'] = colorWithSubtractTone;
      });
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

    const normalized =
      ((value - minInput) * (maxOutput - minOutput)) / (maxInput - minInput) +
      minOutput;

    return Math.max(Math.min(normalized, maxOutput), minOutput);
  }

  private toRGB(rgba: RGBObject, base: RGBObject): RGBObject {
    const { R, G, B, A = 1 } = rgba;

    return {
      R: Math.floor((1 - A) * base.R + A * R + 0.5),
      G: Math.floor((1 - A) * base.G + A * G + 0.5),
      B: Math.floor((1 - A) * base.B + A * B + 0.5),
      A: 1,
    };
  }

  private withAlpha(color: RGBObject, alpha: number): RGBObject {
    return {
      ...color,
      A: alpha,
    };
  }

  private withSubtractTone(color: RGBObject, tone: number): RGBObject {
    const hct = Hct.fromInt(argbFromRgb(color.R, color.G, color.B));
    hct.tone = hct.tone - tone;
    const argb = hct.toInt();

    return {
      R: redFromArgb(argb),
      G: greenFromArgb(argb),
      B: blueFromArgb(argb),
      A: 1,
    };
  }

  private toHSL(rgba: RGBObject): string {
    const { H, S, L, A } = ColorTranslator.toHSLAObject(rgba);
    const hue = parseFloat(H.toFixed(2));
    const saturation = parseFloat(S.toFixed(2));
    const lightness = parseFloat(L.toFixed(2));
    const alpha = A ? parseFloat(A.toFixed(2)) : 1;
    return `hsl(${hue} ${saturation}% ${lightness}% / ${alpha})`;
  }
}
