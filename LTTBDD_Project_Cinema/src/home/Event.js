import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "react-native-snap-carousel";

const Event = () => {
  const { width } = Dimensions.get("screen");
  const [data, setData] = useState({
    carouselItems: [
      {
        src: require("../../assets/imgEventHome/BHD-_Banner-website.jpg"),
      },
      {
        src: require("../../assets/imgEventHome/DEAL-1K-1920x1080.png"),
      },
      {
        src: require("../../assets/imgEventHome/My-Precious1920x1080.jpg"),
      },
      {
        src: require("../../assets/imgEventHome/Moon-Sneak-1920x1080.jpg"),
      },
      {
        src: require("../../assets/imgEventHome/combo-kha-thi-ly-m17.jpg"),
      },
      {
        src: require("../../assets/imgEventHome/Visa-x-BHD-WEB.jpg"),
      },
      {
        src: require("../../assets/imgEventHome/Banner-BHD-vi-01-1-1.png"),
      },
    ],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  let _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: "floralwhite",
          borderRadius: 5,
          height: "100%",
          width: "100%",
        }}
      >
        <Image
          source={item.src}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.slide}>
        <Carousel
          layout={"stack"}
          ref={(ref) => (this.carousel = ref)}
          data={data.carouselItems}
          sliderWidth={width}
          itemWidth={width}
          renderItem={_renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
          loop
          autoplay={true}
          autoplayInterval={5000}
          layoutCardOffset={9}
        />
      </View>
    </SafeAreaView>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "30%",
    marginBottom: 20,
  },
  slide: {
    width: "100%",
    height: "100%",
  },
});
