import { ThemeColor } from './color';
import { Config, ThemeConfig } from './config';
import { ThemeRadius } from './radius';
import { ThemeSystem } from './system';

export type Theme<
  P extends string | undefined = string | undefined,
  T extends ThemeConfig = ThemeConfig,
> = {
  prefix: P;
  radius: ThemeRadius<T>;
  color: ThemeColor<T>;
  system: ThemeSystem<T>;
};

export type Themes<T extends Config = Config> = Record<
  keyof T['themes'],
  Theme<T['prefix'], T['themes'][string]>
>;
