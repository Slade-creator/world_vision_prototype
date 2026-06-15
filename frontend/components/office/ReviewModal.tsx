import React, { useState } from "react";
import {
    View,
    Text,
    Modal,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Transaction, ReviewStatus, IoniconName } from "./../../types/office/review";
import { STATUS_CONFIG } from "./../../constants/office/reviewConfig";
import { getBudgetLine, formatDate } from "./../../utils/office/reviewHelpers";
import { modalStyles } from "../../styles/office/reviewModalStyles";

interface ReviewModalProps {
    txn: Transaction | null;
    visible: boolean;
    onClose: () => void;
    onDecision: (
        txnId: string,
        decision: "FINANCE_APPROVED" | "NEEDS_CORRECTION" | "REJECTED",
        comment: string
    ) => void;
}

interface DetailRowProps {
    icon: IoniconName;
    label: string;
    value: string;
}

interface DecisionButtonProps {
    label: string;
    icon: IoniconName;
    color: string;
    bg: string;
    active: boolean;
    onPress: () => void;
}

const DetailRow: React.FC<DetailRowProps> = ({ icon, label, value }) => {
    return (
        <View style={modalStyles.detailRow}>
            <Ionicons name={icon} size={14} color="#9CA3AF" />
            <View style={{ flex: 1 }}>
                <Text style={modalStyles.detailLabel}>{label}</Text>
                <Text style={modalStyles.detailValue}>{value}</Text>
            </View>
        </View>
    );
};

const DecisionButton: React.FC<DecisionButtonProps> = ({
    label,
    icon,
    color,
    bg,
    active,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={[
                modalStyles.decisionBtn,
                { backgroundColor: active ? color : bg },
                active && { borderColor: color },
            ]}
            onPress={onPress}
            activeOpacity={0.75}
        >
            <Ionicons name={icon} size={20} color={active ? "#FFF" : color} />
            <Text
                style={[modalStyles.decisionBtnLabel, { color: active ? "#FFF" : color }]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export const ReviewModal: React.FC<ReviewModalProps> = ({
    txn,
    visible,
    onClose,
    onDecision,
}) => {
    const [comment, setComment] = useState("");
    const [activeDecision, setActiveDecision] = useState<
        "FINANCE_APPROVED" | "NEEDS_CORRECTION" | "REJECTED" | null
    >(null);

    if (!txn) return null;

    const budget = getBudgetLine(txn.budget_id);
    const status = STATUS_CONFIG[txn.review_status as keyof typeof STATUS_CONFIG];

    const handleSubmit = () => {
        if (!activeDecision) {
            Alert.alert("Select a decision", "Please choose Approve, Correction, or Reject.");
            return;
        }
        if (activeDecision !== "FINANCE_APPROVED" && !comment.trim()) {
            Alert.alert(
                "Comment required",
                "Please provide a reason when requesting correction or rejecting."
            );
            return;
        }
        onDecision(txn.id, activeDecision, comment.trim());
        setComment("");
        setActiveDecision(null);
    };

    const handleClose = () => {
        setComment("");
        setActiveDecision(null);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={handleClose}
        >
            <View style={modalStyles.container}>
                {/* Header */}
                <View style={modalStyles.header}>
                    <View>
                        <Text style={modalStyles.headerTitle}>Review Entry</Text>
                        <Text style={modalStyles.headerSub}>{txn.project_code}</Text>
                    </View>
                    <TouchableOpacity
                        style={modalStyles.closeBtn}
                        onPress={handleClose}
                        activeOpacity={0.75}
                    >
                        <Ionicons name="close" size={22} color="#374151" />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={modalStyles.scroll}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Current status */}
                    <View style={modalStyles.section}>
                        <View
                            style={[
                                modalStyles.statusBanner,
                                { backgroundColor: status.bg },
                            ]}
                        >
                            <Ionicons
                                name={status.icon}
                                size={18}
                                color={status.color}
                            />
                            <Text
                                style={[
                                    modalStyles.statusBannerText,
                                    { color: status.color },
                                ]}
                            >
                                {status.label}
                            </Text>
                        </View>
                    </View>

                    {/* Description */}
                    <View style={modalStyles.section}>
                        <Text style={modalStyles.fieldLabel}>Description</Text>
                        <Text style={modalStyles.fieldValue}>{txn.description}</Text>
                    </View>

                    {/* Amounts */}
                    <View style={modalStyles.amountRow}>
                        <View style={modalStyles.amountBox}>
                            <Text style={modalStyles.amountLabel}>Amount (ZMW)</Text>
                            <Text style={modalStyles.amountValue}>
                                K{txn.amount_zmw.toLocaleString()}
                            </Text>
                        </View>
                        <View
                            style={[
                                modalStyles.amountBox,
                                { borderLeftWidth: 1, borderLeftColor: "#F3F4F6" },
                            ]}
                        >
                            <Text style={modalStyles.amountLabel}>Amount (USD)</Text>
                            <Text style={modalStyles.amountValue}>
                                ${txn.amount_usd.toFixed(2)}
                            </Text>
                        </View>
                    </View>

                    {/* Details grid */}
                    <View style={modalStyles.section}>
                        <View style={modalStyles.detailGrid}>
                            <DetailRow
                                icon="person-outline"
                                label="Submitted by"
                                value={txn.df_name}
                            />
                            <DetailRow
                                icon="calendar-outline"
                                label="Date"
                                value={formatDate(txn.date)}
                            />
                            <DetailRow
                                icon="pricetag-outline"
                                label="Category"
                                value={txn.category}
                            />
                            <DetailRow
                                icon="git-branch-outline"
                                label="Route"
                                value={
                                    txn.route_type === "FINANCE_AND_DME"
                                        ? "Finance & DME"
                                        : "Finance Only"
                                }
                            />
                            <DetailRow
                                icon="card-outline"
                                label="Payment Status"
                                value={txn.transaction_status}
                            />
                            {budget && (
                                <>
                                    <DetailRow
                                        icon="wallet-outline"
                                        label="Budget Line"
                                        value={budget.line_item_name}
                                    />
                                    <DetailRow
                                        icon="code-slash-outline"
                                        label="TCode"
                                        value={budget.tcode}
                                    />
                                </>
                            )}
                        </View>
                    </View>

                    {/* Budget context */}
                    {budget && (
                        <View style={modalStyles.section}>
                            <Text style={modalStyles.sectionTitle}>Budget Context</Text>
                            <View style={modalStyles.budgetContext}>
                                <View style={modalStyles.budgetContextRow}>
                                    <Text style={modalStyles.budgetContextLabel}>
                                        Allocated
                                    </Text>
                                    <Text style={modalStyles.budgetContextValue}>
                                        K{budget.allocated_zmw.toLocaleString()}
                                    </Text>
                                </View>
                                <View style={modalStyles.budgetContextRow}>
                                    <Text style={modalStyles.budgetContextLabel}>
                                        Spent so far
                                    </Text>
                                    <Text style={modalStyles.budgetContextValue}>
                                        K{budget.spent_zmw.toLocaleString()}
                                    </Text>
                                </View>
                                <View style={modalStyles.budgetContextRow}>
                                    <Text style={modalStyles.budgetContextLabel}>
                                        Remaining
                                    </Text>
                                    <Text
                                        style={[
                                            modalStyles.budgetContextValue,
                                            {
                                                color:
                                                    budget.status === "RED"
                                                        ? "#EF4444"
                                                        : "#10B981",
                                            },
                                        ]}
                                    >
                                        K{budget.remaining_zmw.toLocaleString()}
                                    </Text>
                                </View>
                                <View style={modalStyles.budgetContextRow}>
                                    <Text style={modalStyles.budgetContextLabel}>
                                        Utilisation
                                    </Text>
                                    <Text
                                        style={[
                                            modalStyles.budgetContextValue,
                                            {
                                                color:
                                                    budget.status === "RED"
                                                        ? "#EF4444"
                                                        : budget.status === "ORANGE"
                                                        ? "#F59E0B"
                                                        : "#10B981",
                                            },
                                        ]}
                                    >
                                        {budget.utilisation_percent}%
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}

                    {/* Existing correction comment */}
                    {txn.correction_comment && (
                        <View style={modalStyles.section}>
                            <Text style={modalStyles.sectionTitle}>Previous Comment</Text>
                            <View style={modalStyles.prevComment}>
                                <Ionicons name="chatbox" size={14} color="#991B1B" />
                                <Text style={modalStyles.prevCommentText}>
                                    {txn.correction_comment}
                                </Text>
                            </View>
                        </View>
                    )}

                    {/* Decision buttons (only shown for PENDING) */}
                    {txn.review_status === "PENDING" && (
                        <View style={modalStyles.section}>
                            <Text style={modalStyles.sectionTitle}>Your Decision</Text>

                            <View style={modalStyles.decisionRow}>
                                <DecisionButton
                                    label="Approve"
                                    icon="checkmark-circle-outline"
                                    color="#065F46"
                                    bg="#D1FAE5"
                                    active={activeDecision === "FINANCE_APPROVED"}
                                    onPress={() => setActiveDecision("FINANCE_APPROVED")}
                                />
                                <DecisionButton
                                    label="Correction"
                                    icon="create-outline"
                                    color="#92400E"
                                    bg="#FEF3C7"
                                    active={activeDecision === "NEEDS_CORRECTION"}
                                    onPress={() =>
                                        setActiveDecision("NEEDS_CORRECTION")
                                    }
                                />
                                <DecisionButton
                                    label="Reject"
                                    icon="close-circle-outline"
                                    color="#991B1B"
                                    bg="#FEE2E2"
                                    active={activeDecision === "REJECTED"}
                                    onPress={() => setActiveDecision("REJECTED")}
                                />
                            </View>

                            {activeDecision &&
                                activeDecision !== "FINANCE_APPROVED" && (
                                    <View style={modalStyles.commentBox}>
                                        <Text style={modalStyles.commentLabel}>
                                            Comment{" "}
                                            <Text style={{ color: "#EF4444" }}>
                                                *
                                            </Text>
                                            <Text style={modalStyles.commentLabelSub}>
                                                {" "}
                                                (required)
                                            </Text>
                                        </Text>
                                        <TextInput
                                            style={modalStyles.commentInput}
                                            multiline
                                            numberOfLines={3}
                                            placeholder="Explain what needs to be corrected or why it is rejected…"
                                            placeholderTextColor="#9CA3AF"
                                            value={comment}
                                            onChangeText={setComment}
                                        />
                                    </View>
                                )}

                            <TouchableOpacity
                                style={[
                                    modalStyles.submitBtn,
                                    !activeDecision && modalStyles.submitBtnDisabled,
                                ]}
                                onPress={handleSubmit}
                                activeOpacity={0.8}
                                disabled={!activeDecision}
                            >
                                <Text style={modalStyles.submitBtnText}>
                                    Submit Decision
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <View style={{ height: 40 }} />
                </ScrollView>
            </View>
        </Modal>
    );
};
