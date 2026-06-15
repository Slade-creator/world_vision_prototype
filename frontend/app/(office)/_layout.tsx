import { Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../theme";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

interface TabIconProps {
    label: string;
    icon: IoniconName;
    focused: boolean;
}

function TabIcon({ label, icon, focused }: TabIconProps) {
    return (
        <View style={styles.tabIcon}>
            <Ionicons
                name={icon}
                size={22}
                color={focused ? COLORS.primary : COLORS.textTertiary}
            />
            <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
                {label}
            </Text>
        </View>
    );
}

export default function OfficeLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textTertiary,
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            label="Dashboard"
                            icon={focused ? "grid" : "grid-outline"}
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="review"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            label="Review"
                            icon={focused ? "checkmark-circle" : "checkmark-circle-outline"}
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="budgets"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            label="Budgets"
                            icon={focused ? "wallet" : "wallet-outline"}
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="reports"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            label="Reports"
                            icon={focused ? "bar-chart" : "bar-chart-outline"}
                            focused={focused}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="reconcile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            label="Reconcile"
                            icon={focused ? "refresh" : "refresh-outline"}
                            focused={focused}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: COLORS.bgPrimary,
        borderTopWidth: 1,
        borderTopColor: COLORS.borderLight,
        height: 70,
        paddingBottom: 10,
        paddingTop: 8,
    },
    tabIcon: {
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
    },
    tabLabel: {
        fontSize: 10,
        color: "#9CA3AF",
        fontWeight: "500",
        width: 64,
        textAlign: "center",
    },
    tabLabelActive: {
        color: COLORS.primary,
        fontWeight: "700",
    },
});