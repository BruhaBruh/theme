import { generateThemeVariables } from '@/theme';
import { Theme } from '@/types/theme';
import { Variables } from '@/types/variables';
import { Themes } from './themes';

export type ThemesVariables<T extends string> = Record<T, Variables>;

export const themesVariables = <T extends string>(
  themes: Themes<T>,
): ThemesVariables<T> => {
  const variables = {} as ThemesVariables<T>;

  Object.entries<Theme>(themes).forEach(([themeName, theme]) => {
    variables[themeName as T] = generateThemeVariables(theme);
  });

  return variables;
};
