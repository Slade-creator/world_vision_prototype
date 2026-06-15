import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TARGETS, BUDGET_LINES } from "../../data/mockData";
import { Target, TargetFilter } from "../../types/target-types";
import { STATUS_META, FILTER_TABS } from "./../../constants/dme/target-constants";
import { getStatus, calculateAverageAchievement } from "../../utils/dme/target-utils";
import { screenStyles } from "../../styles/dme/target-styles";
import { AddTargetModal } from "./../../components/dme/AddTargetModal";
import { TargetCard } from "./../../components/dme/TargetCard";

export default function DmeTargetsScreen() {
    const [targets, setTargets] = useState<Target[]>(TARGETS as Target[]);
    const [activeFilter, setActiveFilter] = useState<TargetFilter>("ALL");
    const [addVisible, setAddVisible] = useState(false);

    const counts = useMemo(() => ({
        ALL: targets.length,
        ON_TRACK: targets.filter((t) => getStatus(t.actual_value, t.planned_value) === "ON_TRACK").length,
        BEHIND:   targets.filter((t) => getStatus(t.actual_value, t.planned_value) === "BEHIND").length,
        AT_RISK:  targets.filter((t) => getStatus(t.actual_value, t.planned_value) === "AT_RISK").length,
    }), [targets]);

    const filtered = useMemo(() =>
        activeFilter === "ALL"
            ? targets
            : targets.filter((t) => getStatus(t.actual_value, t.planned_value) === activeFilter),
        [targets, activeFilter]
    );

    const avgAchievement = calculateAverageAchievement(targets);

    const handleAdd = (data: {
        budget_id: string;
        indicator_code: string;
        indicator_name: string;
        planned_value: string;
        unit: string;
    }) => {
        const budget = BUDGET_LINES.find((b) => b.id === data.budget_id);
        const newTarget: Target = {
            id: `tgt${Date.now()}`,
            budget_id: data.budget_id,
            budget_name: budget?.line_item_name ?? "",
            project_code: budget?.project_code ?? "",
            indicator_code: data.indicator_code,
            indicator_name: data.indicator_name,
            planned_value: Number(data.planned_value),
            actual_value: 0,
            unit: data.unit,
            period_label: "FY 2026",
            created_by: "Chanda Mutale",
        };
        setTargets((prev) => [...prev, newTarget]);
        setAddVisible(false);
        Alert.alert("Target Saved", `"${data.indicator_name}" has been added.`);
    };

    const handleEdit = (id: string) => {
        Alert.alert(
            "Update Actual Value",
            "In production, this opens an edit form to update actual achieved value.",
            [{ text: "OK" }]
        );
    };

    return (
        <View style={screenStyles.container}>
            {/* Header */}
            <View style={screenStyles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={screenStyles.headerTitle}>Performance Targets</Text>
                    <Text style={screenStyles.headerSub}>
                        {targets.length} indicators · FY 2026
                    </Text>
                </View>
                <TouchableOpacity
                    style={screenStyles.addBtn}
                    onPress={() => setAddVisible(true)}
                    activeOpacity={0.8}
                >
                    <Ionicons name="add" size={16} color="#FFFFFF" />
                    <Text style={screenStyles.addBtnText}>Add Target</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Summary */}
                <View style={screenStyles.summaryCard}>
                    <View style={screenStyles.summaryLeft}>
                        <Text style={screenStyles.summaryLabel}>Avg Achievement</Text>
                        <Text style={[
                            screenStyles.summaryValue,
                            { color: avgAchievement >= 80 ? "#10B981" : avgAchievement >= 50 ? "#F59E0B" : "#EF4444" }
                        ]}>
                            {avgAchievement}%
                        </Text>
                        <Text style={screenStyles.summarySub}>across {targets.length} indicators</Text>
                    </View>
                    <View style={screenStyles.summaryChips}>
                        {(["ON_TRACK", "BEHIND", "AT_RISK"] as const).map((s) => (
                            <View key={s} style={[screenStyles.summaryChip, { backgroundColor: STATUS_META[s].bg }]}>
                                <Text style={[screenStyles.summaryChipVal, { color: STATUS_META[s].color }]}>
                                    {counts[s]}
                                </Text>
                                <Text style={[screenStyles.summaryChipLabel, { color: STATUS_META[s].color }]}>
                                    {STATUS_META[s].label}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Filter tabs */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={screenStyles.filterRow}
                >
                    {FILTER_TABS.map((tab) => (
                        <TouchableOpacity
                            key={tab.key}
                            style={[
                                screenStyles.filterTab,
                                activeFilter === tab.key && screenStyles.filterTabActive,
                            ]}
                            onPress={() => setActiveFilter(tab.key)}
                            activeOpacity={0.75}
                        >
                            <Text style={[
                                screenStyles.filterTabText,
                                activeFilter === tab.key && screenStyles.filterTabTextActive,
                            ]}>
                                {tab.label}
                            </Text>
                            <View style={[
                                screenStyles.filterBadge,
                                activeFilter === tab.key && { backgroundColor: "rgba(255,255,255,0.25)" },
                            ]}>
                                <Text style={[
                                    screenStyles.filterBadgeText,
                                    activeFilter === tab.key && { color: "#FFFFFF" },
                                ]}>
                                    {counts[tab.key]}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Target cards */}
                <View style={screenStyles.list}>
                    {filtered.length === 0 ? (
                        <View style={screenStyles.emptyState}>
                            <Ionicons name="trophy-outline" size={44} color="#10B981" />
                            <Text style={screenStyles.emptyTitle}>No targets here</Text>
                            <Text style={screenStyles.emptySub}>All targets in this category are clear.</Text>
                        </View>
                    ) : (
                        filtered.map((target) => (
                            <TargetCard
                                key={target.id}
                                target={target}
                                onEdit={() => handleEdit(target.id)}
                            />
                        ))
                    )}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            <AddTargetModal
                visible={addVisible}
                onClose={() => setAddVisible(false)}
                onAdd={handleAdd}
            />
        </View>
    );
}
