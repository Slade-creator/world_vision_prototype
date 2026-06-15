import React from "react";
import { ScrollView, TouchableOpacity, Text, ViewStyle } from "react-native";
import { FilterTabConfig } from "../types";
import { COLORS, SPACING, TYPOGRAPHY, RADIUS } from "../../theme";

interface FilterTabsProps<T extends string> {
    tabs: FilterTabConfig<T>[];
    activeTab: T | "ALL";
    onTabPress: (tab: T | "ALL") => void;
    counts?: Record<T | "ALL", number>;
    style?: ViewStyle;
    contentContainerStyle?: ViewStyle;
}

/**
 * Reusable filter tabs component with badge counts
 * Used in review, budgets, and reconcile screens
 */
export function FilterTabs<T extends string>({
    tabs,
    activeTab,
    onTabPress,
    counts,
    style,
    contentContainerStyle,
}: FilterTabsProps<T>) {
    return (
        <ScrollView
            horizontal
        
            showsHorizontalScrollIndicator={false}
            style={[style, { flexGrow: 0 }]}
            contentContainerStyle={contentContainerStyle}
        >
            {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                const count = counts?.[tab.key];

                return (
                    <TouchableOpacity
                        key={tab.key}
                        style={{
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderRadius: 20,
                            backgroundColor: isActive ? "#3B82F6" : "#F3F4F6",
                            marginRight: 8,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                        onPress={() => onTabPress(tab.key)}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={{
                                color: isActive ? "white" : "#6B7280",
                                fontWeight: isActive ? "600" : "500",
                                fontSize: 14,
                            }}
                        >
                            {tab.label}
                        </Text>
                        {count !== undefined && count > 0 && (
                            <Text
                                style={{
                                    marginLeft: 6,
                                    backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "#E5E7EB",
                                    color: isActive ? "white" : "#4B5563",
                                    fontSize: 12,
                                    fontWeight: "600",
                                    paddingHorizontal: 6,
                                    paddingVertical: 2,
                                    borderRadius: 10,
                                    minWidth: 20,
                                    textAlign: "center",
                                }}
                            >
                                {count}
                            </Text>
                        )}
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}