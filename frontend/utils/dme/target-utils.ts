import { TargetStatus } from "./target-types";

export function getStatus(actual: number, planned: number): TargetStatus {
    const pct = (actual / planned) * 100;
    if (pct >= 80) return "ON_TRACK";
    if (pct >= 50) return "BEHIND";
    return "AT_RISK";
}

export function calculateProgress(actual: number, planned: number): number {
    return Math.round((actual / planned) * 100);
}

export function getStatusColor(status: TargetStatus): string {
    const colors = {
        ON_TRACK: "#10B981",
        BEHIND: "#F59E0B",
        AT_RISK: "#EF4444",
    };
    return colors[status];
}

export function calculateAverageAchievement(targets: Array<{ actual_value: number; planned_value: number }>): number {
    if (targets.length === 0) return 0;
    return Math.round(
        targets.reduce((s, t) => s + (t.actual_value / t.planned_value) * 100, 0) / targets.length
    );
}

export function calculateRemaining(planned: number, actual: number): number {
    return planned - actual;
}
