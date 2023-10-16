import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import Concession from "../Concession";

const FinishPayment = ({ navigation, route }) => {

  return (
    <ImageBackground
      source={require("../../../../../../assets/imgBackground/sky-star.jpg")}
      style={styles.container}
    >
      <Ionicons
        name="chevron-back-outline"
        size={25}
        color={"white"}
        style={styles.iconGoback}
        onPress={() => navigation.goBack()}
      />
      <View style={{ width: "100%", height: 200 }}>
        <Image
          source={route.params.imageMovie.src}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>
      <ScrollView>
        <View style={styles.viewInfoTicket}>
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
            CONCRETE UTOPIA
          </Text>
          <Text style={{ color: "rgba(217,30,24,1)", fontSize: 18 }}>
            C18-No Children Under 18 Years Old
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <FontAwesome
              name="map-marker-alt"
              size={18}
              color="rgba(255,255,255,0.7)"
            />
            <Text
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 18,
                marginLeft: 10,
              }}
            >
              {route.params.nameCinema}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <FontAwesome
              name="calendar"
              size={18}
              color="rgba(255,255,255,0.7)"
            />
            <Text
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 18,
                marginLeft: 10,
              }}
            >
              {`${route.params.date} ~ ${route.params.time}`}
            </Text>
          </View>
          <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 18 }}>
            {`${route.params.seatsChosen.length} vé + ${
              route.params.concessionChosen.filter((cs) => cs !== null).length
            } combo`}
          </Text>
        </View>
        <View style={styles.itemsOrdered}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            Items Ordered
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 18 }}>
              {`${route.params.seatsChosen.length} * ${
                route.params.quality === "LT" ? "VOICE" : "SUB"
              } : ${route.params.seatsChosen.join(",")}`}
            </Text>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              {route.params.pricesOfSeats.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
          </View>
          {route.params.quantityConcession.map((quantity, index) => {
            if (quantity > 0) {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: 18,
                      width: "75%",
                    }}
                  >
                    {`${quantity} * ${route.params.concession[index].name}`}
                  </Text>
                  <Text
                    style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
                  >
                    {(
                      quantity * route.params.concession[index].prices
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Text>
                </View>
              );
            }
          })}
        </View>
        <View style={styles.viewToTal}>
          <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 18 }}>
            SubTotal / Grand Total
          </Text>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            {(route.params.pricesOfSeats +
              route.params.concession.reduce((total, c2, index) => {
                return (
                  total + c2.prices * route.params.quantityConcession[index]
                );
              }, 0)).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default FinishPayment;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    marginTop: 30,
    flexDirection: "column",
  },
  iconGoback: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 50,
    padding: 5,
    zIndex: 10,
  },
  viewInfoTicket: {
    flexDirection: "column",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
    width: "100%",
    height: 240,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  itemsOrdered: {
    width: "100%",
    minHeight: 200,
    flexDirection: "column",
    justifyContent: "space-around",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
  },
  viewToTal : { 
    width : '100%',
    flexDirection: "row" ,
    justifyContent : 'space-between',
    alignItems : 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
  }
});
