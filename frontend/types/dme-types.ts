export type DmeReviewStatus = "PENDING_DME" | "DME_APPROVED" | "FEEDBACK_REQUIRED";

export interface DmeTxn {
    id: string;
    df_name: string;
    budget_name: string;
    project_code: string;
    date: string;
    amount_zmw: number;
    amount_usd: number;
    description: string;
    category: string;
    review_status: string;
    dme_status: DmeReviewStatus;
    dme_comment?: string;
    // linked target for context
    linked_target?: {
        indicator_name: string;
        planned_value: number;
        actual_value: number;
        unit: string;
    };
}

export type FilterKey = "ALL" | DmeReviewStatus;
