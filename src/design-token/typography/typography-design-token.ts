import { DesignTokenType } from '@/types/design-token-type';
import { TailwindPluginApi } from '@/types/tailwind';
import { DesignToken } from '../design-token';
import { FontFamilyDesignToken } from './font-family-design-token';
import { FontSizeDesignToken } from './font-size-design-token';
import { FontWeightDesignToken } from './font-weight-design-token';
import { LetterSpacingDesignToken } from './letter-spacing-design-token';
import { LineHeightDesignToken } from './line-height-design-token';
import { ParagraphSpacingDesignToken } from './paragraph-spacing-design-token';

type Typography = {
  fontFamily?: string;
  fontWeight?: string;
  lineHeight?: string;
  fontSize?: string;
  paragraphSpacing?: string;
  letterSpacing?: string;
};

export class TypographyDesignToken extends DesignToken {
  static type: DesignTokenType = 'typography' as const;
  #fontFamilyDesignToken: FontFamilyDesignToken;
  #fontWeightDesignToken: FontWeightDesignToken;
  #lineHeightDesignToken: LineHeightDesignToken;
  #fontSizeDesignToken: FontSizeDesignToken;
  #paragraphSpacingDesignToken: ParagraphSpacingDesignToken;
  #letterSpacingDesignToken: LetterSpacingDesignToken;
  #typographies: Record<string, Typography> = {};

  constructor(
    fontFamilyDesignToken: FontFamilyDesignToken,
    fontWeightDesignToken: FontWeightDesignToken,
    lineHeightDesignToken: LineHeightDesignToken,
    fontSizeDesignToken: FontSizeDesignToken,
    paragraphSpacingDesignToken: ParagraphSpacingDesignToken,
    letterSpacing: LetterSpacingDesignToken,
  ) {
    super({ type: TypographyDesignToken.type, prefix: '' });
    this.#fontFamilyDesignToken = fontFamilyDesignToken;
    this.#fontWeightDesignToken = fontWeightDesignToken;
    this.#lineHeightDesignToken = lineHeightDesignToken;
    this.#fontSizeDesignToken = fontSizeDesignToken;
    this.#paragraphSpacingDesignToken = paragraphSpacingDesignToken;
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
    if (typography.paragraphSpacing) {
      newTypography.paragraphSpacing =
        this.#paragraphSpacingDesignToken.resolveReferences(
          typography.paragraphSpacing,
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

  override applyTailwind({ addUtilities, e }: TailwindPluginApi): void {
    Object.entries(this.#typographies).forEach(([name, typography]) => {
      const css: Record<string, string> = {};

      if (typography.fontFamily) {
        css['font-family'] = typography.fontFamily;
      }
      if (typography.fontWeight) {
        css['font-weight'] = typography.fontWeight;
      }
      if (typography.lineHeight) {
        css['line-height'] = typography.lineHeight;
      }
      if (typography.fontSize) {
        css['font-size'] = typography.fontSize;
      }
      if (typography.paragraphSpacing) {
        css['margin-top'] = typography.paragraphSpacing;
        css['margin-bottom'] = typography.paragraphSpacing;
      }
      if (typography.letterSpacing) {
        css['letter-spacing'] = typography.letterSpacing;
      }

      addUtilities({
        [e(`.typography-${name}`)]: css,
      });
    });
  }

  override css(): string[] {
    const css: string[] = [];

    Object.entries(this.#typographies).forEach(
      ([name, typography], index, arr) => {
        css.push(`.typography-${name} {`);

        if (typography.fontFamily) {
          css.push(`  font-family: ${typography.fontFamily};`);
        }
        if (typography.fontWeight) {
          css.push(`  font-weight: ${typography.fontWeight};`);
        }
        if (typography.lineHeight) {
          css.push(`  line-height: ${typography.lineHeight};`);
        }
        if (typography.fontSize) {
          css.push(`  font-size: ${typography.fontSize};`);
        }
        if (typography.paragraphSpacing) {
          css.push(`  margin-top: ${typography.paragraphSpacing};`);
          css.push(`  margin-bottom: ${typography.paragraphSpacing};`);
        }
        if (typography.letterSpacing) {
          css.push(`  letter-spacing: ${typography.letterSpacing};`);
        }

        css.push(`}`);
        if (index < arr.length - 1) {
          css.push('');
        }
      },
    );

    return css;
  }
}
