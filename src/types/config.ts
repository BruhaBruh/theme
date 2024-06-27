import { ColorToken } from './color';
import { RadiusValue } from './radius';

export type BaseThemeConfig = {
  radius: RadiusValue;
  palette: Record<ColorToken | string, string>;
};

export type ThemeConfig = Partial<BaseThemeConfig>;

export type Config<T extends string = string> = {
  defaultTheme: T;
  base: BaseThemeConfig;
  themes: Record<T, ThemeConfig>;
};
