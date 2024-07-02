import { variable } from '@/lib/variable';
import { ThemeConfig } from '@/types/config';
import { ThemeSystem } from '@/types/system';

export const generateSystemFromConfig = <T extends ThemeConfig>(
  prefix: string | undefined,
  config: T,
): ThemeSystem<T> => {
  const result = {
    color: {
      text: {},
      background: {},
      border: {},
      ring: {},
      outline: {},
    },
  } as ThemeSystem<T>;

  Object.entries(config.sys.color).forEach(([type, obj]) => {
    const t = type as keyof ThemeSystem<T>['color'];
    Object.entries(obj).forEach(([name, value]) => {
      const valueVariable =
        value.startsWith('${') && value.endsWith('}')
          ? `var(${variable(prefix, 'ref', 'color', ...value.substring(2, value.length - 1).split('.'))})`
          : value;

      if (t === 'text') {
        result.color.text[name as keyof ThemeSystem<T>['color']['text']] =
          valueVariable;
      } else if (t === 'background') {
        result.color.background[
          name as keyof ThemeSystem<T>['color']['background']
        ] = valueVariable;
      } else if (t === 'border') {
        result.color.border[name as keyof ThemeSystem<T>['color']['border']] =
          valueVariable;
      } else if (t === 'ring') {
        result.color.ring[name as keyof ThemeSystem<T>['color']['ring']] =
          valueVariable;
      } else if (t === 'outline') {
        result.color.outline[name as keyof ThemeSystem<T>['color']['outline']] =
          valueVariable;
      }
    });
  });

  return result;
};
