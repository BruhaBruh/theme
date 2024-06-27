type RGBA = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export const rgbaToHsl = (rgba: RGBA): string => {
  const { r, g, b, a } = rgba;

  const rRatio = r / 255;
  const gRatio = g / 255;
  const bRatio = b / 255;

  const max = Math.max(rRatio, gRatio, bRatio);
  const min = Math.min(rRatio, gRatio, bRatio);

  let h: number;
  let s: number;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rRatio:
        h = (gRatio - bRatio) / d + (gRatio < bRatio ? 6 : 0);
        break;
      case gRatio:
        h = (bRatio - rRatio) / d + 2;
        break;
      case bRatio:
        h = (rRatio - gRatio) / d + 4;
        break;
      default:
        h = 0;
        break;
    }
    h /= 6;
  }

  const alpha = a.toFixed(2).replace(/\.?0*$/, '');

  return `hsla(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${alpha})`;
};
