import { Config, ResolvableTo, ThemeConfig } from 'tailwindcss/types/config';

type ReplaceFunctionsWithValues<T> = {
  [K in keyof T]: T[K] extends ResolvableTo<infer R> ? R : never;
};

export type TailwindConfig = Config;

export type PlainTailwindThemeConfig = ReplaceFunctionsWithValues<ThemeConfig>;

export type TailwindThemeConfig = Partial<
  PlainTailwindThemeConfig & {
    extend: Partial<PlainTailwindThemeConfig>;
  }
>;
