import { colors as baseColors } from '../primitives/colors';

// This file defines the structure of our semantic colors
// The actual values will be provided by the active mode (light.ts or dark.ts)

export interface SemanticColors {
  // Backgrounds
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  
  // Surfaces (Cards, Modals, etc.)
  surface: {
    default: string;
    elevated: string;
    sunken: string;
  };

  // Borders
  border: {
    default: string;
    subtle: string;
    strong: string;
    focus: string;
  };

  // Text
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
    disabled: string;
    brand: string;
  };

  // Core brand actions
  primary: {
    default: string;
    hover: string;
    pressed: string;
    subtle: string;
    foreground: string;
  };

  // Status colors
  success: {
    default: string;
    subtle: string;
    foreground: string;
  };
  warning: {
    default: string;
    subtle: string;
    foreground: string;
  };
  danger: {
    default: string;
    subtle: string;
    foreground: string;
  };
}
