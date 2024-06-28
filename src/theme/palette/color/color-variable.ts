import { variable } from '@/lib/variable';

export const colorVariable = (name: string, token: string) => {
  return variable('ref', 'color', name, token);
};
