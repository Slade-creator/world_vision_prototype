import React from "react";
import { View, Text } from "react-native";
import { STATUS_COLOR, BudgetStatus } from "./../../constants/office/budgetConstants";
import { styles } from "./../../styles/office/budgets";

interface BurnBarProps {
    percent: number;
    status: BudgetStatus;
}


export function BurnBar({ percent, status }: BurnBarProps) {
    return (
        <View style={styles.burnTrack}>
            <View
                style={[
                    styles.burnFill,
                    {
                        width: `${Math.min(percent, 100)}%`,
                        backgroundColor: STATUS_COLOR[status],
                    },
                ]}
            />
        </View>
    );
}
