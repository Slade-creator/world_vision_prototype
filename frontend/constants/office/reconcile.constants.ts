// ─── Types ────────────────────────────────────────────────────────────────────

export type ExternalSystem = "HORIZON" | "SUN_SYSTEMS";
export type ReconciliationStatus =
    | "MATCHED"
    | "MISSING_IN_FFT"
    | "MISSING_IN_EXTERNAL"
    | "AMOUNT_MISMATCH";

export interface ReconciliationRecord {
    id: string;
    transaction_id: string | null;
    external_system: ExternalSystem;
    external_reference: string;
    external_amount_usd: number;
    fft_amount_usd: number | null;
    status: ReconciliationStatus;
    discrepancy_usd: number | null;
    resolution_note: string | null;
    resolved_by: string | null;
    resolved_at: string | null;
    date: string;
    description: string;
    project_code: string;
}

export type FilterStatus = "ALL" | ReconciliationStatus;

// ─── Mock reconciliation data ─────────────────────────────────────────────────

export const MOCK_RECONCILIATION: ReconciliationRecord[] = [
    {
        id: "rec001",
        transaction_id: "t003",
        external_system: "HORIZON",
        external_reference: "HZN-2026-0341",
        external_amount_usd: 30.14,
        fft_amount_usd: 30.14,
        status: "MATCHED",
        discrepancy_usd: null,
        resolution_note: null,
        resolved_by: null,
        resolved_at: null,
        date: "2026-04-01",
        description: "Office stationery for field reports",
        project_code: "ZM-2026-WASH",
    },
    {
        id: "rec002",
        transaction_id: "t002",
        external_system: "HORIZON",
        external_reference: "HZN-2026-0338",
        external_amount_usd: 124.00,
        fft_amount_usd: 120.56,
        status: "AMOUNT_MISMATCH",
        discrepancy_usd: 3.44,
        resolution_note: null,
        resolved_by: null,
        resolved_at: null,
        date: "2026-04-02",
        description: "Printed training manuals for WASH workshop",
        project_code: "ZM-2026-WASH",
    },
    {
        id: "rec003",
        transaction_id: null,
        external_system: "HORIZON",
        external_reference: "HZN-2026-0335",
        external_amount_usd: 45.20,
        fft_amount_usd: null,
        status: "MISSING_IN_FFT",
        discrepancy_usd: 45.20,
        resolution_note: null,
        resolved_by: null,
        resolved_at: null,
        date: "2026-03-31",
        description: "Vehicle maintenance — Kabwe field office",
        project_code: "ZM-2026-WASH",
    },
    {
        id: "rec004",
        transaction_id: "t001",
        external_system: "HORIZON",
        external_reference: null as any,
        external_amount_usd: null as any,
        fft_amount_usd: 56.52,
        status: "MISSING_IN_EXTERNAL",
        discrepancy_usd: 56.52,
        resolution_note: null,
        resolved_by: null,
        resolved_at: null,
        date: "2026-04-03",
        description: "Transport to Chibombo community meeting",
        project_code: "ZM-2026-WASH",
    },
    {
        id: "rec005",
        transaction_id: "t004",
        external_system: "HORIZON",
        external_reference: "HZN-2026-0330",
        external_amount_usd: 35.80,
        fft_amount_usd: 35.80,
        status: "MATCHED",
        discrepancy_usd: null,
        resolution_note: null,
        resolved_by: null,
        resolved_at: null,
        date: "2026-03-31",
        description: "Fuel for field vehicle",
        project_code: "ZM-2026-WASH",
    },
];

// ─── Constants ────────────────────────────────────────────────────────────────

export const STATUS_META: Record<
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

export const FILTER_TABS: { key: FilterStatus; label: string }[] = [
    { key: "ALL", label: "All" },
    { key: "MATCHED", label: "Matched" },
    { key: "AMOUNT_MISMATCH", label: "Mismatch" },
    { key: "MISSING_IN_FFT", label: "Missing in FFT" },
    { key: "MISSING_IN_EXTERNAL", label: "Not in Horizon" },
];
