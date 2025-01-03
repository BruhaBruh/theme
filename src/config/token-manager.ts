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
import { cleanMergeObject } from '@/lib/clean-merge-object';
import { CSS } from '@/types/css';
import { TailwindPluginApi, TailwindThemeConfig } from '@/types/tailwind';
import { Ok, Result } from '@bruhabruh/type-safe';
import { merge } from 'ts-deepmerge';
import { CSSOutputOptions } from './schema/config';
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

  css(selector: string, absolute: boolean, options: CSSOutputOptions): CSS {
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
      options.disableTypography
        ? {}
        : this.#typographyDesignToken.css(selector, absolute),
    );
  }

  tailwindConfig(absolute: boolean): TailwindThemeConfig {
    return cleanMergeObject(
      this.#colorDesignToken.tailwindConfig(absolute),
      this.#borderRadiusDesignToken.tailwindConfig(absolute),
      this.#spacingDesignToken.tailwindConfig(absolute),
      this.#fontFamilyDesignToken.tailwindConfig(absolute),
      this.#fontWeightDesignToken.tailwindConfig(absolute),
      this.#lineHeightDesignToken.tailwindConfig(absolute),
      this.#fontSizeDesignToken.tailwindConfig(absolute),
      this.#letterSpacingDesignToken.tailwindConfig(absolute),
    );
  }

  applyTailwind(absolute: boolean, api: TailwindPluginApi) {
    this.#colorDesignToken.applyTailwind(absolute, api);
    this.#borderRadiusDesignToken.applyTailwind(absolute, api);
    this.#spacingDesignToken.applyTailwind(absolute, api);
    this.#fontFamilyDesignToken.applyTailwind(absolute, api);
    this.#fontWeightDesignToken.applyTailwind(absolute, api);
    this.#lineHeightDesignToken.applyTailwind(absolute, api);
    this.#fontSizeDesignToken.applyTailwind(absolute, api);
    this.#letterSpacingDesignToken.applyTailwind(absolute, api);
    this.#typographyDesignToken.applyTailwind(absolute, api);
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

  private loadColorTokens(config: ThemeConfig['color']): Result<true, string> {
    for (let i = 0; i < config.base.length; i++) {
      const baseConfig = config.base[i];
      const colorNames = Object.keys(baseConfig);

      for (let j = 0; j < colorNames.length; j++) {
        const colorName = colorNames[j];
        const colorOrModifiers = baseConfig[colorName];
        if (typeof colorOrModifiers === 'string') {
          this.#colorDesignToken.addColor(colorName, colorOrModifiers);
          continue;
        }
        const modifiers = Object.keys(colorOrModifiers);

        for (let k = 0; k < modifiers.length; k++) {
          const modifier = modifiers[k];
          const color = colorOrModifiers[modifier];
          this.#colorDesignToken.addColor(`${colorName}-${modifier}`, color);
        }
      }
    }

    if (config.material) {
      const materialConfig = config.material;
      const result =
        this.#colorDesignToken.generateMaterialColors(materialConfig);
      if (result.isErr()) {
        return result.mapErr((err) => `Fail generate material colors: ${err}`);
      }
    }

    for (let i = 0; i < config.generator.length; i++) {
      const generatorConfig = config.generator[i];
      const colorNames = Object.keys(generatorConfig);

      for (let j = 0; j < colorNames.length; j++) {
        const colorName = colorNames[j];
        const { base, modifier } = generatorConfig[colorName];
        const result = this.#colorDesignToken.generateColor(
          colorName,
          base,
          modifier,
        );
        if (result.isErr()) {
          return result.mapErr(
            (err) => `Fail generate color ${colorName}: ${err}`,
          );
        }
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
