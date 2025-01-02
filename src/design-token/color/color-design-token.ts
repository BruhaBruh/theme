import {
  ColorGenerator,
  MaterialColorGenerator,
} from '@/config/schema/theme-config';
import { DesignTokenType } from '@/types/design-token-type';
import { Err, Ok, Result } from '@bruhabruh/type-safe';
import {
  CustomColor,
  Hct,
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
} from '@material/material-color-utilities';
import { Oklch, formatHex, interpolate, oklch } from 'culori';
import { DesignToken, DesignTokenArgs } from '../design-token';
export class ColorDesignToken extends DesignToken {
  static type: DesignTokenType = 'color' as const;

  constructor({ prefix = '' }: Partial<DesignTokenArgs<'prefix'>> = {}) {
    super({
      name: ColorDesignToken.name,
      type: ColorDesignToken.type,
      prefix,
    });
    this.addToken('inherit', 'inherit');
    this.addToken('transparent', 'transparent');
    this.addToken('initial', 'initial');
    this.addToken('current', 'currentColor');
    this.addToken('unset', 'unset');
  }

  addColor(name: string, color: string): void {
    const cssValue = this.resolveReferences(color);
    this.addToken(name, this.resolveAbsoluteValue(cssValue), {
      css: {
        key: [name],
        value: cssValue,
      },
    });
  }

  generateMaterialColors({
    source,
    customColors,
  }: MaterialColorGenerator): Result<true, string> {
    const sourceColorOklch = this.oklchFromStringWithReferences(source);
    if (sourceColorOklch.isErr()) {
      return sourceColorOklch.mapErr(
        (err) => `Fail convert source color "${source}" to oklch: ${err}`,
      );
    }
    const mappedCustomColors: CustomColor[] = [];
    for (let i = 0; i < customColors.length; i++) {
      const customColor = customColors[i];
      const valueInOklch = this.oklchFromStringWithReferences(
        customColor.value,
      );
      if (sourceColorOklch.isErr()) {
        return sourceColorOklch.mapErr(
          (err) =>
            `Fail convert custom color "${customColor.name}" to oklch: ${err}`,
        );
      }
      mappedCustomColors.push({
        ...customColor,
        value: argbFromHex(formatHex(valueInOklch.unwrap())),
      });
    }
    const theme = themeFromSourceColor(
      argbFromHex(formatHex(sourceColorOklch.unwrap())),
      mappedCustomColors,
    );
    const addColor = (name: string, getHct: (n: number) => Hct) => {
      for (let i = 0; i <= 100; i++) {
        const hct = hexFromArgb(getHct(i).toInt());
        this.addColor(`${name}-${i}`, hct);
      }
    };

    addColor('neutral', (i) => theme.palettes.neutral.getHct(i));
    addColor('neutral-variant', (i) => theme.palettes.neutralVariant.getHct(i));
    addColor('primary', (i) => theme.palettes.primary.getHct(i));
    addColor('secondary', (i) => theme.palettes.secondary.getHct(i));
    addColor('tertiary', (i) => theme.palettes.tertiary.getHct(i));
    addColor('critical', (i) => theme.palettes.error.getHct(i));
    theme.customColors.forEach((customColor) => {
      addColor(customColor.color.name, (i) => {
        const hct = Hct.fromInt(customColor.value);
        hct.tone = i;
        return hct;
      });
    });

    return Ok(true);
  }

  generateColor(
    name: string,
    baseColor: string,
    options: ColorGenerator,
  ): Result<true, string> {
    const baseColorOklch = this.oklchFromStringWithReferences(baseColor);
    if (baseColorOklch.isErr()) {
      return baseColorOklch.mapErr(
        (err) => `Fail convert base color "${baseColor}" to oklch: ${err}`,
      );
    }
    const color = this.generateColorModifiers(baseColorOklch.unwrap(), options);

    if (color.isErr()) {
      return color.mapErr((err) => `Fail generate color "${name}": ${err}`);
    }

    Object.entries(color.unwrap()).forEach(([key, value]) => {
      this.addColor(`${name}-${key}`, value);
    });

    return Ok(true);
  }

  override resolveAbsoluteValue(value: string): string {
    if (!(value.startsWith('var(') && value.endsWith(')'))) return value;
    const cssVar = value.slice(4, -1);
    const token = this.tokens.find((t) =>
      t.css.isSomeAnd((css) => css.key === cssVar),
    );
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

  private oklchFromStringWithReferences(ref: string): Result<Oklch, string> {
    const reference = this.resolveReferences(ref);
    const value = this.resolveAbsoluteValue(reference);
    try {
      const color = oklch(value);
      if (!color) throw new Error();
      return Ok(color);
    } catch {
      return Err(`Fail convert ${reference} with ${value} to rgb object`);
    }
  }

  private generateColorModifiers(
    base: Oklch,
    { min, max, step, reverse }: ColorGenerator,
  ): Result<Record<string, string>, string> {
    const result: Record<string, string> = {};

    const interpolator = interpolate(['#ffffff', base, '#000000'], 'cubehelix');

    for (let modifier = min; modifier <= max; modifier += step) {
      const baseNormalized = this.normalize(modifier, {
        minInput: min,
        maxInput: max,
      });
      if (baseNormalized.isErr()) {
        return baseNormalized.mapErr(
          (err) => `Fail normalize modifier ${modifier}: ${err}`,
        );
      }
      const normalized = reverse
        ? 1 - baseNormalized.unwrap()
        : baseNormalized.unwrap();

      const color = interpolator(normalized);
      if (!color) return Err(`Invalid color: ${color}`);
      result[modifier] = formatHex(color);
    }

    return Ok(result);
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
  ): Result<number, string> {
    if (minInput === maxInput) {
      return Err('minInput and maxInput should not be equal');
    }
    if (minInput > maxInput) {
      return Err('minInput should be less than maxInput');
    }
    if (minOutput === maxOutput) {
      return Err('minOutput and maxOutput should not be equal');
    }
    if (minOutput > maxOutput) {
      return Err('minOutput should be less than maxOutput');
    }

    const normalized =
      ((value - minInput) * (maxOutput - minOutput)) / (maxInput - minInput) +
      minOutput;

    return Ok(Math.max(Math.min(normalized, maxOutput), minOutput));
  }
}
