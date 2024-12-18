import {
  BackgroundDesignToken,
  BorderDesignToken,
  BorderRadiusDesignToken,
  ColorDesignToken,
  FillDesignToken,
  FontFamilyDesignToken,
  FontSizeDesignToken,
  FontWeightDesignToken,
  LetterSpacingDesignToken,
  LineHeightDesignToken,
  OutlineDesignToken,
  RingDesignToken,
  SpacingDesignToken,
  StrokeDesignToken,
  TextDesignToken,
  TypographyDesignToken,
  ZIndexDesignToken,
} from '@/design-token';
import { TailwindConfig, TailwindPluginApi } from '@/types/tailwind';
import { Ok, Result } from '@bruhabruh/type-safe';
import { merge } from 'ts-deepmerge';
import { ThemeConfig } from './schema/theme-config';

export class TokenManager {
  #colorDesignToken: ColorDesignToken;
  #backgroundDesignToken: BackgroundDesignToken;
  #textDesignToken: TextDesignToken;
  #borderDesignToken: BorderDesignToken;
  #ringDesignToken: RingDesignToken;
  #fillDesignToken: FillDesignToken;
  #outlineDesignToken: OutlineDesignToken;
  #strokeDesignToken: StrokeDesignToken;
  #borderRadiusDesignToken: BorderRadiusDesignToken;
  #spacingDesignToken: SpacingDesignToken;
  #fontFamilyDesignToken: FontFamilyDesignToken;
  #fontWeightDesignToken: FontWeightDesignToken;
  #lineHeightDesignToken: LineHeightDesignToken;
  #fontSizeDesignToken: FontSizeDesignToken;
  #letterSpacingDesignToken: LetterSpacingDesignToken;
  #typographyDesignToken: TypographyDesignToken;
  #zIndexDesignToken: ZIndexDesignToken;

  constructor(prefix: string) {
    this.#colorDesignToken = new ColorDesignToken({ prefix });
    this.#backgroundDesignToken = new BackgroundDesignToken(
      this.#colorDesignToken,
      { prefix },
    );
    this.#textDesignToken = new TextDesignToken(this.#colorDesignToken, {
      prefix,
    });
    this.#borderDesignToken = new BorderDesignToken(this.#colorDesignToken, {
      prefix,
    });
    this.#ringDesignToken = new RingDesignToken(this.#colorDesignToken, {
      prefix,
    });
    this.#fillDesignToken = new FillDesignToken(this.#colorDesignToken, {
      prefix,
    });
    this.#outlineDesignToken = new OutlineDesignToken(this.#colorDesignToken, {
      prefix,
    });
    this.#strokeDesignToken = new StrokeDesignToken(this.#colorDesignToken, {
      prefix,
    });
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
    this.#zIndexDesignToken = new ZIndexDesignToken({ prefix });
  }

  css(absolute: boolean): [string[], string[]] {
    return [
      [
        ...this.#colorDesignToken.css(absolute),
        ...this.#backgroundDesignToken.css(absolute),
        ...this.#textDesignToken.css(absolute),
        ...this.#fillDesignToken.css(absolute),
        ...this.#strokeDesignToken.css(absolute),
        ...this.#borderDesignToken.css(absolute),
        ...this.#outlineDesignToken.css(absolute),
        ...this.#ringDesignToken.css(absolute),
        ...this.#borderRadiusDesignToken.css(absolute),
        ...this.#spacingDesignToken.css(absolute),
        ...this.#fontFamilyDesignToken.css(absolute),
        ...this.#fontWeightDesignToken.css(absolute),
        ...this.#lineHeightDesignToken.css(absolute),
        ...this.#fontSizeDesignToken.css(absolute),
        ...this.#letterSpacingDesignToken.css(absolute),
        ...this.#zIndexDesignToken.css(absolute),
      ],
      [...this.#typographyDesignToken.css(absolute)],
    ];
  }

  applyTailwind(absolute: boolean, api: TailwindPluginApi): void {
    this.#colorDesignToken.applyTailwind(absolute, api);
    this.#backgroundDesignToken.applyTailwind(absolute, api);
    this.#textDesignToken.applyTailwind(absolute, api);
    this.#fillDesignToken.applyTailwind(absolute, api);
    this.#strokeDesignToken.applyTailwind(absolute, api);
    this.#borderDesignToken.applyTailwind(absolute, api);
    this.#outlineDesignToken.applyTailwind(absolute, api);
    this.#ringDesignToken.applyTailwind(absolute, api);
    this.#borderRadiusDesignToken.applyTailwind(absolute, api);
    this.#spacingDesignToken.applyTailwind(absolute, api);
    this.#fontFamilyDesignToken.applyTailwind(absolute, api);
    this.#fontWeightDesignToken.applyTailwind(absolute, api);
    this.#lineHeightDesignToken.applyTailwind(absolute, api);
    this.#fontSizeDesignToken.applyTailwind(absolute, api);
    this.#letterSpacingDesignToken.applyTailwind(absolute, api);
    this.#typographyDesignToken.applyTailwind(absolute, api);
    this.#zIndexDesignToken.applyTailwind(absolute, api);
  }

  tailwindConfig(absolute: boolean): TailwindConfig {
    return merge(
      this.#colorDesignToken.tailwindConfig(absolute),
      this.#backgroundDesignToken.tailwindConfig(absolute),
      this.#textDesignToken.tailwindConfig(absolute),
      this.#fillDesignToken.tailwindConfig(absolute),
      this.#strokeDesignToken.tailwindConfig(absolute),
      this.#borderDesignToken.tailwindConfig(absolute),
      this.#outlineDesignToken.tailwindConfig(absolute),
      this.#ringDesignToken.tailwindConfig(absolute),
      this.#borderRadiusDesignToken.tailwindConfig(absolute),
      this.#spacingDesignToken.tailwindConfig(absolute),
      this.#fontFamilyDesignToken.tailwindConfig(absolute),
      this.#fontWeightDesignToken.tailwindConfig(absolute),
      this.#lineHeightDesignToken.tailwindConfig(absolute),
      this.#fontSizeDesignToken.tailwindConfig(absolute),
      this.#letterSpacingDesignToken.tailwindConfig(absolute),
      this.#typographyDesignToken.tailwindConfig(absolute),
      this.#zIndexDesignToken.tailwindConfig(absolute),
    );
  }

  load(config: ThemeConfig): Result<true, string> {
    const colorResult = this.loadColorTokens(config.color);
    if (colorResult.isErr()) {
      return colorResult.mapErr((err) => `Fail load color tokens: ${err}`);
    }
    this.loadBackgroundTokens(config.background);
    // this.loadTextTokens(config.text);
    this.loadBorderTokens(config.border);
    // this.loadRingTokens(config.ring);
    // this.loadFillTokens(config.fill);
    // this.loadOutlineTokens(config.outline);
    // this.loadStrokeTokens(config.stroke);

    const borderRadiusResult = this.loadBorderRadiusTokens(config.borderRadius);
    if (borderRadiusResult.isErr()) {
      return borderRadiusResult.mapErr(
        (err) => `Fail load border radius tokens: ${err}`,
      );
    }
    const spacingResult = this.loadSpacingTokens(config.spacing);
    if (spacingResult.isErr()) {
      return spacingResult.mapErr((err) => `Fail load spacing tokens: ${err}`);
    }

    const fontFamilyResult = this.loadFontFamilyTokens(config.fontFamily);
    if (fontFamilyResult.isErr()) {
      return fontFamilyResult.mapErr(
        (err) => `Fail load font family tokens: ${err}`,
      );
    }
    this.loadFontWeightTokens(config.fontWeight);
    const lineHeightResult = this.loadLineHeightTokens(config.lineHeight);
    if (lineHeightResult.isErr()) {
      return lineHeightResult.mapErr(
        (err) => `Fail load line height tokens: ${err}`,
      );
    }
    const fontSizeResult = this.loadFontSizeTokens(config.fontSize);
    if (fontSizeResult.isErr()) {
      return fontSizeResult.mapErr(
        (err) => `Fail load font size tokens: ${err}`,
      );
    }
    const letterSpacingResult = this.loadLetterSpacingTokens(
      config.letterSpacing,
    );
    if (letterSpacingResult.isErr()) {
      return letterSpacingResult.mapErr(
        (err) => `Fail load letter spacing tokens: ${err}`,
      );
    }
    this.loadTypographyTokens(config.typography);

    const zIndexResult = this.loadZIndexTokens(config.zIndex);
    if (zIndexResult.isErr()) {
      return zIndexResult.mapErr((err) => `Fail load z-index tokens: ${err}`);
    }

    return Ok(true);
  }

  applyGlobalTokenManager(globalTokenManager: TokenManager) {
    this.#colorDesignToken.designTokenReference =
      globalTokenManager.#colorDesignToken;
    this.#backgroundDesignToken.designTokenReference =
      globalTokenManager.#backgroundDesignToken;
    this.#textDesignToken.designTokenReference =
      globalTokenManager.#textDesignToken;
    this.#fillDesignToken.designTokenReference =
      globalTokenManager.#fillDesignToken;
    this.#strokeDesignToken.designTokenReference =
      globalTokenManager.#strokeDesignToken;
    this.#borderDesignToken.designTokenReference =
      globalTokenManager.#borderDesignToken;
    this.#outlineDesignToken.designTokenReference =
      globalTokenManager.#outlineDesignToken;
    this.#ringDesignToken.designTokenReference =
      globalTokenManager.#ringDesignToken;
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
    this.#zIndexDesignToken.designTokenReference =
      globalTokenManager.#zIndexDesignToken;
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
            modifierGenerator: modifier || undefined,
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

  private loadBackgroundTokens(configs: ThemeConfig['background']) {
    configs.forEach((config) => {
      Object.entries(config).forEach(([name, value]) => {
        this.#backgroundDesignToken.addBackgroundColor(name, value);
      });
    });
  }

  private loadTextTokens(configs: ThemeConfig['text']) {
    configs.forEach((config) => {
      Object.entries(config).forEach(([name, value]) => {
        this.#textDesignToken.addTextColor(name, value);
      });
    });
  }

  private loadBorderTokens(configs: ThemeConfig['border']) {
    configs.forEach((config) => {
      Object.entries(config).forEach(([name, value]) => {
        this.#borderDesignToken.addBorderColor(name, value);
      });
    });
  }

  private loadRingTokens(configs: ThemeConfig['ring']) {
    configs.forEach((config) => {
      Object.entries(config).forEach(([name, value]) => {
        this.#ringDesignToken.addRingColor(name, value);
      });
    });
  }

  private loadFillTokens(configs: ThemeConfig['fill']) {
    configs.forEach((config) => {
      Object.entries(config).forEach(([name, value]) => {
        this.#fillDesignToken.addFillColor(name, value);
      });
    });
  }

  private loadOutlineTokens(configs: ThemeConfig['outline']) {
    configs.forEach((config) => {
      Object.entries(config).forEach(([name, value]) => {
        this.#outlineDesignToken.addOutlineColor(name, value);
      });
    });
  }

  private loadStrokeTokens(configs: ThemeConfig['stroke']) {
    configs.forEach((config) => {
      Object.entries(config).forEach(([name, value]) => {
        this.#strokeDesignToken.addStrokeColor(name, value);
      });
    });
  }

  private loadBorderRadiusTokens(
    configs: ThemeConfig['borderRadius'],
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
    configs: ThemeConfig['fontFamily'],
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
    configs: ThemeConfig['lineHeight'],
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
    configs: ThemeConfig['fontSize'],
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
    configs: ThemeConfig['letterSpacing'],
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
        ([
          name,
          { fontFamily, fontWeight, lineHeight, fontSize, letterSpacing },
        ]) => {
          this.#typographyDesignToken.addTypography(name, {
            fontFamily: fontFamily || undefined,
            fontWeight: fontWeight || undefined,
            lineHeight: lineHeight || undefined,
            fontSize: fontSize || undefined,
            letterSpacing: letterSpacing || undefined,
          });
        },
      );
    });
  }

  private loadZIndexTokens(
    configs: ThemeConfig['zIndex'],
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
            const result = this.#zIndexDesignToken.addZIndex(name, value);
            if (result.isErr()) {
              return result.mapErr(
                (err) => `Fail add z-index "${name}": ${err}`,
              );
            }
          }
        }
      } else {
        const entries = Object.entries(config);
        for (let j = 0; j < entries.length; j++) {
          const [name, value] = entries[j];
          const result = this.#zIndexDesignToken.addZIndex(name, value);
          if (result.isErr()) {
            return result.mapErr((err) => `Fail add z-index "${name}": ${err}`);
          }
        }
      }
    }

    return Ok(true);
  }
}
