import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BudgetCardProps, BudgetLine } from "../../types";
import { EXCHANGE_RATE } from "../../data/mockData";
import { StatusBadge } from "./StatusBadge";
import { ProgressBar } from "./ProgressBar";

export function BudgetCard({ line, expanded, onToggle }: BudgetCardProps) {
  const statusColor =
    line.status === "GREEN"
      ? "#10B981"
      : line.status === "ORANGE"
        ? "#F59E0B"
        : "#EF4444";

  return (
    <TouchableOpacity
      style={[styles.card, expanded && styles.cardExpanded]}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <Text style={styles.cardTitle} numberOfLines={expanded ? 0 : 1}>
            {line.line_item_name}
          </Text>
          <View style={styles.cardMeta}>
            <View style={styles.tcodeChip}>
              <Text style={styles.tcodeText}>{line.tcode}</Text>
            </View>
            <Text style={styles.projectCode}>{line.project_code}</Text>
          </View>
        </View>
        <View style={styles.cardHeaderRight}>
          <StatusBadge status={line.status} variant="budget" />
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={16}
            color="#9CA3AF"
            style={{ marginTop: 8 }}
          />
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <ProgressBar
          percent={line.utilisation_percent}
          status={line.status}
          height={8}
        />
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabel}>0%</Text>
          <Text style={[styles.progressPercent, { color: statusColor }]}>
            {line.utilisation_percent}% used
          </Text>
          <Text style={styles.progressLabel}>100%</Text>
        </View>
      </View>

      {/* Summary Row */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Allocated</Text>
          <Text style={styles.summaryValue}>
            K{line.allocated_zmw.toLocaleString()}
          </Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Spent</Text>
          <Text style={[styles.summaryValue, { color: "#EF4444" }]}>
            K{line.spent_zmw.toLocaleString()}
          </Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Remaining</Text>
          <Text style={[styles.summaryValue, { color: statusColor }]}>
            K{line.remaining_zmw.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Expanded Detail */}
      {expanded && (
        <View style={styles.expandedSection}>
          <View style={styles.expandedDivider} />

          <Text style={styles.expandedTitle}>USD Equivalent</Text>
          <View style={styles.usdRow}>
            <View style={styles.usdItem}>
              <Text style={styles.usdLabel}>Allocated</Text>
              <Text style={styles.usdValue}>
                ${line.allocated_usd.toFixed(2)}
              </Text>
            </View>
            <View style={styles.usdItem}>
              <Text style={styles.usdLabel}>Spent</Text>
              <Text style={[styles.usdValue, { color: "#EF4444" }]}>
                ${line.spent_usd.toFixed(2)}
              </Text>
            </View>
            <View style={styles.usdItem}>
              <Text style={styles.usdLabel}>Remaining</Text>
              <Text style={[styles.usdValue, { color: statusColor }]}>
                ${line.remaining_usd.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.rateNote}>
            <Ionicons
              name="information-circle-outline"
              size={13}
              color="#6B7280"
            />
            <Text style={styles.rateNoteText}>
              Rate: 1 USD = {EXCHANGE_RATE.zmw_to_usd} ZMW · April{" "}
              {EXCHANGE_RATE.year}
            </Text>
          </View>

          {line.status === "RED" && (
            <View style={styles.warningBox}>
              <Ionicons name="warning-outline" size={14} color="#991B1B" />
              <Text style={styles.warningText}>
                This budget line is critically low. Contact Finance immediately.
              </Text>
            </View>
          )}

          {line.status === "ORANGE" && (
            <View style={styles.cautionBox}>
              <Ionicons name="alert-circle-outline" size={14} color="#92400E" />
              <Text style={styles.cautionText}>
                Less than 25% remaining. Spend carefully.
              </Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardExpanded: {
    shadowOpacity: 0.1,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  cardHeaderLeft: {
    flex: 1,
    marginRight: 8,
  },
  cardHeaderRight: {
    alignItems: "flex-end",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tcodeChip: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tcodeText: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "600",
  },
  projectCode: {
    fontSize: 11,
    color: "#6B7280",
  },
  progressSection: {
    marginBottom: 16,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: "700",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 8,
  },
  summaryLabel: {
    fontSize: 11,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },
  expandedSection: {
    marginTop: 16,
  },
  expandedDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginBottom: 16,
  },
  expandedTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  usdRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  usdItem: {
    flex: 1,
    alignItems: "center",
  },
  usdLabel: {
    fontSize: 11,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  usdValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },
  rateNote: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    gap: 6,
  },
  rateNoteText: {
    fontSize: 11,
    color: "#6B7280",
    flex: 1,
  },
  warningBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    padding: 10,
    gap: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#EF4444",
  },
  warningText: {
    fontSize: 11,
    color: "#991B1B",
    flex: 1,
    fontWeight: "500",
  },
  cautionBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    borderRadius: 8,
    padding: 10,
    gap: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#F59E0B",
  },
  cautionText: {
    fontSize: 11,
    color: "#92400E",
    flex: 1,
    fontWeight: "500",
  },
});
