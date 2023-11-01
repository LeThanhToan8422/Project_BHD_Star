import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const Personal = ({ route, navigation }) => {
  const [user, setUser] = useState(route.params.user);
  const [featureUsers, setFeatureUsers] = useState([
    {
      icon: "person-outline",
      name: "Edit/Update",
    },
    {
      icon: "lock-closed-outline",
      name: "Change Password",
    },
    {
      icon: "bookmark-outline",
      name: "Details",
    },
    {
      icon: "log-out-outline",
      name: "Log Out",
    },
  ]);

  let handlePressInfoUser = (feature) => {
    switch (feature.name) {
      case "Edit/Update":
        navigation.navigate("FormUpdateUser", {userID : user.userID})
        break;
      case "Change Password":
        navigation.navigate("FormChangePassword", {userID : user.userID})
        break;
      case "Details":
        navigation.navigate("Detail", {userID : user.userID})
        break;
      case "Log Out":
        navigation.navigate("Login")
        break;
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/imgBackground/sky-star.jpg")}
      style={styles.container}
    >
      <View style={styles.viewHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="close-circle-outline"
            size={30}
            style={{ color: "white", marginRight: 20 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
          Account Information
        </Text>
      </View>
      <View style={styles.viewImageName}>
        <Image
          source={require("../../assets/imageUser/imageCard.png")}
          resizeMode="contain"
          style={{ width: "100%", height: 240 }}
        />
        <Text style={styles.txtNameUser}>{user.name}</Text>
      </View>
      <View style={styles.viewInforUser}>
        {featureUsers.map((f) => (
          <TouchableOpacity onPress={() => handlePressInfoUser(f)}>
            <View key={f.name} style={styles.viewContainerInfo}>
              <View style={styles.viewContentInfo}>
                <Ionicons
                  name={f.icon}
                  size={25}
                  style={{ color: "white", marginRight: 20 }}
                />
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                >
                  {f.name}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward-circle-outline"
                size={30}
                style={{ color: "white", width: "8%" }}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
};

export default Personal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  viewHeader: {
    width: "100%",
    height: "10%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  viewImageName: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth : 1,
    // borderColor  :'red'
  },
  txtNameUser: {
    position: "absolute",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    bottom: 25,
    left: 25,
  },
  viewInforUser: {
    width: "100%",
    height: "40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
    // borderWidth : 1,
    // borderColor  :'red'
  },
  viewContainerInfo: {
    width: "100%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
  },
  viewContentInfo: {
    width: "91%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
