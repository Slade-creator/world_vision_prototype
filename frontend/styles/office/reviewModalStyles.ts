import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#111827",
    },
    headerSub: {
        fontSize: 12,
        color: "#9CA3AF",
        marginTop: 2,
    },
    closeBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "#F3F4F6",
        justifyContent: "center",
        alignItems: "center",
    },
    scroll: {
        flex: 1,
    },

    // Status banner
    section: {
        paddingHorizontal: 20,
        paddingTop: 18,
    },
    statusBanner: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        gap: 8,
    },
    statusBannerText: {
        fontSize: 14,
        fontWeight: "700",
    },

    // Field
    fieldLabel: {
        fontSize: 11,
        fontWeight: "700",
        color: "#9CA3AF",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 6,
    },
    fieldValue: {
        fontSize: 15,
        color: "#111827",
        fontWeight: "500",
        lineHeight: 22,
    },

    // Amounts
    amountRow: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 18,
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
        overflow: "hidden",
    },
    amountBox: {
        flex: 1,
        padding: 16,
    },
    amountLabel: {
        fontSize: 11,
        color: "#9CA3AF",
        fontWeight: "600",
        marginBottom: 4,
    },
    amountValue: {
        fontSize: 20,
        fontWeight: "800",
        color: "#111827",
    },

    // Details
    sectionTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#9CA3AF",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 10,
    },
    detailGrid: {
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
        padding: 4,
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    detailLabel: {
        fontSize: 11,
        color: "#9CA3AF",
        marginBottom: 2,
    },
    detailValue: {
        fontSize: 13,
        fontWeight: "600",
        color: "#111827",
    },

    // Budget context
    budgetContext: {
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
        padding: 4,
    },
    budgetContextRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    budgetContextLabel: {
        fontSize: 13,
        color: "#6B7280",
    },
    budgetContextValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#111827",
    },

    // Previous comment
    prevComment: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 8,
        backgroundColor: "#FEE2E2",
        borderRadius: 10,
        padding: 12,
    },
    prevCommentText: {
        flex: 1,
        fontSize: 13,
        color: "#991B1B",
        lineHeight: 19,
    },

    // Decision
    decisionRow: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 16,
    },
    decisionBtn: {
        flex: 1,
        alignItems: "center",
        borderRadius: 12,
        paddingVertical: 12,
        gap: 6,
        borderWidth: 2,
        borderColor: "transparent",
    },
    decisionBtnLabel: {
        fontSize: 12,
        fontWeight: "700",
    },

    // Comment
    commentBox: {
        marginBottom: 16,
    },
    commentLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#374151",
        marginBottom: 8,
    },
    commentLabelSub: {
        color: "#9CA3AF",
        fontWeight: "400",
    },
    commentInput: {
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        padding: 14,
        fontSize: 14,
        color: "#111827",
        minHeight: 90,
        textAlignVertical: "top",
        lineHeight: 20,
    },

    // Submit
    submitBtn: {
        backgroundColor: "#1E40AF",
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: "center",
    },
    submitBtnDisabled: {
        backgroundColor: "#9CA3AF",
    },
    submitBtnText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#FFFFFF",
    },
});
