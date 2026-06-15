import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IoniconName } from "./../../constants/office/budgetConstants";
import { styles } from "./../../styles/office/budgets";

interface SummaryCardProps {
    label: string;
    value: string;
    sub?: string;
    color: string;
    icon: IoniconName;
}

/**
 * Small summary card showing a key metric
 * Displays icon, value, label, and optional subtitle
 */
export function SummaryCard({ label, value, sub, color, icon }: SummaryCardProps) {
    return (
        <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: color + "1A" }]}>
                <Ionicons name={icon} size={18} color={color} />
            </View>
            <Text style={styles.summaryValue}>{value}</Text>
            <Text style={styles.summaryLabel}>{label}</Text>
            {sub && <Text style={styles.summarySub}>{sub}</Text>}
        </View>
    );
}
