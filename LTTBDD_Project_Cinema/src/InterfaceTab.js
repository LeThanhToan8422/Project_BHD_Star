import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./home/Home";
import ShowTime from "./showtime/ShowTime";
import Personal from "./personal/Personal";

const InterfaceTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <SafeAreaProvider style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#555555",
            height: 60,
            paddingTop: 10,
            paddingBottom: 10,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "ShowTime") {
              iconName = focused ? "film" : "film-outline";
            } else if (route.name === "Personal") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#50fa7b",
          tabBarInactiveTintColor: "#999999",
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="ShowTime" component={ShowTime} />
        <Tab.Screen name="Personal" component={Personal} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default InterfaceTab;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
});
