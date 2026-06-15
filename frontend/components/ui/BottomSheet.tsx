import { View, TouchableOpacity, ScrollView, Modal, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from "../../theme";
import { LabelText, BodySmallText } from "../Typography";

export interface BottomSheetOption {
  label: string;
  value: string;
  sub?: string;
}

interface BottomSheetProps {
  title: string;
  isVisible: boolean;
  options: BottomSheetOption[];
  selected: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

export function BottomSheet({
  title,
  isVisible,
  options,
  selected,
  onSelect,
  onClose,
}: BottomSheetProps) {
  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.header}>
          <LabelText style={{ fontWeight: "700" }}>{title}</LabelText>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={22} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {options.map((option) => {
            const isSelected = selected === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.option,
                  isSelected && styles.optionSelected,
                ]}
                onPress={() => {
                  onSelect(option.value);
                  onClose();
                }}
                activeOpacity={0.7}
              >
                <View style={styles.optionContent}>
                  <LabelText
                    style={[
                      { fontWeight: "600" },
                      isSelected && { color: COLORS.primary },
                    ]}
                  >
                    {option.label}
                  </LabelText>
                  {option.sub && (
                    <BodySmallText style={{ marginTop: SPACING.xs }}>
                      {option.sub}
                    </BodySmallText>
                  )}
                </View>
                {isSelected && (
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={COLORS.primary}
                  />
                )}
              </TouchableOpacity>
            );
          })}
          <View style={{ height: SPACING["2xl"] }} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    zIndex: 100,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sheet: {
    backgroundColor: COLORS.bgPrimary,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    maxHeight: "70%",
    paddingBottom: Platform.OS === "ios" ? 34 : SPACING.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  scroll: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xs,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md + 2,
    paddingHorizontal: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.bgSecondary,
  },
  optionSelected: {
    backgroundColor: COLORS.primaryLighter,
    marginHorizontal: -4,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.lg,
    borderBottomColor: "transparent",
  },
  optionContent: {
    flex: 1,
  },
});
