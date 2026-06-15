import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Modal,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EXCHANGE_RATE } from "../../data/mockData";
import { isValidAmount } from "./../../utils/office/budgetHelpers";
import { modal } from "./../../styles/office/modal.styles";
import { upload } from "../../styles/office/upload.styles";
import { InputField } from "./InputField";

interface UploadModalProps {
    visible: boolean;
    onClose: () => void;
    onUpload: (data: {
        project_code: string;
        line_item_name: string;
        tcode: string;
        allocated_usd: string;
    }) => void;
}

/**
 * Modal for uploading new budget lines
 * Supports both manual entry and file upload (UI only for file upload)
 */
export function UploadModal({ visible, onClose, onUpload }: UploadModalProps) {
    const [projectCode, setProjectCode] = useState("");
    const [lineItem, setLineItem] = useState("");
    const [tcode, setTcode] = useState("");
    const [allocatedUsd, setAllocatedUsd] = useState("");
    const [method, setMethod] = useState<"manual" | "file">("manual");

    const handleSubmit = () => {
        if (!projectCode.trim() || !lineItem.trim() || !tcode.trim() || !allocatedUsd.trim()) {
            Alert.alert("Missing fields", "Please fill in all required fields.");
            return;
        }
        if (!isValidAmount(allocatedUsd)) {
            Alert.alert("Invalid amount", "Please enter a valid USD amount.");
            return;
        }
        onUpload({
            project_code: projectCode,
            line_item_name: lineItem,
            tcode,
            allocated_usd: allocatedUsd,
        });
        resetForm();
    };

    const resetForm = () => {
        setProjectCode("");
        setLineItem("");
        setTcode("");
        setAllocatedUsd("");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const zmwAmount =
        allocatedUsd && !isNaN(Number(allocatedUsd))
            ? (Number(allocatedUsd) * EXCHANGE_RATE.zmw_to_usd).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
              })
            : null;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={handleClose}
        >
            <View style={modal.container}>
                <View style={modal.header}>
                    <View>
                        <Text style={modal.headerTitle}>Upload Budget</Text>
                        <Text style={modal.headerSub}>Add a new budget line item</Text>
                    </View>
                    <TouchableOpacity style={modal.closeBtn} onPress={handleClose}>
                        <Ionicons name="close" size={22} color="#374151" />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={modal.scroll}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Method toggle */}
                    <View style={modal.section}>
                        <Text style={modal.sectionTitle}>Upload Method</Text>
                        <View style={upload.methodRow}>
                            <TouchableOpacity
                                style={[
                                    upload.methodBtn,
                                    method === "manual" && upload.methodBtnActive,
                                ]}
                                onPress={() => setMethod("manual")}
                            >
                                <Ionicons
                                    name="create-outline"
                                    size={18}
                                    color={method === "manual" ? "#1E40AF" : "#9CA3AF"}
                                />
                                <Text
                                    style={[
                                        upload.methodBtnText,
                                        method === "manual" && upload.methodBtnTextActive,
                                    ]}
                                >
                                    Manual Entry
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    upload.methodBtn,
                                    method === "file" && upload.methodBtnActive,
                                ]}
                                onPress={() => setMethod("file")}
                            >
                                <Ionicons
                                    name="cloud-upload-outline"
                                    size={18}
                                    color={method === "file" ? "#1E40AF" : "#9CA3AF"}
                                />
                                <Text
                                    style={[
                                        upload.methodBtnText,
                                        method === "file" && upload.methodBtnTextActive,
                                    ]}
                                >
                                    File Upload
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {method === "file" ? (
                        <FileUploadSection />
                    ) : (
                        <ManualEntrySection
                            projectCode={projectCode}
                            setProjectCode={setProjectCode}
                            lineItem={lineItem}
                            setLineItem={setLineItem}
                            tcode={tcode}
                            setTcode={setTcode}
                            allocatedUsd={allocatedUsd}
                            setAllocatedUsd={setAllocatedUsd}
                            zmwAmount={zmwAmount}
                            onSubmit={handleSubmit}
                        />
                    )}

                    <View style={{ height: 40 }} />
                </ScrollView>
            </View>
        </Modal>
    );
}

/**
 * File upload section (UI placeholder)
 */
function FileUploadSection() {
    return (
        <View style={modal.section}>
            <TouchableOpacity
                style={upload.fileBox}
                onPress={() =>
                    Alert.alert(
                        "File Upload",
                        "In production, this opens the device file picker to select an Excel or CSV file."
                    )
                }
            >
                <Ionicons name="document-outline" size={36} color="#9CA3AF" />
                <Text style={upload.fileBoxTitle}>Tap to select Excel / CSV</Text>
                <Text style={upload.fileBoxSub}>Supported formats: .xlsx, .xls, .csv</Text>
            </TouchableOpacity>
            <View style={upload.formatNote}>
                <Ionicons name="information-circle-outline" size={14} color="#1E40AF" />
                <Text style={upload.formatNoteText}>
                    File must include columns: project_code, line_item_name, tcode, allocated_usd, period_start, period_end
                </Text>
            </View>
        </View>
    );
}

/**
 * Manual entry section with form fields
 */
function ManualEntrySection({
    projectCode,
    setProjectCode,
    lineItem,
    setLineItem,
    tcode,
    setTcode,
    allocatedUsd,
    setAllocatedUsd,
    zmwAmount,
    onSubmit,
}: {
    projectCode: string;
    setProjectCode: (value: string) => void;
    lineItem: string;
    setLineItem: (value: string) => void;
    tcode: string;
    setTcode: (value: string) => void;
    allocatedUsd: string;
    setAllocatedUsd: (value: string) => void;
    zmwAmount: string | null;
    onSubmit: () => void;
}) {
    return (
        <View style={modal.section}>
            <Text style={modal.sectionTitle}>Budget Line Details</Text>

            <InputField
                label="Project Code"
                placeholder="e.g. ZM-2026-WASH"
                value={projectCode}
                onChangeText={setProjectCode}
                icon="folder-outline"
            />
            <InputField
                label="Line Item Name"
                placeholder="e.g. Community Training Materials"
                value={lineItem}
                onChangeText={setLineItem}
                icon="list-outline"
            />
            <InputField
                label="Transaction Code (TCode)"
                placeholder="e.g. TC-4501"
                value={tcode}
                onChangeText={setTcode}
                icon="code-slash-outline"
            />
            <InputField
                label="Allocated Amount (USD)"
                placeholder="e.g. 2500.00"
                value={allocatedUsd}
                onChangeText={setAllocatedUsd}
                icon="cash-outline"
                keyboardType="numeric"
            />

            {/* ZMW preview */}
            {zmwAmount && (
                <View style={upload.zmwPreview}>
                    <Ionicons name="swap-horizontal-outline" size={14} color="#1E40AF" />
                    <Text style={upload.zmwPreviewText}>
                        ≈ K{zmwAmount} ZMW at {EXCHANGE_RATE.zmw_to_usd} rate
                    </Text>
                </View>
            )}

            <TouchableOpacity
                style={modal.submitBtn}
                onPress={onSubmit}
                activeOpacity={0.8}
            >
                <Ionicons name="cloud-upload-outline" size={18} color="#FFF" />
                <Text style={modal.submitBtnText}>Upload Budget Line</Text>
            </TouchableOpacity>
        </View>
    );
}
