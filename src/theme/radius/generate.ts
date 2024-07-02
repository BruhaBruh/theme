import { ThemeConfig } from '@/types/config';
import { ThemeRadius } from '@/types/radius';
import { resolveReferences } from '../resolve-reference';

export const generateRadiusFromConfig = <T extends ThemeConfig>(
  config: T,
): ThemeRadius<T> => {
  const result = {} as ThemeRadius<T>;

  Object.entries(config.ref.radius).forEach(([variant, value]) => {
    result[variant as keyof ThemeRadius<T>] = resolveReferences(value, config);
  });

  return result;
};
