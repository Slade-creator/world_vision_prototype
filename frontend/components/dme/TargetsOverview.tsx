import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TARGETS } from "../../data/mockData";
import { TargetRow } from "./TargetRow";

interface TargetsOverviewProps {
    targets: Array<(typeof TARGETS)[number]>;
    onViewAll: () => void;
}

export function TargetsOverview({ targets, onViewAll }: TargetsOverviewProps) {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Target Achievement</Text>
                <TouchableOpacity onPress={onViewAll}>
                    <Text style={styles.sectionLink}>View All</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                {targets.map((target, i) => (
                    <View key={target.id}>
                        {i > 0 && <View style={styles.divider} />}
                        <TargetRow target={target} onPress={onViewAll} />
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: { paddingHorizontal: 16, marginBottom: 16 },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#0F172A",
    },
    sectionLink: {
        fontSize: 13,
        fontWeight: "600",
        color: "#6366F1",
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#0F172A",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 1,
    },
    divider: {
        height: 1,
        backgroundColor: "#F1F5F9",
        marginVertical: 10,
    },
});
