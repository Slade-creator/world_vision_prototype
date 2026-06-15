import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { transactionAPI, Transaction, reviewAPI } from "../../Service/api";
import { TARGETS } from "../../data/mockData";

// Components
import { Header } from "../../components/ui/Header";
import { AlertCard } from "./../../components/dme/AlertCard";
import { StatCard } from "../../components/dme/StatCard";
import { TargetsOverview } from "../../components/dme/TargetsOverview";
import { ReviewQueue } from "./../../components/dme/ReviewQueue";
import { QuickActions } from "../../components/dme/QuickActions";

// Constants & Helpers
import { THRESHOLD } from "../../constants/dme/dmeConstants";
import {
    filterDmeQueue,
    groupTargetsByStatus,
    calculateAverageAchievement,
    getPluralLabel,
} from "./../../utils/dme/dmeHelpers";

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function DmeDashboard() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const [transaction, setTransaction] = useState<Transaction[]>([]);

       useEffect(() => {
        reviewAPI.getAll()
        .then(setTransaction)
        .catch((e) => console.error("Failed to load transactions:", e));
    }, []);

    // Data preparation
    const dmeQueue = transaction.filter(
    t => t.review_status === "PENDING" && t.category === "ACTIVITY"
);
    const pendingCount = dmeQueue.length;
    const { atRisk: atRiskTargets, onTrack: onTrackTargets } = groupTargetsByStatus();
    const avgAchievement = calculateAverageAchievement();

    const handleLogout = async () => {
        await logout();
        router.replace("/");
    };

    const handleReviewNavigation = () => router.push("/(dme)/review");
    const handleTargetsNavigation = () => router.push("/(dme)/targets");



    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Header
                    greeting="Good morning,"
                    userName={user?.full_name || "User"}
                    roleBadgeText="DME Officer"
                    showLogout={true}
                    onLogout={handleLogout}
                        />

            {/* Alert: entries awaiting DME review */}
            {pendingCount > 0 && (
                <AlertCard
                    icon="time"
                    title={`${pendingCount} ${getPluralLabel(pendingCount, "Activity", "Activities")} Awaiting Your Review`}
                    subtitle="Finance approved · ready for DME sign-off"
                    onPress={handleReviewNavigation}
                    variant="warning"
                />
            )}

            {/* Alert: at-risk targets */}
            {atRiskTargets.length > 0 && (
                <AlertCard
                    icon="warning"
                    title={`${atRiskTargets.length} ${getPluralLabel(atRiskTargets.length, "Target", "Targets")} At Risk`}
                    subtitle={atRiskTargets.map((t) => t.indicator_name).join(", ")}
                    onPress={handleTargetsNavigation}
                    variant="danger"
                />
            )}

            {/* Stat cards */}
            <View style={styles.statsGrid}>
                <StatCard
                    label="Pending Review"
                    value={pendingCount}
                    sub="activity entries"
                    color="#F59E0B"
                    icon="time-outline"
                    onPress={handleReviewNavigation}
                />
                <StatCard
                    label="Avg Achievement"
                    value={`${avgAchievement}%`}
                    sub="across all targets"
                    color={avgAchievement >= THRESHOLD.ON_TRACK ? "#10B981" : avgAchievement >= THRESHOLD.AT_RISK ? "#F59E0B" : "#EF4444"}
                    icon="trophy-outline"
                />
                <StatCard
                    label="At Risk"
                    value={atRiskTargets.length}
                    sub="targets <50%"
                    color="#EF4444"
                    icon="alert-circle-outline"
                    onPress={handleTargetsNavigation}
                />
                <StatCard
                    label="On Track"
                    value={onTrackTargets.length}
                    sub="targets ≥80%"
                    color="#10B981"
                    icon="checkmark-circle-outline"
                />
            </View>

            <TargetsOverview targets={TARGETS} onViewAll={handleTargetsNavigation} />

            <ReviewQueue queue={dmeQueue} onViewAll={handleReviewNavigation} />

            <QuickActions onReview={handleReviewNavigation} onTargets={handleTargetsNavigation} />

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F1F5F9" },
    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 16,
        gap: 10,
    },
});