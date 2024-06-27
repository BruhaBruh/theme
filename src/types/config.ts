import { ColorToken } from './color';
import { RadiusValue } from './radius';

export type ThemeConfig = {
  radius: RadiusValue;
  palette: Record<ColorToken | string, string>;
};

export type Config<T extends string = string> = {
  defaultTheme: T;
  base: ThemeConfig;
  themes: Record<T, Partial<ThemeConfig>>;
};
