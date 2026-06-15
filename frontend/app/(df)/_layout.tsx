import { Tabs } from "expo-router";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, TYPOGRAPHY, SPACING } from "../../theme";

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

export default function DFLayout() {
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
                            label="Home"
                            icon={focused ? "home" : "home-outline"}
                            focused={focused}
                        />
                    ),
                }}
            />
            
            <Tabs.Screen 
                name="budget"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon 
                            label="Budget"
                            icon={focused ? "wallet" : "wallet-outline"}
                            focused={focused}
                        />
                    ),
                }}
            />

            <Tabs.Screen 
                name="expense" 
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            label="Log"
                            icon={focused ? "add-circle" : "add-circle-outline"}
                            focused={focused}
                        />
                    ),
                }}
            />

            <Tabs.Screen 
                name="myexpenses"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            label="Expenses"
                            icon={focused ? "receipt" : "receipt-outline"}
                            focused={focused}
                        />
                    ),
                }}
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: COLORS.bgPrimary,
        borderTopWidth: 1,
        borderTopColor: COLORS.borderLight,
        height: 70,
        paddingBottom: SPACING.md,
        paddingTop: SPACING.sm,
    },
    tabIcon: {
        alignItems: "center",
        justifyContent: "center",
        gap: SPACING.xs,
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
        fontWeight: TYPOGRAPHY.semibold as "600",
    },
});