import { DesignTokenType } from '@/types/design-token-type';
import { TailwindConfig } from '@/types/tailwind';
import { DesignToken } from '../design-token';
import { ColorDesignToken } from './color-design-token';

export class FillDesignToken extends DesignToken {
  static type: DesignTokenType = 'fill' as const;
  #colorDesignToken: ColorDesignToken;

  constructor(
    colorDesignToken: ColorDesignToken,
    {
      prefix = '',
    }: {
      prefix?: string;
    } = {},
  ) {
    super({ type: FillDesignToken.type, prefix });
    this.#colorDesignToken = colorDesignToken;
  }

  addFillColor(name: string, color: string): void {
    const cssValue = this.resolveReferences(color);
    this.addToken(name, this.resolveAbsoluteValue(cssValue), {
      humanReadableValue: this.resolveAbsoluteValue(cssValue),
      css: {
        key: [name],
        value: cssValue,
      },
    });
  }

  override tailwindConfig(absolute: boolean): TailwindConfig {
    const colors: Record<string, string> = {};
    const fillColor: Record<string, string> = {};

    this.tokens.forEach((token) => {
      fillColor[token.name] = token.toTailwindString({
        absolute,
        mapper: (variable) => `rgb(from ${variable} r g b / <alpha-value>)`,
      });
      colors[`${token.name}-${this.type}`] = fillColor[token.name];
    });

    return {
      theme: {
        extend: {
          colors,
          fillColor,
        },
      },
    };
  }

  override resolveReferences(line: string): string {
    const withColors = this.#colorDesignToken.resolveReferences(line);
    return withColors.replace(this.referenceRegExp, (match, reference) => {
      return this.resolveReference(reference).unwrapOr(match);
    });
  }

  override resolveAbsoluteValue(value: string): string {
    if (!(value.startsWith('var(') && value.endsWith(')'))) return value;
    const cssVar = value.slice(4, -1);
    const token = this.tokens.find((t) =>
      t.css.isSomeAnd((css) => css.key === cssVar),
    );
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
