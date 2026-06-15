import { View, Text, StyleSheet } from "react-native";

export interface RouteChipProps {
  route: "FINANCE_ONLY" | "FINANCE_AND_DME" | string;
}

export function RouteChip({ route }: RouteChipProps) {
  const isFinanceAndDME = route === "FINANCE_AND_DME";

  return (
    <View
      style={[
        styles.chip,
        isFinanceAndDME ? styles.chipDouble : styles.chipSingle,
      ]}
    >
      <Text
        style={[
          styles.text,
          isFinanceAndDME ? styles.textDouble : styles.textSingle,
        ]}
      >
        {isFinanceAndDME ? "Finance & DME" : "Finance"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  chipSingle: {
    backgroundColor: "#DBEAFE",
  },
  chipDouble: {
    backgroundColor: "#FEE2E2",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  textSingle: {
    color: "#0284C7",
  },
  textDouble: {
    color: "#DC2626",
  },
});
