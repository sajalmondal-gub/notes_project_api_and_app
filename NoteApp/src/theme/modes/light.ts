import { colors } from '../primitives/colors';
import { SemanticColors } from '../semantic/colors';

export const lightMode: SemanticColors = {
  background: {
    primary: colors.white,
    secondary: colors.secondary[50],
    tertiary: colors.tertiary[50],
    inverse: colors.neutral[900],
  },
  surface: {
    default: colors.white,
    elevated: colors.white,
    sunken: colors.neutral[50],
  },
  border: {
    default: colors.neutral[200],
    subtle: colors.neutral[100],
    strong: colors.neutral[300],
    focus: colors.primary[500],
  },
  text: {
    primary: colors.secondary[900],
    secondary: colors.secondary[600],
    tertiary: colors.tertiary[600],
    inverse: colors.white,
    disabled: colors.neutral[400],
    brand: colors.primary[700],
  },
  primary: {
    default: colors.primary[600],
    hover: colors.primary[700],
    pressed: colors.primary[800],
    subtle: colors.primary[50],
    foreground: colors.white,
  },
  success: {
    default: colors.emerald[600],
    subtle: colors.emerald[50],
    foreground: colors.white,
  },
  warning: {
    default: colors.amber[500],
    subtle: colors.amber[50],
    foreground: colors.secondary[900],
  },
  danger: {
    default: colors.red[600],
    subtle: colors.red[50],
    foreground: colors.white,
  },
};
