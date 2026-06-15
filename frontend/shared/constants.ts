import { BudgetStatus, ReviewStatus, ReconciliationStatus, StatusConfig } from "./types";

// ─── Status Constants ───────────────────────────────────────────────────────

/**
 * Budget status colors mapping
 */
export const BUDGET_STATUS_COLOR: Record<BudgetStatus, string> = {
    GREEN: "#10B981",
    ORANGE: "#F59E0B",
    RED: "#EF4444",
};

/**
 * Budget status background colors mapping
 */
export const BUDGET_STATUS_BG: Record<BudgetStatus, string> = {
    GREEN: "#D1FAE5",
    ORANGE: "#FEF3C7",
    RED: "#FEE2E2",
};

/**
 * Budget status labels mapping
 */
export const BUDGET_STATUS_LABEL: Record<BudgetStatus, string> = {
    GREEN: "On Track",
    ORANGE: "Low Funds",
    RED: "Critical",
};

/**
 * Budget status thresholds
 */
export const BUDGET_STATUS_THRESHOLDS = {
    CRITICAL: 95,
    WARNING: 70,
} as const;

/**
 * Review status configuration
 */
export const REVIEW_STATUS_CONFIG: Record<ReviewStatus, StatusConfig> = {
    PENDING: {
        label: "Pending",
        color: "#92400E",
        bg: "#FEF3C7",
        icon: "time-outline",
    },
    FINANCE_APPROVED: {
        label: "Finance Approved",
        color: "#065F46",
        bg: "#D1FAE5",
        icon: "checkmark-circle-outline",
    },
    FULLY_APPROVED: {
        label: "Fully Approved",
        color: "#1E40AF",
        bg: "#DBEAFE",
        icon: "shield-checkmark-outline",
    },
    NEEDS_CORRECTION: {
        label: "Needs Correction",
        color: "#991B1B",
        bg: "#FEE2E2",
        icon: "alert-circle-outline",
    },
    REJECTED: {
        label: "Rejected",
        color: "#6B7280",
        bg: "#F3F4F6",
        icon: "close-circle-outline",
    },
};

/**
 * Reconciliation status configuration
 */
export const RECONCILIATION_STATUS_CONFIG: Record<ReconciliationStatus, StatusConfig> = {
    MATCHED: {
        label: "Matched",
        color: "#065F46",
        bg: "#D1FAE5",
        icon: "checkmark-circle-outline",
    },
    AMOUNT_MISMATCH: {
        label: "Amount Mismatch",
        color: "#92400E",
        bg: "#FEF3C7",
        icon: "alert-circle-outline",
    },
    MISSING_IN_FFT: {
        label: "Missing in FFT",
        color: "#991B1B",
        bg: "#FEE2E2",
        icon: "close-circle-outline",
    },
    MISSING_IN_EXTERNAL: {
        label: "Missing in External",
        color: "#6B7280",
        bg: "#F3F4F6",
        icon: "help-circle-outline",
    },
};

// ─── Filter Tab Constants ───────────────────────────────────────────────────

/**
 * Review filter tabs
 */
export const REVIEW_FILTER_TABS = [
    { key: "ALL" as const, label: "All" },
    { key: "PENDING" as const, label: "Pending" },
    { key: "NEEDS_CORRECTION" as const, label: "Correction" },
    { key: "FINANCE_APPROVED" as const, label: "Approved" },
    { key: "FULLY_APPROVED" as const, label: "Full" },
];

/**
 * Budget filter tabs
 */
export const BUDGET_FILTER_TABS = [
    { key: "ALL" as const, label: "All" },
    { key: "RED" as const, label: "Critical" },
    { key: "ORANGE" as const, label: "Low Funds" },
    { key: "GREEN" as const, label: "On Track" },
];

// ─── Common Constants ───────────────────────────────────────────────────────

/**
 * Exchange rate constant (could be moved to config)
 */
export const EXCHANGE_RATE = {
    zmw_to_usd: 27.5,
    source: "Bank of Zambia",
    year: 2026,
};

/**
 * Empty state messages
 */
export const EMPTY_STATE_MESSAGES = {
    NO_TRANSACTIONS: "No transactions found",
    NO_BUDGETS: "No budget lines found",
    NO_RECORDS: "No records found",
    ALL_CLEAR: "All clear",
} as const;