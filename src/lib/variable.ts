import { kebabCase } from './kebab-case';

export const variable = (...parts: string[]) =>
  `--pw-${parts.map(kebabCase).join('-')}`;
