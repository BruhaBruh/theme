import { ThemeConfig } from './config';

export type ThemeRadius<T extends ThemeConfig = ThemeConfig> = Record<
  keyof T['ref']['radius'],
  string
>;
