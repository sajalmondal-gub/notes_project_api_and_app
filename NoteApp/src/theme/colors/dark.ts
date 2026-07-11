import { ThemeColors } from './types';
import { primitive } from './colors';

export const dark: ThemeColors = {
  primary: primitive.primary, // Could invert these or use a different scale in a real app
  secondary: primitive.secondary,
  semantic: primitive.semantic,
  text: {
    main: primitive.neutral.slate50,
    muted: primitive.neutral.slate200,
    inverse: primitive.neutral.slate900,
  },
  background: primitive.neutral.slate900,
  surface: '#1E293B', // Slate 800 roughly
  border: primitive.neutral.slate500,
};
