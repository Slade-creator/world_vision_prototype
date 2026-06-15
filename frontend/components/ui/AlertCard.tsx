import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AlertCardProps } from "../../types";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from "../../theme";
import { LabelText, BodySmallText } from "../Typography";

export function AlertCard({
  type,
  title,
  message,
  actionText,
  onActionPress,
  icon = "alert-circle",
}: AlertCardProps) {
  const isWarning = type === "warning";
  const bgColor = isWarning ? COLORS.warningLight : COLORS.infoLight;
  const borderColor = isWarning ? COLORS.warning : COLORS.info;
  const iconColor = isWarning ? COLORS.warning : COLORS.info;
  const actionColor = COLORS.primary;
  const displayIcon = icon || (isWarning ? "alert-circle" : "time");

  return (
    <View style={[styles.card, { backgroundColor: bgColor, borderLeftColor: borderColor }]}>
      <Ionicons
        name={displayIcon as any}
        size={24}
        color={iconColor}
        style={styles.icon}
      />

      <View style={styles.content}>
        <LabelText style={{ fontWeight: "700" }}>{title}</LabelText>
        <BodySmallText style={{ marginTop: SPACING.xs }}>{message}</BodySmallText>
      </View>

      {actionText && onActionPress && (
        <TouchableOpacity onPress={onActionPress}>
          <LabelText style={{ color: actionColor, fontWeight: "700" }}>
            {actionText}
          </LabelText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
    borderRadius: RADIUS.lg,
    padding: SPACING.md + 2,
    borderLeftWidth: 4,
  },
  icon: {
    marginRight: SPACING.md,
  },
  content: {
    flex: 1,
  },
});
