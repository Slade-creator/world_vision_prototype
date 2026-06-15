import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Transaction, ReviewStatus } from "./../../types/office/review";
import { STATUS_CONFIG } from "./../../constants/office/reviewConfig";
import { getBudgetLine, formatDate, getCategoryIcon, getRouteLabel } from "./../../utils/office/reviewHelpers";
import { styles } from "./../../styles/office/reviewStyles";

interface TransactionCardProps {
    txn: Transaction;
    onPress: () => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ txn, onPress }) => {
    const status = STATUS_CONFIG[txn.review_status as keyof typeof STATUS_CONFIG];
    const budget = getBudgetLine(txn.budget_id);

    return (
        <TouchableOpacity
            style={styles.txnCard}
            onPress={onPress}
            activeOpacity={0.75}
        >
            {/* Status strip */}
            <View style={[styles.txnStrip, { backgroundColor: status.color }]} />

            <View style={styles.txnCardInner}>
                {/* Top row */}
                <View style={styles.txnTopRow}>
                    <View style={styles.txnIconWrap}>
                        <Ionicons
                            name={getCategoryIcon(txn.category)}
                            size={18}
                            color="#6B7280"
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txnDesc} numberOfLines={1}>
                            {txn.description}
                        </Text>
                        <Text style={styles.txnMeta}>
                            {txn.df_name} · {formatDate(txn.date)}
                        </Text>
                    </View>
                    <View style={styles.txnAmountWrap}>
                        <Text style={styles.txnAmount}>
                            K{txn.amount_zmw.toLocaleString()}
                        </Text>
                        <Text style={styles.txnAmountUsd}>
                            ${txn.amount_usd.toFixed(2)}
                        </Text>
                    </View>
                </View>

                {/* Tags row */}
                <View style={styles.txnTagsRow}>
                    <View style={[styles.chip, { backgroundColor: status.bg }]}>
                        <Ionicons name={status.icon} size={11} color={status.color} />
                        <Text style={[styles.chipText, { color: status.color }]}>
                            {status.label}
                        </Text>
                    </View>
                    <View style={styles.chip}>
                        <Text style={styles.chipText}>{txn.category}</Text>
                    </View>
                    <View
                        style={[
                            styles.chip,
                            txn.route_type === "FINANCE_AND_DME" && {
                                backgroundColor: "#DBEAFE",
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.chipText,
                                txn.route_type === "FINANCE_AND_DME" && {
                                    color: "#1E40AF",
                                },
                            ]}
                        >
                            {getRouteLabel(txn.route_type)}
                        </Text>
                    </View>
                </View>

                {/* Budget line */}
                {budget && (
                    <View style={styles.txnBudgetRow}>
                        <Ionicons name="wallet-outline" size={12} color="#9CA3AF" />
                        <Text style={styles.txnBudgetText} numberOfLines={1}>
                            {budget.line_item_name} · {budget.tcode}
                        </Text>
                    </View>
                )}

                {/* Correction note */}
                {txn.review_status === "NEEDS_CORRECTION" && txn.correction_comment && (
                    <View style={styles.correctionNote}>
                        <Ionicons name="chatbox-outline" size={12} color="#991B1B" />
                        <Text style={styles.correctionNoteText} numberOfLines={2}>
                            {txn.correction_comment}
                        </Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};
