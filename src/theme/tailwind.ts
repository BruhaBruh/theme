import { Theme } from '@/types/theme';
import { Config } from 'tailwindcss/types/config';
import { generateColorTailwind } from './color/tailwind';
import { generateRadiusTailwind } from './radius/tailwind';
import { generateSystemTailwind } from './system/tailwind';

export const generateThemeTailwind = <T extends Theme>(
  config: T,
): Config['theme'] => {
  const result: Config['theme'] = {};

  result.colors = generateColorTailwind(config.prefix, config.color);
  result.extend = {
    ...generateSystemTailwind(config.prefix, config.system),
    borderRadius: generateRadiusTailwind(config.prefix, config.radius),
  };

  return result;
};
