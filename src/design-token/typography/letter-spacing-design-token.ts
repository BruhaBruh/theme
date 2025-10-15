import type { DesignTokenType } from '@/types/design-token-type';
import type { Result } from '@bruhabruh/type-safe';
import { Err, Ok } from '@bruhabruh/type-safe';
import type { DesignTokenArgs } from '../design-token';
import { DesignToken } from '../design-token';

export class LetterSpacingDesignToken extends DesignToken {
  static type: DesignTokenType = 'tracking' as const;
  #cssVariablePattern = /var\([^)]+\)/g;

  constructor({ prefix = '' }: Partial<DesignTokenArgs<'prefix'>> = {}) {
    super({
      name: LetterSpacingDesignToken.name,
      type: LetterSpacingDesignToken.type,
      prefix,
    });
    this.addToken('tighter', '-0.05em');
    this.addToken('tight', '-0.025em');
    this.addToken('normal', '0em');
    this.addToken('wide', '0.025em');
    this.addToken('wider', '0.05em');
    this.addToken('widest', '0.1em');
  }

  addLetterSpacing(name: string, letterSpacing: string): Result<true, string> {
    const cssValue = this.resolveReferences(letterSpacing);
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

  override resolveAbsoluteValue(value: string): string {
    if (!(value.startsWith('var(') && value.endsWith(')'))) {return value;}
    const cssVar = value.slice(4, -1).split(',')[0];
    const token = this.tokens.find((t) =>
      t.css.isSomeAnd((css) => css.key === cssVar),
    );
    if (!token) {return super.resolveAbsoluteValue(value);}
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
