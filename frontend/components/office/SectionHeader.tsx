import { View, Text } from "react-native";
import { styles } from "../../styles/office/reports";

export function SectionHeader({ title, sub }: { title: string; sub?: string }) {
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {sub && <Text style={styles.sectionSub}>{sub}</Text>}
        </View>
    );
}