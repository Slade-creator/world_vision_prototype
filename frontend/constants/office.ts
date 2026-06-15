// ─── Office Module - Consolidated Constants ────────────────────────────────────

import type { BudgetStatus, ReviewStatus, ReconciliationStatus, StatusConfig } from "./../shared/types";

interface FilterTab {
    key: string;  
    label: string;
}

// ─── Budget Status Configuration ────────────────────────────────────────────────

export const STATUS_COLOR: Record<BudgetStatus, string> = {
    GREEN: "#10B981",
    ORANGE: "#F59E0B",
    RED: "#EF4444",
};

export const STATUS_BG: Record<BudgetStatus, string> = {
    GREEN: "#D1FAE5",
    ORANGE: "#FEF3C7",
    RED: "#FEE2E2",
};

export const STATUS_LABEL: Record<BudgetStatus, string> = {
    GREEN: "On Track",
    ORANGE: "Low Funds",
    RED: "Critical",
};

export const STATUS_THRESHOLDS = {
    CRITICAL: 95,
    WARNING: 70,
} as const;

// ─── Review Status Configuration ───────────────────────────────────────────────

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
    DME_APPROVED: {                              // ← add this
        label: "DME Approved",
        color: "#0D9488",
        bg: "#CCFBF1",
        icon: "document-text-outline",
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

export const REVIEW_FILTER_TABS: FilterTab[] = [
    { key: "ALL", label: "All" },
    { key: "PENDING", label: "Pending" },
    { key: "NEEDS_CORRECTION", label: "Correction" },
    { key: "FINANCE_APPROVED", label: "Approved" },
    { key: "FULLY_APPROVED", label: "Full" },
];

// ─── Reconciliation Status Configuration ───────────────────────────────────────

export const RECONCILIATION_STATUS_META: Record<
    ReconciliationStatus,
    { label: string; color: string; bg: string; icon: string }
> = {
    MATCHED: {
        label: "Matched",
        color: "#10B981",
        bg: "#D1FAE5",
        icon: "checkmark-circle-outline",
    },
    AMOUNT_MISMATCH: {
        label: "Amount Mismatch",
        color: "#F59E0B",
        bg: "#FEF3C7",
        icon: "swap-horizontal-outline",
    },
    MISSING_IN_FFT: {
        label: "Missing in FFT",
        color: "#EF4444",
        bg: "#FEE2E2",
        icon: "alert-circle-outline",
    },
    MISSING_IN_EXTERNAL: {
        label: "Not in Horizon",
        color: "#6366F1",
        bg: "#EDE9FE",
        icon: "cloud-offline-outline",
    },
};

export const RECONCILIATION_FILTER_TABS: FilterTab[] = [
    { key: "ALL", label: "All" },
    { key: "MATCHED", label: "Matched" },
    { key: "AMOUNT_MISMATCH", label: "Mismatch" },
    { key: "MISSING_IN_FFT", label: "Missing in FFT" },
    { key: "MISSING_IN_EXTERNAL", label: "Not in Horizon" },
];

// ─── Report Configuration ───────────────────────────────────────────────────────

export type ReportType = "BURN_RATE" | "TARGET_ACHIEVEMENT" | "VARIANCE" | "ACTIVITY_SUMMARY";
export type ReportPeriod = "MONTHLY" | "QUARTERLY" | "ANNUAL";

export const REPORT_TABS: { key: ReportType; label: string; icon: string }[] = [
    { key: "BURN_RATE", label: "Burn Rate", icon: "flame-outline" },
    { key: "TARGET_ACHIEVEMENT", label: "Targets", icon: "trophy-outline" },
    { key: "VARIANCE", label: "Variance", icon: "git-branch-outline" },
    { key: "ACTIVITY_SUMMARY", label: "Activity", icon: "list-outline" },
];

export const PERIOD_TABS: { key: ReportPeriod; label: string }[] = [
    { key: "MONTHLY", label: "Monthly" },
    { key: "QUARTERLY", label: "Quarterly" },
    { key: "ANNUAL", label: "Annual" },
];

// ─── Mock Data Constants ───────────────────────────────────────────────────────

export const TARGET_DATA = [
    {
        id: "tgt001",
        indicator: "WASH Beneficiaries Trained",
        budget: "Community Training Materials",
        planned: 500,
        actual: 320,
        unit: "beneficiaries",
        status: "ORANGE" as BudgetStatus,
    },
    {
        id: "tgt002",
        indicator: "Field Site Visits Completed",
        budget: "Field Transport",
        planned: 24,
        actual: 8,
        unit: "visits",
        status: "GREEN" as BudgetStatus,
    },
    {
        id: "tgt003",
        indicator: "Health Workers Supported",
        budget: "Health Worker Allowances",
        planned: 30,
        actual: 29,
        unit: "workers",
        status: "RED" as BudgetStatus,
    },
];

export const EXPORT_MSG = "Export functionality coming in production build.";

// ─── Version History (Mock) ─────────────────────────────────────────────────────

export const VERSION_HISTORY: Record<
    string,
    { version: number; date: string; allocated_usd: number; note: string }[]
> = {
    b001: [
        { version: 2, date: "2026-03-01", allocated_usd: 1884.7, note: "Current version" },
        { version: 1, date: "2026-01-15", allocated_usd: 1500.0, note: "Initial upload" },
    ],
    b002: [
        { version: 1, date: "2026-01-15", allocated_usd: 1130.37, note: "Initial upload" },
    ],
    b003: [
        { version: 1, date: "2026-01-15", allocated_usd: 753.58, note: "Initial upload" },
    ],
};
