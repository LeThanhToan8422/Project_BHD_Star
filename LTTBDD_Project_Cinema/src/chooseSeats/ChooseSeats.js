import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

const ChooseSeats = ({ navigation, route }) => {
  const [nameCinema, setNameCinema] = useState("");
  const [nameMovie, setNameMovie] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState({
    nameRangeSeats: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    seatsLeft: [
      ["A1", "A2", "A3", "A4"],
      ["B1", "B2", "B3", "B4"],
      ["C1", "C2", "C3", "C4"],
      ["D1", "D2", "D3", "D4"],
      ["E1", "E2", "E3", "E4"],
      ["F1", "F2", "F3", "F4"],
      ["G1", "G2", "G3", "G4"],
      ["H1", "H2", "H3", "H4"],
      ["I1", "I2", "I3", "I4"],
      ["J1", "J2", "J3", "J4"],
    ],
    seatsCenter: [
      ["A5", "A6", "A7", "A8", "A9"],
      ["B5", "B6", "B7", "B8", "B9"],
      ["C5", "C6", "C7", "C8", "C9"],
      ["D5", "D6", "D7", "D8", "D9"],
      ["E5", "E6", "E7", "E8", "E9"],
      ["F5", "F6", "F7", "F8", "F9"],
      ["G5", "G6", "G7", "G8", "G9"],
      ["H5", "H6", "H7", "H8", "H9"],
      ["I5", "I6", "I7", "I8", "I9"],
      ["J5", "J6", "J7", "J8", "J9"],
    ],
    seatsRight: [
      ["A10", "A11", "A12", "A13"],
      ["B10", "B11", "B12", "B13"],
      ["C10", "C11", "C12", "C13"],
      ["D10", "D11", "D12", "D13"],
      ["E10", "E11", "E12", "E13"],
      ["F10", "F11", "F12", "F13"],
      ["G10", "G11", "G12", "G13"],
      ["H10", "H11", "H12", "H13"],
      ["I10", "I11", "I12", "I13"],
      ["J10", "J11", "J12", "J13"],
    ],
  });
  const [seatsChosen, setSeatsChosen] = useState([]);
  const [seatsOrdered, setSeatsOrdered] = useState([]);
  const [pricesOfSeats, setPricesOfSeats] = useState(0);

  useEffect(() => {
    let apiGetSeatsOrdered = async() => {
      let data = await axios.post(
        "http://10.0.2.2:8080/api/seat/get-seats-ordered",
        {
          movieID : route.params.movie.movieID,
          cinemaID : route.params.cinema.cinemaID,
          movieDateID : route.params.date.movieDateID,
          showTimeID : route.params.showTimeID
        }
      );
      setSeatsOrdered(data.data.seatsOrdered);
    }
    apiGetSeatsOrdered()
  }, [])

  useEffect(() => {
    setNameCinema(route.params.cinema.name);
    setNameMovie(route.params.movie.nameEN);
    setDate(
      `${route.params.date.date.slice(
        8,
        10
      )} tháng ${route.params.date.date.slice(
        5,
        7
      )}, ${route.params.date.date.slice(0, 4)}`
    );
    let hours =
      parseInt(route.params.time.split(":")[0]) +
      Math.floor(
        (parseInt(route.params.time.split(":")[1]) +
          parseInt(route.params.movie.time.match(/\d+/)[0])) /
          60
      );
    let minutes =
      (parseInt(route.params.time.split(":")[1]) +
        parseInt(route.params.movie.time.match(/\d+/)[0])) %
      60;
    setTime(`${route.params.time} - ${hours}:${minutes}`);
  }, [route.params]);

  let handlePressSeat = async (seat) => {
    if(!seatsOrdered.includes(seat)){
      if (seatsChosen.includes(seat)) {
        setSeatsChosen((prevSeats) =>
          prevSeats.filter((seatChosen) => seatChosen !== seat)
        );
      } else {
        setSeatsChosen([...seatsChosen, seat]);
      }
      let data = await axios.post(
        "http://10.0.2.2:8080/api/fare/get-prices-of-fare-by-cinemaID",
        {
          cinemaID: route.params.cinema.cinemaID,
          time: route.params.time,
          date: route.params.date.date.slice(0, 10),
          quantity: seatsChosen.includes(seat)
            ? seatsChosen.length - 1
            : seatsChosen.length + 1,
        }
      );
      setPricesOfSeats(data.data.price);
    }
  };

  let handlePressFinishPayment = () => {
    navigation.navigate("Concession", {
      nameCinema: nameCinema,
      date: date,
      time: time,
      quality: route.params.quality,
      seatsChosen: seatsChosen,
      pricesOfSeats: pricesOfSeats,
      imageMovie: route.params.imageMovie,
      movieID: route.params.movie.movieID,
      cinemaID: route.params.cinema.cinemaID,
      movieDateID: route.params.date.movieDateID,
      showTimeID: route.params.showTimeID,
      userID : route.params.userID
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
      <View style={styles.viewContainerSeats}>
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
        <View style={styles.viewDetailSeats}>
          <View
            style={{
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text style={styles.screen}></Text>
            <Text
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              SCREEN
            </Text>
          </View>
          <View style={styles.viewNoteSeats}>
            <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
              <FontAwesome name="couch" size={20} color={"rgba(89,178,42,1)"} />
              <Text
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 18,
                  marginLeft: 10,
                }}
              >
                Selected Seat
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
              <FontAwesome name="couch" size={20} color={"rgba(74,74,72,1)"} />
              <Text
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 18,
                  marginLeft: 10,
                }}
              >
                BB-Stand-Pack
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
              <FontAwesome name="couch" size={20} color={"rgba(233,77,80,1)"} />
              <Text
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 18,
                  marginLeft: 10,
                }}
              >
                Sold
              </Text>
            </View>
          </View>
          <View style={styles.viewSeats}>
            <View style={styles.nameRangeSeats}>
              {seats.nameRangeSeats.map((name) => (
                <Text key={name} style={styles.textRangeSeats}>
                  {name}
                </Text>
              ))}
            </View>
            <View style={styles.viewContentSeats}>
              {seats.seatsLeft.map((arrSeats, index) => (
                <View key={index.toString()} style={{ flexDirection: "row" }}>
                  {arrSeats.map((seat) => (
                    <FontAwesome
                      key={seat}
                      name="couch"
                      size={20}
                      color={
                        seatsOrdered.includes(seat)
                        ? "rgba(233,77,80,1)"
                        : seatsChosen.includes(seat)
                        ? "rgba(89,178,42,1)"
                        : "rgba(74,74,72,1)"
                      }
                      onPress={() => handlePressSeat(seat)}
                    />
                  ))}
                </View>
              ))}
            </View>

            <View style={styles.viewContentSeats}>
              {seats.seatsCenter.map((arrSeats, index) => (
                <View key={index} style={{ flexDirection: "row" }}>
                  {arrSeats.map((seat) => (
                    <FontAwesome
                      key={seat}
                      name="couch"
                      size={20}
                      ccolor={
                        seatsOrdered.includes(seat)
                        ? "rgba(233,77,80,1)"
                        : seatsChosen.includes(seat)
                        ? "rgba(89,178,42,1)"
                        : "rgba(74,74,72,1)"
                      }
                      onPress={() => handlePressSeat(seat)}
                    />
                  ))}
                </View>
              ))}
            </View>

            <View style={styles.viewContentSeats}>
              {seats.seatsRight.map((arrSeats, index) => (
                <View key={index} style={{ flexDirection: "row" }}>
                  {arrSeats.map((seat) => (
                    <FontAwesome
                      key={seat}
                      name="couch"
                      size={20}
                      color={
                        seatsOrdered.includes(seat)
                        ? "rgba(233,77,80,1)"
                        : seatsChosen.includes(seat)
                        ? "rgba(89,178,42,1)"
                        : "rgba(74,74,72,1)"
                      }
                      onPress={() => handlePressSeat(seat)}
                    />
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.ViewTotalSeatsChosenPrices}>
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
            {nameMovie.length > 22 ? `${nameMovie.slice(0, 22)}...` : nameMovie}
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
            style={{ color: "rgba(255,255,255,0.9)", fontSize: 15 }}
          >{`Seats : ${seatsChosen.join(",")}`}</Text>
          <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 15 }}>
            {pricesOfSeats.toLocaleString("vi-VN", {
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
            <Text style={styles.textBtnFinish}>Finish Payment (1/3)</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ImageBackground>
  );
};

export default ChooseSeats;

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
  viewContainerSeats: {
    width: "100%",
    flexDirection: "column",
    marginVertical: 10,
  },
  viewDetailSeats: {
    width: "100%",
    flexDirection: "column",
  },
  screen: {
    width: "90%",
    height: 10,
    backgroundColor: "white",
    borderRadius: 50,
  },
  viewNoteSeats: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  viewSeats: {
    width: "100%",
    height: 270,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
  },
  nameRangeSeats: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textRangeSeats: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  viewContentSeats: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  ViewTotalSeatsChosenPrices: {
    position: "absolute",
    height: 180,
    left: 0,
    right: 0,
    bottom: 0,
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
