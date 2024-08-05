import { RGBObject } from 'colortranslator';

export const rgbaToRgb = (rgba: RGBObject): RGBObject => {
  const { R, G, B, A = 1 } = rgba;

  return {
    R: Math.floor((1 - A) * 255 + A * R + 0.5),
    G: Math.floor((1 - A) * 255 + A * G + 0.5),
    B: Math.floor((1 - A) * 255 + A * B + 0.5),
    A: 1,
  };
};
