import { variable } from '@/lib/variable';
import { ThemeRadius } from '@/types/radius';
import { ThemeConfig as Config } from 'tailwindcss/types/config';

export const generateRadiusTailwind = <T extends ThemeRadius>(
  prefix: string | undefined,
  radius: T,
): Config['borderRadius'] => {
  const result: Config['borderRadius'] = {};

  Object.keys(radius).forEach((variant) => {
    result[variant] = `var(${variable(prefix, 'ref', 'radius', variant)})`;
  });

  return result;
};
