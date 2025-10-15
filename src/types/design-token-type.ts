type ColorDesignType = 'color';

type BorderRadiusDesignType = 'radius';

type SpacingDesignType = 'spacing';

type TypographyDesignType =
  | 'font'
  | 'font-weight'
  | 'leading'
  | 'text'
  | 'tracking'
  | 'typography';

export type DesignTokenType =
  | ColorDesignType
  | BorderRadiusDesignType
  | SpacingDesignType
  | TypographyDesignType;
