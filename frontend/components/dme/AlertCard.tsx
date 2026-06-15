import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "./../../constants/dme/dmeConstants";

interface AlertCardProps {
    icon: any;
    title: string;
    subtitle: string;
    onPress: () => void;
    variant?: "warning" | "danger";
}

export function AlertCard({ icon, title, subtitle, onPress, variant = "warning" }: AlertCardProps) {
    const isDanger = variant === "danger";
    const textColor = isDanger ? COLORS.DANGER_TEXT : COLORS.WARNING_TEXT;
    const bgColor = isDanger ? COLORS.DANGER_BG : COLORS.WARNING_BG;
    const borderColor = isDanger ? COLORS.DANGER_BORDER : COLORS.WARNING_BORDER;

    return (
        <TouchableOpacity
            style={[styles.alertCard, { backgroundColor: bgColor, borderBottomColor: borderColor }]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Ionicons name={icon} size={20} color={textColor} />
            <View style={{ flex: 1 }}>
                <Text style={[styles.alertTitle, { color: textColor }]}>{title}</Text>
                <Text style={[styles.alertSub, { color: textColor }]}>{subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={textColor} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    alertCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderBottomWidth: 1,
    },
    alertTitle: {
        fontSize: 13,
        fontWeight: "700",
    },
    alertSub: {
        fontSize: 11,
        marginTop: 1,
    },
});
