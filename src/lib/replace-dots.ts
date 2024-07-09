export const replaceDots = (str: string, reverse = false): string => {
  return str.replace(/\\.|(?<!\\)\./g, (match) => {
    const isEscaped = match === '\\.';
    if (reverse) {
      return isEscaped ? '-' : '.';
    } else {
      return isEscaped ? '.' : '-';
    }
  });
};
