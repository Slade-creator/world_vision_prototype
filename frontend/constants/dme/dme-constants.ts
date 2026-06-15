import { DmeReviewStatus, FilterKey } from "./../../types/dme-types";

export const DME_STATUS_META: Record<
    DmeReviewStatus,
    { label: string; color: string; bg: string; icon: string }
> = {
    PENDING_DME: {
        label: "Awaiting Review",
        color: "#F59E0B",
        bg: "#FEF3C7",
        icon: "time-outline",
    },
    DME_APPROVED: {
        label: "DME Approved",
        color: "#10B981",
        bg: "#D1FAE5",
        icon: "checkmark-circle-outline",
    },
    FEEDBACK_REQUIRED: {
        label: "Feedback Sent",
        color: "#EF4444",
        bg: "#FEE2E2",
        icon: "chatbubble-ellipses-outline",
    },
};

export const FILTER_TABS: { key: FilterKey; label: string }[] = [
    { key: "ALL", label: "All" },
    { key: "PENDING_DME", label: "Pending" },
    { key: "DME_APPROVED", label: "Approved" },
    { key: "FEEDBACK_REQUIRED", label: "Feedback Sent" },
];
