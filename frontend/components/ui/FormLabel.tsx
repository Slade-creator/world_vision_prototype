import { View, StyleSheet } from "react-native";
import { COLORS, SPACING } from "../../theme";
import { LabelText, CaptionText } from "../Typography";

interface FormLabelProps {
  label: string;
  required?: boolean;
  hint?: string;
}

export function FormLabel({ label, required, hint }: FormLabelProps) {
  return (
    <>
      <View style={styles.labelRow}>
        <LabelText style={{ fontWeight: "700" }}>{label}</LabelText>
        {required && <LabelText style={{ color: COLORS.primary, marginLeft: SPACING.xs, fontWeight: "700" }}>*</LabelText>}
      </View>
      {hint && <CaptionText style={{ marginBottom: SPACING.sm, lineHeight: 16 }}>{hint}</CaptionText>}
    </>
  );
}

const styles = StyleSheet.create({
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm - 2,
  },
});
