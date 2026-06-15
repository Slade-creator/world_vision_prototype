import { Alert, Text, View } from "react-native";
import { styles } from "../../styles/office/reports";

export function MetricRow({
    label,
    value,
    sub,
    color,
}: {
    label: string;
    value: string;
    sub?: string;
    color?: string;
}) {
    return (
        <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>{label}</Text>
            <View style={{ alignItems: "flex-end" }}>
                <Text style={[styles.metricValue, color ? { color } : {}]}>{value}</Text>
                {sub && <Text style={styles.metricSub}>{sub}</Text>}
            </View>
        </View>
    );
}