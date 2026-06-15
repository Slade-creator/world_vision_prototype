import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IoniconName } from "./../../constants/office/budgetConstants";
import { upload } from "../../styles/office/upload.styles";

interface InputFieldProps extends TextInputProps {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (value: string) => void;
    icon: IoniconName;
    keyboardType?: TextInputProps["keyboardType"];
    required?: boolean;
}

/**
 * Reusable form input field with label and icon
 * Displays a required indicator if needed
 */
export function InputField({
    label,
    placeholder,
    value,
    onChangeText,
    icon,
    keyboardType,
    required = true,
    ...rest
}: InputFieldProps) {
    return (
        <View style={upload.inputWrap}>
            <Text style={upload.inputLabel}>
                {label} {required && <Text style={{ color: "#EF4444" }}>*</Text>}
            </Text>
            <View style={upload.inputRow}>
                <Ionicons name={icon} size={16} color="#9CA3AF" style={{ marginLeft: 12 }} />
                <TextInput
                    style={upload.input}
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType ?? "default"}
                    {...rest}
                />
            </View>
        </View>
    );
}
