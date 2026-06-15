import { BUDGET_LINES } from "../../data/mockData";
import { BudgetLine, BudgetStatus } from "./../../shared/types";

// DEPRECATED: Use shared utilities from `./_shared/utils` instead
export {
    formatDate,
    getCategoryIcon,
    getRouteLabel,
} from "../../shared/utils";

/**
 * Finds a budget line by its ID
 * @param budgetId - The ID of the budget line to find
 * @returns The budget line object or undefined if not found
 */
export function getBudgetLine(budgetId: string): BudgetLine | undefined {
    const budget = BUDGET_LINES.find((b) => b.id === budgetId);
    if (budget) {
        // Cast the budget to BudgetLine type since mock data has compatible values
        return {
            ...budget,
            status: budget.status as BudgetStatus
        } as BudgetLine;
    }
    return undefined;
}
