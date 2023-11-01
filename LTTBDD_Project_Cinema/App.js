import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import Login from "./src/login/Login";
import InterfaceTab from "./src/InterfaceTab"
import DetailMovie from "./src/detailMovie/DetailMovie"
import BookingMovie from "./src/bookingMovie/BookingMovie"
import ChooseSeats from "./src/chooseSeats/ChooseSeats"
import Concession from "./src/concession/Concession"
import FinishPayment from "./src/finishPayment/FinishPayment"
import Register from "./src/register/Register";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown : false
      }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="InterfaceTab" component={InterfaceTab} />
        <Stack.Screen name="DetailMovie" component={DetailMovie} />
        <Stack.Screen name="BookingMovie" component={BookingMovie} />
        <Stack.Screen name="ChooseSeats" component={ChooseSeats} />
        <Stack.Screen name="Concession" component={Concession} />
        <Stack.Screen name="FinishPayment" component={FinishPayment} />
      </Stack.Navigator>
    </NavigationContainer>
    <Toast />
    </>
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
