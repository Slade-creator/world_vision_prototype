import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface QuickActionsProps {
    onReview: () => void;
    onTargets: () => void;
}

export function QuickActions({ onReview, onTargets }: QuickActionsProps) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActions}>
                <TouchableOpacity
                    style={styles.quickAction}
                    onPress={onReview}
                    activeOpacity={0.75}
                >
                    <View style={[styles.qaIcon, { backgroundColor: "#FEF3C7" }]}>
                        <Ionicons name="checkmark-done-outline" size={22} color="#92400E" />
                    </View>
                    <Text style={styles.qaLabel}>Review Queue</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.quickAction}
                    onPress={onTargets}
                    activeOpacity={0.75}
                >
                    <View style={[styles.qaIcon, { backgroundColor: "#D1FAE5" }]}>
                        <Ionicons name="trophy-outline" size={22} color="#065F46" />
                    </View>
                    <Text style={styles.qaLabel}>Targets</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: { paddingHorizontal: 16, marginBottom: 16 },
    sectionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#0F172A",
    },
    quickActions: { flexDirection: "row", gap: 10, marginTop: 8 },
    quickAction: { flex: 1, alignItems: "center", gap: 8 },
    qaIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    qaLabel: { fontSize: 12, fontWeight: "600", color: "#374151" },
});
