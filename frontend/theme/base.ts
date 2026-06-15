

export const COLORS = {
  // Primary Brand & Actions
  primary: "#ff5515",
  primaryLight: "#F3A48A",
  primaryLighter: "#FFF7ED",
  primaryDeep: "#E8461A",

  // Backgrounds
  bgPrimary: "#FFFFFF",
  bgSecondary: "#F9FAFB",
  bgTertiary: "#F3F4F6",

  // Text
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  textTertiary: "#9CA3AF",
  textLight: "#94A3B8",
  textInverse: "#FFFFFF",

  // Borders
  borderLight: "#F3F4F6",
  borderBase: "#E5E7EB",
  borderDark: "#D1D5DB",

  // Status Colors
  success: "#10B981",
  successLight: "#DBEAFE",
  warning: "#F59E0B",
  warningLight: "#FEF3C7",
  error: "#EF4444",
  errorLight: "#FEE2E2",
  errorLighter: "#FFF5F5",
  errorDark: "#991B1B",

  // Semantic Blues
  info: "#3B82F6",
  infoDark: "#1E40AF",
  infoLight: "#DBEAFE",

  // Special
  headerBg: "#1E3A5F",
  headerText: "#93C5FD",

  // Placeholder & Disabled
  placeholder: "#CBD5E1",
  disabled: "#D1D5DB",
};

export const TYPOGRAPHY = {
  fontFamily: "Inter",
  fontFamilyFallback: "Helvetica",
  xs: 11,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 20,
  "2xl": 22,
  "3xl": 24,
  "4xl": 28,
  "5xl": 32,
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
  extrabold: "800" as const,
  lineHeightTight: 1.2,
  lineHeightNormal: 1.5,
  lineHeightRelaxed: 1.75,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
};

export const RADIUS = {
  sm: 4,
  base: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const SHADOWS = {
  sm: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  lg: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const TEXT_STYLES = {
  h1: {
    fontSize: TYPOGRAPHY["5xl"],
    fontWeight: TYPOGRAPHY.extrabold,
    lineHeight: TYPOGRAPHY["5xl"] * TYPOGRAPHY.lineHeightTight,
    color: COLORS.textPrimary,
  },
  h2: {
    fontSize: TYPOGRAPHY["4xl"],
    fontWeight: TYPOGRAPHY.extrabold,
    lineHeight: TYPOGRAPHY["4xl"] * TYPOGRAPHY.lineHeightTight,
    color: COLORS.textPrimary,
  },
  h3: {
    fontSize: TYPOGRAPHY["3xl"],
    fontWeight: TYPOGRAPHY.bold,
    lineHeight: TYPOGRAPHY["3xl"] * TYPOGRAPHY.lineHeightTight,
    color: COLORS.textPrimary,
  },
  h4: {
    fontSize: TYPOGRAPHY["2xl"],
    fontWeight: TYPOGRAPHY.bold,
    lineHeight: TYPOGRAPHY["2xl"] * TYPOGRAPHY.lineHeightTight,
    color: COLORS.textPrimary,
  },
  h5: {
    fontSize: TYPOGRAPHY.xl,
    fontWeight: TYPOGRAPHY.semibold,
    lineHeight: TYPOGRAPHY.xl * TYPOGRAPHY.lineHeightNormal,
    color: COLORS.textPrimary,
  },
  h6: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.semibold,
    lineHeight: TYPOGRAPHY.lg * TYPOGRAPHY.lineHeightNormal,
    color: COLORS.textPrimary,
  },
  body: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.regular,
    lineHeight: TYPOGRAPHY.base * TYPOGRAPHY.lineHeightNormal,
    color: COLORS.textPrimary,
  },
  bodySmall: {
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.regular,
    lineHeight: TYPOGRAPHY.sm * TYPOGRAPHY.lineHeightNormal,
    color: COLORS.textSecondary,
  },
  label: {
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.semibold,
    lineHeight: TYPOGRAPHY.sm * TYPOGRAPHY.lineHeightNormal,
    color: COLORS.textPrimary,
  },
  caption: {
    fontSize: TYPOGRAPHY.xs,
    fontWeight: TYPOGRAPHY.regular,
    lineHeight: TYPOGRAPHY.xs * TYPOGRAPHY.lineHeightNormal,
    color: COLORS.textTertiary,
  },
};

export const BUTTON_STYLES = {
  primary: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.base,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  primaryLight: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.base,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  secondary: {
    backgroundColor: COLORS.bgTertiary,
    borderRadius: RADIUS.base,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderBase,
  },
};