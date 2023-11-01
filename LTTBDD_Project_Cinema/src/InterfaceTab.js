import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./home/Home";
import ShowTime from "./login/Login";
import Personal from "./personal/Personal";


const Tab = createBottomTabNavigator();

const InterfaceTab = ({route, navigation}) => {
  const [user, setUser] = useState(route.params.user)

  // useEffect(() => {
  //   setUser(route.params.user);
  // }, [JSON.stringify(route.params.user)])

  return (
    <SafeAreaProvider style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            position : 'absolute',
            backgroundColor: "rgba(85,85,85, 0.5)",
            height: 60,
            bottom : 25,
            left : 100,
            right : 100,
            borderRadius : 15
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
        <Tab.Screen name="Home" component={Home} initialParams={{userID : user.userID}}/>
        <Tab.Screen name="Personal" component={Personal} initialParams={{user : user}}
        // listeners={({navigation}) => ({
        //   focus : () => {
        //     navigation.navigate("Personal", {user : user})
        //   }
        // })}
        />
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
