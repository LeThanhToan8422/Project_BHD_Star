import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const DetailMovie = ({ navigation, route }) => {
  const [imageMovie, setImageMovie] = useState({ src: "" });
  const [movie, setMovie] = useState({
    nameEN: "",
    time: "",
    category: "",
    contentFilm: "",
    premiereDate: "",
    director: "",
    actor: "",
  });
  const [isPressMoreView, setIsPressMoreView] = useState(false);
  const [heightContentFilm, setHeightContentFilm] = useState(130);

  useEffect(() => {
    setImageMovie(route.params.imageMovie);
    setMovie(route.params.movie);
  }, [route.params.imageMovie]);

  let handlePressMoreView = (height) => {
    isPressMoreView ? setIsPressMoreView(false) : setIsPressMoreView(true);
    isPressMoreView
      ? setHeightContentFilm(130)
      : setHeightContentFilm(height / 2.2);
  };

  let handlePressBooking = () => {
    navigation.navigate("BookingMovie", {
      imageMovie: route.params.imageMovie,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: "100%", height: "100%" }}>
        <View style={{ width: "100%", height: 200 }}>
          <Image
            source={imageMovie.src}
            resizeMode="stretch"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <ImageBackground
          source={require("../../assets/imgBackground/sky-star.jpg")}
          style={{ with: "100%" }}
        >
          <View style={[styles.viewInfoMovie]}>
            <View style={styles.viewNameTime}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                {movie.nameEN}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name={"timer"}
                  size={20}
                  color={"rgba(255,255,255,0.8)"}
                />
                <Text style={{ color: "rgba(255,255,255,0.8)", marginLeft: 5 }}>
                  {movie.time}
                </Text>
              </View>
            </View>
            <Text style={{ color: "rgba(255,255,255,0.8)" }}>
              {movie.category}
            </Text>
            <View style={styles.viewEvaluate}>
              <Ionicons name="star" size={15} color={"#50fa7b"} />
              <Ionicons name="star" size={15} color={"#50fa7b"} />
              <Ionicons name="star" size={15} color={"#50fa7b"} />
              <Ionicons name="star" size={15} color={"#50fa7b"} />
              <Ionicons name="star" size={15} color={"#50fa7b"} />
            </View>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 17,
                marginBottom: 5,
              }}
            >
              Description
            </Text>
            <View
              style={{
                color: "rgba(255,255,255,0.8)",
                // height: heightContentFilm,
              }}
            >
              <Text style={{ color: "rgba(255,255,255,0.8)" }}>
                {movie.contentFilm.length > 250 && isPressMoreView === false
                  ? movie.contentFilm.slice(0, 250)
                  : movie.contentFilm}
                <Text
                  style={{ color: "#50fa7b" }}
                  onPress={() => handlePressMoreView(movie.contentFilm.length)}
                >
                  {movie.contentFilm.length > 250 && isPressMoreView === false
                    ? "...More View"
                    : " less View"}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.viewDate}>
            <View style={styles.viewContentDate}>
              <Text style={styles.titleDate}>Released Date </Text>
              <Text style={styles.textDate}>{`${movie.premiereDate.slice(
                8,
                10
              )} tháng ${movie.premiereDate.slice(
                5,
                7
              )},${movie.premiereDate.slice(0, 4)}`}</Text>
            </View>
            <View style={styles.viewContentDate}>
              <Text style={styles.titleDate}>Rating</Text>
              <Text style={[styles.textDate, { color: "red" }]}>
                C18-No Children Under 18 Years Old
              </Text>
            </View>
            <View style={styles.viewContentDate}>
              <Text style={styles.titleDate}>Languages</Text>
              <Text style={styles.textDate}>Phụ đề tiếng việt</Text>
            </View>
            <View style={styles.viewContentDate}>
              <Text style={styles.titleDate}>Screen</Text>
            </View>
          </View>
          <View style={styles.viewProducer}>
            <View style={styles.viewProducerContent}>
              <Text style={styles.titleProducer}>Director</Text>
              <Text style={styles.textProducer}>{movie.director}</Text>
            </View>
            <View style={styles.viewProducerContent}>
              <Text style={styles.titleProducer}>Cast</Text>
              <Text style={styles.textProducer}>{movie.actor}</Text>
            </View>
          </View>
          <TouchableWithoutFeedback onPress={handlePressBooking}>
            <View style={styles.btnBooking}>
              <Text style={styles.textBtnBooking}>Booking</Text>
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </ScrollView>
      <Ionicons
        style={styles.iconback}
        name="chevron-back-outline"
        size={35}
        color={"white"}
        onPress={() => navigation.navigate("Home")}
      />
    </SafeAreaView>
  );
};

export default DetailMovie;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    marginTop: 30,
  },
  viewInfoMovie: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: "rgba(255,255,255,0.8)",
  },
  viewNameTime: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  viewEvaluate: {
    width: "25%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  viewDate: {
    width: "100%",
    height: 120,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: "rgba(255,255,255,0.8)",
  },
  iconback: {
    position: "absolute",
    top: 20,
    left: 10,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  viewContentDate: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titleDate: {
    minWidth: 120,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  textDate: {
    color: "rgba(255,255,255,0.8)",
    marginLeft: 20,
  },
  viewProducer: {
    width: "100%",
    height: 170,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    padding: 10,
  },
  viewProducerContent: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  titleProducer: {
    minWidth: 120,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  textProducer: {
    color: "rgba(255,255,255,0.8)",
    marginTop: 10,
  },
  btnBooking: {
    height: "20%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 50,
  },
  textBtnBooking: {
    width: 120,
    paddingVertical: 10,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "rgba(80,250,123, 0.7)",
    borderRadius: 5,
  },
});
