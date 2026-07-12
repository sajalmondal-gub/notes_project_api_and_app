import { colors } from '../primitives/colors';
import { SemanticColors } from '../semantic/colors';

export const darkMode: SemanticColors = {
  background: {
    primary: colors.secondary[900],
    secondary: colors.secondary[800],
    tertiary: colors.tertiary[800],
    inverse: colors.white,
  },
  surface: {
    default: colors.secondary[800],
    elevated: colors.secondary[700],
    sunken: colors.neutral[800],
  },
  border: {
    default: colors.neutral[700],
    subtle: colors.neutral[800],
    strong: colors.neutral[600],
    focus: colors.primary[500],
  },
  text: {
    primary: colors.secondary[50],
    secondary: colors.secondary[300],
    tertiary: colors.tertiary[400],
    inverse: colors.secondary[900],
    disabled: colors.neutral[600],
    brand: colors.primary[400],
  },
  primary: {
    default: colors.primary[600],
    hover: colors.primary[500],
    pressed: colors.primary[400],
    subtle: colors.primary[900],
    foreground: colors.white,
  },
  success: {
    default: colors.emerald[500],
    subtle: colors.emerald[900],
    foreground: colors.secondary[900],
  },
  warning: {
    default: colors.amber[500],
    subtle: colors.amber[900],
    foreground: colors.secondary[900],
  },
  danger: {
    default: colors.red[500],
    subtle: colors.red[900],
    foreground: colors.secondary[900],
  },
};
