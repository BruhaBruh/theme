import { Color } from './color';
import { ThemeConfig } from './config';

export type ThemeColor<T extends ThemeConfig = ThemeConfig> = Record<
  keyof T['ref']['palette'],
  Color
>;
