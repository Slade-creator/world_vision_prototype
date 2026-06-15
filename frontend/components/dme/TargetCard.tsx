import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Target } from "./../../types/target-types";
import { STATUS_META } from "./../../constants/dme/target-constants";
import { targetCardStyles } from "./../../styles/dme/target-styles";
import { TargetStatus } from "./../../types/target-types";
import { getStatus, calculateProgress, calculateRemaining } from "./../../utils/dme/target-utils";

interface TargetCardProps {
    target: Target;
    onEdit: () => void;
}

export function TargetCard({ target, onEdit }: TargetCardProps) {
    const pct = calculateProgress(target.actual_value, target.planned_value);
    const status = getStatus(target.actual_value, target.planned_value) as TargetStatus;
    const meta = STATUS_META[status];
    const remaining = calculateRemaining(target.planned_value, target.actual_value);

    return (
        <View style={targetCardStyles.card}>
            {/* Header */}
            <View style={targetCardStyles.top}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={targetCardStyles.name}>{target.indicator_name}</Text>
                    <Text style={targetCardStyles.code}>
                        {target.indicator_code} · {target.project_code}
                    </Text>
                </View>
                <View style={[targetCardStyles.statusBadge, { backgroundColor: meta.bg }]}>
                    <Ionicons name={meta.icon as any} size={12} color={meta.color} />
                    <Text style={[targetCardStyles.statusText, { color: meta.color }]}>{meta.label}</Text>
                </View>
            </View>

            {/* Progress bar */}
            <View style={targetCardStyles.progressRow}>
                <Text style={[targetCardStyles.progressPct, { color: meta.color }]}>{pct}%</Text>
                <View style={targetCardStyles.burnTrack}>
                    <View
                        style={[
                            targetCardStyles.burnFill,
                            {
                                width: `${Math.min(pct, 100)}%` as any,
                                backgroundColor: meta.color,
                            },
                        ]}
                    />
                </View>
            </View>

            {/* Stats row */}
            <View style={targetCardStyles.statsRow}>
                <View style={targetCardStyles.statItem}>
                    <Text style={targetCardStyles.statLabel}>Planned</Text>
                    <Text style={targetCardStyles.statValue}>
                        {target.planned_value} {target.unit}
                    </Text>
                </View>
                <View style={[targetCardStyles.statItem, { alignItems: "center" }]}>
                    <Text style={targetCardStyles.statLabel}>Achieved</Text>
                    <Text style={[targetCardStyles.statValue, { color: meta.color }]}>
                        {target.actual_value} {target.unit}
                    </Text>
                </View>
                <View style={[targetCardStyles.statItem, { alignItems: "flex-end" }]}>
                    <Text style={targetCardStyles.statLabel}>Remaining</Text>
                    <Text style={[targetCardStyles.statValue, { color: remaining <= 0 ? "#10B981" : "#6B7280" }]}>
                        {remaining <= 0 ? "Complete ✓" : `${remaining} ${target.unit}`}
                    </Text>
                </View>
            </View>

            {/* Footer */}
            <View style={targetCardStyles.footer}>
                <View style={targetCardStyles.budgetTag}>
                    <Ionicons name="folder-outline" size={11} color="#6B7280" />
                    <Text style={targetCardStyles.budgetTagText} numberOfLines={1}>
                        {target.budget_name}
                    </Text>
                </View>
                <TouchableOpacity
                    style={targetCardStyles.editBtn}
                    onPress={onEdit}
                    activeOpacity={0.75}
                >
                    <Ionicons name="pencil-outline" size={13} color="#6366F1" />
                    <Text style={targetCardStyles.editBtnText}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
