// Status configuration for transaction reviews
export const STATUS_CONFIG: Record<
    string,
    { label: string; bg: string; color: string; icon: string }
> = {
    PENDING: {
        label: "Pending",
        bg: "#FEF3C7",
        color: "#92400E",
        icon: "time-outline",
    },
    FINANCE_APPROVED: {
        label: "Partial",
        bg: "#DBEAFE",
        color: "#1E40AF",
        icon: "checkmark-outline",
    },
    FULLY_APPROVED: {
        label: "Approved",
        bg: "#D1FAE5",
        color: "#065F46",
        icon: "checkmark-circle-outline",
    },
    NEEDS_CORRECTION: {
        label: "Correction",
        bg: "#FEE2E2",
        color: "#991B1B",
        icon: "alert-circle-outline",
    },
    REJECTED: {
        label: "Rejected",
        bg: "#FEE2E2",
        color: "#991B1B",
        icon: "close-circle-outline",
    },
};

// Filter tab configuration
export type FilterStatus =
    | "ALL"
    | "PENDING"
    | "FINANCE_APPROVED"
    | "FULLY_APPROVED"
    | "NEEDS_CORRECTION"
    | "REJECTED";

export const FILTER_TABS: { label: string; value: FilterStatus }[] = [
    { label: "All", value: "ALL" },
    { label: "Pending", value: "PENDING" },
    { label: "Partial", value: "FINANCE_APPROVED" },
    { label: "Approved", value: "FULLY_APPROVED" },
    { label: "Correction", value: "NEEDS_CORRECTION" },
];

// Format date utility
export function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}
