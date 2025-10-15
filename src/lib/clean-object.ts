type InputType = Record<string, unknown> | unknown[];

type FilteredInputType<T extends InputType> = T extends unknown[]
  ? FilteredArray<T>
  : T extends Record<string, unknown>
    ? FilteredObject<T>
    : T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FilteredArray<T extends any[]> = {
  [K in keyof T]: FilteredInputType<T[K]>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FilteredObject<T extends Record<string, any>> = {
  [K in keyof T as T[K] extends
    | null
    | ''
    | undefined
    | (unknown[] & { length: 0 })
    ? never
    : K]: FilteredInputType<T[K]>;
};

export const cleanObject = <T extends InputType>(
  input: T,
): FilteredInputType<T> => {
  if (Array.isArray(input)) {
    return input
      .map((item) => cleanObject(item as T))
      .filter(
        (item) => !(Array.isArray(item) && item.length === 0),
      ) as FilteredInputType<T>;
  } else if (typeof input === 'object' && input !== null) {
    return Object.entries(input).reduce(
      (acc, [key, value]) => {
        const cleanedValue = cleanObject(value as T) as unknown;
        const newAcc = acc;
        if (
          !(
            cleanedValue === null ||
            cleanedValue === '' ||
            (Array.isArray(cleanedValue) && cleanedValue.length === 0) ||
            (typeof cleanedValue === 'object' &&
              !Array.isArray(cleanedValue) &&
              Object.keys(cleanedValue).length === 0)
          )
        ) {
          newAcc[key] = cleanedValue;
        }
        return newAcc;
      },
      {} as Record<string, unknown>,
    ) as FilteredInputType<T>;
  } else {
    return input;
  }
};
