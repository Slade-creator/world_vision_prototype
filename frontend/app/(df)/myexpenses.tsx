import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { DetailModal } from "./../../components/df/DetailModel";
import {
    STATUS_CONFIG,
    FILTER_TABS,
    FilterStatus,
    formatDate,
} from "./../../constants/df/expenseConfig";
import { transactionAPI, Transaction } from "../../Service/api";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from "../../theme";

export default function MyExpensesScreen() {
    const { width } = useWindowDimensions();
    const router = useRouter();
    const isMobile = width < 480;
    const { user } = useAuth();
    const [filter, setFilter] = useState<FilterStatus>("ALL");
    const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
    const [allTransactions, setAllTransaction] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        transactionAPI.getMy()
        .then(setAllTransaction)
        .catch(console.error)
        .finally(() => setLoading(false));
    }, []);

    const myTransactions = allTransactions;

    const filtered =
        filter === "ALL"
            ? myTransactions
            : myTransactions.filter(t => t.review_status === filter);

    const correctionCount = myTransactions.filter(
        t => t.review_status === "NEEDS_CORRECTION"
    ).length;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Expenses</Text>
                <Text style={styles.headerSub}>{myTransactions.length} entries logged</Text>
            </View>

            {/* Correction Alert */}
            {correctionCount > 0 && (
                <TouchableOpacity
                    style={styles.correctionAlert}
                    onPress={() => setFilter("NEEDS_CORRECTION")}
                    activeOpacity={0.8}
                >
                    <Ionicons name="alert-circle" size={20} color={COLORS.error || "#991B1B"} />
                    <Text style={styles.correctionAlertText}>
                        {correctionCount} expense{correctionCount > 1 ? "s" : ""} need your attention
                    </Text>
                    <Ionicons name="chevron-forward" size={16} color={COLORS.error || "#991B1B"} />
                </TouchableOpacity>
            )}

            {/* Summary Bar */}
            <SummaryBar transactions={myTransactions} />

            {/* Filter Tabs */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterScroll}
                contentContainerStyle={styles.filterScrollContent}
            >
                {FILTER_TABS.map(tab => {
                    const count =
                        tab.value === "ALL"
                            ? myTransactions.length
                            : myTransactions.filter(t => t.review_status === tab.value).length;
                    const active = filter === tab.value;
                    return (
                        <TouchableOpacity
                            key={tab.value}
                            style={[styles.filterTab, active && styles.filterTabActive]}
                            onPress={() => setFilter(tab.value)}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.filterTabText, active && styles.filterTabTextActive]}>
                                {tab.label}
                            </Text>
                            {count > 0 && (
                                <View style={[styles.filterTabCount, active && styles.filterTabCountActive]}>
                                    <Text style={[styles.filterTabCountText, active && styles.filterTabCountTextActive]}>
                                        {count}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Transaction List */}
            <ScrollView
                style={styles.list}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            >
                {filtered.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="receipt-outline" size={48} color={COLORS.textTertiary} />
                        <Text style={styles.emptyTitle}>No expenses here</Text>
                        <Text style={styles.emptySubtitle}>
                            {filter === "ALL"
                                ? "You haven't logged any expenses yet."
                                : `No expenses with status "${FILTER_TABS.find(t => t.value === filter)?.label}".`}
                        </Text>
                    </View>
                ) : (
                    filtered.map(txn => (
                        <TransactionCard
                            key={txn.id}
                            txn={txn}
                            onPress={() => setSelectedTxn(txn)}
                        />
                    ))
                )}
                <View style={{ height: SPACING["2xl"] }} />
            </ScrollView>

            {/* FAB */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push("/(df)/expense")}
                activeOpacity={0.85}
            >
                <Ionicons name="add" size={26} color={COLORS.textInverse} />
            </TouchableOpacity>

            {/* Detail Modal */}
            {selectedTxn && (
                <DetailModal
                    txn={selectedTxn}
                    onClose={() => setSelectedTxn(null)}
                    onResubmit={() => {
                        setSelectedTxn(null);
                        router.push("/(df)/expense");
                    }}
                />
            )}
        </View>
    );
}

// Sub-components (unchanged, but they'll use theme colors when integrated)
function StatusBadge({ status }: { status: string }) {
    const c = STATUS_CONFIG[status] ?? { label: status, bg: COLORS.bgTertiary, color: COLORS.textPrimary, icon: "ellipse-outline" };
    return (
        <View style={[styles.badge, { backgroundColor: c.bg }]}>
            <Ionicons name={c.icon as any} size={10} color={c.color} />
            <Text style={[styles.badgeText, { color: c.color }]}>{c.label}</Text>
        </View>
    );
}

function RouteChip({ routeType }: { routeType: string }) {
    const isDouble = routeType === "FINANCE_AND_DME";
    return (
        <View style={[styles.routeChip, isDouble && styles.routeChipDouble]}>
            <Ionicons name="git-branch-outline" size={10} color={isDouble ? COLORS.info || "#1E40AF" : COLORS.textSecondary} />
            <Text style={[styles.routeChipText, isDouble && styles.routeChipTextDouble]}>
                {isDouble ? "Finance & DME" : "Finance only"}
            </Text>
        </View>
    );
}

function SummaryBar({ transactions }: { transactions: Transaction[] }) {
    const total = transactions.length;
    const pending = transactions.filter(t => t.review_status === "PENDING").length;
    const approved = transactions.filter(t => t.review_status === "FULLY_APPROVED").length;
    const correction = transactions.filter(t => t.review_status === "NEEDS_CORRECTION").length;
    const totalZMW = transactions.reduce((s, t) => s + t.amount_zmw, 0);

    return (
        <View style={styles.summaryBar}>
            <View style={styles.summaryBarItem}>
                <Text style={styles.summaryBarValue}>{total}</Text>
                <Text style={styles.summaryBarLabel}>Total</Text>
            </View>
            <View style={styles.summaryBarDivider} />
            <View style={styles.summaryBarItem}>
                <Text style={[styles.summaryBarValue, { color: COLORS.warning || "#F59E0B" }]}>{pending}</Text>
                <Text style={styles.summaryBarLabel}>Pending</Text>
            </View>
            <View style={styles.summaryBarDivider} />
            <View style={styles.summaryBarItem}>
                <Text style={[styles.summaryBarValue, { color: COLORS.success || "#10B981" }]}>{approved}</Text>
                <Text style={styles.summaryBarLabel}>Approved</Text>
            </View>
            <View style={styles.summaryBarDivider} />
            <View style={styles.summaryBarItem}>
                <Text style={[styles.summaryBarValue, { color: COLORS.error || "#EF4444" }]}>{correction}</Text>
                <Text style={styles.summaryBarLabel}>Fix Needed</Text>
            </View>
            <View style={styles.summaryBarDivider} />
            <View style={styles.summaryBarItem}>
                <Text style={styles.summaryBarValue}>K{(totalZMW / 1000).toFixed(1)}k</Text>
                <Text style={styles.summaryBarLabel}>Total ZMW</Text>
            </View>
        </View>
    );
}

function TransactionCard({ txn, onPress }: { txn: Transaction; onPress: () => void }) {
    const needsAction = txn.review_status === "NEEDS_CORRECTION";

    return (
        <TouchableOpacity
            style={[styles.card, needsAction && styles.cardActionRequired]}
            onPress={onPress}
            activeOpacity={0.75}
        >
            {/* Action Required Banner */}
            {needsAction && (
                <View style={styles.cardBanner}>
                    <Ionicons name="alert-circle" size={13} color={COLORS.error || "#991B1B"} />
                    <Text style={styles.cardBannerText}>Action required — tap to view correction</Text>
                </View>
            )}

            {/* Main Row */}
            <View style={styles.cardMain}>
                {/* Left: icon + description */}
                <View style={styles.cardIconWrap}>
                    <Ionicons
                        name={txn.category === "ADMIN" ? "business-outline" : "people-outline"}
                        size={18}
                        color={needsAction ? COLORS.error || "#991B1B" : COLORS.textSecondary}
                    />
                </View>

                <View style={styles.cardBody}>
                    <Text style={styles.cardDesc} numberOfLines={2}>
                        {txn.description}
                    </Text>
                    <View style={styles.cardMeta}>
                        <Text style={styles.cardDate}>{formatDate(txn.date)}</Text>
                        <Text style={styles.cardDot}>·</Text>
                        <Text style={styles.cardBudget} numberOfLines={1}>
                            {txn.budget_name}
                        </Text>
                    </View>
                    <View style={styles.cardTags}>
                        <RouteChip routeType={txn.route_type} />
                    </View>
                </View>

                {/* Right: amount + badge */}
                <View style={styles.cardRight}>
                    <Text style={styles.cardAmount}>K{txn.amount_zmw.toLocaleString()}</Text>
                    <Text style={styles.cardAmountUSD}>${txn.amount_usd.toFixed(2)}</Text>
                    <StatusBadge status={txn.review_status} />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgSecondary,
    },

    // Header
    header: {
        backgroundColor: COLORS.primary,
        paddingTop: SPACING["3xl"],
        paddingBottom: SPACING.lg,
        paddingHorizontal: SPACING.lg,
    },
    headerTitle: {
        fontSize: TYPOGRAPHY["2xl"],
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textInverse,
        marginBottom: SPACING.xs,
    },
    headerSub: {
        fontSize: TYPOGRAPHY.xs,
        color: "rgba(255,255,255,0.7)",
    },

    // Correction alert
    correctionAlert: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.errorLight || "#FEE2E2",
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        gap: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.errorLight || "#FECACA",
    },
    correctionAlertText: {
        flex: 1,
        fontSize: TYPOGRAPHY.sm,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.error || "#991B1B",
    },

    // Summary bar
    summaryBar: {
        flexDirection: "row",
        backgroundColor: COLORS.bgPrimary,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.xs,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight,
    },
    summaryBarItem: {
        flex: 1,
        alignItems: "center",
    },
    summaryBarValue: {
        fontSize: TYPOGRAPHY.lg,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
    },
    summaryBarLabel: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textTertiary,
        marginTop: SPACING.xs,
    },
    summaryBarDivider: {
        width: 1,
        backgroundColor: COLORS.borderLight,
        marginVertical: SPACING.xs,
    },

    // Filter tabs
    filterScroll: {
        backgroundColor: COLORS.bgPrimary,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight,
        maxHeight: 52,
    },
    filterScrollContent: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.sm,
        gap: SPACING.sm,
    },
    filterTab: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.bgTertiary,
        gap: SPACING.xs,
    },
    filterTabActive: {
        backgroundColor: COLORS.primary,
    },
    filterTabText: {
        fontSize: TYPOGRAPHY.sm,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textSecondary,
    },
    filterTabTextActive: {
        color: COLORS.textInverse,
    },
    filterTabCount: {
        backgroundColor: COLORS.borderLight,
        borderRadius: RADIUS.full,
        minWidth: 18,
        height: 18,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: SPACING.xs,
    },
    filterTabCountActive: {
        backgroundColor: "rgba(255,255,255,0.3)",
    },
    filterTabCountText: {
        fontSize: TYPOGRAPHY.xs,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
    },
    filterTabCountTextActive: {
        color: COLORS.textInverse,
    },

    // Transaction list
    list: {
        flex: 1,
    },
    listContent: {
        padding: SPACING.md,
        gap: SPACING.md,
    },

    // Transaction card
    card: {
        backgroundColor: COLORS.bgPrimary,
        borderRadius: RADIUS.lg,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardActionRequired: {
        borderWidth: 1.5,
        borderColor: COLORS.errorLight || "#FCA5A5",
        shadowColor: COLORS.error || "#EF4444",
        shadowOpacity: 0.1,
    },
    cardBanner: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.errorLight || "#FEE2E2",
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        gap: SPACING.sm,
    },
    cardBannerText: {
        fontSize: TYPOGRAPHY.xs,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.error || "#991B1B",
    },
    cardMain: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: SPACING.md,
        gap: SPACING.md,
    },
    cardIconWrap: {
        width: 36,
        height: 36,
        borderRadius: RADIUS.base,
        backgroundColor: COLORS.bgTertiary,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
    },
    cardBody: {
        flex: 1,
        gap: SPACING.xs,
    },
    cardDesc: {
        fontSize: TYPOGRAPHY.sm,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textPrimary,
        lineHeight: TYPOGRAPHY.base,
    },
    cardMeta: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.xs,
    },
    cardDate: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textTertiary,
    },
    cardDot: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.borderLight,
    },
    cardBudget: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textTertiary,
        flex: 1,
    },
    cardTags: {
        flexDirection: "row",
        gap: SPACING.xs,
        marginTop: SPACING.xs,
    },
    cardRight: {
        alignItems: "flex-end",
        gap: SPACING.xs,
    },
    cardAmount: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
    },
    cardAmountUSD: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textTertiary,
    },

    // Badges & chips
    badge: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: RADIUS.full,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        gap: SPACING.xs,
    },
    badgeText: {
        fontSize: TYPOGRAPHY.xs,
        fontWeight: TYPOGRAPHY.bold,
    },
    routeChip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.bgTertiary,
        borderRadius: RADIUS.sm,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        gap: SPACING.xs,
    },
    routeChipDouble: {
        backgroundColor: COLORS.infoLight || "#DBEAFE",
    },
    routeChipText: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textSecondary,
        fontWeight: TYPOGRAPHY.medium,
    },
    routeChipTextDouble: {
        color: COLORS.info || "#1E40AF",
    },

    // Empty state
    emptyState: {
        alignItems: "center",
        paddingVertical: SPACING["3xl"],
        gap: SPACING.md,
    },
    emptyTitle: {
        fontSize: TYPOGRAPHY.lg,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textSecondary,
    },
    emptySubtitle: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textTertiary,
        textAlign: "center",
        lineHeight: TYPOGRAPHY.base * 1.3,
        maxWidth: 240,
    },

    // FAB
    fab: {
        position: "absolute",
        bottom: SPACING.lg,
        right: SPACING.md,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
});