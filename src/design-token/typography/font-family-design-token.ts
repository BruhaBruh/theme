import { DesignTokenType } from '@/types/design-token-type';
import { TailwindThemeConfig } from '@/types/tailwind';
import { Err, Ok, Result } from '@bruhabruh/type-safe';
import { DesignToken, DesignTokenArgs } from '../design-token';

export class FontFamilyDesignToken extends DesignToken {
  static type: DesignTokenType = 'font' as const;
  #cssVariablePattern = /var\([^)]+\)/g;

  constructor({ prefix = '' }: Partial<DesignTokenArgs<'prefix'>> = {}) {
    super({
      name: FontFamilyDesignToken.name,
      type: FontFamilyDesignToken.type,
      prefix,
    });
  }

  addFontFamily(
    name: string,
    ...fontFamilyArray: string[]
  ): Result<true, string> {
    const fontFamily = fontFamilyArray
      .flatMap((v) => v.split(',').map((i) => i.trim()))
      .filter((v) => v.length > 0)
      .join(', ');
    const cssValue = this.resolveReferences(fontFamily);
    const value = cssValue.replace(this.#cssVariablePattern, (match) => {
      return this.resolveAbsoluteValue(match);
    });
    if (this.#cssVariablePattern.test(value)) {
      return Err(`fail get absolute variable value of ${value}`);
    }
    this.addToken(name, value, {
      css: {
        key: [name],
        value: cssValue,
      },
    });

    return Ok(true);
  }

  override tailwindConfig(absolute: boolean): TailwindThemeConfig {
    const fontFamily: Record<string, string> = {};

    this.tokens.forEach((token) => {
      if (absolute || token.css.isNone()) {
        fontFamily[token.name] = token.value;
      } else {
        token.css.inspect((css) => {
          fontFamily[token.name] = css.keyVariable;
        });
      }
    });

    return {
      fontFamily,
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
