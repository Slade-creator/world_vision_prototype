import { View, Text, StyleSheet } from "react-native";

export interface SummaryBarProps {
  total: number;
  pending: number;
  approved: number;
  needsCorrection: number;
  totalZMW?: number;
}

export function SummaryBar({
  total,
  pending,
  approved,
  needsCorrection,
  totalZMW,
}: SummaryBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.stat}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.value}>{total}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={styles.label}>Pending</Text>
          <Text style={[styles.value, styles.pending]}>{pending}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={styles.label}>Approved</Text>
          <Text style={[styles.value, styles.approved]}>{approved}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={styles.label}>Needs Correction</Text>
          <Text style={[styles.value, styles.correction]}>
            {needsCorrection}
          </Text>
        </View>
      </View>

      {totalZMW !== undefined && (
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total ZMW</Text>
          <Text style={styles.totalValue}>
            ZMW {totalZMW.toLocaleString("en-ZM", { minimumFractionDigits: 2 })}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "600",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  pending: {
    color: "#F59E0B",
  },
  approved: {
    color: "#10B981",
  },
  correction: {
    color: "#EF4444",
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  totalLabel: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "600",
  },
  totalValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
});
