import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { budgetAPI, BudgetLine as ApiBudgetLine } from "../../Service/api";
import { Header } from "../../components/office/Header";
import { PortfolioSummary } from "../../components/office/portfolioSummary";
import { SummaryStats } from "../../components/office/SummaryStats";

// ─── Shared Imports ──────────────────────────────────────────────────────────
import { 
    BudgetLine, 
    BudgetStatus 
} from "../../shared";
import { 
    BUDGET_STATUS_THRESHOLDS,
    BUDGET_STATUS_COLOR,
    BUDGET_STATUS_BG,
    BUDGET_STATUS_LABEL,
    BUDGET_FILTER_TABS,
    EXCHANGE_RATE as SHARED_EXCHANGE_RATE
} from "../../shared/constants";
import { 
    getBudgetStatus,
    calculateBudgetStats,
    countBudgetsByStatus,
    filterBudgetsByStatus,
    formatCurrency
} from "../../shared/utils";
import { 
    useBudgetFilter,
    useModalState,
    useFormState 
} from "../../shared/hooks";
import { FilterTabs as SharedFilterTabs } from "../../shared/components";

// ─── Local Imports ───────────────────────────────────────────────────────────
import { styles } from "./../../styles/office/budgets";
import { BudgetCard } from "../../components/office/BudgetCard";
import { BudgetDetailModal } from "../../components/office/BudgetDetailModal";
import { UploadModal } from "../../components/office/UploadModal";



export default function BudgetsScreen() {
    const [budgets, setBudgets] = useState<BudgetLine[]>([]);

    // ── Use shared hooks ────────────────────────────────────────────────────
    const { 
        activeFilter: filter, 
        setActiveFilter: setFilter, 
        filtered, 
        counts 
    } = useBudgetFilter(budgets);

    const { 
        modalVisible: detailVisible, 
        selectedItem: selectedLine, 
        openModal: openDetailModal, 
        closeModal: closeDetailModal 
    } = useModalState<BudgetLine>();

    const { 
        modalVisible: uploadVisible, 
        setModalVisible: setUploadVisible 
    } = useModalState();

    // ── Derived state ────────────────────────────────────────────────────────
    const { totalAllocated, totalSpent, totalRemaining, overallPercent } =
        calculateBudgetStats(budgets);
    const overallStatus = getBudgetStatus(overallPercent);
    const { criticalCount, lowCount, onTrackCount } = countBudgetsByStatus(budgets);

    // ── Handlers ─────────────────────────────────────────────────────────────
    const handleUpload = (data: {
        project_code: string;
        line_item_name: string;
        tcode: string;
        allocated_usd: string;
    }) => {
        const allocUsd = parseFloat(data.allocated_usd);
        const allocZmw = allocUsd * SHARED_EXCHANGE_RATE.zmw_to_usd;
        const newLine: BudgetLine = {
            id: `b00${budgets.length + 1}`,
            project_code: data.project_code,
            line_item_name: data.line_item_name,
            tcode: data.tcode,
            allocated_zmw: parseFloat(allocZmw.toFixed(2)),
            allocated_usd: allocUsd,
            spent_zmw: 0,
            spent_usd: 0,
            remaining_zmw: parseFloat(allocZmw.toFixed(2)),
            remaining_usd: allocUsd,
            utilisation_percent: 0,
            status: "GREEN",
            version: 1,
        };
        setBudgets((prev) => [...prev, newLine]);
        setUploadVisible(false);
        Alert.alert("✓ Budget Uploaded", `"${data.line_item_name}" has been added successfully.`);
    };

    useEffect(() => {
        budgetAPI.getAllBudgets()
        .then(res => setBudgets(res.budget_lines as BudgetLine[]))
        .catch(console.error);
    }, []);

    const [exchangeRate, setExchangeRate] = useState(SHARED_EXCHANGE_RATE);

    useEffect(() => {
        budgetAPI.getAllBudgets()
        .then(res => {
            setBudgets(res.budget_lines as BudgetLine[]);
            if (res.exchange_rate) setExchangeRate(res.exchange_rate);
        }).catch(console.error);
    }, []);

    const handleSelectBudget = (line: BudgetLine) => {
        openDetailModal(line);
    };

    const handleCloseDetail = () => {
        closeDetailModal();
    };

    // ── Render ───────────────────────────────────────────────────────────────
    return (
        <View style={styles.container}>
            {/* Header */}
            <Header
                budgetCount={budgets.length}
                criticalCount={criticalCount}
                lowCount={lowCount}
                onUploadPress={() => setUploadVisible(true)}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Portfolio Summary Card */}
                <PortfolioSummary
                    percent={overallPercent}
                    status={overallStatus}
                    totalAllocated={totalAllocated}
                    totalSpent={totalSpent}
                    totalRemaining={totalRemaining}
                />

                {/* Summary Stats */}
                <SummaryStats
                    budgetCount={budgets.length}
                    criticalCount={criticalCount}
                    lowCount={lowCount}
                    onTrackCount={onTrackCount}
                />

                {/* Exchange Rate Info */}
                <ExchangeRatePill 
                 rate={exchangeRate}
                />

                {/* Filter Tabs */}
                <SharedFilterTabs<BudgetStatus>
                    tabs={BUDGET_FILTER_TABS}
                    activeTab={filter}
                    onTabPress={setFilter}
                    counts={counts}
                    style={{ marginBottom: 16 }}
                />

                {/* Budget Cards List */}
                <View style={styles.cardList}>
                    {filtered.map((line) => (
                        <BudgetCard
                            key={line.id}
                            line={line}
                            onPress={() => handleSelectBudget(line)}
                        />
                    ))}
                </View>

                <View style={{ height: 30 }} />
            </ScrollView>

            {/* Modals */}
            <BudgetDetailModal
                line={selectedLine}
                visible={detailVisible}
                onClose={closeDetailModal}
            />
            <UploadModal
                visible={uploadVisible}
                onClose={() => setUploadVisible(false)}
                onUpload={handleUpload}
            />
        </View>
    );
}


/**
 * Exchange rate information
 */
function ExchangeRatePill({ rate }: { rate: typeof SHARED_EXCHANGE_RATE }) {
    return (
        <View style={styles.ratePill}>
            <Ionicons name="swap-horizontal" size={14} color="#1E40AF" />
            <Text style={styles.ratePillText}>
                April {rate.year} rate: 1 USD = {rate.zmw_to_usd} ZMW ·{" "}
                <Text style={{ color: "#10B981" }}>{rate.source}</Text>
            </Text>
        </View>
    );
}