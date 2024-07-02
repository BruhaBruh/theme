import { variable } from '@/lib/variable';
import { ThemeSystem } from '@/types/system';
import { Variables } from '@/types/variables';

export const generateSystemVariables = <T extends ThemeSystem>(
  prefix: string | undefined,
  system: T,
): Variables => {
  const result: Variables = {};

  Object.entries(system).forEach(([type, typeVariants]) => {
    Object.entries(typeVariants).forEach(([typeVariant, variants]) => {
      Object.entries(variants).forEach(([variant, value]) => {
        result[variable(prefix, 'sys', type, typeVariant, variant)] = value;
      });
    });
  });

  return result;
};
