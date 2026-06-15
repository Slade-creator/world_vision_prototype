import { Alert, Text, View } from "react-native";
import { BUDGET_LINES, EXCHANGE_RATE } from "../../data/mockData";
import { getBurnRateStatus, getStatusBg, getStatusColor, getStatusTextColor, getStatusLabel, formatCurrency, formatUSD } from "./../../utils/office/reportHelpers";
import { SectionHeader } from "./SectionHeader";
import { MetricRow } from "./MetricRow";
import { ExportRow } from "./ExportRow";
import { styles } from "../../styles/office/reports";
import { TRANSACTIONS } from "../../data/mockData";
import { ReportPeriod } from "../../constants/office/reportConstants";
import type { ReportData, Transaction } from "./../../types/office/reportTypes";

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

function deriveReportData(): ReportData {
    const totalAllocated = BUDGET_LINES.reduce((s, b) => s + b.allocated_zmw, 0);
    const totalSpent = BUDGET_LINES.reduce((s, b) => s + b.spent_zmw, 0);
    const totalRemaining = BUDGET_LINES.reduce((s, b) => s + b.remaining_zmw, 0);
    const overallBurnRate = Math.round((totalSpent / totalAllocated) * 100);

    const approvedTxns = TRANSACTIONS.filter(
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


export function BurnRateReport({ period }: { period: ReportPeriod }) {
    const { totalAllocated, totalSpent, totalRemaining, overallBurnRate } =
        deriveReportData();

    const handleExport = (format: "PDF" | "EXCEL") => {
        Alert.alert(`Export as ${format}`, "Export functionality coming in production build.");
    };

    return (
        <View>
            {/* Summary card */}
            <View style={styles.reportCard}>
                <SectionHeader
                    title="Portfolio Burn Rate"
                    sub={`${period === "MONTHLY" ? "April 2026" : period === "QUARTERLY" ? "Q2 2026" : "FY 2026"}`}
                />

                <View style={styles.bigStatRow}>
                    <View>
                        <Text style={styles.bigStatLabel}>Overall Utilisation</Text>
                        <Text
                            style={[
                                styles.bigStatValue,
                                {
                                    color: getStatusColor(
                                        getBurnRateStatus(overallBurnRate)
                                    ),
                                },
                            ]}
                        >
                            {overallBurnRate}%
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.statusChip,
                            {
                                backgroundColor: getStatusBg(
                                    getBurnRateStatus(overallBurnRate)
                                ),
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.statusChipText,
                                {
                                    color: getStatusTextColor(
                                        getBurnRateStatus(overallBurnRate)
                                    ),
                                },
                            ]}
                        >
                            {getStatusLabel(
                                getBurnRateStatus(overallBurnRate)
                            )}
                        </Text>
                    </View>
                </View>

                <BurnBar
                    percent={overallBurnRate}
                    status={getBurnRateStatus(overallBurnRate)}
                />

                <View style={styles.divider} />

                <MetricRow
                    label="Total Allocated"
                    value={formatCurrency(totalAllocated)}
                    sub={formatUSD(totalAllocated, EXCHANGE_RATE.zmw_to_usd)}
                />
                <MetricRow
                    label="Total Spent"
                    value={formatCurrency(totalSpent)}
                    sub={formatUSD(totalSpent, EXCHANGE_RATE.zmw_to_usd)}
                    color="#EF4444"
                />
                <MetricRow
                    label="Remaining"
                    value={formatCurrency(totalRemaining)}
                    sub={formatUSD(totalRemaining, EXCHANGE_RATE.zmw_to_usd)}
                    color="#10B981"
                />
            </View>

            {/* Per-line breakdown */}
            <View style={styles.reportCard}>
                <SectionHeader title="By Budget Line" />
                {BUDGET_LINES.map((line, i) => (
                    <View key={line.id}>
                        {i > 0 && <View style={styles.divider} />}
                        <View style={styles.lineRow}>
                            <View style={styles.lineRowTop}>
                                <Text style={styles.lineName} numberOfLines={1}>
                                    {line.line_item_name}
                                </Text>
                                <Text
                                    style={[
                                        styles.linePercent,
                                        { color: getStatusColor(line.status) },
                                    ]}
                                >
                                    {line.utilisation_percent}%
                                </Text>
                            </View>
                            <Text style={styles.lineTCode}>{line.tcode} · {line.project_code}</Text>
                            <BurnBar percent={line.utilisation_percent} status={line.status} />
                            <View style={styles.lineAmountRow}>
                                <Text style={styles.lineAmountLabel}>
                                    {formatCurrency(line.spent_zmw)} spent
                                </Text>
                                <Text style={[styles.lineAmountLabel, { color: getStatusColor(line.status) }]}>
                                    {formatCurrency(line.remaining_zmw)} left
                                </Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.reportCard}>
                <ExportRow onExport={handleExport} />
            </View>
        </View>
    );
}