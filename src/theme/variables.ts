import { Theme } from '@/types/theme';
import { Variables } from '@/types/variables';
import { generateColorVariables } from './color/variables';
import { generateRadiusVariables } from './radius/variables';
import { generateSystemVariables } from './system/variables';

export const generateThemeVariables = <T extends Theme>(
  config: T,
): Variables => {
  const result: Variables = {};

  Object.assign(result, generateRadiusVariables(config.prefix, config.radius));
  Object.assign(result, generateColorVariables(config.prefix, config.color));
  Object.assign(result, generateSystemVariables(config.prefix, config.system));

  return result;
};
