/**
 * Image Components per Expo Guidelines
 * 
 * Uses expo-image instead of intrinsic img element
 * Enforces 16:9 aspect ratio for humanitarian design
 */

import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Image, ImageProps } from "expo-image";
import { RADIUS, ASPECT_RATIOS } from "../theme";



export interface ResponsiveImageProps extends Omit<ImageProps, "style"> {
  aspectRatio?: number;
  width?: number | string;
  style?: ViewStyle;
  borderRadius?: number;
}

/**
 * Responsive image component with fixed aspect ratio
 * Defaults to 16:9 for humanitarian design emphasis
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  aspectRatio = ASPECT_RATIOS.widescreen,
  width = "100%",
  style,
  borderRadius = RADIUS.lg,
  ...props
}) => {
  const imageDimension = typeof width === "number" ? width : "100%";

  return (
    <View
      style={[
        {
          width: imageDimension,
          aspectRatio,
          borderRadius,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Image
        {...props}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
    </View>
  );
};

/**
 * Card image with 16:9 aspect ratio
 */
export const CardImage: React.FC<ResponsiveImageProps> = (props) => (
  <ResponsiveImage
    aspectRatio={ASPECT_RATIOS.widescreen}
    borderRadius={RADIUS.lg}
    {...props}
  />
);

/**
 * Thumbnail image (square)
 */
export const ThumbnailImage: React.FC<ResponsiveImageProps> = (props) => (
  <ResponsiveImage
    aspectRatio={ASPECT_RATIOS.square}
    borderRadius={RADIUS.base}
    width={80}
    {...props}
  />
);
