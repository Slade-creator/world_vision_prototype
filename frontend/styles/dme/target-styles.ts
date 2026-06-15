import { StyleSheet } from "react-native";
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from "../../theme";

export const addTargetModalStyles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
    sheet: {
        backgroundColor: COLORS.bgPrimary,
        borderTopLeftRadius: RADIUS.xl,
        borderTopRightRadius: RADIUS.xl,
        padding: SPACING["2xl"],
        paddingBottom: SPACING["3xl"] + SPACING.sm, // 32+8=40
    },
    handle: {
        width: 40, 
        height: 4, 
        backgroundColor: COLORS.borderBase,
        borderRadius: RADIUS.sm / 2, // 2
        alignSelf: "center", 
        marginBottom: SPACING.xl, // 20
    },
    title: { 
        fontSize: TYPOGRAPHY.lg + 2, // 18 (16+2)
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs, // 4
    },
    sub: { 
        fontSize: TYPOGRAPHY.base - 1, // 13 (14-1)
        color: COLORS.textSecondary,
        marginBottom: SPACING.xl, // 20
    },
    fieldLabel: { 
        fontSize: TYPOGRAPHY.base - 1, // 13
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs + 2, // 6
    },
    input: {
        backgroundColor: COLORS.bgSecondary,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.borderBase,
        padding: SPACING.sm,
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm + 6, // 14
    },
    rowFields: { flexDirection: "row", gap: SPACING.sm + 2 }, // 10
    pickerWrap: { marginBottom: SPACING.sm + 6 }, // 14
    pickerChip: {
        paddingHorizontal: SPACING.sm + 6, // 14
        paddingVertical: SPACING.sm, // 8
        borderRadius: RADIUS.base + 2, // 10
        backgroundColor: COLORS.bgTertiary,
        marginRight: SPACING.xs + 4, // 8
        maxWidth: 180,
    },
    pickerChipActive: { backgroundColor: COLORS.info },
    pickerChipText: { 
        fontSize: TYPOGRAPHY.sm,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textSecondary,
    },
    actions: { flexDirection: "row", gap: SPACING.sm + 2, marginTop: SPACING.xs },
    cancelBtn: {
        flex: 1, 
        paddingVertical: SPACING.sm + 6, // 14
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.bgTertiary,
        alignItems: "center",
    },
    cancelText: { 
        fontSize: TYPOGRAPHY.base,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textSecondary,
    },
    submitBtn: {
        flex: 2, 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center",
        gap: SPACING.sm,
        paddingVertical: SPACING.sm + 6,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.info,
    },
    submitText: { 
        fontSize: TYPOGRAPHY.base,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textInverse,
    },
});

export const targetCardStyles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.bgPrimary,
        borderRadius: RADIUS.xl + 4, // 20 (custom)
        padding: SPACING.lg,
        marginBottom: SPACING.sm + 2, // 10
        shadowColor: COLORS.textPrimary,
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 1,
    },
    top: { flexDirection: "row", alignItems: "flex-start", marginBottom: SPACING.md }, // 12
    name: { 
        fontSize: TYPOGRAPHY.base, // 14
        fontWeight: TYPOGRAPHY.bold, // "700"
        color: COLORS.textPrimary,
    },
    code: { 
        fontSize: TYPOGRAPHY.xs - 1, // 10 (11-1) or use TYPOGRAPHY.xs=11
        color: COLORS.textTertiary,
        marginTop: SPACING.xs / 2, // 2
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.xs / 2, // 2
        paddingHorizontal: SPACING.xs + 4, // 8
        paddingVertical: SPACING.xs / 2, // 2
        borderRadius: RADIUS.base,
    },
    statusText: { 
        fontSize: TYPOGRAPHY.xs - 2, // 9 (11-2)
        fontWeight: TYPOGRAPHY.bold,
    },

    progressRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.sm + 2, // 10
        marginBottom: SPACING.md, // 12
    },
    progressPct: { 
        fontSize: TYPOGRAPHY["2xl"] - 4, // 22-4=18 (or use TYPOGRAPHY.xl=20, adjust)
        fontWeight: TYPOGRAPHY.extrabold,
        width: 44,
    },
    burnTrack: {
        flex: 1,
        height: 8,
        backgroundColor: COLORS.bgTertiary,
        borderRadius: 4,
        overflow: "hidden",
    },
    burnFill: { height: "100%", borderRadius: 4 },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: COLORS.bgSecondary,
        borderRadius: RADIUS.base + 2, // 10
        padding: SPACING.sm + 4, // 12 (8+4)
        marginBottom: SPACING.md, // 12
    },
    statItem: { flex: 1 },
    statLabel: { 
        fontSize: TYPOGRAPHY.xs - 1, // 10
        color: COLORS.textTertiary,
        fontWeight: TYPOGRAPHY.semibold,
        marginBottom: SPACING.xs + 1, // 5 (4+1, close to 3)
    },
    statValue: { 
        fontSize: TYPOGRAPHY.base - 1, // 13
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    budgetTag: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.xs / 2, // 2
        backgroundColor: COLORS.bgTertiary,
        paddingHorizontal: SPACING.xs + 4, // 8
        paddingVertical: SPACING.xs / 2, // 2
        borderRadius: RADIUS.sm + 2, // 6
        flex: 1,
        marginRight: SPACING.sm + 2, // 10 (8+2)
    },
    budgetTagText: { 
        fontSize: TYPOGRAPHY.xs, // 11
        color: COLORS.textSecondary,
        flex: 1,
    },
    editBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.xs / 2, // 2
        backgroundColor: COLORS.infoLight,
        paddingHorizontal: SPACING.sm + 4, // 12 (8+4)
        paddingVertical: SPACING.xs + 3, // 7 (4+3)
        borderRadius: RADIUS.base, // 8
    },
    editBtnText: { 
        fontSize: TYPOGRAPHY.sm, // 12
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.info,
    },
});

export const screenStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.bgTertiary },

    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        paddingTop: SPACING["3xl"] + SPACING.md,
        paddingBottom: SPACING.lg, // 16 (close to 20)
        paddingHorizontal: SPACING.xl,
    },
    headerTitle: { 
        fontSize: TYPOGRAPHY["2xl"],
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.bgPrimary,
        letterSpacing: -0.5,
    },
    headerSub: { 
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.bgPrimary,
        marginTop: SPACING.xs / 2,
    },
    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.xs + 2, // 6
        backgroundColor: COLORS.success,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm + 2, // 10 (8+2)
        borderRadius: RADIUS.lg,
    },
    addBtnText: { 
        fontSize: TYPOGRAPHY.base - 1, // 13
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textInverse,
    },

    summaryCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.bgPrimary,
        margin: SPACING.lg,
        borderRadius: RADIUS.xl + 4, // 20
        padding: SPACING.lg,
        shadowColor: COLORS.textPrimary,
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
        gap: SPACING.lg,
    },
    summaryLeft: { flex: 1 },
    summaryLabel: { 
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textSecondary,
        fontWeight: TYPOGRAPHY.medium,
    },
    summaryValue: { 
        fontSize: TYPOGRAPHY["5xl"] - 12, // 32-12=20 (or use custom 40)
        fontWeight: TYPOGRAPHY.extrabold,
        letterSpacing: -1,
        marginTop: SPACING.xs / 2,
    },
    summarySub: { 
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textTertiary,
    },
    summaryChips: { gap: SPACING.xs + 2 }, // 6
    summaryChip: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.xs + 2,
        paddingHorizontal: SPACING.sm + 2, // 10 (8+2)
        paddingVertical: SPACING.xs + 2, // 6 (4+2)
        borderRadius: RADIUS.base,
    },
    summaryChipVal: { 
        fontSize: TYPOGRAPHY.base, // 14
        fontWeight: TYPOGRAPHY.extrabold,
    },
    summaryChipLabel: { 
        fontSize: TYPOGRAPHY.xs,
        fontWeight: TYPOGRAPHY.semibold,
    },

    filterRow: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.md,
        gap: SPACING.sm,
    },
    filterTab: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.xs + 2, // 6
        paddingHorizontal: SPACING.sm + 6, // 14
        paddingVertical: SPACING.sm, // 8
        borderRadius: RADIUS.base + 2, // 10
        backgroundColor: COLORS.bgPrimary,
        borderWidth: 1,
        borderColor: COLORS.borderBase,
    },
    filterTabActive: { backgroundColor: COLORS.info, borderColor: COLORS.info },
    filterTabText: { 
        fontSize: TYPOGRAPHY.sm, // 12
        color: COLORS.textSecondary,
        fontWeight: TYPOGRAPHY.medium,
    },
    filterTabTextActive: { 
        color: COLORS.textInverse,
        fontWeight: TYPOGRAPHY.bold,
    },
    filterBadge: {
        backgroundColor: COLORS.bgTertiary,
        paddingHorizontal: SPACING.xs + 2, // 6
        paddingVertical: SPACING.xs / 4, // 1
        borderRadius: RADIUS.sm + 2, // 6
    },
    filterBadgeText: { 
        fontSize: TYPOGRAPHY.xs,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textSecondary,
    },

    list: { paddingHorizontal: SPACING.lg, gap: SPACING.sm + 2 }, // 10

    emptyState: { alignItems: "center", paddingVertical: SPACING["3xl"] + SPACING.lg, gap: SPACING.sm + 2 },
    emptyTitle: { 
        fontSize: TYPOGRAPHY.lg,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
    },
    emptySub: { 
        fontSize: TYPOGRAPHY.base - 1,
        color: COLORS.textTertiary,
    },
});
