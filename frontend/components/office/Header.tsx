import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../styles/office/budgets";

export function Header({
    budgetCount,
    criticalCount,
    lowCount,
    onUploadPress,
}: {
    budgetCount: number;
    criticalCount: number;
    lowCount: number;
    onUploadPress: () => void;
}) {
    return (
        <View style={styles.header}>
            <View style={{ flex: 1 }}>
                <Text style={styles.headerTitle}>Budget Lines</Text>
                <Text style={styles.headerSub}>
                    {budgetCount} lines · {criticalCount} critical · {lowCount} low
                </Text>
            </View>
            <TouchableOpacity
                style={styles.uploadBtn}
                onPress={onUploadPress}
                activeOpacity={0.8}
            >
                <Ionicons name="cloud-upload-outline" size={16} color="#FFFFFF" />
                <Text style={styles.uploadBtnText}>Upload</Text>
            </TouchableOpacity>
        </View>
    );
}


