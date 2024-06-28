export type ColorToken = 'white' | 'black';

export type ColorVariantToken =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 950
  | 1000;

export type ColorDesignTokens = Record<ColorVariantToken, string>;

export type ColorLinkedDesignTokens = {
  [key: string]: string | ColorLinkedDesignTokens;
};
