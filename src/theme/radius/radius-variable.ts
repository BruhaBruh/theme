import { variable } from '@/lib/variable';

export const radiusVariable = (token: string) => {
  return variable('ref', 'radius', token);
};
