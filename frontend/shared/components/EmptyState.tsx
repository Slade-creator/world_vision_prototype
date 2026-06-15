import React from "react";
import { View, Text, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IoniconName } from "../types";

interface EmptyStateProps {
    icon?: IoniconName;
    title: string;
    subtitle?: string;
    iconColor?: string;
    style?: ViewStyle;
}

/**
 * Reusable empty state component
 * Used when lists are empty in review, budgets, reconcile screens
 */
export function EmptyState({
    icon = "checkmark-circle-outline",
    title,
    subtitle,
    iconColor = "#10B981",
    style,
}: EmptyStateProps) {
    return (
        <View
            style={[
                {
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 48,
                    paddingHorizontal: 32,
                },
                style,
            ]}
        >
            <View
                style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: `${iconColor}15`,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                }}
            >
                <Ionicons name={icon} size={40} color={iconColor} />
            </View>
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#111827",
                    textAlign: "center",
                    marginBottom: 8,
                }}
            >
                {title}
            </Text>
            {subtitle && (
                <Text
                    style={{
                        fontSize: 14,
                        color: "#6B7280",
                        textAlign: "center",
                        lineHeight: 20,
                    }}
                >
                    {subtitle}
                </Text>
            )}
        </View>
    );
}