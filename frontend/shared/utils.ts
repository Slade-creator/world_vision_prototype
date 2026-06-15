import { BudgetStatus, ReviewStatus, ReconciliationStatus, BudgetLine, Transaction } from "./types";
import { BUDGET_STATUS_THRESHOLDS } from "./constants";

// ─── Formatting Utilities ───────────────────────────────────────────────────

export function formatCurrency(value: number, decimals: number = 2): string {
    return value.toLocaleString(undefined, { maximumFractionDigits: decimals });
}

export function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export function formatDateTime(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// ─── Status Calculation Utilities ───────────────────────────────────────────

export function getBudgetStatus(percent: number): BudgetStatus {
    if (percent >= BUDGET_STATUS_THRESHOLDS.CRITICAL) return "RED";
    if (percent >= BUDGET_STATUS_THRESHOLDS.WARNING) return "ORANGE";
    return "GREEN";
}

export function calculateBudgetStats(budgets: BudgetLine[]) {
    const totalAllocated = budgets.reduce((sum, b) => sum + b.allocated_zmw, 0);
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent_zmw, 0);
    const totalRemaining = totalAllocated - totalSpent;
    const overallPercent = totalAllocated > 0 ? Math.round((totalSpent / totalAllocated) * 100) : 0;

    return { totalAllocated, totalSpent, totalRemaining, overallPercent };
}

export function countBudgetsByStatus(budgets: BudgetLine[]) {
    return {
        criticalCount: budgets.filter((b) => b.status === "RED").length,
        lowCount: budgets.filter((b) => b.status === "ORANGE").length,
        onTrackCount: budgets.filter((b) => b.status === "GREEN").length,
    };
}

export function filterBudgetsByStatus(budgets: BudgetLine[], filter: BudgetStatus | "ALL") {
    return filter === "ALL" 
        ? budgets 
        : budgets.filter((b) => b.status === filter);
}

// ─── Transaction Utilities ──────────────────────────────────────────────────

export function countTransactionsByStatus(transactions: Transaction[]) {
    return {
        ALL: transactions.length,
        PENDING: transactions.filter((t) => t.review_status === "PENDING").length,
        NEEDS_CORRECTION: transactions.filter((t) => t.review_status === "NEEDS_CORRECTION").length,
        DME_APPROVED: transactions.filter((t) => t.review_status === "DME_APPROVED").length,
        FINANCE_APPROVED: transactions.filter((t) => t.review_status === "FINANCE_APPROVED").length,
        FULLY_APPROVED: transactions.filter((t) => t.review_status === "FULLY_APPROVED").length,
        REJECTED: transactions.filter((t) => t.review_status === "REJECTED").length,
    };
}

/**
 * Filters transactions by review status
 * @param transactions - Array of transactions
 * @param filter - Status filter or "ALL"
 * @returns Filtered array of transactions
 */
export function filterTransactionsByStatus(transactions: Transaction[], filter: ReviewStatus | "ALL") {
    return filter === "ALL"
        ? transactions
        : transactions.filter((t) => t.review_status === filter);
}

// ─── Validation Utilities ───────────────────────────────────────────────────

/**
 * Validates if a numeric string is a valid positive amount
 * @param value - String value to validate
 * @returns True if valid positive number, false otherwise
 */
export function isValidAmount(value: string): boolean {
    const num = Number(value);
    return !isNaN(num) && num > 0;
}

/**
 * Validates email format
 * @param email - Email string to validate
 * @returns True if valid email format, false otherwise
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ─── Helper Functions ───────────────────────────────────────────────────────

/**
 * Gets category icon based on category string
 * @param category - Transaction category
 * @returns Ionicons icon name
 */
export function getCategoryIcon(category: string): "business-outline" | "people-outline" {
    return category === "ADMIN" ? "business-outline" : "people-outline";
}

/**
 * Gets route label based on route type
 * @param routeType - Route type string
 * @returns Human-readable route label
 */
export function getRouteLabel(routeType: string): string {
    return routeType === "FINANCE_AND_DME" ? "Finance & DME" : "Finance Only";
}

/**
 * Calculates percentage with safe division
 * @param numerator - Numerator value
 * @param denominator - Denominator value
 * @returns Percentage (0-100) or 0 if denominator is 0
 */
export function safePercentage(numerator: number, denominator: number): number {
    return denominator === 0 ? 0 : Math.round((numerator / denominator) * 100);
}

/**
 * Debounces a function call
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
    let timeout: ReturnType<typeof setTimeout>;
    return ((...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    }) as T;
}