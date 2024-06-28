import { RadiusDesignTokens } from '@/types/radius';
import { Variables } from '@/types/variables';
import { radiusVariable } from './radius-variable';

export const generateRadiusVariables = (
  tokens: RadiusDesignTokens,
): Variables => {
  const variables: Variables = {};

  Object.entries(tokens).forEach(([token, value]) => {
    const name = radiusVariable(token);
    variables[name] = value;
  });

  return variables;
};
