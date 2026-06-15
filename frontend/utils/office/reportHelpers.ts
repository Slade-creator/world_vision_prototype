import { STATUS_COLOR, STATUS_BG } from "./../../constants/office/reportConstants";

export function getStatusColor(status: string): string {
    return STATUS_COLOR[status] ?? "#10B981";
}

export function getStatusBg(status: string): string {
    return STATUS_BG[status] ?? "#D1FAE5";
}

export function getBurnRateStatus(burnRate: number): "RED" | "ORANGE" | "GREEN" {
    if (burnRate >= 95) return "RED";
    if (burnRate >= 70) return "ORANGE";
    return "GREEN";
}

export function getStatusLabel(status: string): string {
    if (status === "RED") return "Critical";
    if (status === "ORANGE") return "Moderate";
    return "On Track";
}

export function getStatusTextColor(status: string): string {
    if (status === "RED") return "#991B1B";
    if (status === "ORANGE") return "#92400E";
    return "#065F46";
}

export function getTransactionStatusColor(reviewStatus: string): string {
    if (reviewStatus === "FULLY_APPROVED" || reviewStatus === "FINANCE_APPROVED") return "#10B981";
    if (reviewStatus === "PENDING") return "#F59E0B";
    if (reviewStatus === "NEEDS_CORRECTION") return "#EF4444";
    return "#6B7280";
}

export function formatCurrency(amount: number, symbol: string = "K"): string {
    return `${symbol}${amount.toLocaleString()}`;
}

export function formatUSD(zmwAmount: number, exchangeRate: number): string {
    return `$${(zmwAmount / exchangeRate).toFixed(2)} USD`;
}

export function formatPercentage(value: number): string {
    return `${value}%`;
}

export function calculatePercentage(actual: number, planned: number): number {
    return Math.round((actual / planned) * 100);
}
