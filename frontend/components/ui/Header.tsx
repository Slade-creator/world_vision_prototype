import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { HeaderProps } from "../../types";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from "../../theme";
import { BodySmallText, H2, CaptionText } from "../Typography";
import { Image } from "expo-image";

export function Header({
  greeting,
  userName,
  roleBadgeText,
  showLogout = true,
  onLogout,
  rightElement,
}: HeaderProps) {
  return (
     <View style={styles.container}>
      {/* Top row: Logo + Sign Out */}
      <View style={styles.topRow}>
        {/* World Vision Logo - top-left */}
        <View style={styles.logoWrapper}>
          <Image
            source={require("../../assets/wv_logo.png")}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        {/* Sign Out - top-right */}
        <View style={styles.rightContent}>
        {rightElement || showLogout && (
          <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        )}
        </View>
      </View>

      {/* Bottom row: Greeting + Role badge */}
      <View style={styles.greetingRow}>
        <Text style={styles.greeting} numberOfLines={1}>{greeting}</Text>
        <View>
         <Text style={styles.userName}>{userName}</Text>
         <View style={styles.roleBadge}>
          <Text style={styles.roleBadgeText}>{roleBadgeText}</Text>
        </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
  logoWrapper: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: RADIUS.base,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  logo: {
    width: 100,
    height: 32,
  },
   topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  rightContent: {
    alignItems: "flex-end",
    alignContent: "center",
    gap: SPACING.sm,
  },
  roleBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs - 2,
  },
  roleBadgeText: {
    color: "#FFFFFF",
    fontSize: TYPOGRAPHY.xs,
    fontWeight: TYPOGRAPHY.medium as "500",
  },
  logoutBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: RADIUS.base,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.semibold as "600",
  },
  greetingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: SPACING.xs,
  },
  greeting: {
    color: "rgba(255,255,255,0.8)",
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.regular as "400",
  },
  rightColumn: {
    alignItems: "flex-end",
    gap: SPACING.xs,
  },
  userName: {
    color: "#FFFFFF",
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.bold as "700",
    letterSpacing: -0.5,
  },
});
