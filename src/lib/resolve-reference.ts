export const resolveReference = (
  reference: string,
  object: Record<string, unknown>,
  defaultValue?: string,
): string => {
  const keys = reference.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = object;

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
  object: Record<string, unknown>,
): string => {
  return value.replace(/\${(.*?)}/g, (match, path) => {
    return resolveReference(path, object, match);
  });
};
