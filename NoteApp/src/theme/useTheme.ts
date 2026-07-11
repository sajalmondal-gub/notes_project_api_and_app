import { useColorScheme } from 'react-native';
import { light, dark, ThemeColors } from './colors';

export function useTheme(): ThemeColors {
  const colorScheme = useColorScheme();
  
  // Return the appropriate typed theme object based on system preference
  return colorScheme === 'dark' ? dark : light;
}
