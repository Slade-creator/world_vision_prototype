import React, {  useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { 
    ReviewStatus,
} from "../../shared";
import { 
    REVIEW_FILTER_TABS,  
} from "../../shared/constants";
import { 
    useTransactionFilter,
    useModalState 
} from "../../shared/hooks";
import { FilterTabs, EmptyState } from "../../shared/components";
import { TransactionCard } from "../../components/office/TransactionCard";
import { ReviewModal } from "../../components/office/ReviewModal";
import { styles } from "../../styles/office/reviewStyles";
import { reviewAPI, Transaction } from "../../Service/api";


// ─── Main Screen Component ────────────────────────────────────────────────────

export default function ReviewScreen() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadTransactions();

    }, []);

    const loadTransactions = async () => {
        try {
            setIsLoading(true);
            const data = await reviewAPI.getAll();
            setTransactions(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    // ── Use shared hooks for filtering and modal state ──────────────────────
    const { 
        activeFilter, 
        setActiveFilter, 
        filtered, 
        counts 
    } = useTransactionFilter(transactions);

    const { 
        modalVisible, 
        selectedItem: selectedTxn, 
        openModal, 
        closeModal 
    } = useModalState<Transaction>();

    // ── Handlers ─────────────────────────────────────────────────────────────
    const handleOpenModal = (txn: Transaction) => {
        openModal(txn);
    };

    const handleCloseModal = () => {
        closeModal();
    };

    const handleDecision = async (
        txnId: string,
        decision: "FINANCE_APPROVED" | "NEEDS_CORRECTION" | "REJECTED",
        comment: string
    ) => {
        try {
        const apiDecision = decision === "FINANCE_APPROVED" ? "APPROVED" : decision;

        await reviewAPI.submitReview(txnId, {
            decision: apiDecision,
            comment,
        });

        closeModal();
        await loadTransactions();
    } catch (error) {
        console.error("Review submission failed:", error);
    }
    };

    // ── Render ───────────────────────────────────────────────────────────────
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Review Queue</Text>
                    <Text style={styles.headerSub}>
                        {counts.PENDING} pending · {counts.NEEDS_CORRECTION} need correction
                    </Text>
                </View>
                <View style={styles.headerBadge}>
                    <Text style={styles.headerBadgeText}>{counts.ALL}</Text>
                    <Text style={styles.headerBadgeLabel}>Total</Text>
                </View>
            </View>

            {/* Filter tabs */}
            <FilterTabs<ReviewStatus>
                tabs={REVIEW_FILTER_TABS}
                activeTab={activeFilter}
                onTabPress={setActiveFilter}
                counts={counts}
                style={{ marginBottom: 16 }}
                contentContainerStyle={styles.filterRow}
            />

            {/* Transaction list */}
            <ScrollView
                style={styles.list}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            >
                {filtered.length === 0 ? (
                    <EmptyState
                        icon="checkmark-circle-outline"
                        title="All clear"
                        subtitle="No entries in this category right now."
                        style={styles.emptyState}
                    />
                ) : (
                    filtered.map((txn) => (
                        <TransactionCard
                            key={txn.id}
                            txn={txn}
                            onPress={() => handleOpenModal(txn)}
                        />
                    ))
                )}
                <View style={{ height: 20 }} />
            </ScrollView>

            {/* Review modal */}
            <ReviewModal
                txn={selectedTxn}
                visible={modalVisible}
                onClose={closeModal}
                onDecision={handleDecision}
            />
        </View>
    );
}
