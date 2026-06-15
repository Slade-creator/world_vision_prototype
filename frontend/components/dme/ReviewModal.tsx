import React, { useState } from "react";
import {
    View,
    Text,
    Modal,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DmeTxn } from "./../../types/dme-types";
import { modalStyles } from "./../../styles/dme/dme-styles";
import { calculateTargetPercentage, getTargetProgressColor } from "./../../utils/dme/dme-utils";

interface ReviewModalProps {
    txn: DmeTxn | null;
    visible: boolean;
    onClose: () => void;
    onDecision: (id: string, decision: "DME_APPROVED" | "FEEDBACK_REQUIRED", comment: string) => void;
}

export function ReviewModal({
    txn,
    visible,
    onClose,
    onDecision,
}: ReviewModalProps) {
    const [comment, setComment] = useState("");

    if (!txn) return null;

    const handleDecision = (decision: "DME_APPROVED" | "FEEDBACK_REQUIRED") => {
        if (decision === "FEEDBACK_REQUIRED" && !comment.trim()) {
            Alert.alert("Comment Required", "Please describe what feedback is needed before sending.");
            return;
        }
        onDecision(txn.id, decision, comment.trim());
        setComment("");
    };

    const targetPct = txn.linked_target
        ? calculateTargetPercentage(txn.linked_target.planned_value, txn.linked_target.actual_value)
        : null;

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={modalStyles.overlay}>
                <View style={modalStyles.sheet}>
                    <View style={modalStyles.handle} />

                    {/* Title */}
                    <Text style={modalStyles.title}>Activity Review</Text>
                    <Text style={modalStyles.sub} numberOfLines={2}>{txn.description}</Text>

                    {/* Transaction detail */}
                    <View style={modalStyles.detailGrid}>
                        <View style={modalStyles.detailItem}>
                            <Text style={modalStyles.detailLabel}>Submitted by</Text>
                            <Text style={modalStyles.detailValue}>{txn.df_name}</Text>
                        </View>
                        <View style={modalStyles.detailItem}>
                            <Text style={modalStyles.detailLabel}>Date</Text>
                            <Text style={modalStyles.detailValue}>{txn.date}</Text>
                        </View>
                        <View style={modalStyles.detailItem}>
                            <Text style={modalStyles.detailLabel}>Amount</Text>
                            <Text style={[modalStyles.detailValue, { color: "#6366F1" }]}>
                                K{txn.amount_zmw.toLocaleString()}
                            </Text>
                        </View>
                        <View style={modalStyles.detailItem}>
                            <Text style={modalStyles.detailLabel}>Budget Line</Text>
                            <Text style={modalStyles.detailValue} numberOfLines={1}>
                                {txn.budget_name}
                            </Text>
                        </View>
                    </View>

                    {/* Linked target context — the core of DME review */}
                    {txn.linked_target && (
                        <View style={modalStyles.targetContext}>
                            <View style={modalStyles.targetContextHeader}>
                                <Ionicons name="trophy-outline" size={14} color="#6366F1" />
                                <Text style={modalStyles.targetContextTitle}>
                                    Linked Target
                                </Text>
                            </View>
                            <Text style={modalStyles.targetContextName}>
                                {txn.linked_target.indicator_name}
                            </Text>
                            <View style={modalStyles.targetContextBar}>
                                <View style={modalStyles.targetBarTrack}>
                                    <View
                                        style={[
                                            modalStyles.targetBarFill,
                                            {
                                                width: `${Math.min(targetPct!, 100)}%` as any,
                                                backgroundColor: getTargetProgressColor(targetPct!),
                                            },
                                        ]}
                                    />
                                </View>
                                <Text style={modalStyles.targetBarPct}>{targetPct}%</Text>
                            </View>
                            <Text style={modalStyles.targetContextValues}>
                                {txn.linked_target.actual_value} / {txn.linked_target.planned_value}{" "}
                                {txn.linked_target.unit} achieved
                            </Text>
                        </View>
                    )}

                    {/* Comment field */}
                    <Text style={modalStyles.fieldLabel}>
                        Comment{" "}
                        <Text style={{ color: "#9CA3AF" }}>(required for feedback)</Text>
                    </Text>
                    <TextInput
                        style={modalStyles.textArea}
                        value={comment}
                        onChangeText={setComment}
                        placeholder="Add notes on activity alignment, target progress, or issues…"
                        placeholderTextColor="#9CA3AF"
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                    />

                    {/* Actions */}
                    <View style={modalStyles.actions}>
                        <TouchableOpacity
                            style={modalStyles.cancelBtn}
                            onPress={onClose}
                            activeOpacity={0.75}
                        >
                            <Text style={modalStyles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[modalStyles.actionBtn, { backgroundColor: "#FEE2E2" }]}
                            onPress={() => handleDecision("FEEDBACK_REQUIRED")}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="chatbubble-ellipses-outline" size={15} color="#991B1B" />
                            <Text style={[modalStyles.actionBtnText, { color: "#991B1B" }]}>
                                Feedback
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[modalStyles.actionBtn, { backgroundColor: "#D1FAE5" }]}
                            onPress={() => handleDecision("DME_APPROVED")}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="checkmark-circle-outline" size={15} color="#065F46" />
                            <Text style={[modalStyles.actionBtnText, { color: "#065F46" }]}>
                                Approve
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
