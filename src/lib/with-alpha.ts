import { RGBObject } from 'colortranslator';
import { rgbaToHsl } from './rgba-to-hsl';

export const withAlpha = (color: RGBObject, alpha: number): string => {
  return rgbaToHsl({
    ...color,
    A: alpha,
  });
};
