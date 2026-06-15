import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },

    // ─── Header ─────────────────────────────────────────────────────────────

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundColor: "#1E3A5F",
        padding: 24,
        paddingTop: 56,
        paddingBottom: 28,
    },
    greeting: {
        fontSize: 14,
        color: "#93C5FD",
    },
    userName: {
        fontSize: 22,
        fontWeight: "800",
        color: "#FFFFFF",
        marginBottom: 6,
    },
    roleBadge: {
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 3,
        alignSelf: "flex-start",
    },
    roleText: {
        fontSize: 11,
        color: "#FFFFFF",
        fontWeight: "600",
    },
    logoutBtn: {
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginTop: 8,
    },
    logoutText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "600",
    },

    // ─── Rate Banner ────────────────────────────────────────────────────────

    rateBanner: {
        backgroundColor: "#1E40AF",
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 4,
        borderRadius: 14,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    rateLabel: {
        fontSize: 11,
        color: "#93C5FD",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    rateValue: {
        fontSize: 20,
        fontWeight: "800",
        color: "#FFFFFF",
        marginBottom: 2,
    },
    rateSource: {
        fontSize: 11,
        color: "#93C5FD",
    },
    rateIconWrap: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "rgba(255,255,255,0.1)",
        justifyContent: "center",
        alignItems: "center",
    },

    // ─── Alert Cards ────────────────────────────────────────────────────────

    alertCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FEF3C7",
        marginHorizontal: 16,
        marginTop: 10,
        borderRadius: 12,
        padding: 14,
        borderLeftWidth: 4,
        borderLeftColor: "#F59E0B",
        gap: 12,
    },
    alertCardRed: {
        backgroundColor: "#FEE2E2",
        borderLeftColor: "#EF4444",
    },
    alertBody: {
        flex: 1,
    },
    alertTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#92400E",
    },
    alertSub: {
        fontSize: 11,
        color: "#92400E",
        marginTop: 2,
    },

    // ─── Stat Grid ──────────────────────────────────────────────────────────

    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 12,
        marginTop: 16,
        gap: 8,
    },
    statCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 14,
        width: "47.5%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    statIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    statValue: {
        fontSize: 22,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#374151",
    },
    statSub: {
        fontSize: 11,
        color: "#9CA3AF",
        marginTop: 2,
    },

    // ─── Section ────────────────────────────────────────────────────────────

    section: {
        marginHorizontal: 16,
        marginTop: 24,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 12,
    },
    sectionLink: {
        fontSize: 13,
        color: "#1E40AF",
        fontWeight: "600",
    },
    cardList: {
        gap: 10,
    },

    // ─── Burn Rate Card ─────────────────────────────────────────────────────

    burnCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 18,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    burnCardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    burnCardLabel: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 2,
    },
    burnCardPercent: {
        fontSize: 28,
        fontWeight: "800",
        color: "#111827",
    },
    burnStatusChip: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        gap: 6,
    },
    burnStatusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    burnStatusText: {
        fontSize: 12,
        fontWeight: "700",
    },
    burnBarTrack: {
        height: 10,
        backgroundColor: "#F3F4F6",
        borderRadius: 5,
        overflow: "hidden",
        marginBottom: 12,
    },
    burnBarFill: {
        height: "100%",
        borderRadius: 5,
    },
    burnCardAmounts: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    burnCardAmountItem: {
        flex: 1,
        alignItems: "center",
    },
    burnCardAmountLabel: {
        fontSize: 10,
        color: "#9CA3AF",
        marginBottom: 3,
    },
    burnCardAmountValue: {
        fontSize: 13,
        fontWeight: "700",
        color: "#111827",
    },
    burnDivider: {
        height: 1,
        backgroundColor: "#F3F4F6",
        marginVertical: 14,
    },
    burnBreakdownTitle: {
        fontSize: 11,
        fontWeight: "700",
        color: "#9CA3AF",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 10,
    },
    burnLineRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
        gap: 10,
    },
    burnLineDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    burnLineName: {
        flex: 1,
        fontSize: 13,
        color: "#374151",
        fontWeight: "500",
    },
    burnLinePercent: {
        fontSize: 13,
        fontWeight: "700",
    },

    // ─── Budget Health Cards ────────────────────────────────────────────────

    budgetHealthCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    budgetHealthTop: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 10,
    },
    budgetHealthName: {
        fontSize: 14,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 4,
    },
    budgetHealthMeta: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    tcodeChip: {
        backgroundColor: "#F3F4F6",
        borderRadius: 6,
        paddingHorizontal: 7,
        paddingVertical: 2,
    },
    tcodeChipText: {
        fontSize: 11,
        color: "#374151",
        fontWeight: "600",
    },
    budgetHealthProject: {
        fontSize: 11,
        color: "#9CA3AF",
    },
    burnBadge: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    burnBadgeText: {
        fontSize: 13,
        fontWeight: "800",
    },
    budgetHealthAmounts: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    budgetHealthSpent: {
        fontSize: 12,
        color: "#6B7280",
    },
    budgetHealthRemaining: {
        fontSize: 12,
        fontWeight: "700",
    },
    warningRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 8,
        backgroundColor: "#FEE2E2",
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 5,
    },
    warningRowText: {
        fontSize: 11,
        color: "#991B1B",
        fontWeight: "500",
    },
    cautionRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 8,
        backgroundColor: "#FEF3C7",
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 5,
    },
    cautionRowText: {
        fontSize: 11,
        color: "#92400E",
        fontWeight: "500",
    },

    // ─── Pending Review ─────────────────────────────────────────────────────

    pendingCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    pendingRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        gap: 10,
    },
    pendingRowIcon: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: "#F3F4F6",
        justifyContent: "center",
        alignItems: "center",
    },
    pendingRowBody: {
        flex: 1,
    },
    pendingRowDesc: {
        fontSize: 13,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 2,
    },
    pendingRowMeta: {
        fontSize: 11,
        color: "#9CA3AF",
    },
    pendingRowRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    pendingRowAmount: {
        fontSize: 13,
        fontWeight: "700",
        color: "#111827",
    },
    pendingDivider: {
        height: 1,
        backgroundColor: "#F9FAFB",
        marginHorizontal: 14,
    },
    pendingEmpty: {
        alignItems: "center",
        paddingVertical: 32,
        gap: 10,
    },
    pendingEmptyText: {
        fontSize: 13,
        color: "#6B7280",
        fontWeight: "500",
    },
    viewMoreBtn: {
        marginTop: 8,
        alignItems: "center",
        paddingVertical: 10,
    },
    viewMoreText: {
        fontSize: 13,
        color: "#1E40AF",
        fontWeight: "600",
    },

    // ─── Quick Actions ──────────────────────────────────────────────────────

    quickActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
    },
    quickAction: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        paddingVertical: 16,
        paddingHorizontal: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        gap: 8,
    },
    quickActionIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    quickActionLabel: {
        fontSize: 11,
        fontWeight: "600",
        color: "#374151",
        textAlign: "center",
    },
});
