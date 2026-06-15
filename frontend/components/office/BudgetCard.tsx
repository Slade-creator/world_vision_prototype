import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { STATUS_COLOR, STATUS_BG, STATUS_LABEL, BudgetStatus } from "./../../constants/office/budgetConstants";
import { getStatus } from "./../../utils/office/budgetHelpers";
import { styles } from "./../../styles/office/budgets";
import { BurnBar } from "./BurnBar";

export type BudgetLine = {
    id: string;
    line_item_name: string;
    project_code: string;
    tcode: string;
    allocated_zmw: number;
    allocated_usd: number;
    spent_zmw: number;
    spent_usd: number;
    remaining_zmw: number;
    remaining_usd: number;
    utilisation_percent: number;
    status: BudgetStatus;
    version?: number;
};

interface BudgetCardProps {
    line: BudgetLine;
    onPress: () => void;
}

/**
 * Card component displaying budget line details
 * Shows status, burn rate, amounts, and warnings
 */
export function BudgetCard({ line, onPress }: BudgetCardProps) {
    const status = getStatus(line.utilisation_percent);
    const color = STATUS_COLOR[status];

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
            <View style={[styles.cardStrip, { backgroundColor: color }]} />
            <View style={styles.cardInner}>
                {/* Top section with name and status */}
                <View style={styles.cardTopRow}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Text style={styles.cardName} numberOfLines={1}>
                            {line.line_item_name}
                        </Text>
                        <View style={styles.cardMeta}>
                            <View style={styles.tcodeChip}>
                                <Text style={styles.tcodeChipText}>{line.tcode}</Text>
                            </View>
                            <Text style={styles.cardProject}>{line.project_code}</Text>
                        </View>
                    </View>
                    <View style={[styles.statusChip, { backgroundColor: STATUS_BG[status] }]}>
                        <View style={[styles.statusDot, { backgroundColor: color }]} />
                        <Text style={[styles.statusChipText, { color }]}>
                            {STATUS_LABEL[status]}
                        </Text>
                    </View>
                </View>

                {/* Progress bar section */}
                <View style={styles.progressRow}>
                    <BurnBar percent={line.utilisation_percent} status={status} />
                    <Text style={[styles.percentText, { color }]}>
                        {line.utilisation_percent}%
                    </Text>
                </View>

                {/* Amount breakdown */}
                <View style={styles.amountsRow}>
                    <View style={styles.amountItem}>
                        <Text style={styles.amountItemLabel}>Allocated</Text>
                        <Text style={styles.amountItemValue}>
                            K{line.allocated_zmw.toLocaleString()}
                        </Text>
                        <Text style={styles.amountItemUsd}>${line.allocated_usd.toFixed(0)}</Text>
                    </View>
                    <View style={styles.amountDivider} />
                    <View style={styles.amountItem}>
                        <Text style={styles.amountItemLabel}>Spent</Text>
                        <Text style={[styles.amountItemValue, { color: "#EF4444" }]}>
                            K{line.spent_zmw.toLocaleString()}
                        </Text>
                        <Text style={styles.amountItemUsd}>${line.spent_usd.toFixed(0)}</Text>
                    </View>
                    <View style={styles.amountDivider} />
                    <View style={styles.amountItem}>
                        <Text style={styles.amountItemLabel}>Remaining</Text>
                        <Text style={[styles.amountItemValue, { color }]}>
                            K{line.remaining_zmw.toLocaleString()}
                        </Text>
                        <Text style={styles.amountItemUsd}>${line.remaining_usd.toFixed(0)}</Text>
                    </View>
                </View>

                {/* Status warnings */}
                {status === "RED" && (
                    <View style={styles.warningBanner}>
                        <Ionicons name="warning" size={12} color="#991B1B" />
                        <Text style={styles.warningText}>
                            Critical — less than 5% remaining
                        </Text>
                    </View>
                )}
                {status === "ORANGE" && (
                    <View style={styles.cautionBanner}>
                        <Ionicons name="alert-circle" size={12} color="#92400E" />
                        <Text style={styles.cautionText}>
                            Low funds — less than 30% remaining
                        </Text>
                    </View>
                )}

                {/* Footer */}
                <View style={styles.cardFooter}>
                    <Text style={styles.cardFooterText}>Tap to view details & history</Text>
                    <Ionicons name="chevron-forward" size={14} color="#9CA3AF" />
                </View>
            </View>
        </TouchableOpacity>
    );
}
