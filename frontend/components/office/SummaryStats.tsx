import { View, Text } from "react-native";
import { styles } from "../../styles/office/budgets";
import { SummaryCard } from "./SummaryCard";


export function SummaryStats({
    budgetCount,
    criticalCount,
    lowCount,
    onTrackCount,
}: {
    budgetCount: number;
    criticalCount: number;
    lowCount: number;
    onTrackCount: number;
}) {
    return (
        <View style={styles.summaryRow}>
            <SummaryCard
                label="Total Lines"
                value={String(budgetCount)}
                color="#1E40AF"
                icon="wallet-outline"
            />
            <SummaryCard
                label="Critical"
                value={String(criticalCount)}
                sub="≥95% used"
                color="#EF4444"
                icon="warning-outline"
            />
            <SummaryCard
                label="Low Funds"
                value={String(lowCount)}
                sub="≥70% used"
                color="#F59E0B"
                icon="alert-circle-outline"
            />
            <SummaryCard
                label="On Track"
                value={String(onTrackCount)}
                color="#10B981"
                icon="checkmark-circle-outline"
            />
        </View>
    );
}