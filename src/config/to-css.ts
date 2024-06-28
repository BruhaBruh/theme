import { Config } from '@/types/config';
import { Variables } from '@/types/variables';
import { themesFromConfig } from './themes';
import { themesVariables } from './variables';

const themeLines = (
  theme: string,
  variables: Variables,
  space: (n?: number) => string,
  isDefault = false,
): string[] => {
  const lines: string[] = [];

  lines.push(isDefault ? `:root, .${theme} {` : `.${theme} {`);
  Object.entries<string>(variables).forEach(([variable, value]) => {
    lines.push(`${space(1)}${variable}: ${value};`);
  });
  lines.push('}');

  return lines;
};

export const configToCSS = <T extends string = string>(
  config: Config<T>,
  spacing = 2,
): string => {
  const themes = themesFromConfig(config);
  const variables = themesVariables(themes);

  const space = (n = 1) => ' '.repeat(spacing).repeat(n);
  const lines: string[][] = [];

  const entries = Object.entries<Variables>(variables).sort((a) =>
    a[0] === config.defaultTheme ? -1 : 0,
  );

  entries.forEach(([theme, vars]) => {
    lines.push(themeLines(theme, vars, space, theme === config.defaultTheme));
  });

  return lines
    .flatMap((v, i, arr) => (i === arr.length - 1 ? v : [...v, '']))
    .join('\n');
};
