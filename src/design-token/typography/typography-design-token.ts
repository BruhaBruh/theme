import type { CSSTree, CSSVariables } from '@/types/css';
import type { DesignTokenType } from '@/types/design-token-type';
import { DesignToken } from '../design-token';
import type { FontFamilyDesignToken } from './font-family-design-token';
import type { FontSizeDesignToken } from './font-size-design-token';
import type { FontWeightDesignToken } from './font-weight-design-token';
import type { LetterSpacingDesignToken } from './letter-spacing-design-token';
import { LineHeightDesignToken } from './line-height-design-token';

type Typography = {
  fontFamily?: string;
  fontWeight?: string;
  lineHeight?: string;
  fontSize?: string;
  letterSpacing?: string;
};

export class TypographyDesignToken extends DesignToken {
  static type: DesignTokenType = 'typography' as const;
  #fontFamilyDesignToken: FontFamilyDesignToken;
  #fontWeightDesignToken: FontWeightDesignToken;
  #lineHeightDesignToken: LineHeightDesignToken;
  #fontSizeDesignToken: FontSizeDesignToken;
  #letterSpacingDesignToken: LetterSpacingDesignToken;
  #typographies: Record<string, Typography> = {};

  constructor(
    fontFamilyDesignToken: FontFamilyDesignToken,
    fontWeightDesignToken: FontWeightDesignToken,
    lineHeightDesignToken: LineHeightDesignToken,
    fontSizeDesignToken: FontSizeDesignToken,
    letterSpacing: LetterSpacingDesignToken,
  ) {
    super({
      name: LineHeightDesignToken.name,
      type: LineHeightDesignToken.type,
      prefix: '',
    });
    this.#fontFamilyDesignToken = fontFamilyDesignToken;
    this.#fontWeightDesignToken = fontWeightDesignToken;
    this.#lineHeightDesignToken = lineHeightDesignToken;
    this.#fontSizeDesignToken = fontSizeDesignToken;
    this.#letterSpacingDesignToken = letterSpacing;
  }

  addTypography(name: string, typography: Typography): void {
    const newTypography = typography;

    if (typography.fontFamily) {
      newTypography.fontFamily = this.#fontFamilyDesignToken.resolveReferences(
        typography.fontFamily,
      );
    }
    if (typography.fontWeight) {
      newTypography.fontWeight = this.#fontWeightDesignToken.resolveReferences(
        typography.fontWeight,
      );
    }
    if (typography.lineHeight) {
      newTypography.lineHeight = this.#lineHeightDesignToken.resolveReferences(
        typography.lineHeight,
      );
    }
    if (typography.fontSize) {
      newTypography.fontSize = this.#fontSizeDesignToken.resolveReferences(
        typography.fontSize,
      );
    }
    if (typography.letterSpacing) {
      newTypography.letterSpacing =
        this.#letterSpacingDesignToken.resolveReferences(
          typography.letterSpacing,
        );
    }

    this.#typographies[name] = newTypography;
  }

  override otherCss(_selector: string, absolute: boolean): CSSTree {
    if (Object.entries(this.#typographies).length === 0) {return [];}
    return Object.entries(this.#typographies).map(([name, typography]) => [
      `@utility typography-${name} {`,
      Object.entries(
        this.resolveTypographyCSSVariables(absolute, typography),
      ).map(
        ([key, value]) =>
          `  ${key}: ${value.replace(/^var\(([^,]+),([^)]+)\)$/i, 'var($1)')};`,
      ),
      '}',
    ]);
  }

  private resolveTypographyCSSVariables(
    absolute: boolean,
    rawTypography: Typography,
  ): CSSVariables {
    const typography = absolute
      ? this.resolveAbsoluteTypography(rawTypography)
      : rawTypography;

    const css: CSSVariables = {};

    if (typography.fontFamily) {
      css[`font-family`] = typography.fontFamily;
    }
    if (typography.fontWeight) {
      css[`font-weight`] = typography.fontWeight;
    }
    if (typography.lineHeight) {
      css[`line-height`] = typography.lineHeight;
    }
    if (typography.fontSize) {
      css[`font-size`] = typography.fontSize;
    }
    if (typography.letterSpacing) {
      css[`letter-spacing`] = typography.letterSpacing;
    }

    return css;
  }

  private resolveAbsoluteTypography({
    fontFamily,
    fontWeight,
    lineHeight,
    fontSize,
    letterSpacing,
  }: Typography): Typography {
    return {
      fontFamily: fontFamily
        ? this.#fontFamilyDesignToken.resolveAbsoluteValue(fontFamily)
        : undefined,
      fontWeight: fontWeight
        ? this.#fontWeightDesignToken.resolveAbsoluteValue(fontWeight)
        : undefined,
      lineHeight: lineHeight
        ? this.#lineHeightDesignToken.resolveAbsoluteValue(lineHeight)
        : undefined,
      fontSize: fontSize
        ? this.#fontSizeDesignToken.resolveAbsoluteValue(fontSize)
        : undefined,
      letterSpacing: letterSpacing
        ? this.#letterSpacingDesignToken.resolveAbsoluteValue(letterSpacing)
        : undefined,
    };
  }
}
