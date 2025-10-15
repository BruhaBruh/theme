import type { Option } from '@bruhabruh/type-safe';
import { None, Some } from '@bruhabruh/type-safe';

type CSS = {
  key: string;
  value: string;
};

type FullCSS = CSS & {
  keyVariable: string;
};

export class TokenValue {
  readonly #name: string;
  readonly #value: string;
  readonly #css: Option<FullCSS> = None;

  static create(args: { name: string; value: string; css?: CSS }) {
    return new TokenValue(args);
  }

  private constructor({
    name,
    value,
    css,
  }: {
    name: string;
    value: string;
    css?: CSS;
  }) {
    this.#name = name;
    this.#value = value;
    if (css) {
      this.#css = Some({ ...css, keyVariable: `var(${css.key}, ${value})` });
    }
  }

  get name(): string {
    return this.#name;
  }

  get value(): string {
    return this.#value;
  }

  get css(): Option<FullCSS> {
    return this.#css;
  }
}
