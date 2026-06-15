// DEPRECATED: Use shared constants from `./_shared/constants` instead
export type { BudgetStatus } from "../../shared";
export {
    BUDGET_STATUS_COLOR as STATUS_COLOR,
    BUDGET_STATUS_BG as STATUS_BG,
    BUDGET_STATUS_LABEL as STATUS_LABEL,
    BUDGET_STATUS_THRESHOLDS as STATUS_THRESHOLDS,
} from "./../../shared/constants";

// Mock version history per budget line
export const VERSION_HISTORY: Record<
    string,
    { version: number; date: string; allocated_usd: number; note: string }[]
> = {
    b001: [
        { version: 2, date: "2026-03-01", allocated_usd: 1884.7, note: "Current version" },
        { version: 1, date: "2026-01-15", allocated_usd: 1500.0, note: "Initial upload" },
    ],
    b002: [
        { version: 1, date: "2026-01-15", allocated_usd: 1130.37, note: "Initial upload" },
    ],
    b003: [
        { version: 1, date: "2026-01-15", allocated_usd: 753.58, note: "Initial upload" },
    ],
};

// Icon type from Ionicons - type definition for use in component props
export type IoniconName = React.ComponentProps<typeof import("@expo/vector-icons").Ionicons>["name"];
