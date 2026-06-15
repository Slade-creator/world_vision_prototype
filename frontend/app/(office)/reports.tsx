import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { budgetAPI, transactionAPI, BudgetLine, Transaction as transaction, ExchangeRate } from "../../Service/api";
import {
    REPORT_TABS,
    PERIOD_TABS,
    TARGET_DATA,
    EXPORT_MSG,
    type ReportType,
    type ReportPeriod,
} from "../../constants/office/reportConstants";
import { styles } from "./../../styles/office/reports";
import {
    getStatusColor,
    getStatusBg,
    getStatusLabel,
    calculatePercentage,
} from "./../../utils/office/reportHelpers";
import type { ReportData, VarianceItem, Transaction } from "./../../types/office/reportTypes";
import { ExportRow } from "../../components/office/ExportRow";
import { ActivitySummaryReport } from "../../components/office/ActivitySummaryReport";
import { SectionHeader } from "../../components/office/SectionHeader";
import { BurnRateReport } from "../../components/office/BurnRateReport";

// ─── Derived mock data helpers ────────────────────────────────────────────────

function deriveReportData(budgetLines: BudgetLine[], transactions: Transaction[]): ReportData {
    const totalAllocated = budgetLines.reduce((s, b) => s + b.allocated_zmw, 0);
    const totalSpent = budgetLines.reduce((s, b) => s + b.spent_zmw, 0);
    const totalRemaining = budgetLines.reduce((s, b) => s + b.remaining_zmw, 0);
    const overallBurnRate = Math.round((totalSpent / totalAllocated) * 100);

    const approvedTxns = transactions.filter(
        (t) => t.review_status === "FULLY_APPROVED" || t.review_status === "FINANCE_APPROVED"
    ) as Transaction[];
    const totalApproved = approvedTxns.reduce((s, t) => s + t.amount_zmw, 0);

    return {
        totalAllocated,
        totalSpent,
        totalRemaining,
        overallBurnRate,
        totalApproved,
        approvedTxns,
    };
}

// ─── Sub-components ───────────────────────────────────────────────────────────


function BurnBar({ percent, status }: { percent: number; status: string }) {
    const color = getStatusColor(status);
    return (
        <View style={styles.burnTrack}>
            <View
                style={[
                    styles.burnFill,
                    { width: `${Math.min(percent, 100)}%` as any, backgroundColor: color },
                ]}
            />
        </View>
    );
}


// ─── Report Panels ────────────────────────────────────────────────────────────



function TargetAchievementReport({ period }: { period: ReportPeriod }) {
    const targets = TARGET_DATA;

    const handleExport = (format: "PDF" | "EXCEL") => {
        Alert.alert(`Export as ${format}`, EXPORT_MSG);
    };

    return (
        <View>
            <View style={styles.reportCard}>
                <SectionHeader
                    title="Target Achievement"
                    sub="Planned vs. actual outputs"
                />
                <View style={styles.bigStatRow}>
                    <View>
                        <Text style={styles.bigStatLabel}>Avg Achievement</Text>
                        <Text style={[styles.bigStatValue, { color: "#F59E0B" }]}>58%</Text>
                    </View>
                    <View style={[styles.statusChip, { backgroundColor: "#FEF3C7" }]}>
                        <Text style={[styles.statusChipText, { color: "#92400E" }]}>
                            Below Target
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.reportCard}>
                <SectionHeader title="Indicator Breakdown" />
                {targets.map((t, i) => {
                    const pct = calculatePercentage(t.actual, t.planned);
                    return (
                        <View key={t.id}>
                            {i > 0 && <View style={styles.divider} />}
                            <View style={styles.lineRow}>
                                <View style={styles.lineRowTop}>
                                    <Text style={styles.lineName} numberOfLines={1}>
                                        {t.indicator}
                                    </Text>
                                    <Text style={[styles.linePercent, { color: getStatusColor(t.status) }]}>
                                        {pct}%
                                    </Text>
                                </View>
                                <Text style={styles.lineTCode}>{t.budget}</Text>
                                <BurnBar percent={pct} status={t.status} />
                                <View style={styles.lineAmountRow}>
                                    <Text style={styles.lineAmountLabel}>
                                        {t.actual} / {t.planned} {t.unit}
                                    </Text>
                                    <View
                                        style={[
                                            styles.miniChip,
                                            { backgroundColor: getStatusBg(t.status) },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.miniChipText,
                                                { color: getStatusColor(t.status) },
                                            ]}
                                        >
                                            {getStatusLabel(t.status)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </View>

            <View style={styles.reportCard}>
                <ExportRow onExport={handleExport} />
            </View>
        </View>
    );
}

function VarianceReport({ period, budgetLines }: { period: ReportPeriod; budgetLines: BudgetLine[] }) {
    const handleExport = (format: "PDF" | "EXCEL") => {
        Alert.alert(`Export as ${format}`, EXPORT_MSG);
    };

    // Variance = planned monthly spend vs actual
    const varianceData: VarianceItem[] = budgetLines.map((line) => {
        const expectedPct = 33; // Q1 = 33% of annual budget expected by end of April
        const actualPct = line.utilisation_percent;
        const diff = actualPct - expectedPct;
        return { ...line, expectedPct, diff } as VarianceItem;
    });

    return (
        <View>
            <View style={styles.reportCard}>
                <SectionHeader
                    title="Budget Variance Analysis"
                    sub="Actual spend vs. expected burn rate"
                />
                <View style={styles.bigStatRow}>
                    <View>
                        <Text style={styles.bigStatLabel}>Expected Burn</Text>
                        <Text style={[styles.bigStatValue, { color: "#6366F1" }]}>33%</Text>
                    </View>
                    <View style={[styles.statusChip, { backgroundColor: "#EDE9FE" }]}>
                        <Text style={[styles.statusChipText, { color: "#5B21B6" }]}>
                            4 months elapsed
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.reportCard}>
                <SectionHeader title="Line Item Variance" />
                {/* Table header */}
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableCell, styles.tableHeaderText, { flex: 2 }]}>
                        Line Item
                    </Text>
                    <Text style={[styles.tableCell, styles.tableHeaderText]}>Actual</Text>
                    <Text style={[styles.tableCell, styles.tableHeaderText]}>Expected</Text>
                    <Text style={[styles.tableCell, styles.tableHeaderText]}>Variance</Text>
                </View>
                {varianceData.map((line, i) => {
                    const isOver = line.diff > 5;
                    const isUnder = line.diff < -5;
                    const varColor = isOver ? "#EF4444" : isUnder ? "#6366F1" : "#10B981";
                    return (
                        <View
                            key={line.id}
                            style={[
                                styles.tableRow,
                                i % 2 === 0 && { backgroundColor: "#F8FAFC" },
                            ]}
                        >
                            <Text
                                style={[styles.tableCell, styles.tableCellMain, { flex: 2 }]}
                                numberOfLines={2}
                            >
                                {line.line_item_name}
                            </Text>
                            <Text style={[styles.tableCell, { color: getStatusColor(line.status) }]}>
                                {line.utilisation_percent}%
                            </Text>
                            <Text style={[styles.tableCell, { color: "#6B7280" }]}>
                                {line.expectedPct}%
                            </Text>
                            <Text style={[styles.tableCell, { color: varColor, fontWeight: "700" }]}>
                                {line.diff > 0 ? "+" : ""}
                                {line.diff}%
                            </Text>
                        </View>
                    );
                })}

                <View style={[styles.varianceLegend]}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: "#EF4444" }]} />
                        <Text style={styles.legendText}>Over-burning (&gt;5%)</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: "#10B981" }]} />
                        <Text style={styles.legendText}>Within range</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: "#6366F1" }]} />
                        <Text style={styles.legendText}>Under-burning</Text>
                    </View>
                </View>
            </View>

            <View style={styles.reportCard}>
                <ExportRow onExport={handleExport} />
            </View>
        </View>
    );
}



// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function ReportsScreen() {
    const [activeReport, setActiveReport] = useState<ReportType>("BURN_RATE");
    const [activePeriod, setActivePeriod] = useState<ReportPeriod>("MONTHLY");
    const [budgetLines, setBudgetLines] = useState<BudgetLine[]>([]);
    const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        Promise.all([
            budgetAPI.getAllBudgets(),
            transactionAPI.getAll(),

        ]).then(([budgetRes, txns]) => {
            setBudgetLines(budgetRes.budget_lines);
            setExchangeRate(budgetRes.exchange_rate);
            setTransactions(txns);

        }).catch(console.error);
    }, []);

    const renderReport = () => {
        switch (activeReport) {
            case "BURN_RATE":
                return <BurnRateReport period={activePeriod} />;
            case "TARGET_ACHIEVEMENT":
                return <TargetAchievementReport period={activePeriod} />;
            case "VARIANCE":
                return <VarianceReport period={activePeriod} budgetLines={budgetLines} />;
            case "ACTIVITY_SUMMARY":
                return <ActivitySummaryReport period={activePeriod} />;
        }
    };

    return (
        <View style={styles.container}>
            {/* ── Header ── */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Reports</Text>
                    <Text style={styles.headerSub}>
                        April 2026 · 1 USD = {exchangeRate?.zmw_to_usd} ZMW
                    </Text>
                </View>
                <View style={styles.headerBadge}>
                    <Ionicons name="bar-chart" size={18} color="#6366F1" />
                </View>
            </View>

            {/* ── Report Type Tabs ── */}
            <ScrollView
                horizontal
                style={{ flexGrow: 0}}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tabRow}
            >
                {REPORT_TABS.map((tab) => (
                    <TouchableOpacity
                        key={tab.key}
                        style={[
                            styles.reportTab,
                            activeReport === tab.key && styles.reportTabActive,
                        ]}
                        onPress={() => setActiveReport(tab.key)}
                        activeOpacity={0.75}
                    >
                        <Ionicons
                            name={tab.icon as any}
                            size={14}
                            color={activeReport === tab.key ? "#FFFFFF" : "#6B7280"}
                        />
                        <Text
                            style={[
                                styles.reportTabText,
                                activeReport === tab.key && styles.reportTabTextActive,
                            ]}
                            numberOfLines={1 }
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* ── Period Selector ── */}
            <View style={styles.periodRow}>
                {PERIOD_TABS.map((p) => (
                    <TouchableOpacity
                        key={p.key}
                        style={[
                            styles.periodBtn,
                            activePeriod === p.key && styles.periodBtnActive,
                        ]}
                        onPress={() => setActivePeriod(p.key)}
                        activeOpacity={0.75}
                    >
                        <Text
                            style={[
                                styles.periodBtnText,
                                activePeriod === p.key && styles.periodBtnTextActive,
                            ]}
                        >
                            {p.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* ── Report Content ── */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {renderReport()}
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}