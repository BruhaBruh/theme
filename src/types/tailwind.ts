import { Config, PluginAPI } from 'tailwindcss/types/config';

export type TailwindPluginApi = PluginAPI;

export type TailwindConfig = Partial<Config>;

export type TailwindThemeConfig = NonNullable<TailwindConfig['theme']>;
