import {
  Hct,
  argbFromRgb,
  blueFromArgb,
  greenFromArgb,
  redFromArgb,
} from '@material/material-color-utilities';
import { RGBObject } from 'colortranslator';
import { rgbaToHsl } from './rgba-to-hsl';

export const withSubtractTone = (color: RGBObject, tone: number): string => {
  const hct = Hct.fromInt(argbFromRgb(color.R, color.G, color.B));
  hct.tone = hct.tone - tone;
  const argb = hct.toInt();

  return rgbaToHsl({
    R: redFromArgb(argb),
    G: greenFromArgb(argb),
    B: blueFromArgb(argb),
    A: 1,
  });
};
