import React from "react";
import { Ionicons } from "@expo/vector-icons";

// ─── Common Type Definitions ────────────────────────────────────────────────

/**
 * Icon name type for Ionicons
 */
export type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

/**
 * Budget status type - used across budget, report, and review modules
 */
export type BudgetStatus = "GREEN" | "ORANGE" | "RED";

/**
 * Review status type - used in review and transaction modules
 */
export type ReviewStatus = 
    | "PENDING" 
    | "FINANCE_APPROVED" 
    | "DME_APPROVED"  
    | "FULLY_APPROVED" 
    | "REJECTED" 
    | "NEEDS_CORRECTION";

/**
 * Reconciliation status type
 */
export type ReconciliationStatus =
    | "MATCHED"
    | "AMOUNT_MISMATCH"
    | "MISSING_IN_FFT"
    | "MISSING_IN_EXTERNAL";

/**
 * Budget line interface - shared across budget, report, and review modules
 */
export interface BudgetLine {
    id: string;
    line_item_name: string;
    tcode: string;
    project_code: string;
    allocated_zmw: number;
    allocated_usd: number;
    spent_zmw: number;
    spent_usd: number;
    remaining_zmw: number;
    remaining_usd: number;
    utilisation_percent: number;
    status: BudgetStatus;
    version?: number;
}

/**
 * Transaction interface - shared across review, report, and dashboard modules
 */
export interface Transaction {
    id: string;
    local_id: string;
    df_user_id: string;
    df_name: string;
    budget_id: string;
    budget_name: string;
    project_code: string;
    date: string;
    amount_zmw: number;
    amount_usd: number;
    category: "ADMIN" | "ACTIVITY";
    route_type: "FINANCE_ONLY" | "FINANCE_AND_DME";
    transaction_status: "REQUEST_RAISED" | "PAYMENT_PENDING" | "PAID";
    review_status: ReviewStatus;
    description: string;
    document_url: string | null;
    submitted_at: string;
    correction_comment?: string;
}

/**
 * Status configuration interface for consistent UI styling
 */
export interface StatusConfig {
    label: string;
    color: string;
    bg: string;
    icon: IoniconName;
}

/**
 * Filter tab configuration
 */
export interface FilterTabConfig<T extends string> {
    key: T | "ALL";
    label: string;
}

/**
 * Reconciliation record interface
 */
export interface ReconciliationRecord {
    id: string;
    date: string;
    description: string;
    amount_zmw: number;
    amount_usd: number;
    status: ReconciliationStatus;
    fft_ref?: string;
    external_ref?: string;
    resolution_note?: string;
    resolved_by?: string;
    resolved_at?: string;
}

/**
 * Report data interface
 */
export interface ReportData {
    totalAllocated: number;
    totalSpent: number;
    totalRemaining: number;
    overallBurnRate: number;
    totalApproved: number;
    approvedTxns: Transaction[];
}

/**
 * Target interface for DME module
 */
export interface Target {
    id: string;
    indicator: string;
    budget: string;
    planned: number;
    actual: number;
    unit: string;
    status: BudgetStatus;
}

/**
 * Variance item interface for reports
 */
export interface VarianceItem extends BudgetLine {
    expectedPct: number;
    diff: number;
}