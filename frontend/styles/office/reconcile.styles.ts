import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const summaryStyles = StyleSheet.create({
    chip: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 12,
        borderRadius: 12,
    },
    chipValue: {
        fontSize: 22,
        fontWeight: "800",
        letterSpacing: -0.5,
    },
    chipLabel: {
        fontSize: 10,
        fontWeight: "600",
        marginTop: 2,
        textAlign: "center",
    },
});

export const modalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    sheet: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: "#E5E7EB",
        borderRadius: 2,
        alignSelf: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 4,
    },
    sub: {
        fontSize: 13,
        color: "#6B7280",
        marginBottom: 16,
    },
    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        padding: 10,
        borderRadius: 10,
        marginBottom: 16,
    },
    statusText: {
        fontSize: 13,
        fontWeight: "600",
    },
    compareRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 20,
    },
    compareBox: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        borderRadius: 10,
        padding: 12,
        alignItems: "center",
    },
    compareLabel: {
        fontSize: 11,
        color: "#9CA3AF",
        fontWeight: "600",
        marginBottom: 4,
    },
    compareValue: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0F172A",
    },
    fieldLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 8,
    },
    textArea: {
        backgroundColor: "#F8FAFC",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        padding: 12,
        fontSize: 14,
        color: "#0F172A",
        minHeight: 100,
        marginBottom: 20,
    },
    actions: {
        flexDirection: "row",
        gap: 12,
    },
    cancelBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
    },
    cancelText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#6B7280",
    },
    submitBtn: {
        flex: 2,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: "#6366F1",
        alignItems: "center",
    },
    submitText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#FFFFFF",
    },
});

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F1F5F9",
    },

    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        paddingTop: 56,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#F8FAFC",
        letterSpacing: -0.5,
    },
    headerSub: {
        fontSize: 12,
        color: COLORS.bgPrimary,
        marginTop: 2,
    },
    importBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#6366F1",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
    },
    importBtnText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    // Alert banner
    alertBanner: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#FEF3C7",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#FDE68A",
    },
    alertText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#92400E",
    },

    // Summary section
    summarySection: {
        padding: 16,
        gap: 12,
    },
    matchRateCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#0F172A",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    matchRateLabel: {
        fontSize: 12,
        color: "#6B7280",
        fontWeight: "500",
    },
    matchRateValue: {
        fontSize: 40,
        fontWeight: "800",
        letterSpacing: -1,
        marginTop: 2,
    },
    matchRateSub: {
        fontSize: 12,
        color: "#9CA3AF",
        marginBottom: 14,
    },
    matchBarWrap: {
        gap: 6,
    },
    matchBarTrack: {
        height: 5,
        backgroundColor: "#F1F5F9",
        borderRadius: 3,
        overflow: "hidden",
    },
    matchBarFill: {
        height: "100%",
        borderRadius: 3,
    },
    chipsRow: {
        flexDirection: "row",
        gap: 8,
    },

    // Filter tabs
    filterRow: {
        paddingHorizontal: 16,
        paddingBottom: 12,
        gap: 8,
    },
    filterTab: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    filterTabActive: {
        backgroundColor: "#6366F1",
        borderColor: "#6366F1",
    },
    filterTabText: {
        fontSize: 12,
        color: "#6B7280",
        fontWeight: "500",
    },
    filterTabTextActive: {
        color: "#FFFFFF",
        fontWeight: "700",
    },
    filterBadge: {
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 6,
    },
    filterBadgeText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#6B7280",
    },

    // List
    listSection: {
        paddingHorizontal: 16,
        gap: 10,
    },

    // Record card
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 10,
        shadowColor: "#0F172A",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
    cardHighlighted: {
        borderLeftWidth: 3,
        borderLeftColor: "#F59E0B",
    },
    cardTop: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    cardDesc: {
        fontSize: 14,
        fontWeight: "600",
        color: "#0F172A",
    },
    cardMeta: {
        fontSize: 11,
        color: "#9CA3AF",
        marginTop: 2,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusBadgeText: {
        fontSize: 10,
        fontWeight: "700",
    },

    // Amount comparison
    amountRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        backgroundColor: "#F8FAFC",
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
    },
    amountBox: {
        flex: 1,
    },
    amountBoxLabel: {
        fontSize: 10,
        color: "#9CA3AF",
        fontWeight: "600",
        marginBottom: 2,
    },
    amountBoxValue: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0F172A",
    },
    amountBoxRef: {
        fontSize: 10,
        color: "#9CA3AF",
        marginTop: 2,
    },
    amountArrow: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 1,
    },

    // Discrepancy
    discrepancyRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#FFFBEB",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        marginBottom: 10,
    },
    discrepancyText: {
        fontSize: 12,
        color: "#92400E",
    },

    // Resolved
    resolvedBanner: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#D1FAE5",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        marginBottom: 4,
    },
    resolvedText: {
        fontSize: 11,
        color: "#065F46",
        fontWeight: "500",
    },

    // Resolve button
    resolveBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: "#EDE9FE",
        marginTop: 4,
    },
    resolveBtnText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#5B21B6",
    },

    // Empty state
    emptyState: {
        alignItems: "center",
        paddingVertical: 48,
        gap: 8,
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0F172A",
    },
    emptySub: {
        fontSize: 13,
        color: "#9CA3AF",
    },
});
