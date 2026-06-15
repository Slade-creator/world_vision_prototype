import { StyleSheet } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY, RADIUS, SHADOWS } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.bgSecondary,
    },

    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.primary,
        paddingTop: 56,
        paddingBottom: SPACING.xl,
        paddingHorizontal: SPACING.xl,
    },
    headerTitle: {
        fontSize: TYPOGRAPHY["2xl"],
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textInverse,
        letterSpacing: -0.5,
    },
    headerSub: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textLight,
        marginTop: 2,
    },
    headerBadge: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.bgTertiary,
        alignItems: "center",
        justifyContent: "center",
    },

    // Report type tabs
    tabRow: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        flexDirection: "row",
        gap: SPACING.xs,
        backgroundColor: 'transparent',
        alignItems: "center",
    },
    reportTab: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.xs,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.base,
        backgroundColor: COLORS.bgTertiary,
    },
    reportTabActive: {
        backgroundColor: COLORS.infoDark,
    },
    reportTabText: {
        fontSize: TYPOGRAPHY.sm + 1,
        color: COLORS.textSecondary,
        fontWeight: TYPOGRAPHY.medium,
        flexShrink: 1,
    },
    reportTabTextActive: {
        color: COLORS.textInverse,
        fontWeight: TYPOGRAPHY.bold,
    },

    // Period selector
    periodRow: {
        flexDirection: "row",
        backgroundColor: COLORS.bgPrimary,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderBase,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        gap: SPACING.xs,
    },
    periodBtn: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.sm,
        backgroundColor: COLORS.bgSecondary,
    },
    periodBtnActive: {
        backgroundColor: COLORS.primaryLight || "#EEF2FF",
    },
    periodBtnText: {
        fontSize: TYPOGRAPHY.sm + 1,
        color: COLORS.textSecondary,
        fontWeight: TYPOGRAPHY.medium,
    },
    periodBtnTextActive: {
        color: COLORS.primary,
        fontWeight: TYPOGRAPHY.bold,
    },

    // Scroll content
    scrollContent: {
        padding: SPACING.lg,
        gap: SPACING.md,
    },

    // Report card
    reportCard: {
        backgroundColor: COLORS.bgPrimary,
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        ...SHADOWS.sm,
    },

    // Section header
    sectionHeader: {
        marginBottom: SPACING.md,
    },
    sectionTitle: {
        fontSize: TYPOGRAPHY.lg,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
    },
    sectionSub: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textSecondary,
        marginTop: 2,
    },

    // Big stat
    bigStatRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: SPACING.md,
    },
    bigStatLabel: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textSecondary,
        fontWeight: TYPOGRAPHY.medium,
    },
    bigStatValue: {
        fontSize: TYPOGRAPHY["4xl"],
        fontWeight: TYPOGRAPHY.extrabold,
        letterSpacing: -1,
        marginTop: 2,
    },
    statusChip: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.sm,
    },
    statusChipText: {
        fontSize: TYPOGRAPHY.sm,
        fontWeight: TYPOGRAPHY.bold,
    },

    // Burn bar
    burnTrack: {
        height: 6,
        backgroundColor: COLORS.bgSecondary,
        borderRadius: 3,
        overflow: "hidden",
        marginBottom: SPACING.md,
    },
    burnFill: {
        height: "100%",
        borderRadius: 3,
    },

    // Divider
    divider: {
        height: 1,
        backgroundColor: COLORS.bgSecondary,
        marginVertical: SPACING.sm,
    },

    // Metric row
    metricRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: SPACING.xs,
    },
    metricLabel: {
        fontSize: TYPOGRAPHY.sm + 1,
        color: COLORS.textSecondary,
        fontWeight: TYPOGRAPHY.medium,
    },
    metricValue: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
        textAlign: "right",
    },
    metricSub: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textTertiary,
        textAlign: "right",
    },

    // Budget line row
    lineRow: {
        paddingVertical: SPACING.xs,
    },
    lineRowTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2,
    },
    lineName: {
        fontSize: TYPOGRAPHY.sm + 1,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textPrimary,
        flex: 1,
        marginRight: SPACING.sm,
    },
    linePercent: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: TYPOGRAPHY.extrabold,
    },
    lineTCode: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textTertiary,
        marginBottom: 6,
    },
    lineAmountRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 4,
    },
    lineAmountLabel: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textSecondary,
    },

    // Mini chip
    miniChip: {
        paddingHorizontal: SPACING.xs,
        paddingVertical: 2,
        borderRadius: RADIUS.sm,
    },
    miniChipText: {
        fontSize: TYPOGRAPHY.xs,
        fontWeight: TYPOGRAPHY.semibold,
    },

    // Variance table
    tableRow: {
        flexDirection: "row",
        paddingVertical: SPACING.xs,
        paddingHorizontal: 4,
        borderRadius: RADIUS.sm,
        alignItems: "center",
    },
    tableHeader: {
        backgroundColor: COLORS.bgSecondary,
        marginBottom: SPACING.xs,
    },
    tableHeaderText: {
        fontSize: TYPOGRAPHY.xs,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textSecondary,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    tableCell: {
        flex: 1,
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textSecondary,
        fontWeight: TYPOGRAPHY.medium,
    },
    tableCellMain: {
        fontSize: TYPOGRAPHY.sm,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textPrimary,
    },

    // Variance legend
    varianceLegend: {
        flexDirection: "row",
        gap: SPACING.md,
        marginTop: SPACING.md,
        paddingTop: SPACING.sm,
        borderTopWidth: 1,
        borderTopColor: COLORS.bgSecondary,
        flexWrap: "wrap",
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.xs,
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    legendText: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textSecondary,
    },

    // Activity summary grid
    summaryGrid: {
        flexDirection: "row",
        marginBottom: SPACING.md,
    },
    summaryGridItem: {
        flex: 1,
        alignItems: "center",
        paddingVertical: SPACING.sm,
    },
    summaryGridValue: {
        fontSize: TYPOGRAPHY["3xl"],
        fontWeight: TYPOGRAPHY.extrabold,
        letterSpacing: -0.5,
    },
    summaryGridLabel: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textSecondary,
        marginTop: 2,
        fontWeight: TYPOGRAPHY.medium,
    },

    // Transaction rows
    txnRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: SPACING.xs,
        gap: SPACING.xs,
    },
    txnDesc: {
        fontSize: TYPOGRAPHY.sm + 1,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textPrimary,
    },
    txnMeta: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textTertiary,
        marginTop: 2,
    },
    txnAmount: {
        fontSize: TYPOGRAPHY.sm + 1,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
    },
    txnStatus: {
        fontSize: TYPOGRAPHY.xs - 1,
        fontWeight: TYPOGRAPHY.semibold,
        marginTop: 2,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    // Export
    exportRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    exportLabel: {
        fontSize: TYPOGRAPHY.sm + 1,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textSecondary,
    },
    exportButtons: {
        flexDirection: "row",
        gap: SPACING.xs,
    },
    exportBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.xs,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.base,
    },
    exportBtnText: {
        fontSize: TYPOGRAPHY.sm + 1,
        fontWeight: TYPOGRAPHY.bold,
    },
});
