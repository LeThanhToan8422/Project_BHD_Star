import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InterfaceTab from "./src/InterfaceTab";
import DetailMovie from "./src/home/detailMovie/DetailMovie";
import Home from "./src/home/Home";
import ShowTime from "./src/showtime/ShowTime";
import Personal from "./src/personal/Personal";
import BookingMovie from "./src/home/bookingMovie/BookingMovie";
import ChooseSeats from "./src/home/bookingMovie/ChooseSeats/ChooseSeats";
import Concession from "./src/home/bookingMovie/ChooseSeats/concession/Concession";
import FinishPayment from "./src/home/bookingMovie/ChooseSeats/concession/finishPayment/FinishPayment";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown : false
      }}
      >
        <Stack.Screen name="InterfaceTab" component={InterfaceTab} />
        <Stack.Screen name="DetailMovie" component={DetailMovie} />
        <Stack.Screen name="BookingMovie" component={BookingMovie} />
        <Stack.Screen name="ChooseSeats" component={ChooseSeats} />
        <Stack.Screen name="Concession" component={Concession} />
        <Stack.Screen name="FinishPayment" component={FinishPayment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop : 30
  },
});
