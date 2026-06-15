import { View, Text } from "react-native";
import { styles } from "./../../styles/office/budgets";
import { BUDGET_STATUS_BG, BUDGET_STATUS_COLOR, BUDGET_STATUS_LABEL } from "../../shared/constants";
import { 
    BudgetLine, 
    BudgetStatus } from "../../shared";
import { BurnBar } from "./BurnBar";

export function PortfolioSummary({
    percent,
    status,
    totalAllocated,
    totalSpent,
    totalRemaining,
}: {
    percent: number;
    status: BudgetStatus;
    totalAllocated: number;
    totalSpent: number;
    totalRemaining: number;
}) {
    return (
        <View style={styles.portfolioCard}>
            <View style={styles.portfolioTop}>
                <View>
                    <Text style={styles.portfolioLabel}>Portfolio Utilisation</Text>
                    <Text style={styles.portfolioPercent}>{percent}%</Text>
                </View>
                <View
                    style={[
                        styles.portfolioStatusChip,
                        { backgroundColor: BUDGET_STATUS_BG[status] },
                    ]}
                >
                    <View
                        style={[
                            styles.portfolioStatusDot,
                            { backgroundColor: BUDGET_STATUS_COLOR[status] },
                        ]}
                    />
                    <Text
                        style={[
                            styles.portfolioStatusText,
                            { color: BUDGET_STATUS_COLOR[status] },
                        ]}
                    >
                        {BUDGET_STATUS_LABEL[status]}
                    </Text>
                </View>
            </View>
            <BurnBar percent={percent} status={status} />
            <View style={styles.portfolioAmounts}>
                <View style={styles.portfolioAmountItem}>
                    <Text style={styles.portfolioAmountLabel}>Allocated</Text>
                    <Text style={styles.portfolioAmountValue}>
                        K{totalAllocated.toLocaleString()}
                    </Text>
                </View>
                <View style={styles.portfolioAmountItem}>
                    <Text style={styles.portfolioAmountLabel}>Spent</Text>
                    <Text style={[styles.portfolioAmountValue, { color: "#EF4444" }]}>
                        K{totalSpent.toLocaleString()}
                    </Text>
                </View>
                <View style={styles.portfolioAmountItem}>
                    <Text style={styles.portfolioAmountLabel}>Remaining</Text>
                    <Text
                        style={[
                            styles.portfolioAmountValue,
                            { color: BUDGET_STATUS_COLOR[status] },
                        ]}
                    >
                        K{totalRemaining.toLocaleString()}
                    </Text>
                </View>
            </View>
        </View>
    );
}