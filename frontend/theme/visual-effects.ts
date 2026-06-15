

import { ViewStyle } from "react-native";
import { COLORS, SPACING, RADIUS } from "../theme";

/**
 * Glass effect styles (iOS 26+ via expo-glass-effect)
 */
export const GLASS_EFFECTS = {
  ultraThin: {
    borderRadius: RADIUS.lg,
    overflow: "hidden" as const,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  thin: {
    borderRadius: RADIUS.lg,
    overflow: "hidden" as const,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  standard: {
    borderRadius: RADIUS.lg,
    overflow: "hidden" as const,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
};

/**
 * Blur effect intensity presets
 */
export const BLUR_INTENSITY = {
  subtle: 30,
  medium: 60,
  strong: 90,
  full: 100,
};

/**
 * Humanitarian card style - clean, spacious, elevated
 */
export const HUMANITARIAN_CARD: ViewStyle = {
  backgroundColor: COLORS.bgPrimary,
  borderRadius: RADIUS.lg,
  padding: SPACING.lg,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 3,
  marginVertical: SPACING.md,
};

/**
 * Subtle divider - used for clean whitespace
 */
export const SUBTLE_DIVIDER = {
  height: 1,
  backgroundColor: COLORS.borderLight,
  marginVertical: SPACING.lg,
};

/**
 * Container with humanitarian spacing
 */
export const HUMANITARIAN_CONTAINER: ViewStyle = {
  paddingHorizontal: SPACING.lg,
  paddingVertical: SPACING.lg,
};
