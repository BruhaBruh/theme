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

  css(): [string[], string[]] {
    return [
      [
        ...this.#colorDesignToken.css(),
        ...this.#backgroundDesignToken.css(),
        ...this.#textDesignToken.css(),
        ...this.#fillDesignToken.css(),
        ...this.#strokeDesignToken.css(),
        ...this.#borderDesignToken.css(),
        ...this.#outlineDesignToken.css(),
        ...this.#ringDesignToken.css(),
        ...this.#borderRadiusDesignToken.css(),
        ...this.#spacingDesignToken.css(),
        ...this.#fontFamilyDesignToken.css(),
        ...this.#fontWeightDesignToken.css(),
        ...this.#lineHeightDesignToken.css(),
        ...this.#fontSizeDesignToken.css(),
        ...this.#letterSpacingDesignToken.css(),
        ...this.#zIndexDesignToken.css(),
      ],
      [...this.#typographyDesignToken.css()],
    ];
  }

  applyTailwind(api: TailwindPluginApi): void {
    this.#colorDesignToken.applyTailwind(api);
    this.#backgroundDesignToken.applyTailwind(api);
    this.#textDesignToken.applyTailwind(api);
    this.#fillDesignToken.applyTailwind(api);
    this.#strokeDesignToken.applyTailwind(api);
    this.#borderDesignToken.applyTailwind(api);
    this.#outlineDesignToken.applyTailwind(api);
    this.#ringDesignToken.applyTailwind(api);
    this.#borderRadiusDesignToken.applyTailwind(api);
    this.#spacingDesignToken.applyTailwind(api);
    this.#fontFamilyDesignToken.applyTailwind(api);
    this.#fontWeightDesignToken.applyTailwind(api);
    this.#lineHeightDesignToken.applyTailwind(api);
    this.#fontSizeDesignToken.applyTailwind(api);
    this.#letterSpacingDesignToken.applyTailwind(api);
    this.#typographyDesignToken.applyTailwind(api);
    this.#zIndexDesignToken.applyTailwind(api);
  }

  tailwindConfig(): TailwindConfig {
    return merge(
      this.#colorDesignToken.tailwindConfig(),
      this.#backgroundDesignToken.tailwindConfig(),
      this.#textDesignToken.tailwindConfig(),
      this.#fillDesignToken.tailwindConfig(),
      this.#strokeDesignToken.tailwindConfig(),
      this.#borderDesignToken.tailwindConfig(),
      this.#outlineDesignToken.tailwindConfig(),
      this.#ringDesignToken.tailwindConfig(),
      this.#borderRadiusDesignToken.tailwindConfig(),
      this.#spacingDesignToken.tailwindConfig(),
      this.#fontFamilyDesignToken.tailwindConfig(),
      this.#fontWeightDesignToken.tailwindConfig(),
      this.#lineHeightDesignToken.tailwindConfig(),
      this.#fontSizeDesignToken.tailwindConfig(),
      this.#letterSpacingDesignToken.tailwindConfig(),
      this.#typographyDesignToken.tailwindConfig(),
      this.#zIndexDesignToken.tailwindConfig(),
    );
  }

  load(config: ThemeConfig) {
    this.loadColorTokens(config.color);
    this.loadBackgroundTokens(config.background);
    this.loadTextTokens(config.text);
    this.loadBorderTokens(config.border);
    this.loadRingTokens(config.ring);
    this.loadFillTokens(config.fill);
    this.loadOutlineTokens(config.outline);
    this.loadStrokeTokens(config.stroke);

    this.loadBorderRadiusTokens(config.borderRadius);
    this.loadSpacingTokens(config.spacing);

    this.loadFontFamilyTokens(config.fontFamily);
    this.loadFontWeightTokens(config.fontWeight);
    this.loadLineHeightTokens(config.lineHeight);
    this.loadFontSizeTokens(config.fontSize);
    this.loadLetterSpacingTokens(config.letterSpacing);
    this.loadTypographyTokens(config.typography);

    this.loadZIndexTokens(config.zIndex);
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

  private loadColorTokens(configs: ThemeConfig['color']) {
    configs.forEach((config) => {
      Object.entries(config).forEach(([colorName, values]) => {
        const generator = values._generator;
        if (generator && typeof generator !== 'string') {
          const { source, baseLightColor, baseDarkColor, darkenRatio, solid } =
            generator;
          this.#colorDesignToken.generateColor(colorName, source, {
            baseLightColor: baseLightColor || undefined,
            baseDarkColor: baseDarkColor || undefined,
            darkenRatio: darkenRatio || undefined,
            solidLight: typeof solid === 'boolean' ? solid : solid.light,
            solidDark: typeof solid === 'boolean' ? solid : solid.dark,
          });
        }

        const withoutGenerator: Record<string, string> = Object.fromEntries(
          Object.entries(values).filter(([key]) => key !== '_generator'),
        );

        Object.entries(withoutGenerator).forEach(([modifier, value]) => {
          this.#colorDesignToken.addColor(`${colorName}-${modifier}`, value);
        });
      });
    });
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

  private loadBorderRadiusTokens(configs: ThemeConfig['borderRadius']) {
    configs.forEach((config) => {
      const generator = config._generator;
      if (generator) {
        if (typeof generator === 'string') return;
        const { start, end, namePattern, valuePattern, step } = generator;
        for (let i = start; i <= end; i += step) {
          const name = namePattern.replace(/\{i}/g, i.toString());
          const value = valuePattern.replace(/\{i}/g, i.toString());
          this.#borderRadiusDesignToken.addBorderRadius(name, value);
        }
      } else {
        Object.entries(config).forEach(([name, value]) => {
          this.#borderRadiusDesignToken.addBorderRadius(name, value);
        });
      }
    });
  }

  private loadSpacingTokens(configs: ThemeConfig['spacing']) {
    configs.forEach((config) => {
      const generator = config._generator;
      if (generator) {
        if (typeof generator === 'string') return;
        const { start, end, namePattern, valuePattern, step } = generator;
        for (let i = start; i <= end; i += step) {
          const name = namePattern.replace(/\{i}/g, i.toString());
          const value = valuePattern.replace(/\{i}/g, i.toString());
          this.#spacingDesignToken.addSpacing(name, value);
        }
      } else {
        Object.entries(config).forEach(([name, value]) => {
          this.#spacingDesignToken.addSpacing(name, value);
        });
      }
    });
  }

  private loadFontFamilyTokens(configs: ThemeConfig['fontFamily']) {
    configs.forEach((config) => {
      Object.entries(config).forEach(([name, value]) => {
        this.#fontFamilyDesignToken.addFontFamily(name, value);
      });
    });
  }

  private loadFontWeightTokens(configs: ThemeConfig['fontWeight']) {
    configs.forEach((config) => {
      Object.entries(config).forEach(([name, value]) => {
        this.#fontWeightDesignToken.addFontWeight(name, value);
      });
    });
  }

  private loadLineHeightTokens(configs: ThemeConfig['lineHeight']) {
    configs.forEach((config) => {
      const generator = config._generator;
      if (generator) {
        if (typeof generator === 'string') return;
        const { start, end, namePattern, valuePattern, step } = generator;
        for (let i = start; i <= end; i += step) {
          const name = namePattern.replace(/\{i}/g, i.toString());
          const value = valuePattern.replace(/\{i}/g, i.toString());
          this.#lineHeightDesignToken.addLineHeight(name, value);
        }
      } else {
        Object.entries(config).forEach(([name, value]) => {
          this.#lineHeightDesignToken.addLineHeight(name, value);
        });
      }
    });
  }

  private loadFontSizeTokens(configs: ThemeConfig['fontSize']) {
    configs.forEach((config) => {
      const generator = config._generator;
      if (generator) {
        if (typeof generator === 'string') return;
        const { start, end, namePattern, valuePattern, step } = generator;
        for (let i = start; i <= end; i += step) {
          const name = namePattern.replace(/\{i}/g, i.toString());
          const value = valuePattern.replace(/\{i}/g, i.toString());
          this.#fontSizeDesignToken.addFontSize(name, value);
        }
      } else {
        Object.entries(config).forEach(([name, value]) => {
          this.#fontSizeDesignToken.addFontSize(name, value);
        });
      }
    });
  }

  private loadLetterSpacingTokens(configs: ThemeConfig['letterSpacing']) {
    configs.forEach((config) => {
      Object.entries(config).forEach(([name, value]) => {
        this.#letterSpacingDesignToken.addLetterSpacing(name, value);
      });
    });
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

  private loadZIndexTokens(configs: ThemeConfig['zIndex']) {
    configs.forEach((config) => {
      const generator = config._generator;
      if (generator) {
        if (typeof generator === 'string') return;
        const { start, end, namePattern, valuePattern, step } = generator;
        for (let i = start; i <= end; i += step) {
          const name = namePattern.replace(/\{i}/g, i.toString());
          const value = valuePattern.replace(/\{i}/g, i.toString());
          this.#zIndexDesignToken.addZIndex(name, value);
        }
      } else {
        Object.entries(config).forEach(([name, value]) => {
          this.#zIndexDesignToken.addZIndex(name, value);
        });
      }
    });
  }
}
