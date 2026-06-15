import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Platform,
    useWindowDimensions,
    ActivityIndicator
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FormLabel, FormSelect, BottomSheet } from "../../components/ui";
import { budgetAPI, transactionAPI, BudgetLine, ExchangeRate } from "../../Service/api";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from "../../theme";

type Category = "ADMIN" | "ACTIVITY" | "";
type TransactionStatus = "REQUEST_RAISED" | "PAYMENT_PENDING" | "PAID" | "";

export default function ExpenseScreen() {
    const { width } = useWindowDimensions();
    const router = useRouter();
    const isMobile = width < 480;

    // Form state
    const [budgetId, setBudgetId] = useState("");
    const [category, setCategory] = useState<Category>("");
    const [txnStatus, setTxnStatus] = useState<TransactionStatus>("");
    const [amountZMW, setAmountZMW] = useState("");
    const [description, setDescription] = useState("");
    const [date] = useState(() => {
        const d = new Date();
        return d.toISOString().split("T")[0];
    });

    // Sheet visibility
    const [showBudgetSheet, setShowBudgetSheet] = useState(false);
    const [showCategorySheet, setShowCategorySheet] = useState(false);
    const [showStatusSheet, setShowStatusSheet] = useState(false);

    const [budgetLines, setBudgetLines] = useState<BudgetLine[]>([]);
    const [exchangeRate, setExchangeRate] = useState<ExchangeRate>({ zmw_to_usd: 19.54, month: 4, year: 2026, source: "MANUAL"});
    const [loadingBudgets, setLoadingBudget] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        budgetAPI.getMyBudgets()
        .then((data) => {
            setBudgetLines(data.budget_lines);
            setExchangeRate(data.exchange_rate);
        })
        .catch(() => {
            Alert.alert("Connection Error", "Could not load budgets. Check your connection.");
        })
        .finally(() => setLoadingBudget(false));
    }, []);

    // Derived values
    const selectedBudget = budgetLines.find((b) => b.id === budgetId) ?? null;
    const numericAmount = parseFloat(amountZMW) || 0;
    const amountUSD = numericAmount > 0 ? numericAmount / exchangeRate.zmw_to_usd : 0;
    const wouldOverspend =
        selectedBudget !== null && numericAmount > selectedBudget.remaining_zmw;

    // Route label derived from category
    const routeLabel =
        category === "ADMIN"
            ? "Finance only"
            : category === "ACTIVITY"
            ? "Finance & DME"
            : null;

    // Validation
    function validateAndSubmit() {
        const errors: string[] = [];
        if (!budgetId) errors.push("Please select a budget line.");
        if (!category) errors.push("Please select an expense category.");
        if (!txnStatus) errors.push("Please select a payment status.");
        if (!amountZMW || numericAmount <= 0) errors.push("Please enter a valid amount.");
        if (!description.trim()) errors.push("Please enter a description.");

        if (errors.length > 0) {
            Alert.alert("Missing Information", errors[0]);
            return;
        }

        if (wouldOverspend) {
            Alert.alert(
                "Over Budget Warning",
                `This expense of K${numericAmount.toLocaleString()} exceeds the remaining balance of K${selectedBudget?.remaining_zmw.toLocaleString()} on this budget line.\n\nDo you want to submit it anyway?`,
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Submit Anyway", style: "destructive", onPress: doSubmit },
                ]
            );
            return;
        }

        doSubmit();
    }

    async function doSubmit() {
        setSubmitting(true);
        try {
            const result = await transactionAPI.submit({
                budget_id:          budgetId,
                date,
                amount_zmw:         numericAmount,
                category:           category as "ADMIN" | "ACTIVITY",
                transaction_status: txnStatus as "REQUEST_RAISED" | "PAYMENT_PENDING" | "PAID",
                description:        description.trim(),
            });

            Alert.alert(
                "Expense Submitted",
                `K${numericAmount.toLocaleString()} logged and routed to ${
                    result.route_type === "FINANCE_AND_DME" ? "Finance & DME" : "Finance"
                } for review.\n\nRef: ${result.id.slice(0, 8).toUpperCase()}`,
                [{ text: "OK", onPress: () => router.back() }]
            );
        } catch(err: any) {
             Alert.alert("Submission Failed", err.message || "Please try again.")
        } finally {
            setSubmitting(false);
        }
    }

    // Option datasets
    const budgetOptions = budgetLines.map((b) => ({
        label: b.line_item_name,
        value: b.id,
        sub: `${b.tcode} · K${b.remaining_zmw.toLocaleString()} remaining`,
    }));

    const categoryOptions = [
        {
            label: "Admin",
            value: "ADMIN",
            sub: "Office, administrative, and overhead costs → routed to Finance",
        },
        {
            label: "Activity / Program",
            value: "ACTIVITY",
            sub: "Field program activities and direct costs → routed to Finance & DME",
        },
    ];

    const statusOptions = [
        { label: "Request Raised", value: "REQUEST_RAISED", sub: "Request submitted, payment not yet made" },
        { label: "Payment Pending", value: "PAYMENT_PENDING", sub: "Approved but awaiting disbursement" },
        { label: "Paid", value: "PAID", sub: "Payment has been made" },
    ];

    if (loadingBudgets) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Loading budgets...</Text>
            </View>
        );
    }

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={20} color={COLORS.textInverse} />
                        </TouchableOpacity>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerTitle}>Log Expense</Text>
                            <Text style={styles.headerSub}>Today · {date}</Text>
                        </View>
                        <View style={styles.rateChip}>
                            <Ionicons name="swap-horizontal-outline" size={11} color={COLORS.warningLight || "#FEE2E2"} />
                            <Text style={styles.rateChipText}>
                                1 USD = {exchangeRate.zmw_to_usd} ZMW
                            </Text>
                        </View>
                    </View>

                    {/* Form Card */}
                    <View style={styles.formCard}>
                        {/* Budget Line */}
                        <View style={styles.field}>
                            <FormLabel label="Budget Line" required />
                            <FormSelect
                                value={selectedBudget?.line_item_name ?? ""}
                                placeholder="Select a budget line..."
                                onPress={() => setShowBudgetSheet(true)}
                                icon="wallet-outline"
                            />
                            {selectedBudget && (
                                <View style={styles.budgetMeta}>
                                    <View style={styles.budgetMetaChip}>
                                        <Text style={styles.budgetMetaChipText}>{selectedBudget.tcode}</Text>
                                    </View>
                                    <Text style={styles.budgetMetaText}>
                                        K{selectedBudget.remaining_zmw.toLocaleString()} remaining
                                    </Text>
                                    <View
                                        style={[
                                            styles.statusDot,
                                            {
                                                backgroundColor:
                                                    selectedBudget.status === "GREEN"
                                                        ? COLORS.success || "#10B981"
                                                        : selectedBudget.status === "ORANGE"
                                                        ? COLORS.warning || "#F59E0B"
                                                        : COLORS.error || "#EF4444",
                                            },
                                        ]}
                                    />
                                </View>
                            )}
                        </View>

                        <View style={styles.divider} />

                        {/* Category */}
                        <View style={styles.field}>
                            <FormLabel
                                label="Expense Category"
                                required
                                hint="This determines which team reviews your entry."
                            />
                            <FormSelect
                                value={
                                    category === "ADMIN"
                                        ? "Admin"
                                        : category === "ACTIVITY"
                                        ? "Activity / Program"
                                        : ""
                                }
                                placeholder="Select category..."
                                onPress={() => setShowCategorySheet(true)}
                                icon="grid-outline"
                            />
                            {category !== "" && (
                                <View style={styles.routeTag}>
                                    <Ionicons name="git-branch-outline" size={12} color={COLORS.info || "#1E40AF"} />
                                    <Text style={styles.routeTagText}>
                                        Will be routed to: {routeLabel}
                                    </Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.divider} />

                        {/* Amount */}
                        <View style={styles.field}>
                            <FormLabel label="Amount (ZMW)" required />
                            <View style={styles.amountRow}>
                                <View style={styles.amountPrefix}>
                                    <Text style={styles.amountPrefixText}>K</Text>
                                </View>
                                <TextInput
                                    style={[
                                        styles.amountInput,
                                        wouldOverspend && styles.amountInputDanger,
                                    ]}
                                    placeholder="0.00"
                                    placeholderTextColor={COLORS.textTertiary}
                                    keyboardType="decimal-pad"
                                    value={amountZMW}
                                    onChangeText={(t) => {
                                        if (/^\d*\.?\d{0,2}$/.test(t)) setAmountZMW(t);
                                    }}
                                />
                            </View>

                            {numericAmount > 0 && (
                                <View style={styles.usdPreview}>
                                    <Ionicons name="information-circle-outline" size={13} color={COLORS.textSecondary} />
                                    <Text style={styles.usdPreviewText}>
                                        ≈ ${amountUSD.toFixed(2)} USD at {exchangeRate.zmw_to_usd} ZMW/USD
                                    </Text>
                                </View>
                            )}

                            {wouldOverspend && (
                                <View style={styles.overspendWarning}>
                                    <Ionicons name="warning" size={14} color={COLORS.error || "#991B1B"} />
                                    <Text style={styles.overspendWarningText}>
                                        This exceeds the remaining budget of{" "}
                                        K{selectedBudget?.remaining_zmw.toLocaleString()} on this line.
                                    </Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.divider} />

                        {/* Payment Status */}
                        <View style={styles.field}>
                            <FormLabel label="Payment Status" required />
                            <FormSelect
                                value={
                                    txnStatus === "REQUEST_RAISED"
                                        ? "Request Raised"
                                        : txnStatus === "PAYMENT_PENDING"
                                        ? "Payment Pending"
                                        : txnStatus === "PAID"
                                        ? "Paid"
                                        : ""
                                }
                                placeholder="Select status..."
                                onPress={() => setShowStatusSheet(true)}
                                icon="card-outline"
                            />
                        </View>

                        <View style={styles.divider} />

                        {/* Description */}
                        <View style={styles.field}>
                            <FormLabel label="Description / Notes" required />
                            <TextInput
                                style={styles.textArea}
                                placeholder="Describe the purpose of this expense (e.g. Transport to Chibombo community meeting)"
                                placeholderTextColor={COLORS.textTertiary}
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                                value={description}
                                onChangeText={setDescription}
                                maxLength={500}
                            />
                            <Text style={styles.charCount}>{description.length}/500</Text>
                        </View>

                        <View style={styles.divider} />

                        {/* Supporting Document */}
                        <View style={styles.field}>
                            <FormLabel
                                label="Supporting Document"
                                hint="Optional — attach a receipt, photo, or evidence document."
                            />
                            <TouchableOpacity
                                style={styles.attachButton}
                                onPress={() =>
                                    Alert.alert(
                                        "Attach Document",
                                        "Camera and file picker will be available in the production build."
                                    )
                                }
                                activeOpacity={0.7}
                            >
                                <Ionicons name="attach-outline" size={18} color={COLORS.textSecondary} />
                                <Text style={styles.attachButtonText}>Tap to attach a file or photo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Submission Summary */}
                    {budgetId && category && numericAmount > 0 && txnStatus && description.trim() && (
                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryCardTitle}>Ready to Submit</Text>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryKey}>Amount</Text>
                                <Text style={styles.summaryVal}>
                                    K{numericAmount.toLocaleString()} (${amountUSD.toFixed(2)} USD)
                                </Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryKey}>Budget Line</Text>
                                <Text style={[styles.summaryVal, { maxWidth: isMobile ? "50%" : "60%" }]} numberOfLines={1}>
                                    {selectedBudget?.line_item_name}
                                </Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryKey}>Routes to</Text>
                                <Text style={[styles.summaryVal, { color: COLORS.info || "#1E40AF" }]}>{routeLabel}</Text>
                            </View>
                        </View>
                    )}

                    {/* Submit Button */}
                    <View style={styles.submitSection}>
                        <TouchableOpacity
                            style={[styles.submitBtn, wouldOverspend && styles.submitBtnDanger]}
                            onPress={validateAndSubmit}
                            activeOpacity={0.85}
                        >
                            <Ionicons
                                name={wouldOverspend ? "warning-outline" : "checkmark-circle-outline"}
                                size={20}
                                color={COLORS.textInverse}
                            />
                            <Text style={styles.submitBtnText}>
                                {wouldOverspend ? "Submit (Over Budget)" : "Submit Expense"}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.submitNote}>
                            Your entry will be saved locally and synced when you're online.
                        </Text>
                    </View>

                    <View style={{ height: SPACING["2xl"] }} />
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Bottom Sheets */}
            {showBudgetSheet && (
                <BottomSheet
                    title="Select Budget Line"
                    isVisible={showBudgetSheet}
                    options={budgetOptions}
                    selected={budgetId}
                    onSelect={setBudgetId}
                    onClose={() => setShowBudgetSheet(false)}
                />
            )}
            {showCategorySheet && (
                <BottomSheet
                    title="Expense Category"
                    isVisible={showCategorySheet}
                    options={categoryOptions}
                    selected={category}
                    onSelect={(v) => setCategory(v as Category)}
                    onClose={() => setShowCategorySheet(false)}
                />
            )}
            {showStatusSheet && (
                <BottomSheet
                    title="Payment Status"
                    isVisible={showStatusSheet}
                    options={statusOptions}
                    selected={txnStatus}
                    onSelect={(v) => setTxnStatus(v as TransactionStatus)}
                    onClose={() => setShowStatusSheet(false)}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgSecondary,
    },

    loadingContainer: {
        flex: 1,
        backgroundColor: COLORS.bgSecondary,
        alignItems: "center",
        justifyContent: "center",
        gap: SPACING.md,
    },
    loadingText: {
        color: COLORS.textSecondary,
        fontSize: TYPOGRAPHY.sm,
    },

    // Header
    header: {
        backgroundColor: COLORS.primary,
        paddingTop: SPACING["3xl"],
        paddingBottom: SPACING.lg,
        paddingHorizontal: SPACING.lg,
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.md,
    },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(255,255,255,0.2)",
        justifyContent: "center",
        alignItems: "center",
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: TYPOGRAPHY.xl,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textInverse,
    },
    headerSub: {
        fontSize: TYPOGRAPHY.xs,
        color: "rgba(255,255,255,0.7)",
        marginTop: SPACING.xs,
    },
    rateChip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: RADIUS.full,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        gap: SPACING.xs,
    },
    rateChipText: {
        fontSize: TYPOGRAPHY.xs,
        color: "rgba(255,255,255,0.8)",
        fontWeight: TYPOGRAPHY.semibold,
    },

    // Form card
    formCard: {
        backgroundColor: COLORS.bgPrimary,
        marginHorizontal: SPACING.md,
        borderRadius: RADIUS.lg,
        padding: SPACING.lg,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    field: {
        paddingVertical: SPACING.xs,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.borderLight,
        marginVertical: SPACING.lg,
    },

    // Budget meta
    budgetMeta: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: SPACING.sm,
        gap: SPACING.sm,
    },
    budgetMetaChip: {
        backgroundColor: COLORS.bgTertiary,
        borderRadius: RADIUS.sm,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
    },
    budgetMetaChipText: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textPrimary,
        fontWeight: TYPOGRAPHY.semibold,
    },
    budgetMetaText: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textSecondary,
        flex: 1,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },

    // Route tag
    routeTag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.infoLight || "#DBEAFE",
        borderRadius: RADIUS.base,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.sm,
        marginTop: SPACING.sm,
        gap: SPACING.sm,
    },
    routeTagText: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.info || "#1E40AF",
        fontWeight: TYPOGRAPHY.semibold,
    },

    // Amount input
    amountRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    amountPrefix: {
        backgroundColor: COLORS.bgTertiary,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        borderRightWidth: 0,
        borderTopLeftRadius: RADIUS.lg,
        borderBottomLeftRadius: RADIUS.lg,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        justifyContent: "center",
    },
    amountPrefixText: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
    },
    amountInput: {
        flex: 1,
        backgroundColor: COLORS.bgTertiary,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        borderTopRightRadius: RADIUS.lg,
        borderBottomRightRadius: RADIUS.lg,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        fontSize: TYPOGRAPHY["2xl"],
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
    },
    amountInputDanger: {
        borderColor: COLORS.error || "#EF4444",
        backgroundColor: COLORS.errorLight || "#FFF5F5",
    },

    // USD preview
    usdPreview: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.sm,
        marginTop: SPACING.sm,
    },
    usdPreviewText: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textSecondary,
    },

    // Overspend warning
    overspendWarning: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: COLORS.errorLight || "#FEE2E2",
        borderRadius: RADIUS.base,
        padding: SPACING.sm,
        marginTop: SPACING.md,
        gap: SPACING.sm,
    },
    overspendWarningText: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.error || "#991B1B",
        flex: 1,
        lineHeight: TYPOGRAPHY.base,
    },

    // Text area
    textArea: {
        backgroundColor: COLORS.bgTertiary,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        padding: SPACING.md,
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textPrimary,
        minHeight: 100,
        lineHeight: TYPOGRAPHY.base * 1.4,
    },
    charCount: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textTertiary,
        textAlign: "right",
        marginTop: SPACING.xs,
    },

    // Attach button
    attachButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.bgSecondary,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        borderStyle: "dashed",
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.md,
        gap: SPACING.md,
        justifyContent: "center",
    },
    attachButtonText: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textSecondary,
    },

    // Summary card
    summaryCard: {
        backgroundColor: COLORS.bgPrimary,
        marginHorizontal: SPACING.md,
        marginBottom: SPACING.sm,
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    summaryCardTitle: {
        fontSize: TYPOGRAPHY.xs,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.success || "#10B981",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: SPACING.sm,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: SPACING.xs,
    },
    summaryKey: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textSecondary,
        fontWeight: TYPOGRAPHY.medium,
    },
    summaryVal: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textPrimary,
        fontWeight: TYPOGRAPHY.bold,
        maxWidth: "60%",
        textAlign: "right",
    },

    // Submit
    submitSection: {
        paddingHorizontal: SPACING.md,
        paddingTop: SPACING.md,
    },
    submitBtn: {
        backgroundColor: COLORS.primary,
        borderRadius: RADIUS.lg,
        paddingVertical: SPACING.lg,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: SPACING.sm,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    submitBtnDanger: {
        backgroundColor: COLORS.error || "#DC2626",
        shadowColor: COLORS.error || "#DC2626",
    },
    submitBtnText: {
        color: COLORS.textInverse,
        fontSize: TYPOGRAPHY.lg,
        fontWeight: TYPOGRAPHY.bold,
    },
    submitNote: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textTertiary,
        textAlign: "center",
        marginTop: SPACING.sm,
        lineHeight: TYPOGRAPHY.base,
    },
});