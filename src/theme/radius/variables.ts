import { variable } from '@/lib/variable';
import { RadiusDesignTokens } from '@/types/radius';
import { Variables } from '@/types/variables';

export const generateRadiusVariables = (
  tokens: RadiusDesignTokens,
): Variables => {
  const variables: Variables = {};

  Object.entries(tokens).forEach(([token, value]) => {
    const name = variable('radius', token);
    variables[name] = value;
  });

  return variables;
};
