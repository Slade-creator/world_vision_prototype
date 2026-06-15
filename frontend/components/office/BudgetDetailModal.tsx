import React, { useState } from "react";
import { View, Text, ScrollView, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BudgetLine } from "./BudgetCard";
import { STATUS_COLOR, STATUS_BG, STATUS_LABEL, VERSION_HISTORY, IoniconName } from "./../../constants/office/budgetConstants";
import { EXCHANGE_RATE } from "../../data/mockData";
import { getStatus } from "./../../utils/office/budgetHelpers";
import { modal } from "./../../styles/office/modal.styles";
import { BurnBar } from "./BurnBar";

interface BudgetDetailModalProps {
    line: BudgetLine | null;
    visible: boolean;
    onClose: () => void;
}

/**
 * Modal showing detailed budget information
 * Includes tabs for details and version history
 */
export function BudgetDetailModal({ line, visible, onClose }: BudgetDetailModalProps) {
    const [tab, setTab] = useState<"details" | "history">("details");

    if (!line) return null;

    const status = getStatus(line.utilisation_percent);
    const history = VERSION_HISTORY[line.id] ?? [];

    const detailItems = [
        { label: "TCode", value: line.tcode, icon: "code-slash-outline" as IoniconName },
        { label: "Project Code", value: line.project_code, icon: "folder-outline" as IoniconName },
        {
            label: "Exchange Rate",
            value: `1 USD = ${EXCHANGE_RATE.zmw_to_usd} ZMW`,
            icon: "swap-horizontal-outline" as IoniconName,
        },
        {
            label: "Rate Source",
            value: `${EXCHANGE_RATE.source} · April ${EXCHANGE_RATE.year}`,
            icon: "sync-outline" as IoniconName,
        },
    ];

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <View style={modal.container}>
                {/* Header */}
                <View style={modal.header}>
                    <View style={{ flex: 1, marginRight: 12 }}>
                        <Text style={modal.headerTitle} numberOfLines={2}>
                            {line.line_item_name}
                        </Text>
                        <Text style={modal.headerSub}>{line.project_code}</Text>
                    </View>
                    <TouchableOpacity style={modal.closeBtn} onPress={onClose}>
                        <Ionicons name="close" size={22} color="#374151" />
                    </TouchableOpacity>
                </View>

                {/* Tabs */}
                <View style={modal.tabs}>
                    {(["details", "history"] as const).map((tabName) => (
                        <TouchableOpacity
                            key={tabName}
                            style={[modal.tab, tab === tabName && modal.tabActive]}
                            onPress={() => setTab(tabName)}
                        >
                            <Text
                                style={[
                                    modal.tabText,
                                    tab === tabName && modal.tabTextActive,
                                ]}
                            >
                                {tabName === "details" ? "Details" : "Version History"}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <ScrollView style={modal.scroll} showsVerticalScrollIndicator={false}>
                    {tab === "details" ? (
                        <DetailsTab line={line} status={status} detailItems={detailItems} />
                    ) : (
                        <HistoryTab history={history} />
                    )}
                    <View style={{ height: 40 }} />
                </ScrollView>
            </View>
        </Modal>
    );
}

/**
 * Details tab content for budget detail modal
 */
function DetailsTab({
    line,
    status,
    detailItems,
}: {
    line: BudgetLine;
    status: ReturnType<typeof getStatus>;
    detailItems: Array<{ label: string; value: string; icon: IoniconName }>;
}) {
    return (
        <>
            {/* Status banner */}
            <View style={modal.section}>
                <View
                    style={[
                        modal.statusBanner,
                        { backgroundColor: STATUS_BG[status] },
                    ]}
                >
                    <Ionicons
                        name={
                            status === "GREEN"
                                ? "checkmark-circle"
                                : status === "ORANGE"
                                ? "alert-circle"
                                : "warning"
                        }
                        size={18}
                        color={STATUS_COLOR[status]}
                    />
                    <Text
                        style={[
                            modal.statusBannerText,
                            { color: STATUS_COLOR[status] },
                        ]}
                    >
                        {STATUS_LABEL[status]} — {line.utilisation_percent}% utilised
                    </Text>
                </View>
            </View>

            {/* Burn bar */}
            <View style={modal.section}>
                <BurnBar percent={line.utilisation_percent} status={status} />
            </View>

            {/* Amount breakdown */}
            <View style={modal.amountGrid}>
                <View style={modal.amountBox}>
                    <Text style={modal.amountLabel}>Allocated</Text>
                    <Text style={modal.amountZmw}>
                        K{line.allocated_zmw.toLocaleString()}
                    </Text>
                    <Text style={modal.amountUsd}>
                        ${line.allocated_usd.toFixed(2)}
                    </Text>
                </View>
                <View style={[modal.amountBox, modal.amountBoxBorder]}>
                    <Text style={modal.amountLabel}>Spent</Text>
                    <Text style={[modal.amountZmw, { color: "#EF4444" }]}>
                        K{line.spent_zmw.toLocaleString()}
                    </Text>
                    <Text style={modal.amountUsd}>
                        ${line.spent_usd.toFixed(2)}
                    </Text>
                </View>
                <View style={[modal.amountBox, modal.amountBoxBorder]}>
                    <Text style={modal.amountLabel}>Remaining</Text>
                    <Text
                        style={[
                            modal.amountZmw,
                            { color: STATUS_COLOR[status] },
                        ]}
                    >
                        K{line.remaining_zmw.toLocaleString()}
                    </Text>
                    <Text style={modal.amountUsd}>
                        ${line.remaining_usd.toFixed(2)}
                    </Text>
                </View>
            </View>

            {/* Details section */}
            <View style={modal.section}>
                <Text style={modal.sectionTitle}>Line Details</Text>
                <View style={modal.detailGrid}>
                    {detailItems.map((item) => (
                        <View key={item.label} style={modal.detailRow}>
                            <Ionicons name={item.icon} size={14} color="#9CA3AF" />
                            <View style={{ flex: 1 }}>
                                <Text style={modal.detailLabel}>{item.label}</Text>
                                <Text style={modal.detailValue}>{item.value}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </>
    );
}

/**
 * History tab content showing version history
 */
function HistoryTab({
    history,
}: {
    history: Array<{ version: number; date: string; allocated_usd: number; note: string }>;
}) {
    return (
        <View style={modal.section}>
            <Text style={modal.sectionTitle}>Upload History</Text>
            {history.map((h, i) => (
                <View key={h.version} style={modal.historyCard}>
                    <View style={modal.historyTop}>
                        <View
                            style={[
                                modal.versionBadge,
                                i === 0 && { backgroundColor: "#DBEAFE" },
                            ]}
                        >
                            <Text
                                style={[
                                    modal.versionBadgeText,
                                    i === 0 && { color: "#1E40AF" },
                                ]}
                            >
                                v{h.version}
                            </Text>
                        </View>
                        <Text style={modal.historyDate}>{h.date}</Text>
                        {i === 0 && (
                            <View style={modal.currentChip}>
                                <Text style={modal.currentChipText}>Current</Text>
                            </View>
                        )}
                    </View>
                    <Text style={modal.historyAmount}>
                        ${h.allocated_usd.toLocaleString()} USD allocated
                    </Text>
                    <Text style={modal.historyNote}>{h.note}</Text>
                </View>
            ))}
        </View>
    );
}
