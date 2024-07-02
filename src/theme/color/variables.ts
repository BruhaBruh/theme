import { variable } from '@/lib/variable';
import { ThemeColor } from '@/types/color';
import { Variables } from '@/types/variables';

export const generateColorVariables = <T extends ThemeColor>(
  prefix: string | undefined,
  color: T,
): Variables => {
  const result: Variables = {};

  Object.entries(color).forEach(([variant, colors]) => {
    Object.entries(colors).forEach(([colorVariant, value]) => {
      result[variable(prefix, 'ref', 'color', variant, colorVariant)] = value;
    });
  });

  return result;
};
