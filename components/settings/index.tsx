// components/settings.tsx
import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SettingsProps = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Settings({ isDarkMode, setIsDarkMode }: SettingsProps) {
  const toggleSwitch = () => setIsDarkMode((prev) => !prev);
  const themeStyles = isDarkMode ? dark : light;

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <Text style={[styles.text, themeStyles.text]}>Settings</Text>
      <View style={styles.switchContainer}>
        <Text style={themeStyles.text}>
          Modo {isDarkMode ? "Oscuro" : "Claro"}
        </Text>
        <Switch value={isDarkMode} onValueChange={toggleSwitch} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingTop: 30,
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

const light = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  text: {
    color: "#000",
  },
});

const dark = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
  },
  text: {
    color: "#fff",
  },
});
