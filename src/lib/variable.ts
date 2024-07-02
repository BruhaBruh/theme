import { kebabCase } from './kebab-case';

export const variable = (prefix?: string, ...parts: string[]) =>
  `--${prefix ? `${prefix}-` : ''}${parts.map(kebabCase).join('-')}`;
