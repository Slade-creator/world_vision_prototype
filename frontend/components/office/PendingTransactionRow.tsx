import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "./styles";
import { Transaction } from "./../../Service/api"

interface PendingTransactionRowProps {
    txn: Transaction;
}

export function PendingTransactionRow({ txn }: PendingTransactionRowProps) {
    const router = useRouter();

    return (
        <TouchableOpacity
            style={styles.pendingRow}
            activeOpacity={0.75}
            onPress={() => router.push("/(office)/review")}
        >
            <View style={styles.pendingRowIcon}>
                <Ionicons
                    name={txn.category === "ADMIN" ? "business-outline" : "people-outline"}
                    size={16}
                    color="#6B7280"
                />
            </View>
            <View style={styles.pendingRowBody}>
                <Text style={styles.pendingRowDesc} numberOfLines={1}>
                    {txn.description}
                </Text>
                <Text style={styles.pendingRowMeta}>
                    {txn.df_name} · {txn.date} ·{" "}
                    <Text style={{ color: txn.route_type === "FINANCE_AND_DME" ? "#1E40AF" : "#374151" }}>
                        {txn.route_type === "FINANCE_AND_DME" ? "Finance & DME" : "Finance only"}
                    </Text>
                </Text>
            </View>
            <View style={styles.pendingRowRight}>
                <Text style={styles.pendingRowAmount}>K{txn.amount_zmw.toLocaleString()}</Text>
                <Ionicons name="chevron-forward" size={14} color="#9CA3AF" />
            </View>
        </TouchableOpacity>
    );
}
