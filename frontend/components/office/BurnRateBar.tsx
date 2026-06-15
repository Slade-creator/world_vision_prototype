import { View } from "react-native";
import { styles } from "./styles";
import { BurnStatus, BURN_COLOR } from "./constants";

interface BurnRateBarProps {
    percent: number;
    status: BurnStatus;
}

export function BurnRateBar({ percent, status }: BurnRateBarProps) {
    const color = BURN_COLOR[status];
    return (
        <View style={styles.burnBarTrack}>
            <View
                style={[
                    styles.burnBarFill,
                    { width: `${Math.min(percent, 100)}%`, backgroundColor: color },
                ]}
            />
        </View>
    );
}
