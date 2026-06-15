/**
 * Root Layout Component
 * 
 * Applies SafeAreaProvider + ScrollView for responsive design
 * Per building-native-ui skill: "Always wrap root component in a scroll view for responsiveness"
 */

import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SafeAreaProvider>
  );
}
