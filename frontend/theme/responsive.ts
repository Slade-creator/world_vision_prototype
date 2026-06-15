

import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * Aspect ratios for consistent image/media sizing
 */
export const ASPECT_RATIOS = {
  // Humanitarian design emphasis on 16:9
  widescreen: 16 / 9,
  square: 1,
  portrait: 9 / 16,
  thumbnail: 1.33, // 4:3 for small cards
};

/**
 * Screen size breakpoints for responsive design
 */
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
};

/**
 * Responsive hook - returns screen size category
 */
export const useResponsive = () => {
  const { width } = useWindowDimensions();

  return {
    isMobile: width < BREAKPOINTS.tablet,
    isTablet: width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop,
    isDesktop: width >= BREAKPOINTS.desktop,
    width,
  };
};

/**
 * Safe area hook - simplified access to insets
 */
export const useSafeArea = () => {
  return useSafeAreaInsets();
};

/**
 * Calculate responsive padding based on screen width
 */
export const getResponsivePadding = (width: number, basePadding: number) => {
  if (width < BREAKPOINTS.mobile) return basePadding * 0.75;
  if (width < BREAKPOINTS.tablet) return basePadding;
  return basePadding * 1.5;
};

/**
 * Dimensions helper - use instead of Dimensions.get()
 * Always prefer useWindowDimensions for reactivity
 */
export const getImageDimensions = (
  originalWidth: number,
  originalHeight: number,
  maxWidth: number
) => {
  const aspectRatio = originalWidth / originalHeight;
  return {
    width: maxWidth,
    height: maxWidth / aspectRatio,
  };
};
