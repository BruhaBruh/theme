import { PaletteDesignTokens } from './palette';
import { RadiusDesignTokens } from './radius';
import { SystemDesignTokens } from './system';

export type ThemeOptions = {
  withoutRadius: boolean;
  withoutPalette: boolean;
};

export type Theme = {
  radius: RadiusDesignTokens;
  palette: PaletteDesignTokens;
  system: SystemDesignTokens;
  options: ThemeOptions;
};
