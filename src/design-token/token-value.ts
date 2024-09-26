import { None, Option, Some } from '@bruhabruh/type-safe';

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

  static create(name: string, value: string, css?: CSS) {
    return new TokenValue(name, value, css);
  }

  private constructor(name: string, value: string, css?: CSS) {
    this.#name = name;
    this.#value = value;
    if (css) {
      this.#css = Some({ ...css, keyVariable: `var(${css.key})` });
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
