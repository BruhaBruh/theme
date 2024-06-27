import { ColorToken } from './color';
import { RadiusValue } from './radius';
import { ThemeOptions } from './theme';

export type ThemeConfig = {
  radius: RadiusValue;
  palette: Record<ColorToken | string, string>;
  options?: ThemeOptions;
};

export type Config<T extends string = string> = {
  defaultTheme: T;
  base: ThemeConfig;
  themes: Record<T, Partial<ThemeConfig>>;
};
