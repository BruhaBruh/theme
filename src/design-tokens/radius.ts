import { kebabCase } from '@/lib/kebab-case';
import { merge } from '@/lib/merge';
import { replaceReferences } from '@/lib/replace-references';
import { variable } from '@/lib/variable';
import { Config, ThemeConfig, ThemeName } from '@/types/config';
import { TailwindThemeConfig } from '@/types/tailwind';
import { Variables } from '@/types/variables';

type TailwindBorderRadius = Pick<
  Required<TailwindThemeConfig>,
  'borderRadius'
> & {
  extend: Pick<Required<TailwindThemeConfig>, 'borderRadius'>;
};

export class RadiusDesignTokens<
  C extends Config = Config,
  N extends ThemeName<C> = ThemeName<C>,
  T extends ThemeConfig<C, N> = ThemeConfig<C, N>,
> {
  readonly #config: C;
  readonly #themeName: N;
  readonly #themeConfig: T;
  readonly #variables: Variables;
  readonly #tailwind: TailwindBorderRadius;

  constructor(
    config: C,
    themeName: N,
    themeConfig: T,
    variables?: Variables,
    tailwind?: TailwindBorderRadius,
  ) {
    this.#config = config;
    this.#themeName = themeName;
    this.#themeConfig = themeConfig;
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

  get tailwind(): TailwindBorderRadius {
    return this.#tailwind;
  }

  private generateVariables(): Variables {
    return merge(this.generateRefVariables(), this.generateSysVariables());
  }

  private generateRefVariables(): Variables {
    const variables = {} as Variables;

    const keys = Object.keys(this.themeConfig.ref.radius);

    for (let i = 0; i < keys.length; i++) {
      const variant = keys[i];
      const key = this.variableKey('ref', variant);
      const value = replaceReferences(
        this.themeConfig.ref.radius[variant],
        this.themeConfig,
      );
      variables[key] = value;
    }

    return variables;
  }

  private generateSysVariables(): Variables {
    const variables = {} as Variables;

    const keys = Object.keys(this.themeConfig.sys.radius);

    for (let i = 0; i < keys.length; i++) {
      const variant = keys[i];
      const key = this.variableKey('sys', variant);
      const rawValue = this.themeConfig.sys.radius[variant];
      const value = this.isReference(rawValue)
        ? this.variableKey('ref', this.getReference(rawValue), true)
        : rawValue;
      variables[key] = value;
    }

    return variables;
  }

  private generateTailwind(): TailwindBorderRadius {
    return merge(this.generateRefTailwind(), this.generateSysTailwind());
  }

  private generateRefTailwind(): TailwindBorderRadius {
    const tailwind = {
      borderRadius: {},
      extend: {
        borderRadius: {},
      },
    } as TailwindBorderRadius;

    const keys = Object.keys(this.themeConfig.ref.radius);

    for (let i = 0; i < keys.length; i++) {
      const variant = keys[i];
      const value = this.variableKey('ref', variant, true);
      if (variant === 'DEFAULT') {
        tailwind.borderRadius[variant] = value;
      } else {
        tailwind.borderRadius[kebabCase(variant)] = value;
      }
    }

    return tailwind;
  }

  private generateSysTailwind(): TailwindBorderRadius {
    const tailwind = {
      borderRadius: {},
      extend: {
        borderRadius: {},
      },
    } as TailwindBorderRadius;

    const keys = Object.keys(this.themeConfig.sys.radius);

    for (let i = 0; i < keys.length; i++) {
      const variant = keys[i];
      const value = this.variableKey('sys', variant, true);
      tailwind.extend.borderRadius[kebabCase(variant)] = value;
    }

    return tailwind;
  }

  private variableKey(
    type: 'ref' | 'sys',
    variant: string,
    withVar = false,
  ): string {
    return variable({
      withVar,
      parts: [this.config.prefix, type, 'radius', variant],
    });
  }

  private isReference(value: string): boolean {
    return /^\$\{.*\}$/.test(value);
  }

  private getReference(value: string): string {
    return value.substring(2, value.length - 1);
  }
}
