import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/office/reports";

export function ExportRow({ onExport }: { onExport: (format: "PDF" | "EXCEL") => void }) {
    return (
        <View style={styles.exportRow}>
            <Text style={styles.exportLabel}>Export Report</Text>
            <View style={styles.exportButtons}>
                <TouchableOpacity
                    style={[styles.exportBtn, { backgroundColor: "#EDE9FE" }]}
                    onPress={() => onExport("PDF")}
                    activeOpacity={0.75}
                >
                    <Ionicons name="document-text-outline" size={14} color="#5B21B6" />
                    <Text style={[styles.exportBtnText, { color: "#5B21B6" }]}>PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.exportBtn, { backgroundColor: "#D1FAE5" }]}
                    onPress={() => onExport("EXCEL")}
                    activeOpacity={0.75}
                >
                    <Ionicons name="grid-outline" size={14} color="#065F46" />
                    <Text style={[styles.exportBtnText, { color: "#065F46" }]}>Excel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}