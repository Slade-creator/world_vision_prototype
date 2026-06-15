import { TRANSACTIONS, TARGETS } from "../../data/mockData";
import { THRESHOLD } from "../../constants/dme/dmeConstants";

export function getTargetStatus(actual: number, planned: number): "GREEN" | "ORANGE" | "RED" {
    const pct = (actual / planned) * 100;
    if (pct >= THRESHOLD.ON_TRACK) return "GREEN";
    if (pct >= THRESHOLD.AT_RISK) return "ORANGE";
    return "RED";
}

export function getAchievementPercentage(actual: number, planned: number): number {
    return (actual / planned) * 100;
}

export function filterDmeQueue() {
    return TRANSACTIONS.filter(
        (t) =>
            t.category === "ACTIVITY" &&
            t.route_type === "FINANCE_AND_DME" &&
            t.review_status === "FINANCE_APPROVED"
    );
}

export function groupTargetsByStatus() {
    return {
        atRisk: TARGETS.filter((t) => getTargetStatus(t.actual_value, t.planned_value) === "RED"),
        behind: TARGETS.filter((t) => getTargetStatus(t.actual_value, t.planned_value) === "ORANGE"),
        onTrack: TARGETS.filter((t) => getTargetStatus(t.actual_value, t.planned_value) === "GREEN"),
    };
}

export function calculateAverageAchievement(): number {
    if (TARGETS.length === 0) return 0;
    return Math.round(
        TARGETS.reduce((sum, t) => sum + getAchievementPercentage(t.actual_value, t.planned_value), 0) /
            TARGETS.length
    );
}

export function getPluralLabel(count: number, singular: string, plural: string): string {
    return count === 1 ? singular : plural;
}
