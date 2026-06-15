import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { budgetAPI, transactionAPI, reviewAPI, BudgetLine, Transaction, ExchangeRate } from "../../Service/api";
import { styles } from "../../components/office/styles";
import { getBurnStatus, BURN_COLOR, getBurnStatusLabel } from "../../components/office/constants";
import { StatCard } from "../../components/office/StatCard";
import { BurnRateBar } from "../../components/office/BurnRateBar";
import { BudgetHealthCard } from "../../components/office/BudgetHealthCard";
import { PendingTransactionRow } from "../../components/office/PendingTransactionRow";
import { Header } from "../../components";
import { useEffect, useState } from "react";

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function FinanceDashboard() {

    const { user, logout } = useAuth();
    const router = useRouter();

    const [budgetLines, setBudgetLines] = useState<BudgetLine[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);

    useEffect(() => {
        Promise.all([
            budgetAPI.getAllBudgets(),
            transactionAPI.getAll(),
        ]).then(([budgetRes, txns]) => {
            setBudgetLines(budgetRes.budget_lines);
            setExchangeRate(budgetRes.exchange_rate);
            setTransactions(txns);
        }).catch(console.error);
    }, []);

    // ── Derived stats from mock data ─────────────────────────────────────────

    const pendingTxns =  transactions.filter(
        (t) => t.review_status === "PENDING"
    );
    const needsCorrectionTxns = transactions.filter(
        (t) => t.review_status === "NEEDS_CORRECTION"
    );
    const fullyApproved = transactions.filter(
        (t) => t.review_status === "FULLY_APPROVED"
    );

    const totalAllocatedZMW = budgetLines.reduce((s, b) => s + b.allocated_zmw, 0);
    const totalSpentZMW     = budgetLines.reduce((s, b) => s + b.spent_zmw, 0);
    const totalRemainingZMW = totalAllocatedZMW - totalSpentZMW;
    const overallBurnRate   = Math.round((totalSpentZMW / totalAllocatedZMW) * 100);
    const overallStatus     = getBurnStatus(overallBurnRate);

    const criticalLines = budgetLines.filter((b) => b.status === "RED");
    const lowLines      = budgetLines.filter((b) => b.status === "ORANGE");

    const totalApprovedZMW = fullyApproved.reduce((s, t) => s + t.amount_zmw, 0);

    const handleLogout = (): void => {
        logout(); 
        router.replace("/"); }

    // ── Render ───────────────────────────────────────────────────────────────

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

             <Header
                greeting="Good morning,"
                userName={user?.full_name || "User"}
                roleBadgeText="Finance Officer"
                showLogout={true}
                onLogout={handleLogout}
            />

            {/* ── Exchange Rate Banner ── */}
            <View style={styles.rateBanner}>
                <View>
                    <Text style={styles.rateLabel}>April {exchangeRate?.year} Exchange Rate</Text>
                    <Text style={styles.rateValue}>1 USD = {exchangeRate?.zmw_to_usd} ZMW</Text>
                    <Text style={styles.rateSource}>
                        Source: {exchangeRate?.source} · Auto-synced
                    </Text>
                </View>
                <View style={styles.rateIconWrap}>
                    <Ionicons name="swap-horizontal" size={28} color="#93C5FD" />
                </View>
            </View>

            {/* ── Alert: Pending review ── */}
            {pendingTxns.length > 0 && (
                <TouchableOpacity
                    style={styles.alertCard}
                    onPress={() => router.push("/(office)/review")}
                    activeOpacity={0.8}
                >
                    <Ionicons name="time" size={22} color="#92400E" />
                    <View style={styles.alertBody}>
                        <Text style={styles.alertTitle}>
                            {pendingTxns.length} Expense{pendingTxns.length > 1 ? "s" : ""} Awaiting Review
                        </Text>
                        <Text style={styles.alertSub}>Tap to open the review queue</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#92400E" />
                </TouchableOpacity>
            )}

            {/* ── Alert: Critical budget lines ── */}
            {criticalLines.length > 0 && (
                <TouchableOpacity
                    style={[styles.alertCard, styles.alertCardRed]}
                    onPress={() => router.push("/(office)/budgets")}
                    activeOpacity={0.8}
                >
                    <Ionicons name="warning" size={22} color="#991B1B" />
                    <View style={styles.alertBody}>
                        <Text style={[styles.alertTitle, { color: "#991B1B" }]}>
                            {criticalLines.length} Budget Line{criticalLines.length > 1 ? "s" : ""} Critical
                        </Text>
                        <Text style={[styles.alertSub, { color: "#7F1D1D" }]}>
                            {criticalLines.map(l => l.line_item_name).join(", ")}
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#991B1B" />
                </TouchableOpacity>
            )}

            {/* ── Stat Cards ── */}
            <View style={styles.statsGrid}>
                <StatCard
                    label="Pending Review"
                    value={pendingTxns.length}
                    sub="awaiting action"
                    color="#F59E0B"
                    icon="time-outline"
                    onPress={() => router.push("/(office)/review")}
                />
                <StatCard
                    label="Fully Approved"
                    value={fullyApproved.length}
                    sub="this period"
                    color="#10B981"
                    icon="checkmark-circle-outline"
                />
                <StatCard
                    label="Corrections Sent"
                    value={needsCorrectionTxns.length}
                    sub="awaiting DF fix"
                    color="#EF4444"
                    icon="alert-circle-outline"
                    onPress={() => router.push("/(office)/review")}
                />
                <StatCard
                    label="Approved Spend"
                    value={`K${(totalApprovedZMW / 1000).toFixed(1)}k`}
                    sub="fully approved"
                    color="#6366F1"
                    icon="trending-up-outline"
                />
            </View>

            {/* ── Portfolio Burn Rate ── */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Portfolio Burn Rate</Text>
                <View style={styles.burnCard}>
                    <View style={styles.burnCardTop}>
                        <View>
                            <Text style={styles.burnCardLabel}>Overall Utilisation</Text>
                            <Text style={styles.burnCardPercent}>
                                {overallBurnRate}%
                            </Text>
                        </View>
                        <View style={[
                            styles.burnStatusChip,
                            { backgroundColor: BURN_COLOR[overallStatus] + "1A" }
                        ]}>
                            <View style={[styles.burnStatusDot, { backgroundColor: BURN_COLOR[overallStatus] }]} />
                            <Text style={[styles.burnStatusText, { color: BURN_COLOR[overallStatus] }]}>
                                {getBurnStatusLabel(overallStatus)}
                            </Text>
                        </View>
                    </View>

                    <BurnRateBar percent={overallBurnRate} status={overallStatus} />

                    <View style={styles.burnCardAmounts}>
                        <View style={styles.burnCardAmountItem}>
                            <Text style={styles.burnCardAmountLabel}>Total Allocated</Text>
                            <Text style={styles.burnCardAmountValue}>
                                K{totalAllocatedZMW.toLocaleString()}
                            </Text>
                        </View>
                        <View style={styles.burnCardAmountItem}>
                            <Text style={styles.burnCardAmountLabel}>Total Spent</Text>
                            <Text style={[styles.burnCardAmountValue, { color: "#EF4444" }]}>
                                K{totalSpentZMW.toLocaleString()}
                            </Text>
                        </View>
                        <View style={styles.burnCardAmountItem}>
                            <Text style={styles.burnCardAmountLabel}>Remaining</Text>
                            <Text style={[styles.burnCardAmountValue, { color: "#10B981" }]}>
                                K{totalRemainingZMW.toLocaleString()}
                            </Text>
                        </View>
                    </View>

                    {/* Per-line burn breakdown */}
                    <View style={styles.burnDivider} />
                    <Text style={styles.burnBreakdownTitle}>By Budget Line</Text>
                    {budgetLines.map((line) => {
                        const s = getBurnStatus(line.utilisation_percent);
                        return (
                            <View key={line.id} style={styles.burnLineRow}>
                                <View style={[styles.burnLineDot, { backgroundColor: BURN_COLOR[s] }]} />
                                <Text style={styles.burnLineName} numberOfLines={1}>
                                    {line.line_item_name}
                                </Text>
                                <Text style={[styles.burnLinePercent, { color: BURN_COLOR[s] }]}>
                                    {line.utilisation_percent}%
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>

            {/* ── Budget Health ── */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Budget Health</Text>
                    <TouchableOpacity onPress={() => router.push("/(office)/budgets")}>
                        <Text style={styles.sectionLink}>View All</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardList}>
                    {budgetLines.map((line) => (
                        <BudgetHealthCard key={line.id} line={line} />
                    ))}
                </View>
            </View>

            {/* ── Pending Review Queue Preview ── */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Pending Review</Text>
                    <TouchableOpacity onPress={() => router.push("/(office)/review")}>
                        <Text style={styles.sectionLink}>View All ({pendingTxns.length})</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.pendingCard}>
                    {pendingTxns.length === 0 ? (
                        <View style={styles.pendingEmpty}>
                            <Ionicons name="checkmark-circle-outline" size={32} color="#10B981" />
                            <Text style={styles.pendingEmptyText}>All caught up — no pending reviews</Text>
                        </View>
                    ) : (
                        pendingTxns.slice(0, 3).map((txn, i) => (
                            <View key={txn.id}>
                                {i > 0 && <View style={styles.pendingDivider} />}
                                <PendingTransactionRow txn={txn} />
                            </View>
                        ))
                    )}
                </View>
                {pendingTxns.length > 3 && (
                    <TouchableOpacity
                        style={styles.viewMoreBtn}
                        onPress={() => router.push("/(office)/review")}
                    >
                        <Text style={styles.viewMoreText}>
                            +{pendingTxns.length - 3} more in queue
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* ── Quick Actions ── */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.quickActions}>
                    <TouchableOpacity
                        style={styles.quickAction}
                        onPress={() => router.push("/(office)/review")}
                        activeOpacity={0.75}
                    >
                        <View style={[styles.quickActionIcon, { backgroundColor: "#FEF3C7" }]}>
                            <Ionicons name="checkmark-done-outline" size={22} color="#92400E" />
                        </View>
                        <Text style={styles.quickActionLabel}>Review Queue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.quickAction}
                        onPress={() => router.push("/(office)/budgets")}
                        activeOpacity={0.75}
                    >
                        <View style={[styles.quickActionIcon, { backgroundColor: "#DBEAFE" }]}>
                            <Ionicons name="cloud-upload-outline" size={22} color="#1E40AF" />
                        </View>
                        <Text style={styles.quickActionLabel}>Upload Budget</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.quickAction}
                        onPress={() => router.push("/(office)/reports")}
                        activeOpacity={0.75}
                    >
                        <View style={[styles.quickActionIcon, { backgroundColor: "#D1FAE5" }]}>
                            <Ionicons name="bar-chart-outline" size={22} color="#065F46" />
                        </View>
                        <Text style={styles.quickActionLabel}>Reports</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.quickAction}
                        activeOpacity={0.75}
                    >
                        <View style={[styles.quickActionIcon, { backgroundColor: "#EDE9FE" }]}>
                            <Ionicons name="git-compare-outline" size={22} color="#5B21B6" />
                        </View>
                        <Text style={styles.quickActionLabel}>Reconcile</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}