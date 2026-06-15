import { View, StyleSheet } from "react-native";
import { ProgressBarProps } from "../../types";

export function ProgressBar({
  percent,
  status,
  height = 8,
}: ProgressBarProps) {
  const color =
    status === "GREEN"
      ? "#10B981"
      : status === "ORANGE"
        ? "#F59E0B"
        : "#EF4444";

  return (
    <View style={[styles.track, { height }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${Math.min(percent, 100)}%`,
            backgroundColor: color,
            height,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: "#F3F4F6",
    borderRadius: 4,
    overflow: "hidden",
  },
  fill: {
    borderRadius: 4,
  },
});
