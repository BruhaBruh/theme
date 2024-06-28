import { variable } from '@/lib/variable';

export const systemColorVariable = (name: string) => {
  return variable('sys', 'color', name);
};
