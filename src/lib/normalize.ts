type NormalizeOptions = {
  minInput: number;
  maxInput: number;
  minOutput?: number;
  maxOutput?: number;
};

export const normalize = (
  value: number,
  { minInput, maxInput, minOutput = 0, maxOutput = 1 }: NormalizeOptions,
): number => {
  if (minInput === maxInput) {
    throw new Error('minInput and maxInput should not be equal');
  }

  const normalized =
    ((value - minInput) * (maxOutput - minOutput)) / (maxInput - minInput) +
    minOutput;

  return Math.max(Math.min(normalized, maxOutput), minOutput);
};
