export const merge = <T extends Record<string, unknown>>(
  defaultObject: T,
  currentObject: Partial<T>,
): T => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const merged: any = { ...defaultObject };

  Object.keys(currentObject).forEach((key) => {
    if (
      typeof currentObject[key] === 'object' &&
      !Array.isArray(currentObject[key])
    ) {
      merged[key] = merge(merged[key], currentObject[key] as T);
    } else {
      merged[key] = currentObject[key];
    }
  });

  return merged;
};
