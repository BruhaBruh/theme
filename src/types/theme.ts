import { PaletteDesignTokens } from './palette';
import { RadiusDesignTokens } from './radius';

export type ThemeOptions = {
  withoutRadius: boolean;
  withoutPalette: boolean;
};

export type Theme = {
  radius: RadiusDesignTokens;
  palette: PaletteDesignTokens;
  options: ThemeOptions;
};
