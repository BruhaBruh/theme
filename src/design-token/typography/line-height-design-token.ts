import { DesignTokenType } from '@/types/design-token-type';
import { TailwindConfig } from '@/types/tailwind';
import { Err, Ok, Result } from '@bruhabruh/type-safe';
import { DesignToken } from '../design-token';

export class LineHeightDesignToken extends DesignToken {
  static type: DesignTokenType = 'line-height' as const;
  #cssVariablePattern = /var\([^)]+\)/g;

  constructor({ prefix = '' }: { prefix?: string } = {}) {
    super({ type: LineHeightDesignToken.type, prefix });
    this.addToken('none', '1');
    this.addToken('tight', '1.25');
    this.addToken('snug', '1.375');
    this.addToken('normal', '1.5');
    this.addToken('relaxed', '1.625');
    this.addToken('loose', '2');
  }

  addLineHeight(name: string, lineHeight: string): Result<true, string> {
    const cssValue = this.resolveReferences(lineHeight);
    const value = cssValue.replace(this.#cssVariablePattern, (match) => {
      return this.resolveAbsoluteValue(match);
    });
    if (this.#cssVariablePattern.test(value)) {
      return Err(`fail get absolute variable value of ${value}`);
    }
    const calculatedValue = this.calculate(value);
    if (calculatedValue.isErr()) {
      return calculatedValue.mapErr(
        (err) => `Fail calculate line height: ${err}`,
      );
    }
    this.addToken(name, calculatedValue.unwrap(), {
      humanReadableValue: this.changeRemToPx(calculatedValue.unwrap()).unwrap(),
      css: {
        key: [name],
        value: calculatedValue.unwrap(),
      },
    });
    return Ok(true);
  }

  override tailwindConfig(absolute: boolean): TailwindConfig {
    const lineHeight: Record<string, string> = {};

    this.tokens.forEach((token) => {
      lineHeight[token.name] = token.toTailwindString({ absolute });
    });

    return {
      theme: {
        lineHeight,
      },
    };
  }

  override resolveAbsoluteValue(value: string): string {
    if (!(value.startsWith('var(') && value.endsWith(')'))) return value;
    const cssVar = value.slice(4, -1);
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
