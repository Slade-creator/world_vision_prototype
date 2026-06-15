import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import { COLORS, RADIUS, SPACING, SHADOWS } from "../theme";
import { Typography } from "./Typography";

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const sizeConfig = {
  sm: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    fontSize: 12,
  },
  md: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    fontSize: 14,
  },
  lg: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    fontSize: 16,
  },
};

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  style,
  icon,
  fullWidth = false,
}) => {
  const config = sizeConfig[size];

  const getBackgroundColor = () => {
    if (disabled) return COLORS.disabled;
    if (variant === "primary") return COLORS.primary;
    if (variant === "secondary") return COLORS.bgTertiary;
    return "transparent";
  };

  const getTextColor = () => {
    if (variant === "primary") return COLORS.textInverse;
    if (variant === "secondary") return COLORS.textPrimary;
    return COLORS.primary;
  };

  const buttonStyle: ViewStyle = {
    backgroundColor: getBackgroundColor(),
    borderRadius: RADIUS.base,
    paddingVertical: config.paddingVertical,
    paddingHorizontal: config.paddingHorizontal,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.sm,
    width: fullWidth ? "100%" : "auto",
  };

  if (variant === "secondary") {
    buttonStyle.borderWidth = 1;
    buttonStyle.borderColor = COLORS.borderBase;
  }

  if (!disabled && variant === "primary") {
    buttonStyle.shadowColor = COLORS.primary;
    buttonStyle.shadowOffset = { width: 0, height: 2 };
    buttonStyle.shadowOpacity = 0.15;
    buttonStyle.shadowRadius = 4;
    buttonStyle.elevation = 3;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[buttonStyle, style]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <>
          {icon}
          <Typography
            variant="label"
            color={getTextColor()}
            style={{ fontSize: config.fontSize, fontWeight: "600" }}
          >
            {title}
          </Typography>
        </>
      )}
    </TouchableOpacity>
  );
};

// Preset button components for common usage
export const PrimaryButton: React.FC<Omit<ButtonProps, "variant">> = (
  props
) => <Button variant="primary" {...props} />;

export const SecondaryButton: React.FC<Omit<ButtonProps, "variant">> = (
  props
) => <Button variant="secondary" {...props} />;

export const GhostButton: React.FC<Omit<ButtonProps, "variant">> = (props) => (
  <Button variant="ghost" {...props} />
);
