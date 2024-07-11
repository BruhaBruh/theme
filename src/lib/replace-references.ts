export const replaceReferences = (
  value: string,
  replaceFunction: (reference: string, match: string) => string = (reference) =>
    reference,
): string => {
  return value.replace(/\${(.*?)}/g, (match, reference) => {
    return replaceFunction(reference, match);
  });
};
