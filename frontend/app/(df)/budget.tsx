import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { budgetAPI, BudgetLine, ExchangeRate } from "../../Service/api";
import { BudgetCard } from "../../components/ui/BudgetCard";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { COLORS, SPACING, TYPOGRAPHY, RADIUS } from "../../theme";

export default function BudgetScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [ budgetLines, setBudgetLines ] = useState<BudgetLine[]>([]);
  const [ exchageRate, setExchangeRate] = useState<ExchangeRate | null>(null);

  useEffect(() => {
    budgetAPI.getMyBudgets().then(res => {
      setBudgetLines(res.budget_lines);
      setExchangeRate(res.exchange_rate);
    }).catch(console.error);
  }, []);

  const totalAllocated = budgetLines.reduce(
    (sum, b) => sum + b.allocated_zmw, 0
  );
  const totalSpent = budgetLines.reduce(
    (sum, b) => sum + b.spent_zmw, 0
  );
  const totalRemaining = totalAllocated - totalSpent;
  const overallPercent = Math.round((totalSpent / totalAllocated) * 100);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budget Overview</Text>
        <Text style={styles.headerSub}>ZM-2026 · All Projects</Text>
      </View>

      {/* Overall Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryCardHeader}>
          <Text style={styles.summaryCardTitle}>Total Portfolio</Text>
          <View style={styles.rateChip}>
            <Text style={styles.rateChipText}>
              1 USD = {exchageRate?.zmw_to_usd} ZMW
            </Text>
          </View>
        </View>

        <View style={styles.totalRow}>
          <View>
            <Text style={styles.totalLabel}>Total Budget</Text>
            <Text style={styles.totalAmount}>
              K{totalAllocated.toLocaleString()}
            </Text>
          </View>
          <View style={styles.overallBadge}>
            <Text style={styles.overallBadgeText}>{overallPercent}% used</Text>
          </View>
        </View>

        <ProgressBar
          percent={overallPercent}
          status={overallPercent >= 90 ? "RED" : overallPercent >= 70 ? "ORANGE" : "GREEN"}
        />

        <View style={styles.totalBreakdown}>
          <View style={styles.totalBreakdownItem}>
            <View style={[styles.dot, { backgroundColor: "#EF4444" }]} />
            <Text style={styles.totalBreakdownLabel}>Spent</Text>
            <Text style={styles.totalBreakdownValue}>
              K{totalSpent.toLocaleString()}
            </Text>
          </View>
          <View style={styles.totalBreakdownItem}>
            <View style={[styles.dot, { backgroundColor: "#10B981" }]} />
            <Text style={styles.totalBreakdownLabel}>Remaining</Text>
            <Text style={styles.totalBreakdownValue}>
              K{totalRemaining.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Budget Lines */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Budget Lines ({budgetLines.length})
        </Text>
        <Text style={styles.sectionSub}>Tap a line to see USD breakdown</Text>
      </View>

      <View style={styles.cardList}>
        {budgetLines.map((line) => (
          <BudgetCard
            key={line.id}
            line={line}
            expanded={expandedId === line.id}
            onToggle={() =>
              setExpandedId(expandedId === line.id ? null : line.id)
            }
          />
        ))}
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgSecondary,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    paddingTop: SPACING["3xl"],
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY["2xl"],
    fontWeight: TYPOGRAPHY.bold as "700",
    color: COLORS.textInverse,
    marginBottom: SPACING.xs,
  },
  headerSub:{
    fontSize: TYPOGRAPHY.xs,
    color: "rgba(255,255,255,0.7)",
  },
   summaryCard: {
      backgroundColor: COLORS.bgPrimary,
      marginHorizontal: SPACING.md,
      borderRadius: RADIUS.lg,
      padding: SPACING.lg,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 3,
    },
  summaryCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  summaryCardTitle: {
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textPrimary,
  },
  rateChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.infoLight || "#DBEAFE",
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    gap: SPACING.xs,
  },
  rateChipText: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.info || "#1E40AF",
        fontWeight: TYPOGRAPHY.semibold,
    },
  totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: SPACING.md,
    },
    totalLabel: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs,
    },
    totalAmount: {
        fontSize: TYPOGRAPHY["3xl"],
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
    },
    overallBadge: {
        backgroundColor: COLORS.bgTertiary,
        borderRadius: RADIUS.full,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
    },
  overallBadgeText: {
        fontSize: TYPOGRAPHY.xs,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textPrimary,
    },
    totalBreakdown: {
        flexDirection: "row",
        marginTop: SPACING.md,
        gap: SPACING.lg,
    },
    totalBreakdownMobile: {
        flexDirection: "column",
        gap: SPACING.sm,
    },
    totalBreakdownItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.sm,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
  totalBreakdownLabel: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textSecondary,
    },
    totalBreakdownValue: {
        fontSize: TYPOGRAPHY.xs,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textPrimary,
    },
    section: {
        paddingHorizontal: SPACING.md,
        marginTop: SPACING.lg,
        marginBottom: SPACING.md,
    },
    sectionTitle: {
        fontSize: TYPOGRAPHY.lg,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textPrimary,
    },
    sectionSub: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textTertiary,
        marginTop: SPACING.xs,
    },
    cardList: {
        paddingHorizontal: SPACING.md,
        gap: SPACING.md,
    },
});
