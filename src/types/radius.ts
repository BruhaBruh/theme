export type RadiusToken =
  | 'none'
  | 'sm'
  | 'base'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | 'full';

export type RadiusDesignTokens<T extends string = RadiusToken> = Record<
  RadiusToken | T,
  string
>;

export type RadiusValue = number | `${number}px` | `${number}rem`;
