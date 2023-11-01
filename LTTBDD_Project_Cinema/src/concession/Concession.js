import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const Concession = ({ navigation, route }) => {
  const [nameCinema, setNameCinema] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [concession, setConcession] = useState([
    {
      name: "OL Special Combo1 Bap nam XX loc xoay (Sweet)",
      prices: 150000,
      src: require("../../assets/imgConcession/concession1.png"),
    },
    {
      name: "OL Special Combo1 Khoai Lac (Sweet)",
      prices: 150000,
      src: require("../../assets/imgConcession/concession2.png"),
    },
    {
      name: "OL Special Combo2 Bap nam XX loc xoay (Sweet)",
      prices: 181000,
      src: require("../../assets/imgConcession/concession3.png"),
    },
    {
      name: "OL Special Combo2 Khoai Lac (Sweet)",
      prices: 181000,
      src: require("../../assets/imgConcession/concession4.png"),
    },
  ]);

  const [quantityConcession, setQuantityConcession] = useState([0, 0, 0, 0]);
  const [pricesPayment, setPricesPayment] = useState(0);
  const [concessionChosen, setConcessionChosen] = useState([]);

  useEffect(() => {
    setNameCinema(route.params.nameCinema);
    setDate(route.params.date);
    setTime(route.params.time);
  }, [route.params]);

  useEffect(() => {
    setPricesPayment(
      concession.reduce((total, c2, index) => {
        return total + c2.prices * quantityConcession[index];
      }, 0)
    );
  }, [quantityConcession]);

  useEffect(() => {
    setConcessionChosen(
      concession.map((cs, index) => {
        if (quantityConcession[index] > 0) {
          return cs.name;
        } else {
          return null;
        }
      })
    );
  }, [quantityConcession]);

  let handlePressIconSub = (index) => {
    setQuantityConcession((prevQuantity) => {
      let newQuantity = [...prevQuantity];
      newQuantity[index] === 0
        ? (newQuantity[index] = 0)
        : (newQuantity[index] -= 1);
      return newQuantity;
    });
  };

  let handlePressIconPlus = (index) => {
    setQuantityConcession((prevQuantity) => {
      let newQuantity = [...prevQuantity];
      newQuantity[index] += 1;
      return newQuantity;
    });
  };

  let handlePressFinishPayment = () => {
    navigation.navigate("FinishPayment", {
      nameCinema: nameCinema,
      date: date,
      time: time,
      quality: route.params.quality,
      seatsChosen: route.params.seatsChosen,
      pricesOfSeats: route.params.pricesOfSeats,
      concession: concession,
      quantityConcession: quantityConcession,
      concessionChosen: concessionChosen,
      imageMovie: route.params.imageMovie,
      movieID: route.params.movieID,
      cinemaID: route.params.cinemaID,
      movieDateID: route.params.movieDateID,
      showTimeID: route.params.showTimeID,
      userID: route.params.userID,
    });
  };
  return (
    <ImageBackground
      source={require("../../assets/imgBackground/sky-star.jpg")}
      style={styles.container}
    >
      <View style={styles.viewNamePage}>
        <Ionicons
          name="chevron-back-outline"
          size={25}
          color={"white"}
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 50,
            padding: 5,
          }}
          onPress={() => navigation.goBack()}
        />
        <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 20 }}>
          Session Selection
        </Text>
      </View>
      <View style={styles.viewContainerConcession}>
        <View
          style={{ flexDirection: "column", marginLeft: 20, marginBottom: 30 }}
        >
          <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
            {nameCinema}
          </Text>
          <Text
            style={{ color: "rgba(255,255,255,0.8)", fontSize: 18 }}
          >{`${date} ${time}`}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 45,
          }}
        >
          <Text style={styles.textConcession}>Concession</Text>
        </View>
      </View>
      <ScrollView horizontal={false}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {concession.map((cs, index) => (
            <View key={index} style={styles.viewConcession}>
              <Image
                source={cs.src}
                style={{ height: 80, width: 80, marginRight: 20 }}
              />
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{ color: "white", fontSize: 18, width: 250 }}
                  numberOfLines={2}
                >
                  {cs.name}
                </Text>
                <View
                  style={{
                    width: 240,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons
                      name="remove-circle-outline"
                      size={22}
                      color={"#c2c2c2"}
                      onPress={() => handlePressIconSub(index)}
                    />
                    <Text style={{ color: "white", marginHorizontal: 10 }}>
                      {quantityConcession[index]}
                    </Text>
                    <Ionicons
                      name="add-circle-outline"
                      size={22}
                      color={"#63b133"}
                      onPress={() => handlePressIconPlus(index)}
                    />
                  </View>
                  <Text style={{ color: "white" }}>
                    {cs.prices.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          height: 180 + concessionChosen.filter((c) => c !== null).length * 20,
          ...styles.ViewTotalSeatsChosenPrices,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            CONCRETE UTOPIA
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Grand Total
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <Text
            style={{
              width: "75%",
              color: "rgba(255,255,255,0.9)",
              fontSize: 15,
            }}
          >
            {concessionChosen.join(" ")}
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 15 }}>
            {pricesPayment.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={handlePressFinishPayment}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.textBtnFinish}>Finish Payment (2/3)</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ImageBackground>
  );
};

export default Concession;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    marginTop: 30,
    flexDirection: "column",
  },
  viewNamePage: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 10,
  },
  viewContainerConcession: {
    width: "100%",
    flexDirection: "column",
    marginVertical: 10,
    marginBottom: 30,
  },
  textConcession: {
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#4a4a4a",
    color: "rgba(255,255,255,0.7)",
    width: "90%",
    height: "100%",
    fontSize: 18,
    fontWeight: "bold",
    borderWidth: 5,
    borderColor: "#282828",
  },
  viewConcession: {
    width: "90%",
    height: 130,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#282828",
    marginBottom: 20,
  },
  ViewTotalSeatsChosenPrices: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "rgba(40,40,40,1)",
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
});
