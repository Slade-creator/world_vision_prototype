import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { budgetAPI, transactionAPI, BudgetLine, Transaction, ExchangeRate } from "../../Service/api"; 
import { Header } from "../../components/ui/Header";
import { ExchangeRateBanner } from "../../components/ui/ExchangeRateBanner";
import { AlertCard } from "../../components/ui/AlertCard";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { TransactionCard } from "../../components/ui/TransactionCard";
import { COLORS, SPACING, TYPOGRAPHY } from "../../theme";
import { useEffect, useState } from "react";

export default function DFDashboard() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const { width } = useWindowDimensions();

    const [budgetLines, setBudgerLines ] = useState<BudgetLine[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [exchangeRate, setExchangeRate] = useState<ExchangeRate>({ zmw_to_usd: 19.54, month: 4, year: 2026, source: "MANUAL"})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            budgetAPI.getMyBudgets(),
            transactionAPI.getMy(),
        ])
        .then(([budgetData, txns]) => {
            setBudgerLines(budgetData.budget_lines);
            setExchangeRate(budgetData.exchange_rate);
            setTransactions(txns);
        })
        .catch(() => {

        })
        .finally(() => setLoading(false));
    }, []);
    
    // Responsive constants
    const isMobile = width < 480;
    const isTablet = width >= 768;
    const horizontalPadding = isMobile ? SPACING.md : SPACING.lg;
    const sectionSpacing = isMobile ? SPACING.md : SPACING.xl;

    const myTransactions = transactions.filter(
        (t) => t.df_user_id === user?.id
    ).slice(0, 3);

    const pendingCount = transactions.filter(
        (t) => t.df_user_id === user?.id && t.review_status === "PENDING"
    ).length;

    const correctionCount = transactions.filter(
        (t) => t.df_user_id === user?.id && t.review_status === "NEEDS_CORRECTION"
    ).length;

    function handleLogout() {
        logout();
        router.replace("/");
    }

    return (
        <ScrollView 
            style={[styles.container]}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <Header
                greeting="Good morning,"
                userName={user?.full_name || "User"}
                roleBadgeText="Development Facilitator"
                showLogout={true}
                onLogout={handleLogout}
            />

            {/* Exchange Rate Banner */}
            <View style={{ marginVertical: sectionSpacing }}>
                <ExchangeRateBanner rate={exchangeRate} />
            </View>

            {/** Alert Cards - Professional hierarchy */}
            <View style={{ marginBottom: sectionSpacing }}>
                {correctionCount > 0 && (
                    <View style={{ marginBottom: SPACING.md }}>
                        <AlertCard
                            type="warning"
                            title="Action Required"
                            message={`${correctionCount} expense(s) need correction`}
                            actionText="View"
                            onActionPress={() => router.push("/(df)/myexpenses")}
                            icon="alert-circle"
                        />
                    </View>
                )}

                {pendingCount > 0 && (
                    <AlertCard
                        type="info"
                        title="Awaiting Review"
                        message={`${pendingCount} expense(s) pending approval`}
                        icon="time"
                    />
                )}
            </View>

            {/* Budget Summary - Enhanced Responsive Layout */}
            <View style={[styles.section, { marginBottom: sectionSpacing }]}>
                <SectionHeader
                    title="Budget Overview"
                    linkText="View All"
                    onLinkPress={() => router.push("/(df)/budget")}
                />
                <View style={styles.budgetGrid}>
                    {budgetLines.slice(0, 2).map((line) => (
                        <View key={line.id} style={styles.budgetCard}>
                            <View style={styles.budgetCardHeader}>
                                <View style={{ flex: 1 }}>
                                    <Text 
                                        style={[
                                            styles.budgetName,
                                            { fontSize: isTablet ? TYPOGRAPHY.lg : TYPOGRAPHY.base }
                                        ]} 
                                        numberOfLines={1}
                                    >
                                        {line.line_item_name}
                                    </Text>
                                </View>
                                <Text style={styles.budgetCode}>{line.tcode}</Text>
                            </View>
                            <ProgressBar
                                percent={line.utilisation_percent}
                                status={line.status}
                            />
                            <View style={styles.budgetAmounts}>
                                <Text style={[styles.budgetSpent, { fontSize: isTablet ? TYPOGRAPHY.sm : TYPOGRAPHY.xs }]}>
                                    Spent: K{line.spent_zmw.toLocaleString()}
                                </Text>
                                <Text style={[styles.budgetRemaining, { fontSize: isTablet ? TYPOGRAPHY.sm : TYPOGRAPHY.xs }]}>
                                    Left: K{line.remaining_zmw.toLocaleString()}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            {/* Recent Transactions */}
            <View style={[styles.section, { marginBottom: sectionSpacing }]}>
                <SectionHeader
                    title="Recent Expenses"
                    linkText="View All"
                    onLinkPress={() => router.push("/(df)/myexpenses")}
                />

                 <View style={styles.transactionList}>
                    {transactions.length === 0 ? (
                        <Text style={{ color: COLORS.textTertiary, fontSize: TYPOGRAPHY.sm, textAlign: "center", paddingVertical: SPACING.lg }}>
                            No expenses logged yet. Tap below to log your first.
                        </Text>
                    ) : (
                        transactions.slice(0, 5).map((txn) => (
                            <TransactionCard key={txn.id} transaction={txn} />
                        ))
                    )}
                </View>
            </View>

            {/* Quick Action - Enhanced Professional Button */}
            <TouchableOpacity
                style={[styles.fabButton, { marginHorizontal: -horizontalPadding }]}
                onPress={() => router.push("/(df)/expense")}
                activeOpacity={0.85}
            >
                <Text style={styles.fabText}>+ Log New Expense</Text>
            </TouchableOpacity>

            <View style={{ height: SPACING.xl }} />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgSecondary,
  },
  section: {
    // Padding handled by container's horizontal padding
  },
  budgetGrid: {
    gap: SPACING.md,
  },
  budgetCard: {
    backgroundColor: COLORS.bgPrimary,
    borderRadius: 12,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  budgetCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  budgetName: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.semibold as "600",
    color: COLORS.textPrimary,
    marginRight: SPACING.sm,
  },
  budgetCode: {
    fontSize: TYPOGRAPHY.xs,
    color: COLORS.textSecondary,
    backgroundColor: COLORS.bgTertiary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: 6,
    fontWeight: TYPOGRAPHY.medium as "500",
  },
  budgetAmounts: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  budgetSpent: {
    fontSize: TYPOGRAPHY.xs,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.regular as "400",
  },
  budgetRemaining: {
    fontSize: TYPOGRAPHY.xs,
    fontWeight: TYPOGRAPHY.semibold as "600",
    color: COLORS.textPrimary,
  },
  transactionList: {
    gap: SPACING.md,
  },
  fabButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.md,
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  fabText: {
    color: COLORS.textInverse,
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.bold as "700",
    letterSpacing: -0.5,
  },
});