export interface Target {
    id: string;
    budget_id: string;
    budget_name: string;
    project_code: string;
    indicator_code: string;
    indicator_name: string;
    planned_value: number;
    actual_value: number;
    unit: string;
    period_label: string;
    created_by: string;
}

export type TargetFilter = "ALL" | "ON_TRACK" | "BEHIND" | "AT_RISK";
export type TargetStatus = "ON_TRACK" | "BEHIND" | "AT_RISK";
