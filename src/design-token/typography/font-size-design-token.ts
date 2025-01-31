import { DesignTokenType } from '@/types/design-token-type';
import { TailwindThemeConfig } from '@/types/tailwind';
import { Err, Ok, Result } from '@bruhabruh/type-safe';
import { DesignToken, DesignTokenArgs } from '../design-token';

export class FontSizeDesignToken extends DesignToken {
  static type: DesignTokenType = 'text' as const;
  #cssVariablePattern = /var\([^)]+\)/g;

  constructor({ prefix = '' }: Partial<DesignTokenArgs<'prefix'>> = {}) {
    super({
      name: FontSizeDesignToken.name,
      type: FontSizeDesignToken.type,
      prefix,
    });
  }

  addFontSize(name: string, fontSize: string): Result<true, string> {
    const cssValue = this.resolveReferences(fontSize);
    const value = cssValue.replace(this.#cssVariablePattern, (match) => {
      return this.resolveAbsoluteValue(match);
    });
    if (this.#cssVariablePattern.test(value)) {
      return Err(`fail get absolute variable value of ${value}`);
    }
    const calculatedValue = this.calculate(value);
    if (calculatedValue.isErr()) {
      return calculatedValue.mapErr(
        (err) => `Fail calculate border radius: ${err}`,
      );
    }
    this.addToken(name, calculatedValue.unwrap(), {
      css: {
        key: [name],
        value: calculatedValue.unwrap(),
      },
    });
    return Ok(true);
  }

  override tailwindConfig(absolute: boolean): TailwindThemeConfig {
    const fontSize: Record<string, string> = {};

    this.tokens.forEach((token) => {
      if (absolute || token.css.isNone()) {
        fontSize[token.name] = token.value;
      } else {
        token.css.inspect((css) => {
          fontSize[token.name] = css.keyVariable;
        });
      }
    });

    return {
      fontSize,
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
