import { kebabCase } from '@/lib/kebab-case';
import { variable } from '@/lib/variable';
import { ThemeColor } from '@/types/color';
import { ThemeConfig as Config } from 'tailwindcss/types/config';

export const generateColorTailwind = <T extends ThemeColor>(
  prefix: string | undefined,
  color: T,
): Config['colors'] => {
  const result: Config['colors'] = {};

  Object.entries(color).forEach(([variant, colors]) => {
    Object.keys(colors).forEach((colorVariant) => {
      result[kebabCase(`${variant}-${colorVariant}`)] =
        `var(${variable(prefix, 'ref', 'color', variant, colorVariant)})`;
    });
  });

  return result;
};
