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
  readonly #css: FullCSS | null = null;

  static create(name: string, value: string, css?: CSS) {
    return new TokenValue(name, value, css);
  }

  private constructor(name: string, value: string, css?: CSS) {
    this.#name = name;
    this.#value = value;
    this.#css = css ? { ...css, keyVariable: `var(${css.key})` } : null;
  }

  get name(): string {
    return this.#name;
  }

  get value(): string {
    return this.#value;
  }

  get css(): FullCSS | null {
    return this.#css;
  }
}
