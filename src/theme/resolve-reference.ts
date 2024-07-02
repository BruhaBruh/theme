import { ThemeConfig } from '@/types/config';

export const resolveReference = (
  reference: string,
  config: ThemeConfig,
  defaultValue?: string,
): string => {
  const keys = reference.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = config;

  for (const key of keys) {
    result = result[key];
    if (result === undefined || result === null) {
      if (defaultValue) return defaultValue;
      throw new Error(`cant resolve reference "${reference}"`);
    }
  }

  return result.toString();
};

export const resolveReferences = (
  value: string,
  config: ThemeConfig,
): string => {
  return value.replace(/\${(.*?)}/g, (match, path) => {
    return resolveReference(path, config, match);
  });
};
