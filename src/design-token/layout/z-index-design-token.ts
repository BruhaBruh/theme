import { DesignTokenType } from '@/types/design-token-type';
import { TailwindConfig } from '@/types/tailwind';
import { DesignToken } from '../design-token';

export class ZIndexDesignToken extends DesignToken {
  static type: DesignTokenType = 'z-index' as const;
  #cssVariablePattern = /var\([^)]+\)/g;

  constructor({ prefix = '' }: { prefix?: string } = {}) {
    super({ type: ZIndexDesignToken.type, prefix });
  }

  addZIndex(name: string, zIndex: string): void {
    const cssValue = this.resolveReferences(zIndex);
    const value = cssValue.replace(this.#cssVariablePattern, (match) => {
      return this.resolveAbsoluteValue(match);
    });
    if (this.#cssVariablePattern.test(value)) {
      throw new Error(`fail get absolute variable value of ${value}`);
    }
    const calculatedValue = this.calculate(value);
    this.addToken(name, calculatedValue, {
      key: [name],
      value: calculatedValue,
    });
  }

  override tailwindConfig(): TailwindConfig {
    const zIndex: Record<string, string> = {};

    this.tokens.forEach((token) => {
      zIndex[token.name] = token.css
        ? `${token.css.keyVariable} /* ${token.value} */`
        : token.value;
    });

    return {
      theme: {
        zIndex,
      },
    };
  }

  override resolveAbsoluteValue(value: string): string {
    if (!(value.startsWith('var(') && value.endsWith(')'))) return value;
    const cssVar = value.slice(4, -1);
    const token = this.tokens.find((t) => t.css && t.css.key === cssVar);
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

  protected override calculate(value: string): string {
    return this.calculator.calculate(value).toString();
  }
}