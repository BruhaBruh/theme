import { configWithThemesSchema } from '@/config/schema';
import { z } from 'zod';

export type Config = z.infer<typeof configWithThemesSchema>;

export type ThemeNames<C extends Config = Config> = keyof C['themes'];

export type DefaultThemeName<C extends Config = Config> = keyof C['themes'] &
  C['default'];

export type ThemeName<
  C extends Config = Config,
  N extends ThemeNames<C> = string,
> = ThemeNames<C> & N;

export type ThemeConfig<
  C extends Config = Config,
  N extends ThemeNames<C> = ThemeNames<C>,
> = C['themes'][N];

export type DefaultThemeConfig<C extends Config = Config> = ThemeConfig<
  C,
  DefaultThemeName<C>
>;
