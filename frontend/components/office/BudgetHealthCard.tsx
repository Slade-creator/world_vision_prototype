import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "./styles";
import { getBurnStatus, BURN_COLOR } from "./constants";
import { BurnRateBar } from "./BurnRateBar";
import { BUDGET_LINES } from "../../data/mockData";

interface BudgetHealthCardProps {
    line: (typeof BUDGET_LINES)[0];
}

export function BudgetHealthCard({ line }: BudgetHealthCardProps) {
    const status = getBurnStatus(line.utilisation_percent);
    const color = BURN_COLOR[status];
    const router = useRouter();

    return (
        <TouchableOpacity
            style={styles.budgetHealthCard}
            activeOpacity={0.75}
            onPress={() => router.push("/(office)/budgets")}
        >
            {/* Top row */}
            <View style={styles.budgetHealthTop}>
                <View style={{ flex: 1, marginRight: 8 }}>
                    <Text style={styles.budgetHealthName} numberOfLines={1}>
                        {line.line_item_name}
                    </Text>
                    <View style={styles.budgetHealthMeta}>
                        <View style={styles.tcodeChip}>
                            <Text style={styles.tcodeChipText}>{line.tcode}</Text>
                        </View>
                        <Text style={styles.budgetHealthProject}>{line.project_code}</Text>
                    </View>
                </View>
                <View style={[styles.burnBadge, { backgroundColor: color + "1A" }]}>
                    <Text style={[styles.burnBadgeText, { color }]}>
                        {line.utilisation_percent}%
                    </Text>
                </View>
            </View>

            {/* Progress */}
            <BurnRateBar percent={line.utilisation_percent} status={status} />

            {/* Amounts */}
            <View style={styles.budgetHealthAmounts}>
                <Text style={styles.budgetHealthSpent}>
                    Spent: K{line.spent_zmw.toLocaleString()}
                </Text>
                <Text style={[styles.budgetHealthRemaining, { color }]}>
                    Left: K{line.remaining_zmw.toLocaleString()}
                </Text>
            </View>

            {/* Warning row */}
            {status === "RED" && (
                <View style={styles.warningRow}>
                    <Ionicons name="warning" size={12} color="#991B1B" />
                    <Text style={styles.warningRowText}>Critical — contact program team immediately</Text>
                </View>
            )}
            {status === "ORANGE" && (
                <View style={styles.cautionRow}>
                    <Ionicons name="alert-circle" size={12} color="#92400E" />
                    <Text style={styles.cautionRowText}>Low — less than 30% remaining</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}
