import { RadiusDesignTokens, RadiusValue } from '@/types/radius';

type RadiusString = Exclude<RadiusValue, number>;

const getRadiusString = (radius: RadiusValue): RadiusString => {
  if (typeof radius === 'number') {
    return `${radius}px`;
  }
  return radius;
};

export const generateRadiusDesignTokens = (
  radiusValue: RadiusValue,
): RadiusDesignTokens => {
  const radius = getRadiusString(radiusValue);

  return {
    none: '0px',
    sm: `calc(${radius} - 2px)`,
    base: radius,
    md: `calc(${radius} + 2px)`,
    lg: `calc(${radius} + 4px)`,
    xl: `calc(${radius} + 8px)`,
    '2xl': `calc(${radius} + 12px)`,
    '3xl': `calc(${radius} + 20px)`,
    full: '9999px',
  };
};
