import { DesignTokenType } from '@/types/design-token-type';
import { TailwindConfig } from '@/types/tailwind';
import { DesignToken } from '../design-token';
import { ColorDesignToken } from './color-design-token';

export class RingDesignToken extends DesignToken {
  static type: DesignTokenType = 'ring' as const;
  #colorDesignToken: ColorDesignToken;

  constructor(
    colorDesignToken: ColorDesignToken,
    {
      prefix = '',
    }: {
      prefix?: string;
    } = {},
  ) {
    super({ type: RingDesignToken.type, prefix });
    this.#colorDesignToken = colorDesignToken;
  }

  addRingColor(name: string, color: string): void {
    const cssValue = this.resolveReferences(color);
    this.addToken(name, this.resolveAbsoluteValue(cssValue), {
      key: [name],
      value: cssValue,
    });
  }

  override tailwindConfig(): TailwindConfig {
    const ringColor: Record<string, string> = {};

    this.tokens.forEach((token) => {
      ringColor[token.name] = token.css
        ? `${token.css.keyVariable} /* ${token.value} */`
        : token.value;
    });

    return {
      theme: {
        extend: {
          ringColor,
        },
      },
    };
  }

  override resolveReferences(line: string): string {
    const withColors = this.#colorDesignToken.resolveReferences(line);
    return withColors.replace(this.referenceRegExp, (match, reference) => {
      return this.resolveReference(reference) || match;
    });
  }

  override resolveAbsoluteValue(value: string): string {
    if (!(value.startsWith('var(') && value.endsWith(')'))) return value;
    const cssVar = value.slice(4, -1);
    const token = this.tokens.find((t) => t.css && t.css.key === cssVar);
    if (!token) return this.#colorDesignToken.resolveAbsoluteValue(value);
    return token.value;
  }

  protected override variable({
    type = 'key',
    parts = [],
  }: Partial<{
    type: 'key' | 'value';
    parts: (string | undefined)[];
  }>): string {
    return super.variable({
      type,
      parts: [this.type, ...parts],
    });
  }
}