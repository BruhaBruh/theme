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
  readonly #humanReadableValue: string | undefined;
  readonly #css: Option<FullCSS> = None;

  static create(args: {
    name: string;
    value: string;
    humanReadableValue?: string;
    css?: CSS;
  }) {
    return new TokenValue(args);
  }

  private constructor({
    name,
    value,
    humanReadableValue,
    css,
  }: {
    name: string;
    value: string;
    humanReadableValue?: string;
    css?: CSS;
  }) {
    this.#name = name;
    this.#value = value;
    this.#humanReadableValue = humanReadableValue;
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

  get humanReadableValue(): string {
    if (this.#humanReadableValue) return this.#humanReadableValue;
    return this.#value;
  }

  get css(): Option<FullCSS> {
    return this.#css;
  }

  toTailwindString({
    absolute = false,
    mapper = (v) => v,
  }: Partial<{
    absolute: boolean;
    mapper: (variable: string) => string;
  }>): string {
    if (absolute) return this.value;
    const comments = [this.humanReadableValue, this.value];
    let comment = `${this.humanReadableValue} = ${this.value}`;
    if (comments[0] === comments[1]) {
      comment = this.value;
    }
    return this.css.mapOr(
      this.value,
      (css) => `/* ${comment} */ ${mapper(css.keyVariable)}`,
    );
  }
}
