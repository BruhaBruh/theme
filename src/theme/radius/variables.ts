import { variable } from '@/lib/variable';
import { ThemeRadius } from '@/types/radius';
import { Variables } from '@/types/variables';

export const generateRadiusVariables = <T extends ThemeRadius>(
  prefix: string | undefined,
  radius: T,
): Variables => {
  const result: Variables = {};

  Object.entries(radius).forEach(([variant, value]) => {
    result[variable(prefix, 'ref', 'radius', variant)] = value;
  });

  return result;
};
