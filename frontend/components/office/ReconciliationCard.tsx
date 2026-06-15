import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ReconciliationRecord, STATUS_META } from "../../constants/office/reconcile.constants";
import { styles } from "../../styles/office/reconcile.styles";

interface ReconciliationCardProps {
    record: ReconciliationRecord;
    onResolve: (record: ReconciliationRecord) => void;
}

export function ReconciliationCard({ record, onResolve }: ReconciliationCardProps) {
    const meta = STATUS_META[record.status];
    const isResolved = !!record.resolution_note;
    const needsAction = record.status !== "MATCHED" && !isResolved;

    return (
        <View style={[styles.card, needsAction && styles.cardHighlighted]}>
            {/* Top row */}
            <View style={styles.cardTop}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={styles.cardDesc} numberOfLines={1}>
                        {record.description}
                    </Text>
                    <Text style={styles.cardMeta}>
                        {record.project_code} · {record.date}
                    </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: meta.bg }]}>
                    <Ionicons name={meta.icon as any} size={12} color={meta.color} />
                    <Text style={[styles.statusBadgeText, { color: meta.color }]}>
                        {meta.label}
                    </Text>
                </View>
            </View>

            {/* Amount comparison */}
            <View style={styles.amountRow}>
                <View style={styles.amountBox}>
                    <Text style={styles.amountBoxLabel}>Horizon</Text>
                    <Text style={styles.amountBoxValue}>
                        {record.external_amount_usd != null
                            ? `$${record.external_amount_usd.toFixed(2)}`
                            : "—"}
                    </Text>
                    {record.external_reference && (
                        <Text style={styles.amountBoxRef}>{record.external_reference}</Text>
                    )}
                </View>

                <View style={styles.amountArrow}>
                    <Ionicons
                        name={record.status === "MATCHED" ? "checkmark" : "close"}
                        size={16}
                        color={record.status === "MATCHED" ? "#10B981" : "#EF4444"}
                    />
                </View>

                <View style={[styles.amountBox, { alignItems: "flex-end" }]}>
                    <Text style={styles.amountBoxLabel}>FFT</Text>
                    <Text style={styles.amountBoxValue}>
                        {record.fft_amount_usd != null
                            ? `$${record.fft_amount_usd.toFixed(2)}`
                            : "—"}
                    </Text>
                    {record.transaction_id && (
                        <Text style={styles.amountBoxRef}>{record.transaction_id}</Text>
                    )}
                </View>
            </View>

            {/* Discrepancy flag */}
            {record.discrepancy_usd != null && record.status !== "MATCHED" && (
                <View style={styles.discrepancyRow}>
                    <Ionicons name="warning-outline" size={13} color="#F59E0B" />
                    <Text style={styles.discrepancyText}>
                        Discrepancy:{" "}
                        <Text style={{ fontWeight: "700", color: "#92400E" }}>
                            ${record.discrepancy_usd.toFixed(2)}
                        </Text>
                    </Text>
                </View>
            )}

            {/* Resolution note */}
            {isResolved && (
                <View style={styles.resolvedBanner}>
                    <Ionicons name="checkmark-circle" size={13} color="#10B981" />
                    <Text style={styles.resolvedText}>
                        Resolved by {record.resolved_by} · {record.resolved_at}
                    </Text>
                </View>
            )}

            {/* Action button */}
            {needsAction && (
                <TouchableOpacity
                    style={styles.resolveBtn}
                    onPress={() => onResolve(record)}
                    activeOpacity={0.8}
                >
                    <Text style={styles.resolveBtnText}>Resolve Discrepancy</Text>
                    <Ionicons name="chevron-forward" size={14} color="#5B21B6" />
                </TouchableOpacity>
            )}
        </View>
    );
}
