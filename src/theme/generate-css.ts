import { Config } from '@/types/config';
import { generateThemesFromConfig } from './generate-themes';
import { generateThemeVariables } from './variables';

export const generateCSSFromConfig = <T extends Config>(
  config: T,
  spacing = 2,
): string => {
  const themes = generateThemesFromConfig(config);
  const lines: string[] = [];

  const space = (n = 1) => ' '.repeat(spacing).repeat(n);

  Object.entries(themes).forEach(([name, theme], index, arr) => {
    const selectors = [`.${name}`, `[data-theme="${name}"]`];
    if (name === config.default) {
      selectors.unshift(':root');
    }
    lines.push(selectors.join(', ') + ' {');

    const variables = generateThemeVariables(theme);

    Object.entries(variables).forEach(([key, value]) => {
      lines.push(`${space()}${key}: ${value};`);
    });

    lines.push('}');
    if (arr.length - 1 === index) {
      lines.push('');
    }
  });

  return lines.join('\n');
};
