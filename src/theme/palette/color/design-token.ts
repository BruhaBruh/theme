import { rgbaToHsl } from '@/lib/rgba-to-hsl';
import { ColorDesignTokens } from '@/types/color';
import {
  Hct,
  argbFromRgb,
  blueFromArgb,
  greenFromArgb,
  redFromArgb,
} from '@material/material-color-utilities';
import { ColorTranslator, RGBObject } from 'colortranslator';

const withAlpha = (rgb: RGBObject, a: number): string => {
  return rgbaToHsl({
    r: rgb.R,
    g: rgb.G,
    b: rgb.B,
    a: a,
  });
};

const withTone = (hct: Hct, tone: number): string => {
  const clone = Hct.fromInt(hct.toInt());
  clone.tone = clone.tone + tone;
  const argb = clone.toInt();

  const result = withAlpha(
    {
      R: redFromArgb(argb),
      G: greenFromArgb(argb),
      B: blueFromArgb(argb),
    },
    1,
  );

  return result;
};

export const generateColorDesignTokens = (
  rawColor: string,
  isBasic = false,
): ColorDesignTokens => {
  const rgbObject = ColorTranslator.toRGBObject(rawColor);
  if (!isBasic) {
    const argb = argbFromRgb(rgbObject.R, rgbObject.G, rgbObject.B);
    const color = Hct.fromInt(argb);

    return {
      50: withAlpha(rgbObject, 0.02),
      100: withAlpha(rgbObject, 0.05),
      200: withAlpha(rgbObject, 0.09),
      300: withAlpha(rgbObject, 0.14),
      400: withAlpha(rgbObject, 0.4),
      500: withAlpha(rgbObject, 0.6),
      600: withAlpha(rgbObject, 0.88),
      700: withTone(color, 0),
      800: withTone(color, -10),
      900: withTone(color, -20),
      950: withTone(color, -25),
      1000: withTone(color, -30),
    };
  }

  return {
    50: withAlpha(rgbObject, 0.03),
    100: withAlpha(rgbObject, 0.06),
    200: withAlpha(rgbObject, 0.11),
    300: withAlpha(rgbObject, 0.22),
    400: withAlpha(rgbObject, 0.33),
    500: withAlpha(rgbObject, 0.44),
    600: withAlpha(rgbObject, 0.54),
    700: withAlpha(rgbObject, 0.64),
    800: withAlpha(rgbObject, 0.73),
    900: withAlpha(rgbObject, 0.82),
    950: withAlpha(rgbObject, 0.9),
    1000: withAlpha(rgbObject, 1),
  };
};
