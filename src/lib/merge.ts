const mergeObject = <T extends Record<string, unknown>>(
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
      merged[key] = mergeObject(merged[key], currentObject[key] as T);
    } else {
      merged[key] = currentObject[key];
    }
  });

  return merged;
};

export const merge = <T extends Record<string, unknown>>(
  defaultObject: T,
  ...objects: Partial<T>[]
): T => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let merged: any = { ...defaultObject };

  objects.forEach((object) => {
    merged = mergeObject(merged, object);
  });

  return merged;
};
