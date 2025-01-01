import {
  BorderRadiusDesignToken,
  ColorDesignToken,
  FontFamilyDesignToken,
  FontSizeDesignToken,
  FontWeightDesignToken,
  LetterSpacingDesignToken,
  LineHeightDesignToken,
  SpacingDesignToken,
  TypographyDesignToken,
} from '@/design-token';
import { CSS } from '@/types/css';
import { Ok, Result } from '@bruhabruh/type-safe';
import { merge } from 'ts-deepmerge';
import { ThemeConfig } from './schema/theme-config';

export class TokenManager {
  #colorDesignToken: ColorDesignToken;
  #borderRadiusDesignToken: BorderRadiusDesignToken;
  #spacingDesignToken: SpacingDesignToken;
  #fontFamilyDesignToken: FontFamilyDesignToken;
  #fontWeightDesignToken: FontWeightDesignToken;
  #lineHeightDesignToken: LineHeightDesignToken;
  #fontSizeDesignToken: FontSizeDesignToken;
  #letterSpacingDesignToken: LetterSpacingDesignToken;
  #typographyDesignToken: TypographyDesignToken;

  constructor(prefix: string) {
    this.#colorDesignToken = new ColorDesignToken({ prefix });
    this.#borderRadiusDesignToken = new BorderRadiusDesignToken({ prefix });
    this.#spacingDesignToken = new SpacingDesignToken({ prefix });

    this.#fontFamilyDesignToken = new FontFamilyDesignToken({ prefix });
    this.#fontWeightDesignToken = new FontWeightDesignToken({ prefix });
    this.#lineHeightDesignToken = new LineHeightDesignToken({ prefix });
    this.#fontSizeDesignToken = new FontSizeDesignToken({ prefix });
    this.#letterSpacingDesignToken = new LetterSpacingDesignToken({ prefix });
    this.#typographyDesignToken = new TypographyDesignToken(
      this.#fontFamilyDesignToken,
      this.#fontWeightDesignToken,
      this.#lineHeightDesignToken,
      this.#fontSizeDesignToken,
      this.#letterSpacingDesignToken,
    );
  }

  css(selector: string, absolute: boolean): CSS {
    const css: CSS = {};

    return merge(
      css,
      this.#colorDesignToken.css(selector, absolute),
      this.#borderRadiusDesignToken.css(selector, absolute),
      this.#spacingDesignToken.css(selector, absolute),
      this.#fontFamilyDesignToken.css(selector, absolute),
      this.#fontWeightDesignToken.css(selector, absolute),
      this.#lineHeightDesignToken.css(selector, absolute),
      this.#fontSizeDesignToken.css(selector, absolute),
      this.#letterSpacingDesignToken.css(selector, absolute),
      this.#typographyDesignToken.css(selector, absolute),
    );
  }

  tailwindCSS(selector: string, absolute: boolean): CSS {
    const css: CSS = {};

    return merge(
      css,
      this.#colorDesignToken.tailwindCSS(selector, absolute),
      this.#borderRadiusDesignToken.tailwindCSS(selector, absolute),
      this.#spacingDesignToken.tailwindCSS(selector, absolute),
      this.#fontFamilyDesignToken.tailwindCSS(selector, absolute),
      this.#fontWeightDesignToken.tailwindCSS(selector, absolute),
      this.#lineHeightDesignToken.tailwindCSS(selector, absolute),
      this.#fontSizeDesignToken.tailwindCSS(selector, absolute),
      this.#letterSpacingDesignToken.tailwindCSS(selector, absolute),
      this.#typographyDesignToken.tailwindCSS(selector, absolute),
    );
  }

  load(config: ThemeConfig): Result<true, string> {
    const colorResult = this.loadColorTokens(config.color);
    if (colorResult.isErr()) {
      return colorResult.mapErr((err) => `Fail load color tokens: ${err}`);
    }

    const borderRadiusResult = this.loadBorderRadiusTokens(config.radius);
    if (borderRadiusResult.isErr()) {
      return borderRadiusResult.mapErr(
        (err) => `Fail load border radius tokens: ${err}`,
      );
    }
    const spacingResult = this.loadSpacingTokens(config.spacing);
    if (spacingResult.isErr()) {
      return spacingResult.mapErr((err) => `Fail load spacing tokens: ${err}`);
    }

    const fontFamilyResult = this.loadFontFamilyTokens(config.font);
    if (fontFamilyResult.isErr()) {
      return fontFamilyResult.mapErr(
        (err) => `Fail load font family tokens: ${err}`,
      );
    }
    this.loadFontWeightTokens(config.fontWeight);
    const lineHeightResult = this.loadLineHeightTokens(config.leading);
    if (lineHeightResult.isErr()) {
      return lineHeightResult.mapErr(
        (err) => `Fail load line height tokens: ${err}`,
      );
    }
    const fontSizeResult = this.loadFontSizeTokens(config.text);
    if (fontSizeResult.isErr()) {
      return fontSizeResult.mapErr(
        (err) => `Fail load font size tokens: ${err}`,
      );
    }
    const letterSpacingResult = this.loadLetterSpacingTokens(config.tracking);
    if (letterSpacingResult.isErr()) {
      return letterSpacingResult.mapErr(
        (err) => `Fail load letter spacing tokens: ${err}`,
      );
    }
    this.loadTypographyTokens(config.typography);

    return Ok(true);
  }

  applyGlobalTokenManager(globalTokenManager: TokenManager) {
    this.#colorDesignToken.designTokenReference =
      globalTokenManager.#colorDesignToken;
    this.#borderRadiusDesignToken.designTokenReference =
      globalTokenManager.#borderRadiusDesignToken;
    this.#spacingDesignToken.designTokenReference =
      globalTokenManager.#spacingDesignToken;
    this.#fontFamilyDesignToken.designTokenReference =
      globalTokenManager.#fontFamilyDesignToken;
    this.#fontWeightDesignToken.designTokenReference =
      globalTokenManager.#fontWeightDesignToken;
    this.#lineHeightDesignToken.designTokenReference =
      globalTokenManager.#lineHeightDesignToken;
    this.#fontSizeDesignToken.designTokenReference =
      globalTokenManager.#fontSizeDesignToken;
    this.#letterSpacingDesignToken.designTokenReference =
      globalTokenManager.#letterSpacingDesignToken;
    this.#typographyDesignToken.designTokenReference =
      globalTokenManager.#typographyDesignToken;
  }

  private loadColorTokens(configs: ThemeConfig['color']): Result<true, string> {
    for (let i = 0; i < configs.length; i++) {
      const config = configs[i];
      const colorNames = Object.keys(config);
      for (let j = 0; j < colorNames.length; j++) {
        const colorName = colorNames[j];
        const values = config[colorName];

        const generator = values._generator;
        if (generator && typeof generator !== 'string') {
          const { base, modifier } = generator;

          const result = this.#colorDesignToken.generateColor(colorName, base, {
            modifierGenerator: modifier,
          });
          if (result.isErr()) {
            return result.mapErr(
              (err) => `Fail generate color ${colorName}: ${err}`,
            );
          }
        }

        const withoutGenerator: Record<string, string> = Object.fromEntries(
          Object.entries(values).filter(([key]) => key !== '_generator'),
        );
        Object.entries(withoutGenerator).forEach(([modifier, value]) => {
          this.#colorDesignToken.addColor(`${colorName}-${modifier}`, value);
        });
      }
    }

    return Ok(true);
  }

  private loadBorderRadiusTokens(
    configs: ThemeConfig['radius'],
  ): Result<true, string> {
    for (let i = 0; i < configs.length; i++) {
      const config = configs[i];
      const generator = config._generator;
      if (generator) {
        if (typeof generator !== 'string') {
          const { start, end, namePattern, valuePattern, step } = generator;
          for (let j = start; j <= end; j += step) {
            const name = namePattern.replace(/\{i}/g, j.toString());
            const value = valuePattern.replace(/\{i}/g, j.toString());
            const result = this.#borderRadiusDesignToken.addBorderRadius(
              name,
              value,
            );
            if (result.isErr()) {
              return result.mapErr(
                (err) => `Fail add border radius "${name}": ${err}`,
              );
            }
          }
        }
      } else {
        const entries = Object.entries(config);
        for (let j = 0; j < entries.length; j++) {
          const [name, value] = entries[j];
          const result = this.#borderRadiusDesignToken.addBorderRadius(
            name,
            value,
          );
          if (result.isErr()) {
            return result.mapErr(
              (err) => `Fail add border radius "${name}": ${err}`,
            );
          }
        }
      }
    }

    return Ok(true);
  }

  private loadSpacingTokens(
    configs: ThemeConfig['spacing'],
  ): Result<true, string> {
    for (let i = 0; i < configs.length; i++) {
      const config = configs[i];
      const generator = config._generator;
      if (generator) {
        if (typeof generator !== 'string') {
          const { start, end, namePattern, valuePattern, step } = generator;
          for (let j = start; j <= end; j += step) {
            const name = namePattern.replace(/\{i}/g, j.toString());
            const value = valuePattern.replace(/\{i}/g, j.toString());
            const result = this.#spacingDesignToken.addSpacing(name, value);
            if (result.isErr()) {
              return result.mapErr(
                (err) => `Fail add spacing "${name}": ${err}`,
              );
            }
          }
        }
      } else {
        const entries = Object.entries(config);
        for (let j = 0; j < entries.length; j++) {
          const [name, value] = entries[j];
          const result = this.#spacingDesignToken.addSpacing(name, value);
          if (result.isErr()) {
            return result.mapErr((err) => `Fail add spacing "${name}": ${err}`);
          }
        }
      }
    }

    return Ok(true);
  }

  private loadFontFamilyTokens(
    configs: ThemeConfig['font'],
  ): Result<true, string> {
    for (let i = 0; i < configs.length; i++) {
      const entries = Object.entries(configs[i]);
      for (let j = 0; j < entries.length; j++) {
        const [name, value] = entries[j];

        const result = this.#fontFamilyDesignToken.addFontFamily(name, value);
        if (result.isErr()) {
          return result.mapErr(
            (err) => `Fail add font family "${name}": ${err}`,
          );
        }
      }
    }
    return Ok(true);
  }

  private loadFontWeightTokens(configs: ThemeConfig['fontWeight']) {
    configs.forEach((config) => {
      Object.entries(config).forEach(([name, value]) => {
        this.#fontWeightDesignToken.addFontWeight(name, value);
      });
    });
  }

  private loadLineHeightTokens(
    configs: ThemeConfig['leading'],
  ): Result<true, string> {
    for (let i = 0; i < configs.length; i++) {
      const config = configs[i];
      const generator = config._generator;
      if (generator) {
        if (typeof generator !== 'string') {
          const { start, end, namePattern, valuePattern, step } = generator;
          for (let j = start; j <= end; j += step) {
            const name = namePattern.replace(/\{i}/g, j.toString());
            const value = valuePattern.replace(/\{i}/g, j.toString());
            const result = this.#lineHeightDesignToken.addLineHeight(
              name,
              value,
            );
            if (result.isErr()) {
              return result.mapErr(
                (err) => `Fail add line height "${name}": ${err}`,
              );
            }
          }
        }
      } else {
        const entries = Object.entries(config);
        for (let j = 0; j < entries.length; j++) {
          const [name, value] = entries[j];
          const result = this.#lineHeightDesignToken.addLineHeight(name, value);
          if (result.isErr()) {
            return result.mapErr(
              (err) => `Fail add line height "${name}": ${err}`,
            );
          }
        }
      }
    }

    return Ok(true);
  }

  private loadFontSizeTokens(
    configs: ThemeConfig['text'],
  ): Result<true, string> {
    for (let i = 0; i < configs.length; i++) {
      const config = configs[i];
      const generator = config._generator;
      if (generator) {
        if (typeof generator !== 'string') {
          const { start, end, namePattern, valuePattern, step } = generator;
          for (let j = start; j <= end; j += step) {
            const name = namePattern.replace(/\{i}/g, j.toString());
            const value = valuePattern.replace(/\{i}/g, j.toString());
            const result = this.#fontSizeDesignToken.addFontSize(name, value);
            if (result.isErr()) {
              return result.mapErr(
                (err) => `Fail add font size "${name}": ${err}`,
              );
            }
          }
        }
      } else {
        const entries = Object.entries(config);
        for (let j = 0; j < entries.length; j++) {
          const [name, value] = entries[j];
          const result = this.#fontSizeDesignToken.addFontSize(name, value);
          if (result.isErr()) {
            return result.mapErr(
              (err) => `Fail add font size "${name}": ${err}`,
            );
          }
        }
      }
    }

    return Ok(true);
  }

  private loadLetterSpacingTokens(
    configs: ThemeConfig['tracking'],
  ): Result<true, string> {
    for (let i = 0; i < configs.length; i++) {
      const config = configs[i];
      const entries = Object.entries(config);
      for (let j = 0; j < entries.length; j++) {
        const [name, value] = entries[j];
        const result = this.#letterSpacingDesignToken.addLetterSpacing(
          name,
          value,
        );
        if (result.isErr()) {
          return result.mapErr(
            (err) => `Fail add letter spacing "${name}": ${err}`,
          );
        }
      }
    }
    return Ok(true);
  }

  private loadTypographyTokens(configs: ThemeConfig['typography']) {
    configs.forEach((config) => {
      Object.entries(config).forEach(
        ([name, { font, fontWeight, leading, text, tracking }]) => {
          this.#typographyDesignToken.addTypography(name, {
            fontFamily: font || undefined,
            fontWeight: fontWeight || undefined,
            lineHeight: leading || undefined,
            fontSize: text || undefined,
            letterSpacing: tracking || undefined,
          });
        },
      );
    });
  }
}
