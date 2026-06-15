import React, { useState } from "react";
import {
    View,
    Text,
    Modal,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BUDGET_LINES } from "../../data/mockData";
import { addTargetModalStyles } from "./../../styles/dme/target-styles";

interface AddTargetModalProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (data: {
        budget_id: string;
        indicator_code: string;
        indicator_name: string;
        planned_value: string;
        unit: string;
    }) => void;
}

export function AddTargetModal({ visible, onClose, onAdd }: AddTargetModalProps) {
    const [budgetId, setBudgetId]           = useState("");
    const [indicatorCode, setIndicatorCode] = useState("");
    const [indicatorName, setIndicatorName] = useState("");
    const [plannedValue, setPlannedValue]   = useState("");
    const [unit, setUnit]                   = useState("");

    const handleSubmit = () => {
        if (!budgetId || !indicatorCode || !indicatorName || !plannedValue || !unit) {
            Alert.alert("Incomplete", "Please fill in all fields before saving.");
            return;
        }
        if (isNaN(Number(plannedValue)) || Number(plannedValue) <= 0) {
            Alert.alert("Invalid Value", "Planned value must be a positive number.");
            return;
        }
        onAdd({ budget_id: budgetId, indicator_code: indicatorCode, indicator_name: indicatorName, planned_value: plannedValue, unit });
        setBudgetId(""); setIndicatorCode(""); setIndicatorName(""); setPlannedValue(""); setUnit("");
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={addTargetModalStyles.overlay}>
                <View style={addTargetModalStyles.sheet}>
                    <View style={addTargetModalStyles.handle} />
                    <Text style={addTargetModalStyles.title}>Add Performance Target</Text>
                    <Text style={addTargetModalStyles.sub}>Link a measurable output to a budget line</Text>

                    {/* Budget line picker (simplified as text input for prototype) */}
                    <Text style={addTargetModalStyles.fieldLabel}>Budget Line *</Text>
                    <View style={addTargetModalStyles.pickerWrap}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }}>
                            {BUDGET_LINES.map((b) => (
                                <TouchableOpacity
                                    key={b.id}
                                    style={[
                                        addTargetModalStyles.pickerChip,
                                        budgetId === b.id && addTargetModalStyles.pickerChipActive,
                                    ]}
                                    onPress={() => setBudgetId(b.id)}
                                    activeOpacity={0.75}
                                >
                                    <Text
                                        style={[
                                            addTargetModalStyles.pickerChipText,
                                            budgetId === b.id && { color: "#FFFFFF" },
                                        ]}
                                        numberOfLines={1}
                                    >
                                        {b.line_item_name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <Text style={addTargetModalStyles.fieldLabel}>Indicator Code *</Text>
                    <TextInput
                        style={addTargetModalStyles.input}
                        value={indicatorCode}
                        onChangeText={setIndicatorCode}
                        placeholder="e.g. WASH-IND-04"
                        placeholderTextColor="#9CA3AF"
                        autoCapitalize="characters"
                    />

                    <Text style={addTargetModalStyles.fieldLabel}>Indicator Name *</Text>
                    <TextInput
                        style={addTargetModalStyles.input}
                        value={indicatorName}
                        onChangeText={setIndicatorName}
                        placeholder="e.g. Households with clean water access"
                        placeholderTextColor="#9CA3AF"
                    />

                    <View style={addTargetModalStyles.rowFields}>
                        <View style={{ flex: 1 }}>
                            <Text style={addTargetModalStyles.fieldLabel}>Planned Value *</Text>
                            <TextInput
                                style={addTargetModalStyles.input}
                                value={plannedValue}
                                onChangeText={setPlannedValue}
                                placeholder="e.g. 200"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={addTargetModalStyles.fieldLabel}>Unit *</Text>
                            <TextInput
                                style={addTargetModalStyles.input}
                                value={unit}
                                onChangeText={setUnit}
                                placeholder="e.g. households"
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                    </View>

                    <View style={addTargetModalStyles.actions}>
                        <TouchableOpacity style={addTargetModalStyles.cancelBtn} onPress={onClose} activeOpacity={0.75}>
                            <Text style={addTargetModalStyles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={addTargetModalStyles.submitBtn} onPress={handleSubmit} activeOpacity={0.8}>
                            <Ionicons name="add-circle-outline" size={16} color="#FFFFFF" />
                            <Text style={addTargetModalStyles.submitText}>Save Target</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
