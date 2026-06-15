import React from "react";
import { View, Text } from "react-native";
import { summaryStyles } from "../../styles/office/reconcile.styles";

interface SummaryChipProps {
    label: string;
    value: number;
    color: string;
    bg: string;
}

export function SummaryChip({ label, value, color, bg }: SummaryChipProps) {
    return (
        <View style={[summaryStyles.chip, { backgroundColor: bg }]}>
            <Text style={[summaryStyles.chipValue, { color }]}>{value}</Text>
            <Text style={[summaryStyles.chipLabel, { color }]}>{label}</Text>
        </View>
    );
}
