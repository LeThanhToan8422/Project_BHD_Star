import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const Detail = ({ route, navigation }) => {
  const [ticketsOrdered, setTicketOrdered] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [ticketChosen, setTicketChosen] = useState({});
  const [formatDate, setFormatDate] = useState("");
  const [imageMovieChosen, setImageMovieChosen] = useState({
    src: require("../../assets/imgMovie/THENUNII.jpg"),
    key: "MV1",
  });
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
    },
  ]);
  useEffect(() => {
    let apiGetTicketsOrderedByUserID = async () => {
      let data = await axios.post(
        "http://10.0.2.2:8080/api/ticket/get-tickets-ordered-by-userID",
        {
          id: route.params.userID,
        }
      );
      setTicketOrdered(data.data.ticketOrdered);
    };
    apiGetTicketsOrderedByUserID();
  }, [JSON.stringify(route.params.userID)]);

  let handlePressTicket = (ticket) => {
    setIsOpenModal(true);
    setTicketChosen(ticket);
    setImageMovieChosen(imagesNowShowing.find((o) => o.key === ticket.movieID));
    let date = new Date(ticket.date);
    setFormatDate(
      `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/imgBackground/sky-star.jpg")}
      style={styles.container}
    >
      <View style={styles.viewHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            top: 10,
            left: 10,
          }}
        >
          <Ionicons
            name="chevron-back-circle-outline"
            size={40}
            style={{ color: "white" }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            color: "white",
            marginBottom: 20,
          }}
        >
          Details
        </Text>
      </View>

      <ScrollView
        style={styles.viewDetails}
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View style={styles.viewHeadTable}>
          <Text style={{ ...styles.txtHeadTable, ...styles.columnMovie }}>
            PHIM
          </Text>
          <Text style={{ ...styles.txtHeadTable, ...styles.columnCinema }}>
            RẠP
          </Text>
          <Text style={{ ...styles.txtHeadTable, ...styles.columnSeats }}>
            GHÉ
          </Text>
        </View>
        <View style={styles.viewBodyTable}>
          {ticketsOrdered.map((ticket, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePressTicket(ticket)}
            >
              <View style={styles.viewRowTable}>
                <Text style={{ ...styles.txtBodyTable, ...styles.columnMovie }}>
                  {ticket.nameVN}
                </Text>
                <Text
                  style={{ ...styles.txtBodyTable, ...styles.columnCinema }}
                >
                  {ticket.name}
                </Text>
                <Text style={{ ...styles.txtBodyTable, ...styles.columnSeats }}>
                  {ticket.seats}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {isOpenModal ? (
        <View style={styles.viewModal}>
          <TouchableOpacity
            onPress={() => setIsOpenModal(false)}
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              zIndex: 10,
            }}
          >
            <Ionicons
              name="close-circle-outline"
              size={40}
              style={{ color: "white" }}
            />
          </TouchableOpacity>
          <Image
            source={imageMovieChosen.src}
            resizeMode="stretch"
            style={{ width: "100%", height: 200 }}
          />
          <View style={styles.viewDetailModal}>
            <View style={styles.viewContentDetailModel}>
              <Text style={styles.txtTitleDetailModel}>Phim : </Text>
              <Text style={styles.txtValueDetailModel}>
                {ticketChosen.nameVN}
              </Text>
            </View>
            <View style={styles.viewContentDetailModel}>
              <Text style={styles.txtTitleDetailModel}>Rạp : </Text>
              <Text style={styles.txtValueDetailModel}>
                {ticketChosen.name}
              </Text>
            </View>
            <View style={styles.viewContentDetailModel}>
              <Text style={styles.txtTitleDetailModel}>Ghế Ngồi : </Text>
              <Text style={styles.txtValueDetailModel}>
                {ticketChosen.seats}
              </Text>
            </View>
            <View style={styles.viewContentDetailModel}>
              <Text style={styles.txtTitleDetailModel}>Concession : </Text>
              <Text style={styles.txtValueDetailModel}>
                {ticketChosen.combos}
              </Text>
            </View>
            <View style={styles.viewContentDetailModel}>
              <Text style={styles.txtTitleDetailModel}>Ngày Chiếu : </Text>
              <Text style={styles.txtValueDetailModel}>{formatDate}</Text>
            </View>
            <View style={styles.viewContentDetailModel}>
              <Text style={styles.txtTitleDetailModel}>Suất Chiếu : </Text>
              <Text style={styles.txtValueDetailModel}>
                {ticketChosen.time.slice(0, 5)}
              </Text>
            </View>
            <View style={styles.viewContentDetailModel}>
              <Text style={styles.txtTitleDetailModel}>Thành Tiền : </Text>
              <Text style={styles.txtValueDetailModel}>
                {ticketChosen.totalPrices.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </Text>
            </View>
          </View>
        </View>
      ) : null}
    </ImageBackground>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 30,
  },
  viewHeader: {
    width: "100%",
    height: "10%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  viewDetails: {
    width: "100%",
  },
  viewHeadTable: {
    width: "100%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  txtHeadTable: {
    height: "100%",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },
  columnMovie: {
    width: "40%",
  },
  columnCinema: {
    width: "40%",
  },
  columnSeats: {
    width: "20%",
  },
  viewBodyTable: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  viewRowTable: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
  },
  txtBodyTable: {
    height: "100%",
    fontSize: 13,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },
  viewModal: {
    position: "absolute",
    top: 100,
    left: 20,
    right: 20,
    bottom: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(85,85,85, 1)",
    borderRadius: 15,
  },
  viewDetailModal: {
    width: "100%",
    height: "65%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal : 10
  },
  viewContentDetailModel: {
    width: "100%",
    minHeight: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  txtTitleDetailModel: {
    width: "35%",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  txtValueDetailModel: {
    width: "65%",
    fontSize: 15,
    color: "white",
  },
});
