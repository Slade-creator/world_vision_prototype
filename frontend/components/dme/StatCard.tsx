import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StatCardProps {
    label: string;
    value: string | number;
    sub?: string;
    color: string;
    icon: string;
    onPress?: () => void;
}

export function StatCard({ label, value, sub, color, icon, onPress }: StatCardProps) {
    return (
        <TouchableOpacity
            style={[styles.statCard, { borderTopColor: color }]}
            onPress={onPress}
            activeOpacity={onPress ? 0.75 : 1}
        >
            <View style={[styles.statIcon, { backgroundColor: color + "18" }]}>
                <Ionicons name={icon as any} size={18} color={color} />
            </View>
            <Text style={[styles.statValue, { color }]}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
            {sub && <Text style={styles.statSub}>{sub}</Text>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    statCard: {
        flex: 1,
        minWidth: "45%",
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 14,
        borderTopWidth: 3,
        shadowColor: "#0F172A",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 1,
    },
    statIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    statValue: {
        fontSize: 24,
        fontWeight: "800",
        letterSpacing: -0.5,
    },
    statLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#374151",
        marginTop: 2,
    },
    statSub: { fontSize: 11, color: "#9CA3AF", marginTop: 1 },
});
