import { StyleSheet } from "react-native";
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from "../../theme";

export const modalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    sheet: {
        backgroundColor: COLORS.bgPrimary,
        borderTopLeftRadius: RADIUS.xl,
        borderTopRightRadius: RADIUS.xl,
        padding: SPACING["2xl"],
        paddingBottom: SPACING["3xl"] + SPACING.sm, // 32 + 8 = 40
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: COLORS.borderBase,
        borderRadius: RADIUS.sm / 2, // 4/2 = 2
        alignSelf: "center",
        marginBottom: SPACING.xl, // 20
    },
    title: { 
        fontSize: TYPOGRAPHY.lg + 2, // 16+2=18 (or use TYPOGRAPHY.xl=20, adjust)
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs, // 4
    },
    sub: { 
        fontSize: TYPOGRAPHY.base - 1, // 14-1=13 (or use TYPOGRAPHY.sm=12, adjust)
        color: COLORS.textSecondary,
        marginBottom: SPACING.lg, // 16
    },

    detailGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: SPACING.sm + SPACING.xs, // 8+4=12 (close to 10)
        backgroundColor: COLORS.bgSecondary, // #F9FAFB or #F8FAFC
        borderRadius: RADIUS.lg, // 12
        padding: SPACING.sm + SPACING.xs, // 8+4=12 (close to 14)
        marginBottom: SPACING.sm + SPACING.xs, // 12 (close to 14)
    },
    detailItem: { minWidth: "45%", flex: 1 },
    detailLabel: { 
        fontSize: TYPOGRAPHY.xs - 1, // 11-1=10 (or use TYPOGRAPHY.xs=11)
        color: COLORS.textTertiary, // #9CA3AF
        fontWeight: TYPOGRAPHY.semibold,
        marginBottom: SPACING.xs / 2, // 2
    },
    detailValue: { 
        fontSize: TYPOGRAPHY.base - 1, // 14-1=13 (or use TYPOGRAPHY.sm=12, adjust)
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
    },

    targetContext: {
        backgroundColor: COLORS.infoLight, // #DBEAFE (or #EEF2FF)
        borderRadius: RADIUS.lg, // 12
        padding: SPACING.sm + SPACING.xs, // 12 (close to 14)
        marginBottom: SPACING.md, // 12 (close to 16)
    },
    targetContextHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.xs + 2, // 4+2=6 (close)
        marginBottom: SPACING.xs, // 4 (close to 6)
    },
    targetContextTitle: { 
        fontSize: TYPOGRAPHY.xs, // 11
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.info, // #3B82F6 (or #6366F1)
    },
    targetContextName: {
        fontSize: TYPOGRAPHY.base - 1, // 13 (14-1)
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.infoDark, // #1E40AF (or #1E1B4B)
        marginBottom: SPACING.sm, // 8
    },
    targetContextBar: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.sm, // 8
        marginBottom: SPACING.xs, // 4
    },
    targetBarTrack: {
        flex: 1,
        height: 6,
        backgroundColor: COLORS.infoLight, // lighter shade for track
        borderRadius: 3,
        overflow: "hidden",
    },
    targetBarFill: { height: "100%", borderRadius: 3 },
    targetBarPct: { 
        fontSize: TYPOGRAPHY.base - 1, // 13
        fontWeight: TYPOGRAPHY.extrabold, // "800"
        color: COLORS.infoDark, // #4338CA or #1E40AF
    },
    targetContextValues: { 
        fontSize: TYPOGRAPHY.xs, // 11
        color: COLORS.infoDark, // #4338CA or #1E40AF
    },

    fieldLabel: { 
        fontSize: TYPOGRAPHY.base - 1, // 13 (14-1)
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textSecondary, // #6B7280 (or #374151)
        marginBottom: SPACING.sm, // 8
    },
    textArea: {
        backgroundColor: COLORS.bgSecondary, // #F9FAFB or #F8FAFC
        borderRadius: RADIUS.lg, // 12
        borderWidth: 1,
        borderColor: COLORS.borderBase, // #E5E7EB
        padding: SPACING.sm, // 8 (close to 12)
        fontSize: TYPOGRAPHY.base, // 14
        color: COLORS.textPrimary, // #111827 or #0F172A
        minHeight: 80,
        marginBottom: SPACING.lg, // 16 (close to 20)
    },

    actions: { flexDirection: "row", gap: SPACING.sm }, // 8
    cancelBtn: {
        paddingVertical: SPACING.sm + 6, // 8+6=14
        paddingHorizontal: SPACING.lg, // 16
        borderRadius: RADIUS.lg, // 12
        backgroundColor: COLORS.bgTertiary, // #F3F4F6 (or #F1F5F9)
        alignItems: "center",
    },
    cancelText: { 
        fontSize: TYPOGRAPHY.base - 1, // 13
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textSecondary, // #6B7280
    },
    actionBtn: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: SPACING.xs + 2, // 4+2=6 (close)
        paddingVertical: SPACING.sm + 6, // 14
        borderRadius: RADIUS.lg, // 12
    },
    actionBtnText: { 
        fontSize: TYPOGRAPHY.base, // 14
        fontWeight: TYPOGRAPHY.bold, // "700"
    },
});

export const txnCardStyles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.bgPrimary, // #FFFFFF
        borderRadius: RADIUS.xl + 4, // 16+4=20 or use RADIUS.full/2? Let's use 16 as custom
        padding: SPACING.lg, // 16
        marginBottom: SPACING.sm + 2, // 8+2=10
        shadowColor: COLORS.textPrimary, // #111827 or #0F172A
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 1,
    },
    cardPending: {
        borderLeftWidth: 3,
        borderLeftColor: COLORS.warning, // #F59E0B
    },
    top: { flexDirection: "row", alignItems: "flex-start", marginBottom: SPACING.sm + 2 }, // 10
    desc: { 
        fontSize: TYPOGRAPHY.base, // 14
        fontWeight: TYPOGRAPHY.semibold, // "600"
        color: COLORS.textPrimary, // #111827 or #0F172A
    },
    meta: { 
        fontSize: TYPOGRAPHY.xs - 1, // 11-1=10 (or use TYPOGRAPHY.xs=11)
        color: COLORS.textTertiary, // #9CA3AF
        marginTop: SPACING.xs / 2, // 2
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.xs / 2, // 2 (close to 4)
        paddingHorizontal: SPACING.xs + 4, // 4+4=8
        paddingVertical: SPACING.xs / 2, // 2 (close to 4)
        borderRadius: RADIUS.base, // 8
    },
    statusText: { 
        fontSize: TYPOGRAPHY.xs - 2, // 11-2=9 (or use 10)
        fontWeight: TYPOGRAPHY.bold, // "700"
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.sm, // 8
        marginBottom: SPACING.sm, // 8
    },
    tag: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.xs / 2, // 2 (close to 4)
        backgroundColor: COLORS.bgTertiary, // #F3F4F6 (or #F1F5F9)
        paddingHorizontal: SPACING.xs + 4, // 8
        paddingVertical: SPACING.xs / 2, // 2 (close to 4)
        borderRadius: RADIUS.sm + 2, // 4+2=6 (close)
    },
    tagText: { 
        fontSize: TYPOGRAPHY.xs, // 11
        color: COLORS.textSecondary, // #6B7280
        fontWeight: TYPOGRAPHY.medium, // "500"
    },
    amount: { 
        marginLeft: "auto" as any, 
        fontSize: TYPOGRAPHY.base, // 14
        fontWeight: TYPOGRAPHY.bold, // "700"
        color: COLORS.textPrimary, // #111827 or #0F172A
    },

    targetHint: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.xs + 2, // 6 (4+2)
        backgroundColor: COLORS.infoLight, // #DBEAFE or #EEF2FF
        paddingHorizontal: SPACING.sm + 2, // 8+2=10
        paddingVertical: SPACING.xs + 2, // 4+2=6
        borderRadius: RADIUS.base, // 8
        marginBottom: SPACING.sm, // 8
    },
    targetHintText: { 
        fontSize: TYPOGRAPHY.xs, // 11
        color: COLORS.infoDark, // #4338CA or #1E40AF
        fontWeight: TYPOGRAPHY.medium, // "500"
        flex: 1,
    },

    reviewCta: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: SPACING.xs / 2, // 2 (close to 4)
        paddingVertical: SPACING.sm, // 8
        borderTopWidth: 1,
        borderTopColor: COLORS.borderLight, // #F3F4F6 or #F1F5F9
    },
    reviewCtaText: { 
        fontSize: TYPOGRAPHY.base - 1, // 13
        fontWeight: TYPOGRAPHY.bold, // "700"
        color: COLORS.info, // #6366F1 or #3B82F6
    },
});

export const screenStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.bgTertiary }, // #F3F4F6 or #F1F5F9

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.primary, 
        paddingTop: SPACING["3xl"] + SPACING.md, // 32+12=44, plus status bar ~12 = 56
        paddingBottom: SPACING.lg, // 16 (close to 20)
        paddingHorizontal: SPACING.xl, // 20
    },
    headerTitle: { 
        fontSize: TYPOGRAPHY["2xl"], // 22
        fontWeight: TYPOGRAPHY.bold, // "700"
        color: COLORS.bgPrimary, // #93C5FD or #F8FAFC
        letterSpacing: -0.5,
    },
    headerSub: { 
        fontSize: TYPOGRAPHY.sm, // 12
        color: COLORS.bgPrimary, // #94A3B8
        marginTop: SPACING.xs / 2, // 2
    },
    headerBadge: { 
        borderRadius: RADIUS.lg, // 12
        padding: SPACING.sm + 2, // 8+2=10 (close)
        alignItems: "center",
    },
    headerBadgeCount: { 
        fontSize: TYPOGRAPHY["2xl"] - 2, // 22-2=20 (or use TYPOGRAPHY.xl=20)
        fontWeight: TYPOGRAPHY.extrabold, // "800"
        letterSpacing: -0.5,
    },
    headerBadgeLabel: { 
        fontSize: TYPOGRAPHY.xs - 1, // 11-1=10 (or use TYPOGRAPHY.xs=11)
        fontWeight: TYPOGRAPHY.semibold, // "600"
    },

    noticeBanner: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.sm, // 8
        backgroundColor: COLORS.infoLight, // #DBEAFE or #EEF2FF
        paddingHorizontal: SPACING.lg, // 16
        paddingVertical: SPACING.sm + 2, // 8+2=10
        borderBottomWidth: 1,
        borderBottomColor: COLORS.infoLight, // #C7D2FE or a lighter shade
    },
    noticeText: { 
        fontSize: TYPOGRAPHY.sm, // 12
        color: COLORS.infoDark, // #4338CA or #1E40AF
        fontWeight: TYPOGRAPHY.medium, // "500"
        flex: 1,
    },

    filterRow: {
        paddingHorizontal: SPACING.lg, // 16
        paddingVertical: SPACING.md + 4, // 12+4=16 (close to 12)
        gap: SPACING.sm, // 8
        backgroundColor: COLORS.bgPrimary, // #FFFFFF
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight, // #F3F4F6 or #F1F5F9
    },
    filterTab: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.xs + 2, // 6 (4+2)
        paddingHorizontal: SPACING.sm + 6, // 8+6=14
        paddingVertical: SPACING.sm, // 8
        borderRadius: RADIUS.base + 2, // 8+2=10
        backgroundColor: COLORS.bgTertiary, // #F3F4F6 or #F1F5F9
    },
    filterTabActive: { backgroundColor: COLORS.info }, // #6366F1 or #3B82F6
    filterTabText: { 
        fontSize: TYPOGRAPHY.base - 1, // 13
        color: COLORS.textSecondary, // #6B7280
        fontWeight: TYPOGRAPHY.medium, // "500"
    },
    filterTabTextActive: { 
        color: COLORS.textInverse, // #FFFFFF
        fontWeight: TYPOGRAPHY.bold, // "700"
    },
    filterBadge: {
        backgroundColor: COLORS.borderBase, // #E5E7EB
        paddingHorizontal: SPACING.xs + 2, // 4+2=6
        paddingVertical: SPACING.xs / 4, // 1 (4/4=1)
        borderRadius: RADIUS.sm + 2, // 4+2=6
    },
    filterBadgeText: { 
        fontSize: TYPOGRAPHY.xs, // 11
        fontWeight: TYPOGRAPHY.bold, // "700"
        color: COLORS.textSecondary, // #6B7280
    },

    list: { flex: 1 },
    listContent: { padding: SPACING.lg, gap: SPACING.sm + 2 }, // 16, 10 (8+2)

    emptyState: { alignItems: "center", paddingVertical: SPACING["3xl"] + SPACING.lg, gap: SPACING.sm + 2 }, // 32+16=48 (close to 60), gap 10
    emptyTitle: { 
        fontSize: TYPOGRAPHY.lg, // 16 (or TYPOGRAPHY.base+2=16)
        fontWeight: TYPOGRAPHY.bold, // "700"
        color: COLORS.textPrimary, // #111827 or #0F172A
    },
    emptySub: { 
        fontSize: TYPOGRAPHY.base - 1, // 13
        color: COLORS.textTertiary, // #9CA3AF
    },
});
