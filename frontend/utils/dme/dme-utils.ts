import { TRANSACTIONS, TARGETS } from "./../../data/mockData";
import { DmeTxn, DmeReviewStatus } from "./../../types/dme-types";

export function buildDmeQueue(): DmeTxn[] {
    return TRANSACTIONS.filter(
        (t) => t.category === "ACTIVITY" && t.route_type === "FINANCE_AND_DME"
    ).map((t) => {
        // Link to a target via budget_id for context
        const target = TARGETS.find((tgt) => tgt.budget_id === t.budget_id);
        const dmeStatus: DmeReviewStatus =
            t.review_status === "FULLY_APPROVED"
                ? "DME_APPROVED"
                : t.review_status === "NEEDS_CORRECTION"
                ? "FEEDBACK_REQUIRED"
                : "PENDING_DME";
        return {
            ...t,
            dme_status: dmeStatus,
            linked_target: target
                ? {
                      indicator_name: target.indicator_name,
                      planned_value: target.planned_value,
                      actual_value: target.actual_value,
                      unit: target.unit,
                  }
                : undefined,
        };
    });
}

export function calculateTargetPercentage(plannedValue: number, actualValue: number): number {
    return Math.round((actualValue / plannedValue) * 100);
}

export function getTargetProgressColor(percentage: number): string {
    if (percentage >= 80) return "#10B981";
    if (percentage >= 50) return "#F59E0B";
    return "#EF4444";
}
