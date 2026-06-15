import { View, TouchableOpacity, StyleSheet } from "react-native";
import { TransactionCardProps } from "../../types";
import { StatusBadge } from "./StatusBadge";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from "../../theme";
import { LabelText, CaptionText } from "../Typography";

export function TransactionCard({
  transaction,
  onPress,
}: TransactionCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftContent}>
        <LabelText style={{ fontWeight: "600", marginBottom: SPACING.xs }} numberOfLines={1}>
          {transaction.description}
        </LabelText>
        <CaptionText>{transaction.date}</CaptionText>
      </View>

      <View style={styles.rightContent}>
        <LabelText style={{ fontWeight: "700" }}>
          K{transaction.amount_zmw.toLocaleString()}
        </LabelText>
        <StatusBadge status={transaction.review_status} variant="transaction" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bgPrimary,
    borderRadius: RADIUS.lg,
    padding: SPACING.md + 2,
    marginBottom: SPACING.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  leftContent: {
    flex: 1,
    marginRight: SPACING.md,
  },
  rightContent: {
    alignItems: "flex-end",
    gap: SPACING.xs,
  },
});
