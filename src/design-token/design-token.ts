import { Calculator } from '@/lib/calculator';
import type { CSSTree, CSSVariables } from '@/types/css';
import type { DesignTokenType } from '@/types/design-token-type';
import type { Class, Option, Result } from '@bruhabruh/type-safe';
import { Err, None, Ok, Some } from '@bruhabruh/type-safe';
import { TokenValue } from './token-value';

type InternalDesignTokenArgs = {
  __arg: never;
  name: string;
  type: DesignTokenType;
  prefix: string;
  designTokens?: DesignToken[];
};

export type DesignTokenArgs<
  PickKeys extends
    keyof InternalDesignTokenArgs = keyof InternalDesignTokenArgs,
  OmitKeys extends keyof InternalDesignTokenArgs = '__arg',
> = Omit<Pick<InternalDesignTokenArgs, PickKeys>, OmitKeys | '__arg'>;
export class DesignToken {
  readonly #name: string;
  readonly #type: DesignTokenType;
  readonly #prefix: string;
  readonly #referenceRegExp: RegExp;
  readonly #tokens: TokenValue[];
  readonly #calculator = new Calculator();
  readonly #valueAsOnlyOneNumberPattern = /^\d+\.?\d?\d*$/g;
  readonly #valueInPixelPattern = /(\d+\.?\d?\d*)px/g;
  readonly #valueInRemPattern = /(\d+\.?\d?\d*)rem/g;
  readonly #invalidValuePattern =
    /pt|pc|in|cm|mm|q|[^r]em|ex|ch|w|h|min|max|%|fr|s|ms|deg|rad|grad|turn|vh|vw|vi|vb/g;
  readonly #designTokens: DesignToken[];
  #designTokenReference: Option<DesignToken> = None;

  protected constructor({
    name,
    type,
    prefix,
    designTokens = [],
  }: DesignTokenArgs) {
    this.#name = name;
    this.#type = type;
    this.#prefix = prefix;
    this.#referenceRegExp = new RegExp(`\\{${type}\\.([^\\}]+)\\}`, 'g');
    this.#tokens = [];
    this.#designTokens = designTokens;
  }

  get name(): string {
    return this.#name;
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

  get referenceRegExp(): RegExp {
    return this.#referenceRegExp;
  }

  get calculator(): Calculator {
    return this.#calculator;
  }

  set designTokenReference(designTokenReference: DesignToken) {
    this.#designTokenReference = Some(designTokenReference);
  }

  getDesignToken<T extends DesignToken = DesignToken>(
    token: Class<T>,
  ): Option<T> {
    const designToken = this.#designTokens.find((v) => v.name === token.name);
    if (!designToken) {return None;}
    return Some(designToken as T);
  }

  resolveReferences(line: string): string {
    const res = line.replace(this.#referenceRegExp, (match, reference) => {
      const resolved = this.resolveReference(reference);
      return resolved.unwrapOr(match);
    });
    return this.#designTokenReference.mapOr(res, (ref) =>
      ref.resolveReferences(res),
    );
  }

  resolveReference(ref: string): Option<string> {
    const reference = ref.replace(/\./g, '-');
    const token = this.tokens.find(
      (t) => t.name.replace(/\./g, '-') === reference,
    );
    if (!token) {return None;}
    return Some(token.css.mapOr(token.value, (css) => css.keyVariable));
  }

  resolveAbsoluteValue(value: string): string {
    if (this.#designTokenReference.isNone()) {
      return value;
    }
    return this.#designTokenReference.unwrap().resolveAbsoluteValue(value);
  }

  themeCss(absolute: boolean): CSSTree {
    return Object.entries(this.cssVariables(absolute)).map(
      ([key, value]) => `${key}: ${value};`,
    );
  }

  otherCss(_selector: string, _absolute: boolean): CSSTree {
    return [];
  }

  protected cssVariables(absolute: boolean): CSSVariables {
    const cssVariables: CSSVariables = {};

    this.#tokens.forEach((token) => {
      if (absolute) {
        token.css.inspect((css) => {
          cssVariables[css.key] = token.value;
        });
      } else {
        token.css.inspect((css) => {
          cssVariables[css.key] = css.value;
        });
      }
    });

    return cssVariables;
  }

  protected addToken(
    rawName: string,
    value: string,
    {
      css,
    }: {
      css?: {
        key: (string | undefined)[];
        value: string | (string | undefined)[];
      };
    } = {},
  ) {
    const name = rawName.replace(/-default$/i, '');
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
        TokenValue.create({
          name,
          value,
          css: {
            key: keyVariable,
            value: valueVariable,
          },
        }),
      );
    } else {
      this.#tokens.push(
        TokenValue.create({
          name,
          value,
        }),
      );
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
    if (type === 'key') {return variable;}
    return `var(${variable})`;
  }

  protected calculate(value: string): Result<string, string> {
    const v = value.replace(/,/g, '.');
    if (this.#invalidValuePattern.test(v)) {return Ok(v);}
    if (this.#valueAsOnlyOneNumberPattern.test(v)) {return Ok(v);}

    const changeResult = this.changePxToRem(v);
    if (changeResult.isErr()) {
      return changeResult;
    }
    const inRem = changeResult.unwrap();
    const withoutRem = inRem.replace(/rem/g, '');
    const result = this.calculator.calculate(withoutRem);
    if (result.isErr()) {
      return result;
    }
    return Ok(`${result.unwrap()}rem`);
  }

  protected changePxToRem(value: string): Result<string, string> {
    try {
      const replaced = value.replace(this.#valueInPixelPattern, (match, v) => {
        try {
          return `${parseFloat(v) / 16}rem`;
        } catch {
          throw new Error(`fail convert ${match} to rem`);
        }
      });
      return Ok(replaced);
    } catch (e) {
      if (e instanceof Error) {
        return Err(e.message);
      } else {
        return Err(`Fail convert ${value} to rem`);
      }
    }
  }

  protected changeRemToPx(value: string): Result<string, string> {
    try {
      const replaced = value.replace(this.#valueInRemPattern, (match, v) => {
        try {
          return `${parseFloat(v) * 16}px`;
        } catch {
          throw new Error(`fail convert ${match} to px`);
        }
      });
      return Ok(replaced);
    } catch (e) {
      if (e instanceof Error) {
        return Err(e.message);
      } else {
        return Err(`Fail convert ${value} to px`);
      }
    }
  }
}
