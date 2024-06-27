import { variable } from '@/lib/variable';
import { ColorDesignTokens } from '@/types/color';
import { Variables } from '@/types/variables';

export const generateColorVariables = (
  colorName: string,
  tokens: ColorDesignTokens,
): Variables => {
  const variables: Variables = {};

  Object.entries(tokens).forEach(([token, value]) => {
    const name = variable('color', colorName, token);
    variables[name] = value;
  });

  return variables;
};
