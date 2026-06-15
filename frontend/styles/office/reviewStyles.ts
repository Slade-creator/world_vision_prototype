import { StyleSheet } from "react-native";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY, SHADOWS } from "./../../theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgSecondary,
    },

    // Header
    header: {
        backgroundColor: COLORS.primary,
        paddingTop: 56,
        paddingHorizontal: SPACING.xl,
        paddingBottom: SPACING.xl,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    headerTitle: {
        fontSize: TYPOGRAPHY["2xl"],
        fontWeight: TYPOGRAPHY.extrabold,
        color: COLORS.textInverse,
        marginBottom: 2,
    },
    headerSub: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.headerText || COLORS.infoLight,
        fontWeight: TYPOGRAPHY.medium,
    },
    headerBadge: {
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        alignItems: "center",
    },
    headerBadgeText: {
        fontSize: TYPOGRAPHY["2xl"],
        fontWeight: TYPOGRAPHY.extrabold,
        color: COLORS.textInverse,
        lineHeight: TYPOGRAPHY["2xl"] * TYPOGRAPHY.lineHeightTight,
    },
    headerBadgeLabel: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.headerText || COLORS.infoLight,
        fontWeight: TYPOGRAPHY.semibold,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    // Filters
    filterRow: {
        flexDirection: "row",
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.sm,
        gap: SPACING.xs,
    },
    filterTab: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.bgPrimary,
        borderRadius: 16,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        gap: SPACING.xs,
        borderWidth: 1,
        borderColor: COLORS.borderBase,
    },
    filterTabActive: {
        backgroundColor: COLORS.infoDark,
        borderColor: COLORS.infoDark,
    },
    filterTabText: {
        fontSize: TYPOGRAPHY.sm + 1, // ~13
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textSecondary,
    },
    filterTabTextActive: {
        color: COLORS.textInverse,
    },
    filterTabBadge: {
        backgroundColor: COLORS.bgTertiary,
        borderRadius: RADIUS.base,
        paddingHorizontal: SPACING.xs,
        paddingVertical: 2,
        minWidth: 20,
        alignItems: "center",
    },
    filterTabBadgeActive: {
        backgroundColor: "rgba(255,255,255,0.25)",
    },
    filterTabBadgeText: {
        fontSize: TYPOGRAPHY.xs,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textSecondary,
    },
    filterTabBadgeTextActive: {
        color: COLORS.textInverse,
    },

    // List
    list: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.xs,
        gap: SPACING.sm,
    },

    // Transaction card
    txnCard: {
        backgroundColor: COLORS.bgPrimary,
        borderRadius: RADIUS.lg,
        flexDirection: "row",
        overflow: "hidden",
        ...SHADOWS.sm,
    },
    txnStrip: {
        width: 4,
        borderTopLeftRadius: RADIUS.lg,
        borderBottomLeftRadius: RADIUS.lg,
    },
    txnCardInner: {
        flex: 1,
        padding: SPACING.md,
        gap: SPACING.sm,
    },
    txnTopRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: SPACING.sm,
    },
    txnIconWrap: {
        width: 36,
        height: 36,
        borderRadius: RADIUS.base,
        backgroundColor: COLORS.bgTertiary,
        justifyContent: "center",
        alignItems: "center",
    },
    txnDesc: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
        marginBottom: 2,
    },
    txnMeta: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textTertiary,
    },
    txnAmountWrap: {
        alignItems: "flex-end",
    },
    txnAmount: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: TYPOGRAPHY.extrabold,
        color: COLORS.textPrimary,
    },
    txnAmountUsd: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textTertiary,
        marginTop: 1,
    },
    txnTagsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: SPACING.xs,
    },
    chip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.bgTertiary,
        borderRadius: RADIUS.sm,
        paddingHorizontal: SPACING.xs,
        paddingVertical: 2,
        gap: SPACING.xs,
    },
    chipText: {
        fontSize: TYPOGRAPHY.xs,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textSecondary,
    },
    txnBudgetRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.xs,
    },
    txnBudgetText: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textTertiary,
        flex: 1,
    },
    correctionNote: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: SPACING.xs,
        backgroundColor: COLORS.errorLighter,
        borderRadius: RADIUS.base,
        padding: SPACING.md,
    },
    correctionNoteText: {
        flex: 1,
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.errorDark,
        lineHeight: TYPOGRAPHY.sm * TYPOGRAPHY.lineHeightNormal,
    },

    // Empty state
    emptyState: {
        alignItems: "center",
        paddingTop: SPACING["4xl"],
        gap: SPACING.md,
    },
    emptyIcon: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: COLORS.successLight,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: SPACING.xs,
    },
    emptyTitle: {
        fontSize: TYPOGRAPHY.xl,
        fontWeight: TYPOGRAPHY.extrabold,
        color: COLORS.textPrimary,
    },
    emptySub: {
        fontSize: TYPOGRAPHY.sm + 1, // ~13
        color: COLORS.textSecondary,
        textAlign: "center",
        paddingHorizontal: SPACING["3xl"],
    },
});
