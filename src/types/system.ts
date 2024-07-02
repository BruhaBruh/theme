import { ThemeConfig } from './config';

export type ThemeSystemColorText<T extends ThemeConfig = ThemeConfig> = Record<
  keyof T['sys']['color']['text'],
  string
>;

export type ThemeSystemColorBackground<T extends ThemeConfig = ThemeConfig> =
  Record<keyof T['sys']['color']['background'], string>;

export type ThemeSystemColorBorder<T extends ThemeConfig = ThemeConfig> =
  Record<keyof T['sys']['color']['border'], string>;

export type ThemeSystemColorRing<T extends ThemeConfig = ThemeConfig> = Record<
  keyof T['sys']['color']['ring'],
  string
>;

export type ThemeSystemColorOutline<T extends ThemeConfig = ThemeConfig> =
  Record<keyof T['sys']['color']['outline'], string>;

export type ThemeSystemColor<T extends ThemeConfig = ThemeConfig> = {
  text: ThemeSystemColorText<T>;
  background: ThemeSystemColorBackground<T>;
  border: ThemeSystemColorBorder<T>;
  ring: ThemeSystemColorRing<T>;
  outline: ThemeSystemColorOutline<T>;
};

export type ThemeSystem<T extends ThemeConfig = ThemeConfig> = {
  color: ThemeSystemColor<T>;
};
