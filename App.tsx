// App.tsx
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { useColorScheme } from "react-native";

export default function App() {
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === "dark");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, isDarkMode && styles.dark]}>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        <Navigation isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  dark: {
    backgroundColor: "#121212",
  },
});
