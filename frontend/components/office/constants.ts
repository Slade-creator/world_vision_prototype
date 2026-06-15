// ─── Burn Rate Status & Colors ────────────────────────────────────────────

export type BurnStatus = "GREEN" | "ORANGE" | "RED";

export const BURN_COLOR: Record<BurnStatus, string> = {
    GREEN:  "#10B981",
    ORANGE: "#F59E0B",
    RED:    "#EF4444",
};

export function getBurnStatus(percent: number): BurnStatus {
    if (percent >= 90) return "RED";
    if (percent >= 70) return "ORANGE";
    return "GREEN";
}

export function getBurnStatusLabel(status: BurnStatus): string {
    switch (status) {
        case "GREEN":
            return "On Track";
        case "ORANGE":
            return "Monitor";
        case "RED":
            return "High Burn";
    }
}

// ─── Icon Types ────────────────────────────────────────────────────────────

export type IoniconName = React.ComponentProps<typeof import("@expo/vector-icons").Ionicons>["name"];
