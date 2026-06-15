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

export const STATUS_COLOR: Record<string, string> = {
    RED: "#EF4444",
    ORANGE: "#F59E0B",
    GREEN: "#10B981",
};

export const STATUS_BG: Record<string, string> = {
    RED: "#FEE2E2",
    ORANGE: "#FEF3C7",
    GREEN: "#D1FAE5",
};

export const TARGET_DATA = [
    {
        id: "tgt001",
        indicator: "WASH Beneficiaries Trained",
        budget: "Community Training Materials",
        planned: 500,
        actual: 320,
        unit: "beneficiaries",
        status: "ORANGE" as const,
    },
    {
        id: "tgt002",
        indicator: "Field Site Visits Completed",
        budget: "Field Transport",
        planned: 24,
        actual: 8,
        unit: "visits",
        status: "GREEN" as const,
    },
    {
        id: "tgt003",
        indicator: "Health Workers Supported",
        budget: "Health Worker Allowances",
        planned: 30,
        actual: 29,
        unit: "workers",
        status: "RED" as const,
    },
];

export const EXPORT_MSG = "Export functionality coming in production build.";
