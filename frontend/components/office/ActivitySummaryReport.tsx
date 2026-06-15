import { Alert, Text, View } from "react-native";
import { TRANSACTIONS, EXCHANGE_RATE } from "../../data/mockData";
import { getTransactionStatusColor, formatCurrency, formatUSD } from "./../../utils/office/reportHelpers";
import { SectionHeader } from "./SectionHeader";
import { MetricRow } from "./MetricRow";
import { ExportRow, } from "./ExportRow";
import {  Transaction } from "../../shared/types";
import { styles } from "./../../styles/office/reports";
import { EXPORT_MSG, type ReportPeriod } from "../../constants/office/reportConstants";

export function ActivitySummaryReport({ period }: { period: ReportPeriod }) {
    const handleExport = (format: "PDF" | "EXCEL") => {
        Alert.alert(`Export as ${format}`, EXPORT_MSG);
    };

    const approvedTxns = TRANSACTIONS.filter(
        (t) =>
            t.review_status === "FULLY_APPROVED" || t.review_status === "FINANCE_APPROVED"
    ) as Transaction[];
    const pendingTxns = TRANSACTIONS.filter((t) => t.review_status === "PENDING") as Transaction[];
    const correctionTxns = TRANSACTIONS.filter(
        (t) => t.review_status === "NEEDS_CORRECTION"
    ) as Transaction[];

    const totalApprovedZMW = approvedTxns.reduce((s, t) => s + t.amount_zmw, 0);

    return (
        <View>
            <View style={styles.reportCard}>
                <SectionHeader title="Activity Summary" sub="All transactions this period" />
                <View style={styles.summaryGrid}>
                    <View style={[styles.summaryGridItem, { borderRightWidth: 1, borderRightColor: "#E5E7EB" }]}>
                        <Text style={[styles.summaryGridValue, { color: "#10B981" }]}>
                            {approvedTxns.length}
                        </Text>
                        <Text style={styles.summaryGridLabel}>Approved</Text>
                    </View>
                    <View style={[styles.summaryGridItem, { borderRightWidth: 1, borderRightColor: "#E5E7EB" }]}>
                        <Text style={[styles.summaryGridValue, { color: "#F59E0B" }]}>
                            {pendingTxns.length}
                        </Text>
                        <Text style={styles.summaryGridLabel}>Pending</Text>
                    </View>
                    <View style={styles.summaryGridItem}>
                        <Text style={[styles.summaryGridValue, { color: "#EF4444" }]}>
                            {correctionTxns.length}
                        </Text>
                        <Text style={styles.summaryGridLabel}>Corrections</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <MetricRow
                    label="Total Approved Spend"
                    value={formatCurrency(totalApprovedZMW)}
                    sub={formatUSD(totalApprovedZMW, EXCHANGE_RATE.zmw_to_usd)}
                    color="#10B981"
                />
            </View>

            <View style={styles.reportCard}>
                <SectionHeader title="Transaction Log" />
                {TRANSACTIONS.map((txn, i) => {
                    const statusColor = getTransactionStatusColor(txn.review_status);

                    return (
                        <View key={txn.id}>
                            {i > 0 && <View style={styles.divider} />}
                            <View style={styles.txnRow}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.txnDesc} numberOfLines={1}>
                                        {txn.description}
                                    </Text>
                                    <Text style={styles.txnMeta}>
                                        {txn.df_name} · {txn.date} · {txn.category}
                                    </Text>
                                </View>
                                <View style={{ alignItems: "flex-end" }}>
                                    <Text style={[styles.txnAmount]}>
                                        {formatCurrency(txn.amount_zmw)}
                                    </Text>
                                    <Text style={[styles.txnStatus, { color: statusColor }]}>
                                        {txn.review_status.replace("_", " ")}
                                    </Text>
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