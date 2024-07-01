import { kebabCase } from '@/lib/kebab-case';
import { ColorLinkedDesignTokens } from '@/types/color';
import { ThemeConfig } from 'tailwindcss/types/config';
import { systemColorVariable } from './color-variable';

type ThemeColors =
  | 'colors'
  | 'textColor'
  | 'backgroundColor'
  | 'ringColor'
  | 'outlineColor'
  | 'borderColor';

export type ColorsThemeConfig = Pick<ThemeConfig, ThemeColors>;

type PlainColorsThemeConfig = Record<ThemeColors, Record<string, string>>;

export const generateSystemColorTailwindConfig = <T extends boolean = false>(
  tokens: ColorLinkedDesignTokens,
  isNested?: T,
): T extends true ? Record<string, string> : ColorsThemeConfig => {
  if (isNested) {
    const config: Record<string, string> = {};
    Object.entries(tokens).forEach(([token, value]) => {
      if (typeof value === 'string') {
        config[kebabCase(token)] = kebabCase(token);
      } else {
        Object.entries(generateSystemColorTailwindConfig(value, true)).forEach(
          ([key, v]) => {
            config[kebabCase(`${token}-${key}`)] =
              `var(${systemColorVariable(token)}-${v})`;
          },
        );
      }
    });
    //@ts-ignore
    return config;
  } else {
    const config: PlainColorsThemeConfig = {
      colors: {},
      textColor: {},
      backgroundColor: {},
      ringColor: {},
      outlineColor: {},
      borderColor: {},
    };

    Object.entries(tokens).forEach(([token, value]) => {
      let objectConfig: Record<string, string> = {};
      if (typeof value === 'string') {
        objectConfig[kebabCase(token)] = `var(${systemColorVariable(token)})`;
      } else {
        objectConfig = generateSystemColorTailwindConfig(value, true);
      }

      Object.entries(objectConfig).forEach(([k, v]) => {
        const keyWithPrefix = kebabCase(`${token}-${k}`);
        const prefix = keyWithPrefix.split('-').slice(0, 1).join('-');
        const key = keyWithPrefix.split('-').slice(1).join('-');
        const variable = `var(${systemColorVariable(token)}-${v})`;

        if (prefix === 'text') {
          config.textColor[key] = variable;
        } else if (prefix === 'background') {
          config.backgroundColor[key] = variable;
        } else if (prefix === 'border') {
          config.borderColor[key] = variable;
        } else if (prefix === 'ring') {
          config.ringColor[key] = variable;
        } else if (prefix === 'outline') {
          config.outlineColor[key] = variable;
        } else {
          config.colors[key] = variable;
        }
      });
    });

    //@ts-ignore
    return config;
  }
};
