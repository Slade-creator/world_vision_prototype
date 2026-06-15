import { View, Text, StyleSheet } from "react-native";
import { ExchangeRateBannerProps } from "../../types";

export function ExchangeRateBanner({ rate }: ExchangeRateBannerProps) {
  return (
    <View style={styles.banner}>
      <Text style={styles.label}>Current Exchange Rate</Text>
      <Text style={styles.value}>1 USD = {rate.zmw_to_usd} ZMW</Text>
      <Text style={styles.date}>
        {monthName(rate.month)} {rate.year} · Auto-synced
      </Text>
    </View>
  );
}

function monthName(month: number): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month - 1] || "Unknown";
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#1E3A5F",
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  label: {
    fontSize: 11,
    color: "#93C5FD",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  date: {
    fontSize: 11,
    color: "#93C5FD",
  },
});
