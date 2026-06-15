import React, { useState, useMemo, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DmeReviewStatus, DmeTxn, FilterKey } from "../../types/dme-types";
import {  FILTER_TABS } from "./../../constants/dme/dme-constants";
import { buildDmeQueue } from "./../../utils/dme/dme-utils";
import { screenStyles } from "../../styles/dme/dme-styles";
import { ReviewModal } from "./../../components/dme/ReviewModal";
import { TxnCard } from "./../../components/dme/TxnCard";
import { reviewAPI } from "../../Service/api";

export default function DmeReviewScreen() {
    const [transactions, setTransactions] = useState<DmeTxn[]>([]);
    const [activeFilter, setActiveFilter] = useState<FilterKey>("ALL");
    const [selectedTxn, setSelectedTxn] = useState<DmeTxn | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const counts = useMemo(() => ({
        ALL: transactions.length,
        PENDING_DME: transactions.filter((t) => t.review_status === "PENDING").length,
        DME_APPROVED: transactions.filter((t) => t.review_status === "DME_APPROVED").length,
        FEEDBACK_REQUIRED: transactions.filter((t) => t.review_status === "FEEDBACK_REQUIRED").length,
    }), [transactions]);

    const filtered = useMemo(() =>
        activeFilter === "ALL"
            ? transactions
            : transactions.filter((t) => t.dme_status === activeFilter),
        [transactions, activeFilter]
    );

    const handleOpen = (txn: DmeTxn) => {
        setSelectedTxn(txn);
        setModalVisible(true);
    };

    const handleDecision = async (
        id: string,
        decision: "DME_APPROVED" | "FEEDBACK_REQUIRED",
        comment: string
    ) => {

        try {
            await reviewAPI.submitReview(id, {
                decision: decision === "DME_APPROVED" ? "APPROVED" : "NEEDS_CORRECTION",
                comment,
            });

            setTransactions(prev =>
                 prev.map(t => t.id == id ? 
                    { ...t,
                         review_status: decision,} : t)
                );
        } catch (e: any) {
            Alert.alert("Review Failed", e.message)
        }
        setModalVisible(false);
        setSelectedTxn(null);
    };

    const mapToDmeStatus = (review_status: string): DmeReviewStatus => {
    switch (review_status) {
        case "PENDING":         return "PENDING_DME";
        case "DME_APPROVED":    return "DME_APPROVED";
        case "NEEDS_CORRECTION":return "FEEDBACK_REQUIRED";
        default:                return "PENDING_DME";
    }
};

    useEffect(() => {
       loadTransactions();
    }, []);

    const loadTransactions = async () => {
        try {
            const data = await reviewAPI.getAll();
            const mapped = data
                .filter(t => t.category === "ACTIVITY")
                .map(t => ({
                ...t,
                dme_status: mapToDmeStatus(t.review_status),
            })) as unknown as DmeTxn[];
            setTransactions(mapped);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={screenStyles.container}>
            {/* Header */}
            <View style={screenStyles.header}>
                <View>
                    <Text style={screenStyles.headerTitle}>Activity Review</Text>
                    <Text style={screenStyles.headerSub}>
                        {counts.PENDING_DME} pending · activity entries only
                    </Text>
                </View>
                <View style={[screenStyles.headerBadge, { backgroundColor: counts.PENDING_DME > 0 ? "#FEF3C7" : "#D1FAE5" }]}>
                    <Text style={[screenStyles.headerBadgeCount, { color: counts.PENDING_DME > 0 ? "#92400E" : "#065F46" }]}>
                        {counts.PENDING_DME}
                    </Text>
                    <Text style={[screenStyles.headerBadgeLabel, { color: counts.PENDING_DME > 0 ? "#92400E" : "#065F46" }]}>
                        pending
                    </Text>
                </View>
            </View>

            {/* Admin cost notice — important per SRS FR-011 */}
            <View style={screenStyles.noticeBanner}>
                <Ionicons name="information-circle-outline" size={14} color="#6366F1" />
                <Text style={screenStyles.noticeText}>
                    Only program activity entries are shown here. Admin costs go to Finance only.
                </Text>
            </View>

            {/* Filter tabs */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={screenStyles.filterRow}
            >
                {FILTER_TABS.map((tab) => (
                    <TouchableOpacity
                        key={tab.key}
                        style={[
                            screenStyles.filterTab,
                            activeFilter === tab.key && screenStyles.filterTabActive,
                        ]}
                        onPress={() => setActiveFilter(tab.key)}
                        activeOpacity={0.75}
                    >
                        <Text
                            style={[
                                screenStyles.filterTabText,
                                activeFilter === tab.key && screenStyles.filterTabTextActive,
                            ]}
                        >
                            {tab.label}
                        </Text>
                        <View style={[
                            screenStyles.filterBadge,
                            activeFilter === tab.key && { backgroundColor: "rgba(255,255,255,0.25)" },
                        ]}>
                            <Text style={[
                                screenStyles.filterBadgeText,
                                activeFilter === tab.key && { color: "#FFFFFF" },
                            ]}>
                                {tab.key === "ALL" ? counts.ALL : counts[tab.key]}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* List */}
            <ScrollView
                style={screenStyles.list}
                contentContainerStyle={screenStyles.listContent}
                showsVerticalScrollIndicator={false}
            >
                {filtered.length === 0 ? (
                    <View style={screenStyles.emptyState}>
                        <Ionicons name="checkmark-circle-outline" size={44} color="#10B981" />
                        <Text style={screenStyles.emptyTitle}>All clear</Text>
                        <Text style={screenStyles.emptySub}>No entries in this category.</Text>
                    </View>
                ) : (
                    filtered.map((txn) => (
                        <TxnCard key={txn.id} txn={txn} onPress={() => handleOpen(txn)} />
                    ))
                )}
                <View style={{ height: 24 }} />
            </ScrollView>

            <ReviewModal
                txn={selectedTxn}
                visible={modalVisible}
                onClose={() => { setModalVisible(false); setSelectedTxn(null); }}
                onDecision={handleDecision}
            />
        </View>
    );
}
