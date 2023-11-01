import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

const BookingMovie = ({ navigation, route }) => {
  const [imageMovie, setImageMovie] = useState({ src: "", key: "" });
  const [isPressSeenShowTime, setIsPressSeenShowTime] = useState({
    id: [],
    isPress: [],
  });
  const [movies, setMovies] = useState({
    movie: { movieID: "", nameEN: "", time: "" },
    movieDates: [
      {
        movieDateID: "",
        date: "",
        cinemaID: "",
      },
    ],
    cinemas: [
      {
        cinemaID: "",
        name: "",
        address: "",
        placeID: "",
      },
    ],
    places: [],
    showtimes: [
      [
        [
          {
            movieDateID: "",
            showTimeID: "",
            cinemaID: "",
            time: "",
            quality: "",
          },
        ],
      ],
    ],
  });

  const [showTimes, setShowTimes] = useState([]);
  const [showTime, setShowTime] = useState([]);
  const [dates, setDates] = useState([]);
  const [dateChosen, setDatechosen] = useState("");
  const [placeChosen, setPlaceChosen] = useState("");
  const [cinemaDisplay, setCinemaDisplay] = useState("");
  const { height } = Dimensions.get("screen");
  let ref = useRef();

  useEffect(() => {
    setImageMovie(route.params.imageMovie);
  }, [route.params.imageMovie]);

  useEffect(() => {
    let cnms = [];
    movies.showtimes.forEach((arrShowTime, index) => {
      arrShowTime.forEach((showTime) => {
        if (
          showTime.date !== undefined &&
          showTime.date.slice(8, 10) === dateChosen
        ) {
          cnms.push(showTime.cinemaID);
        }
      });
      setCinemaDisplay(cnms);
    });
  }, [dateChosen, placeChosen]);

  useEffect(() => {
    showTimes.forEach(value => {
      if(isPressSeenShowTime.isPress[isPressSeenShowTime.id.indexOf(value[0].cinemaID)] && dateChosen === value[0].date.slice(8,10) && value[0].place === placeChosen){
        setShowTime(JSON.parse(value[0].showtimes.replace(/'/g, "\"")))
      }
    })
  }, [...isPressSeenShowTime.isPress])

  useEffect(() => {
    let apiGetShowTimeMovie = async () => {
      let data = await axios.post(
        "http://10.0.2.2:8080/api/movie/get-show-time-movie-by-movieID",
        { id: route.params.imageMovie.key }
      );
      setMovies(data.data.movie);
      setDates(
        data.data.movie.movieDates
          .map((movieDate) => movieDate.date.slice(8, 10))
          .filter((date, index, self) => self.indexOf(date) === index)
      );
      setDatechosen(
        data.data.movie.movieDates
          .map((movieDate) => movieDate.date.slice(8, 10))
          .filter((date, index, self) => self.indexOf(date) === index)[0]
      );
      setPlaceChosen(data.data.movie.places[0]);
      setShowTimes(data.data.movie.showtimes)

      let updatedState = {
        id: [],
        isPress: [],
      };
      data.data.movie.cinemas.forEach((cinema) => {
        updatedState.id.push(cinema.cinemaID);
        updatedState.isPress.push(false);
      });
      setIsPressSeenShowTime(updatedState);
    };
    apiGetShowTimeMovie();
  }, [route.params.imageMovie.key]);

  let handlePressCinema = (cinemaID) => {
    if (
      !isPressSeenShowTime.isPress[isPressSeenShowTime.id.indexOf(cinemaID)]
    ) {
      setIsPressSeenShowTime((prevState) => {
        let newState = { ...prevState };
        newState.isPress = newState.isPress.map(isPr => isPr = false)
        newState.isPress[isPressSeenShowTime.id.indexOf(cinemaID)] = true;
        return newState;
      });
    } else {
      setIsPressSeenShowTime((prevState) => {
        let newState = { ...prevState };
        newState.isPress[isPressSeenShowTime.id.indexOf(cinemaID)] = false;
        return newState;
      });
    }
  };

  let handlePressShowTime = (showtime) => {
    navigation.navigate("ChooseSeats", {
      cinema : movies.cinemas.find(cinema => cinema.cinemaID === isPressSeenShowTime.id[isPressSeenShowTime.isPress.indexOf(true)]),
      date : movies.movieDates.find(movieDate => movieDate.date.slice(8,10) === dateChosen),
      movie : movies.movie,
      showTimeID : showtime.showTimeID,
      time : showtime.time.slice(0,5),
      quality : showtime.quality,
      imageMovie : imageMovie,
      userID : route.params.userID
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: "100%", height: "100%" }}>
        <View style={{ width: "100%", height: 200 }}>
          <Image
            source={imageMovie.src}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <ImageBackground
          source={require("../../assets/imgBackground/sky-star.jpg")}
          style={{ with: "100%", minHeight: height, paddingHorizontal: 10 }}
        >
          <View style={styles.viewName}>
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
              {movies.movie.nameEN}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Ionicons
                name={"timer"}
                size={15}
                color={"rgba(255,255,255,0.8)"}
              />
              <Text
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 15,
                  marginLeft: 5,
                }}
              >
                {movies.movie.time}
              </Text>
            </View>
          </View>
          <View style={styles.viewDate}>
            {dates.map((date, index) => (
              <TouchableWithoutFeedback
                key={date}
                onPress={() => setDatechosen(date)}
              >
                <View>
                  <Text
                    key={index}
                    style={[
                      styles.textDate,
                      {
                        backgroundColor:
                          date === dateChosen
                            ? "rgba(80,250,123, 0.7)"
                            : "transparent",
                      },
                    ]}
                  >
                    {date}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
          <View style={styles.viewPlace}>
            {movies.places.map((place, index) => (
              <TouchableWithoutFeedback onPress={() => setPlaceChosen(place)}>
                <View>
                  <Text key={index} style={styles.textPlace}>
                    {place}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
          <View style={[styles.viewCinemas]}>
            {movies.cinemas.map((cinema, index) =>
              cinemaDisplay.includes(cinema.cinemaID) ? (
                <TouchableWithoutFeedback
                  key={index.toString()}
                  style={styles.viewCinema}
                  onPress={() => handlePressCinema(cinema.cinemaID)}
                >
                  <View
                    style={[
                      styles.viewCinema,
                      {
                        height: isPressSeenShowTime.isPress[
                          isPressSeenShowTime.id.indexOf(cinema.cinemaID)
                        ]
                          ? 120
                          : 40,
                      },
                    ]}
                  >
                    <View style={styles.viewCinemaChild}>
                      <Text style={styles.textCinema}>{cinema.name}</Text>
                      {isPressSeenShowTime.id === cinema.cinemaID &&
                      isPressSeenShowTime.isPress ? (
                        <Ionicons
                          name={"chevron-up-outline"}
                          size={20}
                          color={"white"}
                        />
                      ) : (
                        <Ionicons
                          name={"chevron-down-outline"}
                          size={20}
                          color={"white"}
                        />
                      )}
                    </View>
                    <ScrollView horizontal style={styles.viewShowTimes}>
                      {showTime.map((showtime, index) => {
                              return (
                                <View
                                  key={index.toString()}
                                  style={styles.viewShowTime}
                                >
                                  <Text style={styles.textQuality}>
                                    {showtime.quality === "LT"
                                      ? "VOICE"
                                      : "SUB"}
                                  </Text>
                                  <TouchableWithoutFeedback
                                  onPress={() => handlePressShowTime(showtime)}
                                  >
                                    <View>
                                      <Text style={styles.textTime}>
                                        {showtime.time.slice(0,5)}
                                      </Text>
                                    </View>
                                  </TouchableWithoutFeedback>
                                </View>
                              )
                              })}
                    </ScrollView>
                  </View>
                </TouchableWithoutFeedback>
              ) : null
            )}
          </View>
        </ImageBackground>
      </ScrollView>
      <Ionicons
        style={styles.iconback}
        name="chevron-back-outline"
        size={35}
        color={"white"}
        onPress={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
};

export default BookingMovie;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    marginTop: 30,
  },
  iconback: {
    position: "absolute",
    top: 20,
    left: 10,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  viewName: {
    width: "100%",
    height: 50,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  viewDate: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10,
  },
  textDate: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "rgba(80,250,123, 0.7)",
    marginRight: 20,
    padding: 10,
    borderRadius: 10,
  },
  viewPlace: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10,
  },
  textPlace: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "rgba(80,250,123, 0.7)",
    marginRight: 20,
    padding: 10,
    borderRadius: 10,
  },
  viewCinemas: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "rgba(255, 255, 255,0.8)",
  },
  viewCinema: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 5,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "rgba(255, 255, 255,0.8)",
  },
  viewCinemaChild: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textCinema: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  viewShowTimes: {
    height: 100,
    width: "100%",
  },
  viewShowTime: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginRight: 10,
  },
  textQuality: {
    color: "rgba(243,208,65,1)",
    fontSize: 17,
    fontWeight: "bold",
  },
  textTime: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 5,
    backgroundColor: "rgba(128,128,128,1)",
    padding: 10,
    borderRadius: 5,
  },
});
