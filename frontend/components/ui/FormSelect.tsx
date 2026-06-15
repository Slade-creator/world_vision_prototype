import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from "../../theme";
import { BodyText } from "../Typography";

interface FormSelectProps {
  value: string;
  placeholder: string;
  onPress: () => void;
  icon?: string;
}

export function FormSelect({
  value,
  placeholder,
  onPress,
  icon,
}: FormSelectProps) {
  const hasValue = !!value;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && (
        <Ionicons
          name={icon as any}
          size={16}
          color={hasValue ? COLORS.textPrimary : COLORS.textTertiary}
          style={styles.icon}
        />
      )}
      <BodyText
        style={[
          styles.text,
          !hasValue && { color: COLORS.textTertiary },
        ]}
      >
        {value || placeholder}
      </BodyText>
      <Ionicons name="chevron-down" size={16} color={COLORS.textTertiary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.bgTertiary,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md + 2,
    paddingVertical: SPACING.md + 1,
    borderWidth: 1,
    borderColor: COLORS.borderBase,
  },
  icon: {
    marginRight: SPACING.sm,
  },
  text: {
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
