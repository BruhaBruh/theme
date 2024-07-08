import { kebabCase } from '@/lib/kebab-case';
import { merge } from '@/lib/merge';
import { resolveReferences } from '@/lib/resolve-reference';
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
      const value = resolveReferences(
        this.themeConfig.ref.radius[variant as string],
        this.themeConfig,
      );
      const cssVar = variable(this.config.prefix, 'ref', 'radius', variant);
      variables[cssVar] = value;
    }

    return variables;
  }

  private generateSysVariables(): Variables {
    const variables = {} as Variables;

    const keys = Object.keys(this.themeConfig.sys.radius);

    for (let i = 0; i < keys.length; i++) {
      const variant = keys[i];
      const value =
        this.themeConfig.sys.radius[variant].startsWith('${') &&
        this.themeConfig.sys.radius[variant].endsWith('}')
          ? `var(${variable(
              this.config.prefix,
              'ref',
              'radius',
              ...this.themeConfig.sys.radius[variant]
                .substring(2, this.themeConfig.sys.radius[variant].length - 1)
                .split('.'),
            )})`
          : this.themeConfig.sys.radius[variant];
      const cssVar = variable(this.config.prefix, 'sys', 'radius', variant);
      variables[cssVar] = value;
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
      const cssVar = variable(this.config.prefix, 'ref', 'radius', variant);
      if (variant === 'DEFAULT') {
        tailwind.borderRadius[variant] = `var(${cssVar})`;
      } else {
        tailwind.borderRadius[kebabCase(variant)] = `var(${cssVar})`;
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
      const cssVar = variable(this.config.prefix, 'sys', 'radius', variant);
      tailwind.extend.borderRadius[kebabCase(variant)] = `var(${cssVar})`;
    }

    return tailwind;
  }
}
