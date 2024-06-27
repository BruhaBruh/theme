import { rgbaToHsl } from '@/lib/rgba-to-hsl';
import { ColorDesignTokens } from '@/types/color';
import {
  Hct,
  argbFromHex,
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
  clone.tone = tone;
  const argb = clone.toInt();
  const red = redFromArgb(argb);
  const green = greenFromArgb(argb);
  const blue = blueFromArgb(argb);

  const min = Math.min(red, green, blue);
  const alpha = (255 - min) / 255;

  const result = withAlpha(
    {
      R: Math.round((red - min) / alpha),
      G: Math.round((green - min) / alpha),
      B: Math.round((blue - min) / alpha),
    },
    Math.round(alpha * 10000) / 10000,
  );

  return result;
};

export const generateColorDesignTokens = (
  rawColor: string,
  isBasic = false,
): ColorDesignTokens => {
  if (!isBasic) {
    const hex = ColorTranslator.toHEXA(rawColor);
    const argb = argbFromHex(hex);
    const color = Hct.fromInt(argb);

    return {
      50: withTone(color, 99),
      100: withTone(color, 95),
      200: withTone(color, 90),
      300: withTone(color, 80),
      400: withTone(color, 70),
      500: withTone(color, 60),
      600: withTone(color, 50),
      700: withTone(color, 40),
      800: withTone(color, 30),
      900: withTone(color, 20),
      950: withTone(color, 10),
      1000: withTone(color, 5),
    };
  }
  const rgbObject = ColorTranslator.toRGBObject(rawColor);

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
