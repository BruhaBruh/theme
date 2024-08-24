import { DesignTokenType } from '@/types/design-token-type';
import { TailwindConfig } from '@/types/tailwind';
import { DesignToken } from '../design-token';

export class FontFamilyDesignToken extends DesignToken {
  static type: DesignTokenType = 'font-family' as const;
  #cssVariablePattern = /var\([^)]+\)/g;

  constructor({ prefix = '' }: { prefix?: string } = {}) {
    super({ type: FontFamilyDesignToken.type, prefix });
  }

  addFontFamily(name: string, ...fontFamilyArray: string[]): void {
    const fontFamily = fontFamilyArray
      .flatMap((v) => v.split(',').map((i) => i.trim()))
      .filter((v) => v.length > 0)
      .join(', ');
    const cssValue = this.resolveReferences(fontFamily);
    const value = cssValue.replace(this.#cssVariablePattern, (match) => {
      return this.resolveAbsoluteValue(match);
    });
    if (this.#cssVariablePattern.test(value)) {
      throw new Error(`fail get absolute variable value of ${value}`);
    }
    this.addToken(name, value, {
      key: [name],
      value: cssValue,
    });
  }

  override tailwindConfig(): TailwindConfig {
    const fontFamily: Record<string, string> = {};

    this.tokens.forEach((token) => {
      fontFamily[token.name] = token.css
        ? `${token.css.keyVariable} /* ${token.value} */`
        : token.value;
    });

    return {
      theme: {
        fontFamily,
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
}
