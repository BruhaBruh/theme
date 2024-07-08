import { kebabCase } from '@/lib/kebab-case';
import { merge } from '@/lib/merge';
import { normalize } from '@/lib/normalize';
import { variable } from '@/lib/variable';
import { withAlpha } from '@/lib/with-alpha';
import { withSubtractTone } from '@/lib/with-subtract-tone';
import {
  Color,
  colorVariants,
  colorVariantsByAlpha,
  colorVariantsByDarken,
} from '@/types/color';
import { Config, ThemeConfig, ThemeName } from '@/types/config';
import { TailwindThemeConfig } from '@/types/tailwind';
import { ThemeColor } from '@/types/theme';
import { Variables } from '@/types/variables';
import { ColorTranslator } from 'colortranslator';
import { easeInOutSine, easeInSine, easeOutSine } from 'easing-utils';
import { RecursiveKeyValuePair } from 'tailwindcss/types/config';

type TailwindColor = Pick<Required<TailwindThemeConfig>, 'colors'> & {
  extend: Pick<
    Required<TailwindThemeConfig>,
    | 'borderColor'
    | 'textColor'
    | 'backgroundColor'
    | 'outlineColor'
    | 'ringColor'
  >;
};

export class ColorDesignTokens<
  C extends Config = Config,
  N extends ThemeName<C> = ThemeName<C>,
  T extends ThemeConfig<C, N> = ThemeConfig<C, N>,
> {
  readonly #config: C;
  readonly #themeName: N;
  readonly #themeConfig: T;
  readonly #variables: Variables;
  readonly #tailwind: TailwindColor;
  readonly #colorPalette: ThemeColor<T>;

  constructor(
    config: C,
    themeName: N,
    themeConfig: T,
    variables?: Variables,
    tailwind?: TailwindColor,
  ) {
    this.#config = config;
    this.#themeName = themeName;
    this.#themeConfig = themeConfig;
    this.#colorPalette = this.generateColorPalette();
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

  get tailwind(): TailwindColor {
    return this.#tailwind;
  }

  get colorPalette(): ThemeColor<T> {
    return this.#colorPalette;
  }

  private generateVariables(): Variables {
    return merge(this.generateRefVariables(), this.generateSysVariables());
  }

  private generateRefVariables(): Variables {
    const variables = {} as Variables;

    const keys = Object.keys(this.themeConfig.palette);

    for (let i = 0; i < keys.length; i++) {
      const name = keys[i];
      const palette = this.#colorPalette[name];

      const colorKeys = Object.keys(palette);

      for (let j = 0; j < colorKeys.length; j++) {
        const variant = colorKeys[j];
        const value = this.#colorPalette[name][variant];
        const cssVar = variable(
          this.config.prefix,
          'ref',
          'color',
          name,
          variant,
        );
        variables[cssVar] = value;
      }
    }

    return variables;
  }

  private generateSysVariables(): Variables {
    const variables = {} as Variables;

    const keys = Object.keys(this.themeConfig.sys.color);

    for (let i = 0; i < keys.length; i++) {
      const colorType = keys[i] as keyof ThemeConfig['sys']['color'];
      const colors = this.themeConfig.sys.color[colorType];

      const colorKeys = Object.keys(colors);

      for (let j = 0; j < colorKeys.length; j++) {
        const variant = colorKeys[j];
        const value =
          colors[variant].startsWith('${') && colors[variant].endsWith('}')
            ? `var(${variable(this.config.prefix, 'ref', 'color', ...colors[variant].substring(2, colors[variant].length - 1).split('.'))})`
            : colors[variant];

        const cssVar = variable(
          this.config.prefix,
          'sys',
          'color',
          colorType,
          variant,
        );
        variables[cssVar] = value;
      }
    }

    return variables;
  }

  private generateTailwind(): TailwindColor {
    return merge(this.generateRefTailwind());
  }

  private generateRefTailwind(): TailwindColor {
    const tailwind = {
      colors: {},
      extend: {
        backgroundColor: {},
        textColor: {},
        borderColor: {},
        outlineColor: {},
        ringColor: {},
      },
    } as TailwindColor;

    const keys = Object.keys(this.themeConfig.palette);

    for (let i = 0; i < keys.length; i++) {
      const name = keys[i];
      const palette = this.#colorPalette[name];

      const colorKeys = Object.keys(palette);

      for (let j = 0; j < colorKeys.length; j++) {
        const variant = colorKeys[j];
        const cssVar = variable(
          this.config.prefix,
          'ref',
          'color',
          name,
          variant,
        );
        if (typeof tailwind.colors[kebabCase(name)] === 'string') {
          tailwind.colors[kebabCase(name)] = {
            DEFAULT: tailwind.colors[kebabCase(name)],
            [kebabCase(variant)]: `var(${cssVar})`,
          };
        } else {
          tailwind.colors[kebabCase(name)] = {
            ...(tailwind.colors[kebabCase(name)] as RecursiveKeyValuePair<
              string,
              string
            >),
            [kebabCase(variant)]: `var(${cssVar})`,
          };
        }
      }
    }

    return tailwind;
  }

  private generateColorPalette(): ThemeColor<T> {
    const result = {} as ThemeColor;

    const keys = Object.keys(this.themeConfig.palette);

    for (let i = 0; i < keys.length; i++) {
      const name = keys[i];
      const rawColor = this.themeConfig.palette[name];
      let color: Color;
      if (typeof rawColor === 'string') {
        color = this.generateColor(name.toLowerCase(), rawColor);
      } else if (
        'darkenRatio' in rawColor &&
        'source' in rawColor &&
        Object.keys(rawColor).length === 2
      ) {
        color = this.generateColor(
          name.toLowerCase(),
          rawColor.source,
          typeof rawColor.darkenRatio === 'number'
            ? rawColor.darkenRatio
            : Number.parseFloat(rawColor.darkenRatio),
        );
      } else {
        color = rawColor as Color;
      }
      result[name.toLowerCase()] = color;
    }

    return result as ThemeColor<T>;
  }

  private generateColor(
    name: string,
    rawColor: string,
    darkenRatio = 25,
  ): Color {
    const result = {} as Color;

    const color = ColorTranslator.toRGBObject(rawColor);
    if (name === 'white') {
      colorVariants.forEach((variant) => {
        result[variant] = withAlpha(
          color,
          easeInSine(
            normalize(variant, {
              minInput: 50,
              maxInput: 1000,
              minOutput: 0.17,
              maxOutput: 1,
            }),
          ),
        );
      });
    } else if (name === 'black') {
      colorVariants.forEach((variant) => {
        result[variant] = withAlpha(
          color,
          easeInSine(
            normalize(variant, {
              minInput: 50,
              maxInput: 1000,
              minOutput: 0.14,
              maxOutput: 1,
            }),
          ),
        );
      });
    } else {
      colorVariantsByAlpha.forEach((variant) => {
        result[variant] = withAlpha(
          color,
          easeInOutSine(
            normalize(variant, {
              minInput: 50,
              maxInput: 600,
              minOutput: 0.08,
              maxOutput: 0.78,
            }),
          ),
        );
      });
      colorVariantsByDarken.forEach((variant) => {
        result[variant] = withSubtractTone(
          color,
          darkenRatio *
            easeOutSine(
              normalize(variant, {
                minInput: 650,
                maxInput: 1000,
                minOutput: 0.12,
                maxOutput: 1,
              }),
            ),
        );
      });
    }

    return result;
  }
}
