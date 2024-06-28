import { ColorDesignTokens } from '@/types/color';
import { Variables } from '@/types/variables';
import { colorVariable } from './color-variable';

export const generateColorVariables = (
  colorName: string,
  tokens: ColorDesignTokens,
): Variables => {
  const variables: Variables = {};

  Object.entries(tokens).forEach(([token, value]) => {
    const name = colorVariable(colorName, token);
    variables[name] = value;
  });

  return variables;
};
