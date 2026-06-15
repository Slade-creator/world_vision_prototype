import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ReconciliationRecord, STATUS_META } from "../../constants/office/reconcile.constants";
import { modalStyles } from "../../styles/office/reconcile.styles";

interface ResolutionModalProps {
    record: ReconciliationRecord | null;
    visible: boolean;
    onClose: () => void;
    onSubmit: (id: string, note: string) => void;
}

export function ResolutionModal({
    record,
    visible,
    onClose,
    onSubmit,
}: ResolutionModalProps) {
    const [note, setNote] = useState("");

    if (!record) return null;
    const meta = STATUS_META[record.status];

    const handleSubmit = () => {
        if (!note.trim()) {
            Alert.alert("Required", "Please enter a resolution explanation.");
            return;
        }
        onSubmit(record.id, note.trim());
        setNote("");
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={modalStyles.overlay}>
                <View style={modalStyles.sheet}>
                    <View style={modalStyles.handle} />

                    <Text style={modalStyles.title}>Resolve Discrepancy</Text>
                    <Text style={modalStyles.sub}>{record.description}</Text>

                    <View style={[modalStyles.statusRow, { backgroundColor: meta.bg }]}>
                        <Ionicons name={meta.icon as any} size={14} color={meta.color} />
                        <Text style={[modalStyles.statusText, { color: meta.color }]}>
                            {meta.label}
                        </Text>
                        {record.discrepancy_usd != null && (
                            <Text style={[modalStyles.statusText, { color: meta.color, marginLeft: "auto" as any }]}>
                                ${record.discrepancy_usd.toFixed(2)} discrepancy
                            </Text>
                        )}
                    </View>

                    {/* Amount comparison */}
                    <View style={modalStyles.compareRow}>
                        <View style={modalStyles.compareBox}>
                            <Text style={modalStyles.compareLabel}>Horizon</Text>
                            <Text style={modalStyles.compareValue}>
                                {record.external_amount_usd != null
                                    ? `$${record.external_amount_usd.toFixed(2)}`
                                    : "Not found"}
                            </Text>
                        </View>
                        <Ionicons name="arrow-forward" size={16} color="#94A3B8" />
                        <View style={modalStyles.compareBox}>
                            <Text style={modalStyles.compareLabel}>FFT</Text>
                            <Text style={modalStyles.compareValue}>
                                {record.fft_amount_usd != null
                                    ? `$${record.fft_amount_usd.toFixed(2)}`
                                    : "Not found"}
                            </Text>
                        </View>
                    </View>

                    <Text style={modalStyles.fieldLabel}>Resolution Explanation *</Text>
                    <TextInput
                        style={modalStyles.textArea}
                        value={note}
                        onChangeText={setNote}
                        placeholder="Explain the discrepancy and how it has been resolved…"
                        placeholderTextColor="#9CA3AF"
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />

                    <View style={modalStyles.actions}>
                        <TouchableOpacity
                            style={modalStyles.cancelBtn}
                            onPress={onClose}
                            activeOpacity={0.75}
                        >
                            <Text style={modalStyles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={modalStyles.submitBtn}
                            onPress={handleSubmit}
                            activeOpacity={0.8}
                        >
                            <Text style={modalStyles.submitText}>Mark Resolved</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
