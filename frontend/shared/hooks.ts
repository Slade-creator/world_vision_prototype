import { useState, useMemo, useCallback } from "react";
import { BudgetStatus, ReviewStatus, ReconciliationStatus, BudgetLine, Transaction, ReconciliationRecord } from "./types";
import { filterTransactionsByStatus, countTransactionsByStatus, filterBudgetsByStatus, countBudgetsByStatus } from "./utils";

// ─── Common Hook Patterns ───────────────────────────────────────────────────

/**
 * Hook for managing filter state with counts
 * @param items - Array of items to filter
 * @param filterFn - Function to filter items by status
 * @param countFn - Function to count items by status
 * @returns Filter state and filtered items
 */
export function useFilterState<T, S extends string>(
    items: T[],
    filterFn: (items: T[], filter: S | "ALL") => T[],
    countFn: (items: T[]) => Record<S | "ALL", number>
) {
    const [activeFilter, setActiveFilter] = useState<S | "ALL">("ALL");

    const filtered = useMemo(
        () => filterFn(items, activeFilter),
        [items, activeFilter, filterFn]
    );

    const counts = useMemo(
        () => countFn(items),
        [items, countFn]
    );

    return {
        activeFilter,
        setActiveFilter,
        filtered,
        counts,
    };
}

/**
 * Hook for managing modal state
 * @param initialSelectedItem - Initially selected item (optional)
 * @returns Modal state and handlers
 */
export function useModalState<T>(initialSelectedItem: T | null = null) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<T | null>(initialSelectedItem);

    const openModal = useCallback((item: T) => {
        setSelectedItem(item);
        setModalVisible(true);
    }, []);

    const closeModal = useCallback(() => {
        setModalVisible(false);
        setSelectedItem(null);
    }, []);

    return {
        modalVisible,
        setModalVisible,
        selectedItem,
        setSelectedItem,
        openModal,
        closeModal,
    };
}

/**
 * Hook for transaction filtering
 * @param transactions - Array of transactions
 * @returns Filter state and filtered transactions
 */
export function useTransactionFilter(transactions: Transaction[]) {
    return useFilterState(
        transactions,
        filterTransactionsByStatus,
        countTransactionsByStatus
    );
}

/**
 * Hook for budget filtering
 * @param budgets - Array of budget lines
 * @returns Filter state and filtered budgets
 */
export function useBudgetFilter(budgets: BudgetLine[]) {
    return useFilterState(
        budgets,
        filterBudgetsByStatus,
        (items) => {
            const counts = countBudgetsByStatus(items);
            return {
                ALL: items.length,
                RED: counts.criticalCount,
                ORANGE: counts.lowCount,
                GREEN: counts.onTrackCount,
            };
        }
    );
}

/**
 * Hook for managing form state with validation
 * @param initialValues - Initial form values
 * @param validateFn - Validation function (optional)
 * @returns Form state and handlers
 */
export function useFormState<T extends Record<string, any>>(
    initialValues: T,
    validateFn?: (values: T) => Record<keyof T, string>
) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);
    const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);

    const handleChange = useCallback((field: keyof T, value: any) => {
        setValues(prev => ({ ...prev, [field]: value }));
        setTouched(prev => ({ ...prev, [field]: true }));
        
        if (validateFn) {
            const newErrors = validateFn({ ...values, [field]: value });
            setErrors(newErrors);
        }
    }, [values, validateFn]);

    const handleBlur = useCallback((field: keyof T) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        
        if (validateFn) {
            const newErrors = validateFn(values);
            setErrors(newErrors);
        }
    }, [values, validateFn]);

    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({} as Record<keyof T, string>);
        setTouched({} as Record<keyof T, boolean>);
    }, [initialValues]);

    const isValid = useMemo(() => {
        if (!validateFn) return true;
        const currentErrors = validateFn(values);
        return Object.values(currentErrors).every(error => !error);
    }, [values, validateFn]);

    return {
        values,
        errors,
        touched,
        isValid,
        handleChange,
        handleBlur,
        resetForm,
        setValues,
    };
}

/**
 * Hook for managing loading state with error handling
 * @param asyncFn - Async function to execute
 * @returns Loading state and execute function
 */
export function useAsync<T extends any[], R>(
    asyncFn: (...args: T) => Promise<R>
) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (...args: T): Promise<R | null> => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await asyncFn(...args);
            setLoading(false);
            return result;
        } catch (err) {
            setLoading(false);
            setError(err instanceof Error ? err.message : "An error occurred");
            return null;
        }
    }, [asyncFn]);

    return {
        loading,
        error,
        execute,
        setError,
    };
}