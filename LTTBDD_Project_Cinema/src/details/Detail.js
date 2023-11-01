import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Detail = ({ route, navigation }) => {
    const [ticketsOrdered, setTicketOrdered] = useState([])
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
  return (
    <View>
      <Text>Detail</Text>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({});
