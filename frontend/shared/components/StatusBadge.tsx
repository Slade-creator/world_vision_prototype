import React from "react";
import { View, Text, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusConfig } from "../types";

interface StatusBadgeProps {
    statusConfig: StatusConfig;
    showIcon?: boolean;
    size?: "small" | "medium" | "large";
    style?: ViewStyle;
}

/**
 * Reusable status badge component
 * Used for budget status, review status, reconciliation status
 */
export function StatusBadge({
    statusConfig,
    showIcon = true,
    size = "medium",
    style,
}: StatusBadgeProps) {
    const sizeStyles = {
        small: {
            paddingHorizontal: 8,
            paddingVertical: 4,
            fontSize: 12,
            iconSize: 12,
        },
        medium: {
            paddingHorizontal: 12,
            paddingVertical: 6,
            fontSize: 14,
            iconSize: 14,
        },
        large: {
            paddingHorizontal: 16,
            paddingVertical: 8,
            fontSize: 16,
            iconSize: 16,
        },
    };

    const currentSize = sizeStyles[size];

    return (
        <View
            style={[
                {
                    backgroundColor: statusConfig.bg,
                    borderRadius: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "flex-start",
                },
                style,
            ]}
        >
            {showIcon && (
                <Ionicons
                    name={statusConfig.icon}
                    size={currentSize.iconSize}
                    color={statusConfig.color}
                    style={{ marginRight: 4 }}
                />
            )}
            <Text
                style={{
                    color: statusConfig.color,
                    fontSize: currentSize.fontSize,
                    fontWeight: "600",
                }}
            >
                {statusConfig.label}
            </Text>
        </View>
    );
}