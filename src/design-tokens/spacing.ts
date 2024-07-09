import { kebabCase } from '@/lib/kebab-case';
import { merge } from '@/lib/merge';
import { replaceReferences } from '@/lib/replace-references';
import { variable } from '@/lib/variable';
import { Config, ThemeConfig, ThemeName } from '@/types/config';
import { TailwindThemeConfig } from '@/types/tailwind';
import { Variables } from '@/types/variables';

type TailwindSpacing = Pick<Required<TailwindThemeConfig>, 'spacing'> & {
  extend: Pick<Required<TailwindThemeConfig>, 'spacing'>;
};

export class SpacingDesignTokens<
  C extends Config = Config,
  N extends ThemeName<C> = ThemeName<C>,
  T extends ThemeConfig<C, N> = ThemeConfig<C, N>,
> {
  readonly #config: C;
  readonly #themeName: N;
  readonly #themeConfig: T;
  readonly #variables: Variables;
  readonly #tailwind: TailwindSpacing;

  constructor(
    config: C,
    themeName: N,
    themeConfig: T,
    variables?: Variables,
    tailwind?: TailwindSpacing,
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

  get tailwind(): TailwindSpacing {
    return this.#tailwind;
  }

  private generateVariables(): Variables {
    return merge(this.generateRefVariables(), this.generateSysVariables());
  }

  private generateRefVariables(): Variables {
    const variables = {} as Variables;

    const keys = Object.keys(this.themeConfig.ref.spacing);

    for (let i = 0; i < keys.length; i++) {
      const variant = keys[i];
      const key = this.variableKey('ref', variant);
      const value = replaceReferences(
        this.themeConfig.ref.spacing[variant],
        this.themeConfig,
      );
      variables[key] = value;
    }

    return variables;
  }

  private generateSysVariables(): Variables {
    const variables = {} as Variables;

    const keys = Object.keys(this.themeConfig.sys.spacing);

    for (let i = 0; i < keys.length; i++) {
      const variant = keys[i];
      const key = this.variableKey('sys', variant);
      const rawValue = this.themeConfig.sys.spacing[variant];
      const value = this.isReference(rawValue)
        ? this.variableKey('ref', this.getReference(rawValue), true)
        : rawValue;

      variables[key] = value;
    }

    return variables;
  }

  private generateTailwind(): TailwindSpacing {
    return merge(this.generateRefTailwind(), this.generateSysTailwind());
  }

  private generateRefTailwind(): TailwindSpacing {
    const tailwind = {
      spacing: {},
      extend: {
        spacing: {},
      },
    } as TailwindSpacing;

    const keys = Object.keys(this.themeConfig.ref.spacing);

    for (let i = 0; i < keys.length; i++) {
      const variant = keys[i];
      const value = this.variableKey('ref', variant, true);
      if (variant === 'DEFAULT') {
        tailwind.spacing[variant] = value;
      } else {
        tailwind.spacing[kebabCase(variant)] = value;
      }
    }

    return tailwind;
  }

  private generateSysTailwind(): TailwindSpacing {
    const tailwind = {
      spacing: {},
      extend: {
        spacing: {},
      },
    } as TailwindSpacing;

    const keys = Object.keys(this.themeConfig.sys.spacing);

    for (let i = 0; i < keys.length; i++) {
      const variant = keys[i];
      const value = this.variableKey('sys', variant, true);
      tailwind.extend.spacing[kebabCase(variant)] = value;
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
      parts: [this.config.prefix, type, 'spacing', variant],
    });
  }

  private isReference(value: string): boolean {
    return /^\$\{.*\}$/.test(value);
  }

  private getReference(value: string): string {
    return value.substring(2, value.length - 1);
  }
}
