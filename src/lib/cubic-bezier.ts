export const cubicBezier = (p0 = 0, p1 = 0, p2 = 1, p3 = 1) => {
  return (t: number): number => {
    const t2 = t * t;
    const t3 = t2 * t;
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;

    return p0 * mt3 + 3 * p1 * mt2 * t + 3 * p2 * mt * t2 + p3 * t3;
  };
};
