import { StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Carousel from "react-native-snap-carousel";
import axios from "axios";

const SlideMovie = ({navigation, userID}) => {

  const [isPressBtnShow, setIsPressBtnShow] = useState(true);
  const [movie, setMovie] = useState({ nameEN: "" });
  const [imagesNowShowing, setImagesNowShowing] = useState([
    {
      src: require("../../assets/imgMovie/THENUNII.jpg"),
      key: "MV1",
    },
    {
      src: require("../../assets/imgMovie/AHAUNTINGINVENICE.jpg"),
      key: "MV2",
    },
    {
      src: require("../../assets/imgMovie/DON'TBUYTHESELLER.jpg"),
      key: "MV3",
    },
    {
      src: require("../../assets/imgMovie/RETRIBUTION.jpg"),
      key: "MV4",
    },
    {
      src: require("../../assets/imgMovie/BENPHAXACSONG.jpg"),
      key: "MV5",
    },
    {
      src: require("../../assets/imgMovie/CONCRETEUTOPIA.jpg"),
      key: "MV6",
    }
  ]);
  const [imagesComingSoon, setImagesComingSoon] = useState([
    {
      src: require("../../assets/imgMovie/IMMERSION.jpg"),
      key: "MV7",
    },
    {
      src: require("../../assets/imgMovie/PASTLIVES.jpg"),
      key: "MV8",
    },
    {
      src: require("../../assets/imgMovie/GODLESS.jpg"),
      key: "MV9",
    },
    {
      src: require("../../assets/imgMovie/CHALLENGERS.jpg"),
      key: "MV10",
    },
    {
      src: require("../../assets/imgMovie/WONKA.jpg"),
      key: "MV11",
    },
    {
      src: require("../../assets/imgMovie/NAPOLEON.jpg"),
      key: "MV12",
    }
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  let ref = useRef();

  useEffect(() => {
    let apiGetMoviesNowShowing = async () => {
      let data = await axios.post(
        "http://10.0.2.2:8080/api/movie/get-movie-by-id",
        {
          id: isPressBtnShow
            ? imagesNowShowing[activeIndex].key
            : imagesComingSoon[activeIndex].key,
        }
      );
      setMovie(data.data.movie);
    };
    apiGetMoviesNowShowing();
  }, [activeIndex, isPressBtnShow]);

  let _renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        style={{
          backgroundColor: "floralwhite",
          borderRadius: 5,
          height: 250,
          marginLeft: 10,
          marginRight: 10,
        }}
        onPress={handlePressImageMovie}
      >
        <Image
          source={item.src}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </TouchableWithoutFeedback>
    );
  };

  let handlePressBtnShow = () => {
    setIsPressBtnShow(true);
  };

  let handlePressBtnCome = () => {
    setIsPressBtnShow(false);
  };

  let handlePressImageMovie = () => {
    navigation.navigate("DetailMovie", {
      imageMovie: isPressBtnShow
        ? imagesNowShowing[activeIndex]
        : imagesComingSoon[activeIndex],
      movie: movie,
    });
  };

  let handlePressBooking = () => {
    navigation.navigate('BookingMovie', {
      imageMovie: isPressBtnShow
        ? imagesNowShowing[activeIndex]
        : imagesComingSoon[activeIndex],
      userID : userID
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewButton}>
        <TouchableWithoutFeedback
          style={styles.touchButton}
          onPress={handlePressBtnShow}
        >
          <View
            style={[
              styles.button,
              {
                backgroundColor: isPressBtnShow
                  ? "rgba(255, 255, 255, 0.5)"
                  : "transparent",
              },
            ]}
          >
            <Text
              style={[
                styles.textButton,
                { color: isPressBtnShow ? "white" : "rgba(255, 255, 255,0.6)" },
              ]}
            >
              Now Showing
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={styles.touchButton}
          onPress={handlePressBtnCome}
        >
          <View
            style={[
              styles.button,
              {
                backgroundColor: isPressBtnShow
                  ? "transparent"
                  : "rgba(255, 255, 255, 0.5)",
              },
            ]}
          >
            <Text
              style={[
                styles.textButton,
                { color: isPressBtnShow ? "rgba(255, 255, 255,0.6)" : "white" },
              ]}
            >
              Coming Soon
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <SafeAreaView style={[{ paddingTop: 20 }, styles.slideMovie]}>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <Carousel
            layout={"default"}
            ref={ref}
            data={isPressBtnShow ? imagesNowShowing : imagesComingSoon}
            sliderWidth={400}
            itemWidth={200}
            renderItem={_renderItem}
            onSnapToItem={(index) => setActiveIndex(index)}
            loop
            layoutCardOffset={9}
          />
        </View>
      </SafeAreaView>

      <Text style={styles.nameMovie}>{movie.nameEN}</Text>
      <TouchableWithoutFeedback onPress={handlePressBooking}>
        <View style={styles.btnBooking}>
          <Text style={styles.textBtnBooking}>Booking</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default SlideMovie

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "70%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom : 80
  },
  viewButton: {
    width: "90%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#555555",
    borderRadius: 5,
  },
  touchButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    height: "80%",
  },
  button: {
    width: "40%",
    height: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
  },
  textButton: {
    width: "100%",
    height: "50%",
    borderColor: "red",
    textAlign: "center",
  },
  slideMovie: {
    width: "100%",
    height: "60%",
  },
  nameMovie: {
    height: "10%",
    color: "white",
    fontWeight: "bold",
  },
  btnBooking: {
    height: "20%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
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
})