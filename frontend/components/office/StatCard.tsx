import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { IoniconName } from "./constants";

interface StatCardProps {
    label: string;
    value: string | number;
    sub?: string;
    color: string;
    icon: IoniconName;
    onPress?: () => void;
}

export function StatCard({
    label,
    value,
    sub,
    color,
    icon,
    onPress,
}: StatCardProps) {
    return (
        <TouchableOpacity
            style={styles.statCard}
            onPress={onPress}
            activeOpacity={onPress ? 0.75 : 1}
        >
            <View style={[styles.statIcon, { backgroundColor: color + "1A" }]}>
                <Ionicons name={icon} size={20} color={color} />
            </View>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
            {sub && <Text style={styles.statSub}>{sub}</Text>}
        </TouchableOpacity>
    );
}
