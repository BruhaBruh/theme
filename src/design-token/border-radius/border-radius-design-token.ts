import { DesignTokenType } from '@/types/design-token-type';
import { TailwindThemeConfig } from '@/types/tailwind';
import { Err, Ok, Result } from '@bruhabruh/type-safe';
import { DesignToken, DesignTokenArgs } from '../design-token';

export class BorderRadiusDesignToken extends DesignToken {
  static type: DesignTokenType = 'radius' as const;
  #cssVariablePattern = /var\([^)]+\)/g;

  constructor({ prefix = '' }: Partial<DesignTokenArgs<'prefix'>> = {}) {
    super({
      name: BorderRadiusDesignToken.name,
      type: BorderRadiusDesignToken.type,
      prefix,
    });
    this.addToken('none', '0px');
    this.addToken('full', '9999px');
  }

  addBorderRadius(name: string, borderRadius: string): Result<true, string> {
    const cssValue = this.resolveReferences(borderRadius);
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
    const borderRadius: Record<string, string> = {};

    this.tokens.forEach((token) => {
      if (absolute || token.css.isNone()) {
        borderRadius[token.name] = token.value;
      } else {
        token.css.inspect((css) => {
          borderRadius[token.name] = css.keyVariable;
        });
      }
    });

    return {
      borderRadius,
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
