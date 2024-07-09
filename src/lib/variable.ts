import { kebabCase } from './kebab-case';

type Part = string | undefined;

const variableParts = (...parts: Part[]) =>
  (parts.filter((v) => Boolean(v)) as NonNullable<Part>[])
    .map((v) => kebabCase(v))
    .join('-');

export const variable = ({
  withVar = false,
  parts,
}: {
  withVar?: boolean;
  parts: Part[];
}) => {
  const key = `--${variableParts(...parts).replace('.', '\\.')}`;
  return withVar ? `var(${key})` : key;
};
