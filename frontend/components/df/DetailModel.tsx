import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BUDGET_LINES, EXCHANGE_RATE } from "../../data/mockData";

type Transaction = {
    id: string;
    local_id: string;
    df_user_id: string;
    df_name: string;
    budget_id: string;
    budget_name: string;
    project_code: string;
    date: string;
    amount_zmw: number;
    amount_usd: number;
    category: string;
    route_type: string;
    transaction_status: string;
    review_status: string;
    description: string;
    document_url: string | null;
    correction_comment?: string;
};

interface DetailModalProps {
    txn: Transaction;
    onClose: () => void;
    onResubmit: () => void;
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string; icon: string }> = {
    PENDING:           { label: "Pending",    bg: "#FEF3C7", color: "#92400E", icon: "time-outline" },
    FINANCE_APPROVED:  { label: "Partial",    bg: "#DBEAFE", color: "#1E40AF", icon: "checkmark-outline" },
    FULLY_APPROVED:    { label: "Approved",   bg: "#D1FAE5", color: "#065F46", icon: "checkmark-circle-outline" },
    NEEDS_CORRECTION:  { label: "Correction", bg: "#FEE2E2", color: "#991B1B", icon: "alert-circle-outline" },
    REJECTED:          { label: "Rejected",   bg: "#FEE2E2", color: "#991B1B", icon: "close-circle-outline" },
};

function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const DetailRow = ({
    label,
    value,
    valueColor,
}: {
    label: string;
    value: string;
    valueColor?: string;
}) => (
    <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={[styles.detailValue, valueColor ? { color: valueColor } : {}]}>
            {value}
        </Text>
    </View>
);

export function DetailModal({ txn, onClose, onResubmit }: DetailModalProps) {
    const budget = BUDGET_LINES.find((b) => b.id === txn.budget_id);
    const cfg =
        STATUS_CONFIG[txn.review_status] ?? {
            label: txn.review_status,
            bg: "#F3F4F6",
            color: "#374151",
            icon: "ellipse-outline",
        };

    return (
        <Modal
            visible
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                    <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
                        <Ionicons name="close" size={20} color="#6B7280" />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Expense Detail</Text>
                    <View
                        style={[
                            styles.modalStatusBadge,
                            { backgroundColor: cfg.bg },
                        ]}
                    >
                        <Text
                            style={[
                                styles.modalStatusText,
                                { color: cfg.color },
                            ]}
                        >
                            {cfg.label}
                        </Text>
                    </View>
                </View>

                <ScrollView
                    style={styles.modalScroll}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Correction Alert */}
                    {"correction_comment" in txn &&
                        txn.correction_comment && (
                            <View style={styles.correctionBox}>
                                <View
                                    style={styles.correctionBoxHeader}
                                >
                                    <Ionicons
                                        name="alert-circle"
                                        size={16}
                                        color="#991B1B"
                                    />
                                    <Text
                                        style={
                                            styles.correctionBoxTitle
                                        }
                                    >
                                        Correction Required
                                    </Text>
                                </View>
                                <Text
                                    style={
                                        styles.correctionBoxText
                                    }
                                >
                                    {txn.correction_comment}
                                </Text>
                            </View>
                        )}

                    {/* Amount Card */}
                    <View style={styles.amountCard}>
                        <Text style={styles.amountCardLabel}>
                            Amount Spent
                        </Text>
                        <Text style={styles.amountCardZMW}>
                            K{txn.amount_zmw.toLocaleString()}
                        </Text>
                        <Text style={styles.amountCardUSD}>
                            ${txn.amount_usd.toFixed(2)} USD · Rate: 1 USD ={" "}
                            {EXCHANGE_RATE.zmw_to_usd} ZMW
                        </Text>
                    </View>

                    {/* Details */}
                    <View style={styles.detailCard}>
                        <Text style={styles.detailCardTitle}>
                            Entry Details
                        </Text>
                        <DetailRow
                            label="Date"
                            value={formatDate(txn.date)}
                        />
                        <View style={styles.detailDivider} />
                        <DetailRow
                            label="Description"
                            value={txn.description}
                        />
                        <View style={styles.detailDivider} />
                        <DetailRow
                            label="Budget Line"
                            value={txn.budget_name}
                        />
                        <View style={styles.detailDivider} />
                        <DetailRow
                            label="Project"
                            value={txn.project_code}
                        />
                        <View style={styles.detailDivider} />
                        <DetailRow
                            label="Category"
                            value={
                                txn.category === "ADMIN"
                                    ? "Admin"
                                    : "Activity / Program"
                            }
                        />
                        <View style={styles.detailDivider} />
                        <DetailRow
                            label="Payment Status"
                            value={
                                txn.transaction_status ===
                                "REQUEST_RAISED"
                                    ? "Request Raised"
                                    : txn.transaction_status ===
                                      "PAYMENT_PENDING"
                                    ? "Payment Pending"
                                    : "Paid"
                            }
                        />
                        <View style={styles.detailDivider} />
                        <DetailRow
                            label="Routed To"
                            value={
                                txn.route_type === "FINANCE_AND_DME"
                                    ? "Finance & DME"
                                    : "Finance only"
                            }
                            valueColor="#1E40AF"
                        />
                        <View style={styles.detailDivider} />
                        <DetailRow
                            label="Reference"
                            value={txn.local_id}
                        />
                    </View>

                    {/* Budget Context */}
                    {budget && (
                        <View style={styles.detailCard}>
                            <Text style={styles.detailCardTitle}>
                                Budget Context
                            </Text>
                            <DetailRow
                                label="Line Item"
                                value={budget.line_item_name}
                            />
                            <View style={styles.detailDivider} />
                            <DetailRow
                                label="TCode"
                                value={budget.tcode}
                            />
                            <View style={styles.detailDivider} />
                            <DetailRow
                                label="Remaining After"
                                value={`K${(
                                    budget.remaining_zmw -
                                    txn.amount_zmw
                                ).toLocaleString()}`}
                                valueColor={
                                    budget.remaining_zmw -
                                        txn.amount_zmw <
                                    0
                                        ? "#EF4444"
                                        : "#10B981"
                                }
                            />
                            <View style={styles.detailDivider} />
                            <DetailRow
                                label="Utilisation"
                                value={`${budget.utilisation_percent}%`}
                            />
                        </View>
                    )}

                    {/* Supporting Document */}
                    <View style={styles.detailCard}>
                        <Text style={styles.detailCardTitle}>
                            Supporting Document
                        </Text>
                        {txn.document_url ? (
                            <TouchableOpacity
                                style={styles.docButton}
                            >
                                <Ionicons
                                    name="document-outline"
                                    size={16}
                                    color="#1E40AF"
                                />
                                <Text
                                    style={styles.docButtonText}
                                >
                                    View Attachment
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.noDoc}>
                                <Ionicons
                                    name="document-outline"
                                    size={16}
                                    color="#9CA3AF"
                                />
                                <Text style={styles.noDocText}>
                                    No document attached
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={{ height: 32 }} />
                </ScrollView>

                {/* Footer Actions */}
                {txn.review_status === "NEEDS_CORRECTION" && (
                    <View style={styles.modalFooter}>
                        <TouchableOpacity
                            style={styles.resubmitBtn}
                            onPress={onResubmit}
                        >
                            <Ionicons
                                name="refresh-outline"
                                size={18}
                                color="#FFFFFF"
                            />
                            <Text style={styles.resubmitBtnText}>
                                Edit & Resubmit
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        paddingVertical: 14,
        paddingTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
        gap: 12,
    },
    modalCloseBtn: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "#F3F4F6",
        justifyContent: "center",
        alignItems: "center",
    },
    modalTitle: {
        flex: 1,
        fontSize: 17,
        fontWeight: "700",
        color: "#111827",
    },
    modalStatusBadge: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    modalStatusText: {
        fontSize: 12,
        fontWeight: "700",
    },
    modalScroll: {
        flex: 1,
        padding: 16,
    },
    correctionBox: {
        backgroundColor: "#FEE2E2",
        borderRadius: 12,
        padding: 14,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#FECACA",
    },
    correctionBoxHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 6,
    },
    correctionBoxTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#991B1B",
    },
    correctionBoxText: {
        fontSize: 13,
        color: "#7F1D1D",
        lineHeight: 18,
    },
    amountCard: {
        backgroundColor: "#111827",
        borderRadius: 14,
        padding: 20,
        marginBottom: 14,
        alignItems: "center",
    },
    amountCardLabel: {
        fontSize: 11,
        color: "#9CA3AF",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 6,
    },
    amountCardZMW: {
        fontSize: 32,
        fontWeight: "800",
        color: "#FFFFFF",
        marginBottom: 4,
    },
    amountCardUSD: {
        fontSize: 12,
        color: "#6B7280",
    },
    detailCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    },
    detailCardTitle: {
        fontSize: 11,
        fontWeight: "700",
        color: "#9CA3AF",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 12,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingVertical: 4,
        gap: 16,
    },
    detailLabel: {
        fontSize: 13,
        color: "#6B7280",
        flex: 1,
    },
    detailValue: {
        fontSize: 13,
        fontWeight: "600",
        color: "#111827",
        flex: 2,
        textAlign: "right",
    },
    detailDivider: {
        height: 1,
        backgroundColor: "#F9FAFB",
        marginVertical: 2,
    },
    docButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        padding: 12,
        backgroundColor: "#DBEAFE",
        borderRadius: 10,
    },
    docButtonText: {
        fontSize: 13,
        color: "#1E40AF",
        fontWeight: "600",
    },
    noDoc: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        padding: 12,
        backgroundColor: "#F9FAFB",
        borderRadius: 10,
    },
    noDocText: {
        fontSize: 13,
        color: "#9CA3AF",
    },
    modalFooter: {
        padding: 16,
        paddingBottom: 32,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
    },
    resubmitBtn: {
        backgroundColor: "#E8461A",
        borderRadius: 14,
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        shadowColor: "#E8461A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    resubmitBtnText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});
