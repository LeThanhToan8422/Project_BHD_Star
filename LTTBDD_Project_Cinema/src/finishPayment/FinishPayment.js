import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { Checkbox, RadioButton } from "react-native-paper";
import axios from "axios";
import Toast from "react-native-toast-message";

const FinishPayment = ({ navigation, route }) => {
  const [checked, setChecked] = useState("");
  const [boxChecked, setBoxChecked] = useState(false);

  let handlePressFinishPayment = async () => {
    if (checked !== "") {
      if (boxChecked) {
        let dataID = await axios.get(
          "http://10.0.2.2:8080/api/ticket/get-ticketID"
        );
        let data = await axios.post(
          "http://10.0.2.2:8080/api/ticket/post-ticket",
          {
            id: `TK${dataID.data.ticketID + 1}`,
            quantityTickets: route.params.seatsChosen.length,
            seats: route.params.seatsChosen,
            combos: route.params.concessionChosen.filter((cb) => cb != null),
            totalPrices:
              route.params.pricesOfSeats +
              route.params.concession.reduce((total, c2, index) => {
                return (
                  total + c2.prices * route.params.quantityConcession[index]
                );
              }, 0),
            cinema: route.params.cinemaID,
            movie: route.params.movieID,
            movieDate: route.params.movieDateID,
            showTime: route.params.showTimeID,
            userID : route.params.userID
          }
        );
        Toast.show({
          type: "success",
          text1: "Đặt Vé Thành Công!!!",
          text2: "Chúc Bạn Có Buổi Xem Phim Vui Vẻ👋",
        });
        navigation.navigate("Home");
      } else {
        Toast.show({
          type: "error",
          text1: "Vui Lòng Chọn Đồng Ý Với Các Điều Khoản",
          text2: "Chúc Bạn Có Buổi Xem Phim Vui Vẻ👋",
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Vui Lòng Chọn Phương Thức Thanh Toán",
        text2: "Chúc Bạn Có Buổi Xem Phim Vui Vẻ👋",
      });
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/imgBackground/sky-star.jpg")}
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
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
            {(
              route.params.pricesOfSeats +
              route.params.concession.reduce((total, c2, index) => {
                return (
                  total + c2.prices * route.params.quantityConcession[index]
                );
              }, 0)
            ).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </View>
        <View style={styles.viewPaymentMethod}>
          <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 18 }}>
            Payment Methods
          </Text>
          <View style={styles.viewMethods}>
            <View style={styles.viewMethod}>
              <Text
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 16,
                  marginTop: 10,
                }}
              >
                Thanh Toán Trực Tiếp
              </Text>
              <RadioButton
                value="inPerson"
                status={checked === "inPerson" ? "checked" : "unchecked"}
                onPress={() => setChecked("inPerson")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.viewAgree}>
        <View style={styles.viewCheckBox}>
          <Checkbox
            status={boxChecked ? "checked" : "unchecked"}
            onPress={() => {
              setBoxChecked(!boxChecked);
            }}
          />
          <View style={styles.viewTextAgree}>
            <Text style={{ color: "white", fontSize: 16 }}>
              Tôi đã đọc, hiểu và đồng ý với các{" "}
            </Text>
            <Text
              style={{
                color: "#6ba52d",
                fontSize: 16,
                textDecorationLine: "underline",
              }}
            >
              điều khoản
            </Text>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handlePressFinishPayment}>
          <View style={styles.btnPaymentFinish}>
            <Text style={styles.textBtnFinish}>Finish Payment (3/3)</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
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
  viewToTal: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
  },
  viewPaymentMethod: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
  },
  viewMethods: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  viewMethod: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textBtnFinish: {
    backgroundColor: "#828282",
    paddingHorizontal: 80,
    paddingVertical: 20,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 5,
    marginVertical: 10,
    marginBottom: 25,
  },
  btnPaymentFinish: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  viewAgree: {
    width: "100%",
    height: 150,
    backgroundColor: "#282828",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  viewCheckBox: {
    width: "100%",
    height: "60px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  viewTextAgree: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
