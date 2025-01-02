import { DesignTokenType } from '@/types/design-token-type';
import { TailwindThemeConfig } from '@/types/tailwind';
import { DesignToken, DesignTokenArgs } from '../design-token';

export class FontWeightDesignToken extends DesignToken {
  static type: DesignTokenType = 'font-weight' as const;

  constructor({ prefix = '' }: Partial<DesignTokenArgs<'prefix'>> = {}) {
    super({
      name: FontWeightDesignToken.name,
      type: FontWeightDesignToken.type,
      prefix,
    });
    this.addToken('thin', '100');
    this.addToken('extralight', '200');
    this.addToken('light', '300');
    this.addToken('normal', '400');
    this.addToken('medium', '500');
    this.addToken('semibold', '600');
    this.addToken('bold', '700');
    this.addToken('extrabold', '800');
    this.addToken('black', '900');
  }

  addFontWeight(name: string, fontWeight: string): void {
    const cssValue = this.resolveReferences(fontWeight);
    this.addToken(name, this.resolveAbsoluteValue(cssValue), {
      css: {
        key: [name],
        value: cssValue,
      },
    });
  }

  override tailwindConfig(absolute: boolean): TailwindThemeConfig {
    const fontWeight: Record<string, string> = {};

    this.tokens.forEach((token) => {
      if (absolute || token.css.isNone()) {
        fontWeight[token.name] = token.value;
      } else {
        token.css.inspect((css) => {
          fontWeight[token.name] = css.keyVariable;
        });
      }
    });

    return {
      fontWeight,
    };
  }

  override resolveAbsoluteValue(value: string): string {
    if (!(value.startsWith('var(') && value.endsWith(')'))) return value;
    const cssVar = value.slice(4, -1).split(',')[0];
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
}
