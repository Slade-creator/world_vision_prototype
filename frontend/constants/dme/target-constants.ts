import { TargetStatus, TargetFilter } from "./../../types/target-types";

export const STATUS_META: { [key in TargetStatus]: { label: string; color: string; bg: string; icon: string } } = {
    ON_TRACK:  { label: "On Track",  color: "#10B981", bg: "#D1FAE5", icon: "checkmark-circle-outline" },
    BEHIND:    { label: "Behind",    color: "#F59E0B", bg: "#FEF3C7", icon: "time-outline" },
    AT_RISK:   { label: "At Risk",   color: "#EF4444", bg: "#FEE2E2", icon: "alert-circle-outline" },
};

export const FILTER_TABS: { key: TargetFilter; label: string }[] = [
    { key: "ALL",      label: "All" },
    { key: "ON_TRACK", label: "On Track" },
    { key: "BEHIND",   label: "Behind" },
    { key: "AT_RISK",  label: "At Risk" },
];
