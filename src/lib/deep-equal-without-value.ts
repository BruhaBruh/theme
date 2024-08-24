/* eslint-disable @typescript-eslint/no-use-before-define */

type PathPart = {
  type: 'key' | 'index';
  value: string | number;
};

const pathToString = (path: PathPart[]): string => {
  const result: string[] = [];

  path.forEach((part, index) => {
    if (part.type === 'key') {
      if (index > 0) {
        result.push('.');
      }
      result.push(part.value.toString());
    } else if (part.type === 'index') {
      result.push(`[${part.value}]`);
    }
  });

  return result.join('');
};

type EqualError = {
  type: 'invalid-value' | 'not-found' | 'invalid-type' | 'length-not-equal';
  path: string;
};

const deepEqualObjectsWithoutValue = (
  left: Record<string, unknown>,
  right: Record<string, unknown>,
  previousPath: PathPart[] = [],
): [boolean, EqualError | null] => {
  const compare = (keys: string[]): [boolean, EqualError | null] => {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const leftValue = left[key];
      const rightValue = right[key];
      const path: PathPart[] = [...previousPath, { type: 'key', value: key }];
      if (typeof leftValue === 'undefined' && typeof rightValue === 'undefined')
        continue;
      if (
        (leftValue === undefined && rightValue !== undefined) ||
        (leftValue !== undefined && rightValue === undefined)
      ) {
        return [
          false,
          {
            type: 'not-found',
            path: pathToString(path),
          },
        ];
      }
      if (typeof leftValue === 'number' && typeof rightValue === 'number')
        continue;
      if (typeof leftValue === 'string' && typeof rightValue === 'string')
        continue;
      if (typeof leftValue === 'boolean' && typeof rightValue === 'boolean')
        continue;
      if (typeof leftValue !== 'object' && typeof rightValue !== 'object') {
        return [
          false,
          {
            type: 'invalid-value',
            path: pathToString(path),
          },
        ];
      }
      const [isSame, message] = deepEqualWithoutValue(
        leftValue as Record<string, unknown>,
        rightValue as Record<string, unknown>,
        path,
      );
      if (!isSame) return [isSame, message];
    }

    return [true, null];
  };

  const leftResult = compare(Object.keys(left));
  if (!leftResult[0]) return leftResult;
  const rightResult = compare(Object.keys(right));
  if (!rightResult[0]) return rightResult;

  return [true, null];
};

const deepEqualArraysWithoutValue = (
  left: unknown[],
  right: unknown[],
  previousPath: PathPart[] = [],
): [boolean, EqualError | null] => {
  if (left.length !== right.length)
    return [
      false,
      {
        type: 'length-not-equal',
        path: pathToString(previousPath),
      },
    ];

  for (let i = 0; i < left.length; i++) {
    const leftValue = left[i];
    const rightValue = right[i];
    const path: PathPart[] = [...previousPath, { type: 'index', value: i }];
    if (typeof leftValue === 'undefined' && typeof rightValue === 'undefined')
      continue;
    if (
      (leftValue === undefined && rightValue !== undefined) ||
      (leftValue !== undefined && rightValue === undefined)
    ) {
      return [
        false,
        {
          type: 'not-found',
          path: pathToString(path),
        },
      ];
    }
    if (typeof leftValue === 'number' && typeof rightValue === 'number')
      continue;
    if (typeof leftValue === 'string' && typeof rightValue === 'string')
      continue;
    if (typeof leftValue === 'boolean' && typeof rightValue === 'boolean')
      continue;
    if (typeof leftValue !== 'object' && typeof rightValue !== 'object') {
      return [
        false,
        {
          type: 'invalid-value',
          path: pathToString(path),
        },
      ];
    }
    const [isSame, message] = deepEqualWithoutValue(
      leftValue,
      rightValue,
      path,
    );
    if (!isSame) return [isSame, message];
  }

  return [true, null];
};

export const deepEqualWithoutValue = (
  left: unknown,
  right: unknown,
  previousPath: PathPart[] = [],
): [boolean, EqualError | null] => {
  if (typeof left !== 'object' && typeof right !== 'object') {
    return [true, null];
  }
  if (
    (Array.isArray(left) && !Array.isArray(right)) ||
    (!Array.isArray(left) && Array.isArray(right))
  ) {
    return [
      false,
      {
        type: 'invalid-type',
        path: pathToString(previousPath),
      },
    ];
  }
  if (Array.isArray(left) && Array.isArray(right)) {
    return deepEqualArraysWithoutValue(
      left as unknown[],
      right as unknown[],
      previousPath,
    );
  }
  return deepEqualObjectsWithoutValue(
    left as Record<string, unknown>,
    right as Record<string, unknown>,
    previousPath,
  );
};
