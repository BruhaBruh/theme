export const splitByDots = (str: string): string[] => {
  return str.split(/(?<!\\)\./).map((part) => part.replace(/\\\./g, '.'));
};
