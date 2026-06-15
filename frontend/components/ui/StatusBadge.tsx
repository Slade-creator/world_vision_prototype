import { View, StyleSheet } from "react-native";
import { StatusBadgeProps, StatusConfig } from "../../types";
import { SPACING, RADIUS } from "../../theme";
import { CaptionText } from "../Typography";

// Transaction status configurations
const transactionStatusConfig: Record<string, StatusConfig> = {
  PENDING: { label: "Pending", bg: "#FEF3C7", color: "#92400E" },
  FINANCE_APPROVED: { label: "Partial", bg: "#DBEAFE", color: "#1E40AF" },
  FULLY_APPROVED: { label: "Approved", bg: "#D1FAE5", color: "#065F46" },
  NEEDS_CORRECTION: { label: "Correction", bg: "#FEE2E2", color: "#991B1B" },
  REJECTED: { label: "Rejected", bg: "#FEE2E2", color: "#991B1B" },
};

// Budget status configurations
const budgetStatusConfig: Record<string, StatusConfig> = {
  GREEN: { label: "Healthy", bg: "#D1FAE5", color: "#065F46" },
  ORANGE: { label: "Low", bg: "#FEF3C7", color: "#92400E" },
  RED: { label: "Critical", bg: "#FEE2E2", color: "#991B1B" },
};

export function StatusBadge({
  status,
  variant = "transaction",
}: StatusBadgeProps) {
  const configMap =
    variant === "transaction" ? transactionStatusConfig : budgetStatusConfig;
  const config = configMap[status] ?? {
    label: status,
    bg: "#F3F4F6",
    color: "#374151",
  };

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <CaptionText style={[{ color: config.color, fontWeight: "700" }]}>
        {config.label}
      </CaptionText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs - 1,
  },
});
