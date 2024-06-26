export const normalize = (
  value: number,
  {
    minInput,
    maxInput,
    minOutput,
    maxOutput,
  }: {
    minInput: number;
    maxInput: number;
    minOutput: number;
    maxOutput: number;
  },
): number => {
  const normalized = (value - minInput) / (maxInput - minInput);

  const scaled = normalized * (maxOutput - minOutput) + minOutput;

  return scaled;
};
