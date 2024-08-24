import { Calculator } from '@/lib/calculator';
import { CSSVariables } from '@/types/css-variables';
import { DesignTokenType } from '@/types/design-token-type';
import { TailwindConfig, TailwindPluginApi } from '@/types/tailwind';
import { TokenValue } from './token-value';

export class DesignToken {
  readonly #type: DesignTokenType;
  readonly #prefix: string;
  readonly #referenceRegExp: RegExp;
  readonly #tokens: TokenValue[];
  readonly #calculator = new Calculator();
  readonly #valueAsOnlyOneNumberPattern = /^\d+\.?\d?\d*$/g;
  readonly #valueInPixelPattern = /(\d+\.?\d?\d*)px/g;
  readonly #invalidValuePattern =
    /pt|pc|in|cm|mm|q|[^r]em|ex|ch|w|h|min|max|%|fr|s|ms|deg|rad|grad|turn|vh|vw|vi|vb/g;
  #designTokenReference: DesignToken | null = null;

  protected constructor({
    type,
    prefix,
  }: {
    type: DesignTokenType;
    prefix: string;
  }) {
    this.#type = type;
    this.#prefix = prefix;
    // eslint-disable-next-line security/detect-non-literal-regexp
    this.#referenceRegExp = new RegExp(`\\{${type}\\.([^\\}]+)\\}`, 'g');
    this.#tokens = [];
  }

  get type(): DesignTokenType {
    return this.#type;
  }

  get prefix(): string {
    return this.#prefix;
  }

  get tokens(): TokenValue[] {
    return [...this.#tokens];
  }

  get cssVariables(): CSSVariables {
    const cssVariables: CSSVariables = {};

    this.#tokens
      .map((token) => token.css)
      .filter((css) => css !== null)
      .forEach((css) => {
        cssVariables[css.key] = css.value;
      });

    return cssVariables;
  }

  get referenceRegExp(): RegExp {
    return this.#referenceRegExp;
  }

  get calculator(): Calculator {
    return this.#calculator;
  }

  set designTokenReference(designTokenReference: DesignToken | null) {
    this.#designTokenReference = designTokenReference;
  }

  css(): string[] {
    const lines: string[] = [];
    Object.entries(this.cssVariables).forEach(([key, value]) => {
      lines.push(`${key}: ${value};`);
    });
    return lines;
  }

  resolveReferences(line: string): string {
    const res = line.replace(this.#referenceRegExp, (match, reference) => {
      const resolved = this.resolveReference(reference);
      if (resolved) return resolved;
      return match;
    });
    return this.#designTokenReference?.resolveReferences(res) || res;
  }

  resolveReference(ref: string): string | null {
    const reference = ref.replace(/\./g, '-');
    const token = this.tokens.find(
      (t) => t.name.replace(/\./g, '-') === reference,
    );
    if (!token) return null;
    if (token.css === null) return token.value;
    return token.css.keyVariable;
  }

  applyTailwind(_api: TailwindPluginApi): void {}

  tailwindConfig(): TailwindConfig {
    return {};
  }

  resolveAbsoluteValue(value: string): string {
    return this.#designTokenReference?.resolveAbsoluteValue(value) || value;
  }

  protected addToken(
    name: string,
    value: string,
    css?: {
      key: (string | undefined)[];
      value: string | (string | undefined)[];
    },
  ) {
    const tokenIndexToOverride = this.tokens.findIndex((v) => v.name === name);
    if (tokenIndexToOverride) {
      this.tokens.splice(tokenIndexToOverride, 1);
    }
    if (css) {
      const keyVariable = this.variable({ type: 'key', parts: css.key });
      const valueVariable =
        typeof css.value === 'string'
          ? css.value
          : this.variable({
              type: 'value',
              parts: css.value,
            });
      this.#tokens.push(
        TokenValue.create(name, value, {
          key: keyVariable,
          value: valueVariable,
        }),
      );
    } else {
      this.#tokens.push(TokenValue.create(name, value));
    }
  }

  protected variable({
    type = 'key',
    parts = [],
  }: Partial<{
    type: 'key' | 'value';
    parts: (string | undefined)[];
  }>): string {
    const transformedParts = [this.prefix, ...parts]
      .filter((part) => part !== undefined)
      .map((part) => part.trim().replace(/\\./g, '-'))
      .map((part) => {
        let p = part;
        while (p.startsWith('-')) {
          p = p.slice(1);
        }
        while (p.endsWith('-')) {
          p = p.slice(0, -1);
        }
        return p;
      })
      .filter((part) => part.length > 0)
      .map((v) => v.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase());

    const variable = `--${transformedParts.join('-')}`.replace(/\./g, '\\.');
    if (type === 'key') return variable;
    return `var(${variable})`;
  }

  protected calculate(value: string): string {
    const v = value.replace(/,/g, '.');
    if (this.#invalidValuePattern.test(v)) return v;
    if (this.#valueAsOnlyOneNumberPattern.test(v)) return v;

    const inRem = this.changePxToRem(v);
    const withoutRem = inRem.replace(/rem/g, '');
    const result = this.calculator.calculate(withoutRem);
    return `${result}rem`;
  }

  protected changePxToRem(value: string): string {
    return value.replace(this.#valueInPixelPattern, (match, v) => {
      try {
        return `${parseFloat(v) / 16}rem`;
      } catch (ignore) {
        throw new Error(`fail convert ${match} to rem`);
      }
    });
  }
}
