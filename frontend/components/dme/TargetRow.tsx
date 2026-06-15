import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TARGETS } from "../../data/mockData";
import { getTargetStatus, getAchievementPercentage } from "../../utils/dme/dmeHelpers";
import { STATUS_COLOR } from "../../constants/dme/dmeConstants";

interface TargetRowProps {
    target: (typeof TARGETS)[number];
    onPress: () => void;
}

export function TargetRow({ target, onPress }: TargetRowProps) {
    const pct = Math.round(getAchievementPercentage(target.actual_value, target.planned_value));
    const status = getTargetStatus(target.actual_value, target.planned_value);

    return (
        <TouchableOpacity style={styles.targetRow} onPress={onPress} activeOpacity={0.75}>
            <View style={styles.targetRowTop}>
                <Text style={styles.targetName} numberOfLines={1}>
                    {target.indicator_name}
                </Text>
                <Text style={[styles.targetPct, { color: STATUS_COLOR[status] }]}>{pct}%</Text>
            </View>
            <Text style={styles.targetCode}>{target.indicator_code} · {target.project_code}</Text>
            <View style={styles.burnTrack}>
                <View
                    style={[
                        styles.burnFill,
                        {
                            width: `${Math.min(pct, 100)}%` as any,
                            backgroundColor: STATUS_COLOR[status],
                        },
                    ]}
                />
            </View>
            <Text style={styles.targetValues}>
                {target.actual_value} / {target.planned_value} {target.unit}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    targetRow: { paddingVertical: 4 },
    targetRowTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2,
    },
    targetName: {
        fontSize: 13,
        fontWeight: "600",
        color: "#0F172A",
        flex: 1,
        marginRight: 8,
    },
    targetPct: { fontSize: 14, fontWeight: "800" },
    targetCode: { fontSize: 11, color: "#9CA3AF", marginBottom: 6 },
    burnTrack: {
        height: 5,
        backgroundColor: "#F1F5F9",
        borderRadius: 3,
        overflow: "hidden",
        marginBottom: 4,
    },
    burnFill: { height: "100%", borderRadius: 3 },
    targetValues: { fontSize: 11, color: "#6B7280" },
});
