import { kebabCase } from '@/lib/kebab-case';
import { variable } from '@/lib/variable';
import { ColorLinkedDesignTokens } from '@/types/color';
import { Variables } from '@/types/variables';
import { systemColorVariable } from './color-variable';

const resolveColor = (color: string) => {
  if (color.startsWith('$')) {
    const c = color.substring(1).replace(/\./g, '-');
    return `var(${variable(c)})`;
  }
  return color;
};

export const generateSystemColorVariables = (
  tokens: ColorLinkedDesignTokens,
  isNested = false,
): Variables => {
  const variables: Variables = {};

  Object.entries(tokens).forEach(([token, value]) => {
    if (typeof value === 'string') {
      variables[isNested ? kebabCase(token) : systemColorVariable(token)] =
        resolveColor(value);
    } else {
      const objectVariables = generateSystemColorVariables(value, true);
      Object.entries(objectVariables).forEach(([key, v]) => {
        variables[systemColorVariable(key ? `${token}-${key}` : token)] = v;
      });
    }
  });

  return variables;
};
