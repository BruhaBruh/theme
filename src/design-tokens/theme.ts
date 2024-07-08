import { cleanObject } from '@/lib/clean-object';
import { merge } from '@/lib/merge';
import { Config, ThemeConfig, ThemeName } from '@/types/config';
import { TailwindThemeConfig } from '@/types/tailwind';
import { Variables } from '@/types/variables';
import { ColorDesignTokens } from './color';
import { RadiusDesignTokens } from './radius';
import { SpacingDesignTokens } from './spacing';

export class ThemeDesignTokens<
  C extends Config = Config,
  N extends ThemeName<C> = ThemeName<C>,
  T extends ThemeConfig<C, N> = ThemeConfig<C, N>,
> {
  readonly #config: C;
  readonly #themeName: N;
  readonly #themeConfig: T;
  readonly #variables: Variables;
  readonly #tailwind: TailwindThemeConfig = {};
  readonly #radius: RadiusDesignTokens<C, N, T>;
  readonly #color: ColorDesignTokens<C, N, T>;
  readonly #spacing: SpacingDesignTokens<C, N, T>;

  constructor(
    config: C,
    themeName: N,
    themeConfig: T,
    variables?: Variables,
    tailwind?: TailwindThemeConfig,
  ) {
    this.#config = config;
    this.#themeName = themeName;
    this.#themeConfig = themeConfig;
    this.#radius = new RadiusDesignTokens(
      this.config,
      this.themeName,
      this.themeConfig,
    );
    this.#color = new ColorDesignTokens(
      this.config,
      this.themeName,
      this.themeConfig,
    );
    this.#spacing = new SpacingDesignTokens(
      this.config,
      this.themeName,
      this.themeConfig,
    );
    this.#variables = variables || this.generateVariables();
    this.#tailwind = tailwind || this.generateTailwind();
  }

  get config(): C {
    return this.#config;
  }

  get themeName(): N {
    return this.#themeName;
  }

  get themeConfig(): T {
    return this.#themeConfig;
  }

  get variables(): Variables {
    return this.#variables;
  }

  get tailwind(): TailwindThemeConfig {
    return this.#tailwind;
  }

  toCSS(spacing: number): string[] {
    const space = (n = 1) => ' '.repeat(spacing).repeat(n);
    const lines: string[] = [];
    const selectors = [
      `.${this.themeName}`,
      `[data-theme="${this.themeName}"]`,
    ];
    if (this.themeName === this.config.default) {
      selectors.unshift(':root');
    }
    lines.push(selectors.join(', ') + ' {');

    const keys = Object.keys(this.variables);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const variable = this.variables[key];
      lines.push(`${space()}${key}: ${variable};`);
    }

    lines.push('}');

    return lines;
  }

  private generateVariables(): Variables {
    return merge(
      this.#radius.variables,
      this.#color.variables,
      this.#spacing.variables,
    );
  }

  private generateTailwind(): TailwindThemeConfig {
    return cleanObject(
      merge<TailwindThemeConfig>(
        this.#radius.tailwind,
        this.#color.tailwind,
        this.#spacing.tailwind,
      ),
    );
  }
}
