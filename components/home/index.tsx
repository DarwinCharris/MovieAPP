import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import PopularMovies from "../popularMovies";

type HomeProps = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Home({ isDarkMode }: HomeProps) {
  const backgroundColor = isDarkMode ? "#121212" : "#ffffff";
  const textColor = isDarkMode ? "#ffffff" : "#000000";
  const inputBackground = isDarkMode ? "#1f1f1f" : "#f0f0f0";
  const placeholderColor = isDarkMode ? "#aaa" : "#888";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>MovieAPP</Text>
        <TextInput
          placeholder="Buscar..."
          placeholderTextColor={placeholderColor}
          style={[
            styles.searchInput,
            { backgroundColor: inputBackground, color: textColor },
          ]}
        />
      </View>
      <PopularMovies />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  searchInput: {
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 40,
    width: "50%",
  },
});
