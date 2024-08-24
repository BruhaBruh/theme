type ColorDesignType =
  | 'color'
  | 'bg'
  | 'text'
  | 'border'
  | 'ring'
  | 'fill'
  | 'outline'
  | 'stroke';

type BorderRadiusDesignType = 'border-radius';

type SpacingDesignType = 'spacing';

type TypographyDesignType =
  | 'font-family'
  | 'font-weight'
  | 'line-height'
  | 'font-size'
  | 'paragraph-spacing'
  | 'letter-spacing'
  | 'typography';

type LayoutDesignType = 'z-index';

export type DesignTokenType =
  | ColorDesignType
  | BorderRadiusDesignType
  | SpacingDesignType
  | TypographyDesignType
  | LayoutDesignType;
