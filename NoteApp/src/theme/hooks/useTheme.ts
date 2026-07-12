import { useThemeContext } from '../provider/ThemeProvider';
import { spacing } from '../primitives/spacing';
import { typography } from '../primitives/typography';
import { radius } from '../primitives/radius';

export const useTheme = () => {
  const { colors, mode, isDark, setMode } = useThemeContext();

  return {
    colors,
    spacing,
    typography,
    radius,
    mode,
    isDark,
    setMode,
  };
};
