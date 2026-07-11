import { ThemeColors } from './types';
import { primitive } from './colors';

export const light: ThemeColors = {
  primary: primitive.primary,
  secondary: primitive.secondary,
  semantic: primitive.semantic,
  text: {
    main: primitive.neutral.slate900,
    muted: primitive.neutral.slate500,
    inverse: primitive.neutral.white,
  },
  background: primitive.neutral.slate50,
  surface: primitive.neutral.white,
  border: primitive.neutral.slate200,
};
