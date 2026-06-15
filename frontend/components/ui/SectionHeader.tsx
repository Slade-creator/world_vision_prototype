import { View, TouchableOpacity, StyleSheet } from "react-native";
import { SectionHeaderProps } from "../../types";
import { COLORS, SPACING } from "../../theme";
import { H6, LabelText } from "../Typography";

export function SectionHeader({
  title,
  linkText = "View All",
  onLinkPress,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <H6>{title}</H6>
      {onLinkPress && (
        <TouchableOpacity onPress={onLinkPress}>
          <LabelText style={{ color: COLORS.primary, fontWeight: "600" }}>
            {linkText}
          </LabelText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
});
