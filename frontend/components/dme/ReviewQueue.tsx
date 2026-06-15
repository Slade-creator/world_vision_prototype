import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TRANSACTIONS } from "../../../data/mockData";

interface ReviewQueueProps {
    queue: Array<(typeof TRANSACTIONS)[number]>;
    onViewAll: () => void;
}

export function ReviewQueue({ queue, onViewAll }: ReviewQueueProps) {
    const pendingCount = queue.length;

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Review Queue</Text>
                <TouchableOpacity onPress={onViewAll}>
                    <Text style={styles.sectionLink}>View All ({pendingCount})</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                {pendingCount === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="checkmark-circle-outline" size={32} color="#10B981" />
                        <Text style={styles.emptyText}>All caught up — no pending reviews</Text>
                    </View>
                ) : (
                    queue.slice(0, 2).map((txn, i) => (
                        <View key={txn.id}>
                            {i > 0 && <View style={styles.divider} />}
                            <TouchableOpacity
                                style={styles.queueRow}
                                onPress={onViewAll}
                                activeOpacity={0.75}
                            >
                                <View style={styles.queueDot} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.queueDesc} numberOfLines={1}>
                                        {txn.description}
                                    </Text>
                                    <Text style={styles.queueMeta}>
                                        {txn.df_name} · {txn.date} · {txn.budget_name}
                                    </Text>
                                </View>
                                <Text style={styles.queueAmount}>
                                    K{txn.amount_zmw.toLocaleString()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: { paddingHorizontal: 16, marginBottom: 16 },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#0F172A",
    },
    sectionLink: {
        fontSize: 13,
        fontWeight: "600",
        color: "#6366F1",
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#0F172A",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 1,
    },
    divider: {
        height: 1,
        backgroundColor: "#F1F5F9",
        marginVertical: 10,
    },
    queueRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 6,
    },
    queueDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#F59E0B",
    },
    queueDesc: { fontSize: 13, fontWeight: "600", color: "#0F172A" },
    queueMeta: { fontSize: 11, color: "#9CA3AF", marginTop: 1 },
    queueAmount: { fontSize: 13, fontWeight: "700", color: "#0F172A" },
    emptyState: { alignItems: "center", paddingVertical: 24, gap: 8 },
    emptyText: { fontSize: 13, color: "#9CA3AF" },
});
