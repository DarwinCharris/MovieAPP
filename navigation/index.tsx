import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Octicons from "@expo/vector-icons/Octicons";
import { ColorValue, View } from "react-native";

import Home from "../components/home";
import Settings from "../components/settings";

const Tab = createBottomTabNavigator();

type NavigationProps = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

function MyTabs({ isDarkMode, setIsDarkMode }: NavigationProps) {
  const backgroundColor = isDarkMode ? "#121212" : "#ffffff";
  const activeTintColor = isDarkMode ? "#e91e63" : "#e91e63";
  const inactiveTintColor = isDarkMode ? "#fff" : "#999999";
  const borderTopColor = isDarkMode ? "#222" : "#ccc";

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarStyle: {
          backgroundColor,
          borderTopColor,
          paddingBottom: 0,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        children={() => (
          <Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        )}
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        children={() => (
          <Settings isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        )}
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons name="gear" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation({
  isDarkMode,
  setIsDarkMode,
}: NavigationProps) {
  return (
    <NavigationContainer>
      <MyTabs isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </NavigationContainer>
  );
}
