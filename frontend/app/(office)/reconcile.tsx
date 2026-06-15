import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
    ReconciliationRecord,
    ReconciliationStatus,
    FilterStatus,
    MOCK_RECONCILIATION,
    FILTER_TABS,
    STATUS_META,
} from "../../constants/office/reconcile.constants";
import { styles } from "../../styles/office/reconcile.styles";
import { SummaryChip } from "../../components/office/SummaryChip";
import { ReconciliationCard } from "../../components/office/ReconciliationCard";
import { ResolutionModal } from "./../../components/office/ResolutionModal";
import { useModalState } from "../../shared/hooks";
import { FilterTabs } from "../../shared/components";


// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function ReconcileScreen() {
    const [records, setRecords] = useState<ReconciliationRecord[]>(MOCK_RECONCILIATION);
    const [activeFilter, setActiveFilter] = useState<FilterStatus>("ALL");
    const [isImporting, setIsImporting] = useState(false);
    const [lastImported, setLastImported] = useState("April 3, 2026 · 09:41 AM");

    // ── Use shared hooks ────────────────────────────────────────────────────
    const { 
        modalVisible, 
        selectedItem: selectedRecord, 
        openModal, 
        closeModal 
    } = useModalState<ReconciliationRecord>();

    // ── Counts ───────────────────────────────────────────────────────────────
    const counts = {
        ALL: records.length,
        MATCHED: records.filter((r) => r.status === "MATCHED").length,
        AMOUNT_MISMATCH: records.filter((r) => r.status === "AMOUNT_MISMATCH").length,
        MISSING_IN_FFT: records.filter((r) => r.status === "MISSING_IN_FFT").length,
        MISSING_IN_EXTERNAL: records.filter((r) => r.status === "MISSING_IN_EXTERNAL").length,
    };

    const filtered = activeFilter === "ALL"
        ? records
        : records.filter((r) => r.status === activeFilter);

    const unresolvedCount = records.filter(
        (r) => r.status !== "MATCHED" && !r.resolution_note
    ).length;

    const matchRate = Math.round((counts.MATCHED / counts.ALL) * 100);

    // ── Handlers ─────────────────────────────────────────────────────────────
    const handleImport = () => {
        setIsImporting(true);
        setTimeout(() => {
            setIsImporting(false);
            setLastImported("April 5, 2026 · just now");
            Alert.alert(
                "Import Complete",
                `87 records imported from Horizon.\n\n✓ ${counts.MATCHED} matched  ⚠ ${counts.AMOUNT_MISMATCH} mismatch  ✗ ${counts.MISSING_IN_FFT} missing in FFT`
            );
        }, 2000);
    };

    const handleOpenResolve = (record: ReconciliationRecord) => {
        openModal(record);
    };

    const handleResolve = (id: string, note: string) => {
        setRecords((prev) =>
            prev.map((r) =>
                r.id === id
                    ? {
                          ...r,
                          resolution_note: note,
                          resolved_by: "Janet Phiri",
                          resolved_at: "Apr 5, 2026",
                      }
                    : r
            )
        );
        closeModal();
    };

    // ── Render ───────────────────────────────────────────────────────────────
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.headerTitle}>Reconciliation</Text>
                    <Text style={styles.headerSub}>Horizon ERP · {lastImported}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.importBtn, isImporting && { opacity: 0.6 }]}
                    onPress={handleImport}
                    disabled={isImporting}
                    activeOpacity={0.8}
                >
                    <Ionicons
                        name={isImporting ? "sync" : "cloud-download-outline"}
                        size={14}
                        color="#FFFFFF"
                    />
                    <Text style={styles.importBtnText}>
                        {isImporting ? "Importing…" : "Import"}
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Alert banner if unresolved items exist */}
                {unresolvedCount > 0 && (
                    <View style={styles.alertBanner}>
                        <Ionicons name="warning" size={16} color="#92400E" />
                        <Text style={styles.alertText}>
                            {unresolvedCount} discrepanc{unresolvedCount > 1 ? "ies" : "y"} require your attention
                        </Text>
                    </View>
                )}

                {/* Summary */}
                <View style={styles.summarySection}>
                    {/* Match rate */}
                    <View style={styles.matchRateCard}>
                        <View>
                            <Text style={styles.matchRateLabel}>Match Rate</Text>
                            <Text style={[
                                styles.matchRateValue,
                                { color: matchRate >= 80 ? "#10B981" : matchRate >= 60 ? "#F59E0B" : "#EF4444" }
                            ]}>
                                {matchRate}%
                            </Text>
                            <Text style={styles.matchRateSub}>
                                {counts.MATCHED} of {counts.ALL} records
                            </Text>
                        </View>
                        {/* Simple visual ring-like bar */}
                        <View style={styles.matchBarWrap}>
                            <View style={styles.matchBarTrack}>
                                <View style={[
                                    styles.matchBarFill,
                                    {
                                        width: `${matchRate}%` as any,
                                        backgroundColor: matchRate >= 80 ? "#10B981" : "#F59E0B"
                                    }
                                ]} />
                            </View>
                            <View style={styles.matchBarTrack}>
                                <View style={[
                                    styles.matchBarFill,
                                    {
                                        width: `${(counts.AMOUNT_MISMATCH / counts.ALL) * 100}%` as any,
                                        backgroundColor: "#F59E0B"
                                    }
                                ]} />
                            </View>
                            <View style={styles.matchBarTrack}>
                                <View style={[
                                    styles.matchBarFill,
                                    {
                                        width: `${((counts.MISSING_IN_FFT + counts.MISSING_IN_EXTERNAL) / counts.ALL) * 100}%` as any,
                                        backgroundColor: "#EF4444"
                                    }
                                ]} />
                            </View>
                        </View>
                    </View>

                    {/* Chips */}
                    <View style={styles.chipsRow}>
                        <SummaryChip
                            label="Matched"
                            value={counts.MATCHED}
                            color="#065F46"
                            bg="#D1FAE5"
                        />
                        <SummaryChip
                            label="Mismatch"
                            value={counts.AMOUNT_MISMATCH}
                            color="#92400E"
                            bg="#FEF3C7"
                        />
                        <SummaryChip
                            label="Missing"
                            value={counts.MISSING_IN_FFT + counts.MISSING_IN_EXTERNAL}
                            color="#991B1B"
                            bg="#FEE2E2"
                        />
                    </View>
                </View>

                {/* Filter tabs */}
                <FilterTabs<ReconciliationStatus>
                    tabs={FILTER_TABS}
                    activeTab={activeFilter}
                    onTabPress={setActiveFilter}
                    counts={counts}
                    style={{ marginBottom: 16 }}
                    contentContainerStyle={styles.filterRow}
                />

                {/* Records list */}
                <View style={styles.listSection}>
                    {filtered.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Ionicons name="checkmark-circle-outline" size={40} color="#10B981" />
                            <Text style={styles.emptyTitle}>All clear</Text>
                            <Text style={styles.emptySub}>No records in this category.</Text>
                        </View>
                    ) : (
                        filtered.map((record) => (
                            <ReconciliationCard
                                key={record.id}
                                record={record}
                                onResolve={handleOpenResolve}
                            />
                        ))
                    )}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Resolution modal */}
            <ResolutionModal
                record={selectedRecord}
                visible={modalVisible}
                onClose={closeModal}
                onSubmit={handleResolve}
            />
        </View>
    );
}