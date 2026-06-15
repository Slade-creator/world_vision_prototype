import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from "../../theme";

interface HeaderProps {
    userName: string;
    onLogout: () => void;
}

export function Header({ userName, onLogout }: HeaderProps) {
    return (
        <View style={styles.header}>
            <View style={{ flex: 1 }}>
                <Text style={styles.greeting}>Good morning,</Text>
                <Text style={styles.userName}>{userName}</Text>
                <View style={styles.roleBadge}>
                    <Text style={styles.roleText}>DME Officer</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.logoutBtn} onPress={onLogout} activeOpacity={0.8}>
                <Text style={styles.logoutText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: COLORS.primary,
        paddingTop: SPACING["3xl"] + SPACING.md,
        paddingBottom: SPACING.xl, 
        paddingHorizontal: SPACING.xl, 
    },
    greeting: { 
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textLight,
    },
    userName: {
        fontSize: TYPOGRAPHY["2xl"], 
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.headerText,
        letterSpacing: -0.5,
        marginTop: SPACING.xs / 2, 
    },
    roleBadge: {
        alignSelf: "flex-start",
        marginTop: SPACING.sm, 
        backgroundColor: COLORS.successLight,
        paddingHorizontal: SPACING.sm + SPACING.xs, 
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.base, 
    },
    roleText: { 
        fontSize: TYPOGRAPHY.xs, 
        fontWeight: TYPOGRAPHY.bold, 
        color: COLORS.success, 
    },
    logoutBtn: {
        backgroundColor: COLORS.bgTertiary, 
        paddingHorizontal: SPACING.lg + SPACING.xs, 
        paddingVertical: SPACING.sm, 
        borderRadius: RADIUS.lg, 
    },
    logoutText: { 
        fontSize: TYPOGRAPHY.sm, 
        fontWeight: TYPOGRAPHY.semibold, 
        color: COLORS.textLight, 
    },
});
