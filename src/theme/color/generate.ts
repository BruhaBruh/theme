import { normalize } from '@/lib/normalize';
import { withAlpha } from '@/lib/with-alpha';
import { withSubtractTone } from '@/lib/with-subtract-tone';
import {
  Color,
  ThemeColor,
  colorVariants,
  colorVariantsByAlpha,
  colorVariantsByDarken,
} from '@/types/color';
import { ThemeConfig } from '@/types/config';
import { ColorTranslator } from 'colortranslator';
import { easeInOutSine, easeInSine, easeOutSine } from 'easing-utils';

const generateColor = (
  name: string,
  rawColor: string,
  darkenRatio = 25,
): Color => {
  const result = {} as Color;

  const color = ColorTranslator.toRGBObject(rawColor);
  if (name === 'white') {
    colorVariants.forEach((variant) => {
      result[variant] = withAlpha(
        color,
        easeInSine(
          normalize(variant, {
            minInput: 50,
            maxInput: 1000,
            minOutput: 0.17,
            maxOutput: 1,
          }),
        ),
      );
    });
  } else if (name === 'black') {
    colorVariants.forEach((variant) => {
      result[variant] = withAlpha(
        color,
        easeInSine(
          normalize(variant, {
            minInput: 50,
            maxInput: 1000,
            minOutput: 0.14,
            maxOutput: 1,
          }),
        ),
      );
    });
  } else {
    colorVariantsByAlpha.forEach((variant) => {
      result[variant] = withAlpha(
        color,
        easeInOutSine(
          normalize(variant, {
            minInput: 50,
            maxInput: 600,
            minOutput: 0.08,
            maxOutput: 0.78,
          }),
        ),
      );
    });
    colorVariantsByDarken.forEach((variant) => {
      result[variant] = withSubtractTone(
        color,
        darkenRatio *
          easeOutSine(
            normalize(variant, {
              minInput: 650,
              maxInput: 1000,
              minOutput: 0.12,
              maxOutput: 1,
            }),
          ),
      );
    });
  }

  return result;
};

export const generateColorFromConfig = <T extends ThemeConfig>(
  config: T,
): ThemeColor<T> => {
  const result = {} as ThemeColor<T>;

  Object.entries(config.palette).forEach(([name, color]) => {
    if (typeof color === 'string') {
      result[name.toLowerCase() as keyof ThemeColor<T>] = generateColor(
        name.toLowerCase(),
        color,
      );
    } else if (
      'darkenRatio' in color &&
      'source' in color &&
      Object.keys(color).length === 2
    ) {
      result[name.toLowerCase() as keyof ThemeColor<T>] = generateColor(
        name.toLowerCase(),
        color.source,
        typeof color.darkenRatio === 'number'
          ? color.darkenRatio
          : Number.parseFloat(color.darkenRatio),
      );
    } else {
      result[name.toLowerCase() as keyof ThemeColor<T>] = color as Color;
    }
  });

  return result;
};
