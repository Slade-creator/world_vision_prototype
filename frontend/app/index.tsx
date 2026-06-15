import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from "../theme";
import { Typography, H2, H5, H6, LabelText, BodySmallText } from "../components/Typography";
import { PrimaryButton } from "../components/Button";
import { Image } from "expo-image";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<"email" | "password" | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const auth = useAuth();
    const login = auth?.login;

    async function handleLogin() {
        if (!email || !password) {
            Alert.alert("Please enter your email and password");
            return;
        }

        setLoading(true);
        const result = await login(email.trim().toLowerCase(), password);

        if (result.success) {
            const role = result.user?.role;
            if (role === "DF")      router.replace("/(df)/dashboard");
            else if (role === "FINANCE") router.replace("/(office)/dashboard");
            else if (role === "DME")     router.replace("/(dme)/dashboard");
        } else {
            Alert.alert("Login Failed", result.error);
        }
        setLoading(false);
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {/** Header */}
                <View style={styles.header}>
                <View style={styles.logoBox}>
                        <Image 
                            source={require("../assets/wv_logo.png")}
                            style={styles.logo}
                            contentFit="contain"
                            cachePolicy="memory-disk"
                        />
                </View>
                    <H2 style={{ marginBottom: SPACING.md, letterSpacing: -0.3 }}>Field Finance Tracker</H2>
                    <BodySmallText style={{ textAlign: "center", lineHeight: 21 }}>
                        Empowering field teams with real-time financial visibility
                    </BodySmallText>
                </View>

                <View style={styles.form}>
                    <H5 style={{ marginBottom: SPACING["2xl"], letterSpacing: -0.2 }}>Sign In</H5>
                    <View style={styles.fieldGroup}>
                        <LabelText style={{ marginBottom: SPACING.sm, letterSpacing: 0.2 }}>Email Address</LabelText>
                        <TextInput
                            style={[
                                styles.input,
                                focusedField === "email" && styles.inputFocused,
                            ]}
                            placeholder="your@worldvision.org"
                            placeholderTextColor={COLORS.placeholder}
                            value={email}
                            onChangeText={setEmail}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.fieldGroup}>
                        <LabelText style={{ marginBottom: SPACING.sm, letterSpacing: 0.2 }}>Password</LabelText>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[
                                    styles.input,
                                    styles.passwordInput,
                                    focusedField === "password" && styles.inputFocused,
                                ]}
                                placeholder="Enter your password"
                                placeholderTextColor={COLORS.placeholder}
                                value={password}
                                onChangeText={setPassword}
                                onFocus={() => setFocusedField("password")}
                                onBlur={() => setFocusedField(null)}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeIcon}
                            >
                                <MaterialCommunityIcons
                                    name={showPassword ? "eye-off" : "eye"}
                                    size={20}
                                    color={COLORS.textLight}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <PrimaryButton
                        title={loading ? "Signing in..." : "Sign In"}
                        onPress={handleLogin}
                        disabled={loading}
                        loading={loading}
                        fullWidth
                        style={{ marginTop: SPACING["2xl"] }}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgSecondary,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: SPACING["2xl"],
    paddingVertical: SPACING["3xl"],
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING["3xl"],
  },
  logo: {
    width: 80,
    height: 80,
  },
  logoBox: {
    width: 120,
    height: 100,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.lg,
    elevation: 4,
  },
  form: {
    backgroundColor: COLORS.bgPrimary,
    borderRadius: RADIUS.lg,
    padding: SPACING["2xl"],
    marginBottom: SPACING["2xl"],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  fieldGroup: {
    marginBottom: SPACING.lg,
  },
  input: {
    backgroundColor: COLORS.bgTertiary,
    borderRadius: RADIUS.lg,
    padding: SPACING.md + 2,
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textPrimary,
    borderWidth: 1.5,
    borderColor: COLORS.borderBase,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: "500",
  },
  passwordContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    paddingRight: 48,
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    padding: SPACING.md,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.bgPrimary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
});