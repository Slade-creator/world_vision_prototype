import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { styles } from "./../../styles/office/reviewStyles";

interface FilterTabProps {
    label: string;
    active: boolean;
    count?: number;
    onPress: () => void;
}

export const FilterTab: React.FC<FilterTabProps> = ({ label, active, count, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.filterTab, active && styles.filterTabActive]}
            onPress={onPress}
            activeOpacity={0.75}
        >
            <Text style={[styles.filterTabText, active && styles.filterTabTextActive]}>
                {label}
            </Text>
            {count !== undefined && count > 0 && (
                <View
                    style={[
                        styles.filterTabBadge,
                        active && styles.filterTabBadgeActive,
                    ]}
                >
                    <Text
                        style={[
                            styles.filterTabBadgeText,
                            active && styles.filterTabBadgeTextActive,
                        ]}
                    >
                        {count}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};
