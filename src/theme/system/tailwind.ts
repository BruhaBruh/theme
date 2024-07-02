import { kebabCase } from '@/lib/kebab-case';
import { variable } from '@/lib/variable';
import { ThemeSystem } from '@/types/system';
import { ThemeConfig as Config } from 'tailwindcss/types/config';

type SystemConfig = Pick<
  Config,
  'backgroundColor' | 'textColor' | 'ringColor' | 'borderColor' | 'outlineColor'
>;

export const generateSystemTailwind = <T extends ThemeSystem>(
  prefix: string | undefined,
  system: T,
): SystemConfig => {
  const result: SystemConfig = {
    backgroundColor: {},
    textColor: {},
    ringColor: {},
    borderColor: {},
    outlineColor: {},
  };

  Object.entries(system.color).forEach(([typeVariant, variants]) => {
    const t = typeVariant as keyof ThemeSystem['color'];
    Object.keys(variants).forEach((variant) => {
      const valueVariable = `var(${variable(prefix, 'sys', 'color', typeVariant, variant)})`;
      if (t === 'text') {
        (result.textColor as Record<string, string>)[kebabCase(variant)] =
          valueVariable;
      } else if (t === 'background') {
        (result.backgroundColor as Record<string, string>)[kebabCase(variant)] =
          valueVariable;
      } else if (t === 'border') {
        (result.borderColor as Record<string, string>)[kebabCase(variant)] =
          valueVariable;
      } else if (t === 'ring') {
        (result.ringColor as Record<string, string>)[kebabCase(variant)] =
          valueVariable;
      } else if (t === 'outline') {
        (result.outlineColor as Record<string, string>)[kebabCase(variant)] =
          valueVariable;
      }
    });
  });

  Object.keys(result).forEach((key) => {
    if (Object.keys(result[key as keyof SystemConfig]).length !== 0) return;
    delete result[key as keyof SystemConfig];
  });

  return result;
};
