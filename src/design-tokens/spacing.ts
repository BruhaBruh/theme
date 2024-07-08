import { kebabCase } from '@/lib/kebab-case';
import { merge } from '@/lib/merge';
import { resolveReferences } from '@/lib/resolve-reference';
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
      const value = resolveReferences(
        this.themeConfig.ref.spacing[variant as string],
        this.themeConfig,
      );
      const cssVar = variable(this.config.prefix, 'ref', 'spacing', variant);
      variables[cssVar] = value;
    }

    return variables;
  }

  private generateSysVariables(): Variables {
    const variables = {} as Variables;

    const keys = Object.keys(this.themeConfig.sys.spacing);

    for (let i = 0; i < keys.length; i++) {
      const variant = keys[i];
      const value =
        this.themeConfig.sys.spacing[variant].startsWith('${') &&
        this.themeConfig.sys.spacing[variant].endsWith('}')
          ? `var(${variable(
              this.config.prefix,
              'ref',
              'spacing',
              ...this.themeConfig.sys.spacing[variant]
                .substring(2, this.themeConfig.sys.spacing[variant].length - 1)
                .split('.'),
            )})`
          : this.themeConfig.sys.spacing[variant];
      const cssVar = variable(this.config.prefix, 'sys', 'spacing', variant);
      variables[cssVar] = value;
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
      const cssVar = variable(this.config.prefix, 'ref', 'spacing', variant);
      if (variant === 'DEFAULT') {
        tailwind.spacing[variant] = `var(${cssVar})`;
      } else {
        tailwind.spacing[kebabCase(variant)] = `var(${cssVar})`;
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
      const cssVar = variable(this.config.prefix, 'sys', 'spacing', variant);
      tailwind.extend.spacing[kebabCase(variant)] = `var(${cssVar})`;
    }

    return tailwind;
  }
}
