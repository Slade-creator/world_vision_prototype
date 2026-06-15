import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DmeTxn } from "./../../types/dme-types";
import { DME_STATUS_META } from "./../../constants/dme/dme-constants";
import { txnCardStyles } from "./../../styles/dme/dme-styles";
import { calculateTargetPercentage } from "./../../utils/dme/dme-utils";

interface TxnCardProps {
    txn: DmeTxn;
    onPress: () => void;
}

export function TxnCard({ txn, onPress }: TxnCardProps) {
    const meta = DME_STATUS_META[txn.dme_status];
    const isPending = txn.dme_status === "PENDING_DME";

    return (
        <TouchableOpacity
            style={[txnCardStyles.card, isPending && txnCardStyles.cardPending]}
            onPress={onPress}
            activeOpacity={0.75}
        >
            <View style={txnCardStyles.top}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={txnCardStyles.desc} numberOfLines={1}>
                        {txn.description}
                    </Text>
                    <Text style={txnCardStyles.meta}>
                        {txn.df_name} · {txn.date}
                    </Text>
                </View>
                <View style={[txnCardStyles.statusBadge, { backgroundColor: meta.bg }]}>
                    <Ionicons name={meta.icon as any} size={12} color={meta.color} />
                    <Text style={[txnCardStyles.statusText, { color: meta.color }]}>{meta.label}</Text>
                </View>
            </View>

            <View style={txnCardStyles.footer}>
                <View style={txnCardStyles.tag}>
                    <Ionicons name="folder-outline" size={12} color="#6B7280" />
                    <Text style={txnCardStyles.tagText}>{txn.budget_name}</Text>
                </View>
                <View style={txnCardStyles.tag}>
                    <Ionicons name="pricetag-outline" size={12} color="#6B7280" />
                    <Text style={txnCardStyles.tagText}>{txn.project_code}</Text>
                </View>
                <Text style={txnCardStyles.amount}>K{txn.amount_zmw.toLocaleString()}</Text>
            </View>

            {txn.linked_target && (
                <View style={txnCardStyles.targetHint}>
                    <Ionicons name="trophy-outline" size={11} color="#6366F1" />
                    <Text style={txnCardStyles.targetHintText} numberOfLines={1}>
                        {txn.linked_target.indicator_name} ·{" "}
                        {calculateTargetPercentage(
                            txn.linked_target.planned_value,
                            txn.linked_target.actual_value
                        )}% achieved
                    </Text>
                </View>
            )}

            {isPending && (
                <View style={txnCardStyles.reviewCta}>
                    <Text style={txnCardStyles.reviewCtaText}>Tap to review</Text>
                    <Ionicons name="chevron-forward" size={13} color="#6366F1" />
                </View>
            )}
        </TouchableOpacity>
    );
}
