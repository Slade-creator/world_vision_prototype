import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { TYPOGRAPHY, COLORS, TEXT_STYLES } from "../theme";

// Create text component variants using Inter font
const styles = StyleSheet.create({
  h1: TEXT_STYLES.h1,
  h2: TEXT_STYLES.h2,
  h3: TEXT_STYLES.h3,
  h4: TEXT_STYLES.h4,
  h5: TEXT_STYLES.h5,
  h6: TEXT_STYLES.h6,
  body: TEXT_STYLES.body,
  bodySmall: TEXT_STYLES.bodySmall,
  label: TEXT_STYLES.label,
  caption: TEXT_STYLES.caption,
});

interface TypographyProps extends TextProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body"
    | "bodySmall"
    | "label"
    | "caption";
  color?: string;
  align?: "auto" | "left" | "right" | "center" | "justify";
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  color,
  align = "auto",
  style,
  ...props
}) => {
  return (
    <Text
      {...props}
      style={[
        styles[variant],
        {
          fontFamily: TYPOGRAPHY.fontFamily,
          color: color || (styles[variant]?.color as string),
          textAlign: align,
        },
        style,
      ]}
    />
  );
};

// Convenience components for common text types
export const H1: React.FC<TextProps> = (props) => (
  <Typography variant="h1" {...props} />
);
export const H2: React.FC<TextProps> = (props) => (
  <Typography variant="h2" {...props} />
);
export const H3: React.FC<TextProps> = (props) => (
  <Typography variant="h3" {...props} />
);
export const H4: React.FC<TextProps> = (props) => (
  <Typography variant="h4" {...props} />
);
export const H5: React.FC<TextProps> = (props) => (
  <Typography variant="h5" {...props} />
);
export const H6: React.FC<TextProps> = (props) => (
  <Typography variant="h6" {...props} />
);
export const BodyText: React.FC<TextProps> = (props) => (
  <Typography variant="body" {...props} />
);
export const BodySmallText: React.FC<TextProps> = (props) => (
  <Typography variant="bodySmall" {...props} />
);
export const LabelText: React.FC<TextProps> = (props) => (
  <Typography variant="label" {...props} />
);
export const CaptionText: React.FC<TextProps> = (props) => (
  <Typography variant="caption" {...props} />
);
