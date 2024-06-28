import { SystemDesignTokens } from '@/types/system';
import { Variables } from '@/types/variables';
import { generateSystemColorVariables } from './color/variables';

export const generateSystemVariables = (
  systemTokens: SystemDesignTokens,
): Variables => {
  const variables: Variables = {};

  Object.assign(variables, generateSystemColorVariables(systemTokens.color));

  return variables;
};
