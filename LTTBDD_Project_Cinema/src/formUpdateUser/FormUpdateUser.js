import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-modern-datepicker";
import Toast from "react-native-toast-message";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const FormUpdateUser = ({route, navigation}) => {
  const [userID, setUserID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("Ngày Sinh...");
  const [gender, setGender] = useState("true");
  const [openDate, setOpenDate] = useState(false);

  useEffect(() => {
    let apiGetUser = async() => {
      let data = await axios.post("http://10.0.2.2:8080/api/user/get-user-by-id", {id : route.params.userID})
      setUserID(data.data.user.userID)
      setEmail(data.data.user.email)
      setName(data.data.user.name)
      setPhone(data.data.user.phone)
      setDateOfBirth(data.data.user.dateOfBirth.slice(0,10))
      setGender(data.data.user.gender+"")
    }
    apiGetUser()
  },[JSON.stringify(route.params.userID)])

  let handleChangeGender = (value) => {
    setGender(value)
  }

  let handlePressUpdate = async () => {
    let data = await axios.put(
      "http://10.0.2.2:8080/api/user/put-user",
      {
        id : userID,
        email: email,
        name : name,
        phone : phone,
        date : dateOfBirth,
        gender : gender === "true" ? true : false
      }
    );
    if(data.data.isUpdate){
      Toast.show({
        type: "success",
        text1: "Cập Nhật Thành Công!!!",
        text2: "Chúc Mừng Bạn Đã Cập Nhật Thông Tin Thành Công👋",
      });
      navigation.goBack()
    }
    else {
      Toast.show({
        type: "error",
        text1: "Cập Nhật Thất Bại!!!",
        text2: "Bạn Đã Cập Nhật Thông Tin Thất Bại👋",
      });
    }
    
  };

  return (
    <ImageBackground
      source={require("../../assets/imgBackground/sky-star.jpg")}
      style={styles.container}
    >
      <View style={styles.formLogin}>
        <TouchableOpacity onPress={() => navigation.goBack()}
        style={{
            position : 'absolute',
            top : 10,
            left : 20,
          }}>
          <Ionicons name="chevron-back-circle-outline" size={40} style={{color : 'white'}}/>
        </TouchableOpacity>
        <Text style={{ fontSize: 25, fontWeight: "bold", color : 'white', marginBottom : 20 }}>Edit/Update</Text>
        <View style={styles.formContainer}>
          <TextInput
            editable={false}
            style={styles.formInput}
            placeholder="Nhập Email..."
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Nhập Name..."
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Nhập Phone..."
            value={phone}
            onChangeText={setPhone}
          />
          <TouchableOpacity
            style={styles.inputDob}
            onPress={() => setOpenDate(true)}
          >
            <Text>{dateOfBirth}</Text>
          </TouchableOpacity>
          {openDate ? (
            <View style={styles.viewModelDob}>
              <DatePicker
                onSelectedChange={(date) => setDateOfBirth(date)}
                style={styles.modelDob}
              />
              <TouchableOpacity style={styles.btnConfirm} onPress={() => setOpenDate(false)}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={styles.viewSelectGender}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => handleChangeGender(itemValue)}
              style={styles.selectGender}
            >
              <Picker.Item label="Nam" value="true" />
              <Picker.Item label="Nữ" value="false" />
            </Picker>
          </View>
        </View>
        <TouchableOpacity style={styles.btnLogin} onPress={handlePressUpdate}>
          <Text style={{ fontSize: 25, color: "white", fontWeight: "bold" }}>
            UPDATE
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default FormUpdateUser;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  formLogin: {
    width: "90%",
    height: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(85,85,85, 1)",
    borderRadius: 15,
  },
  formContainer: {
    width: "90%",
    height: "65%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formInput: {
    width: "100%",
    height: 60,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  viewRegisterForgot: {
    width: "100%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  btnLogin: {
    width: "90%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 15,
    marginTop : 30
  },
  viewSelectGender: {
    width: "100%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,
  },
  selectGender: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  viewModelDob: {
    position: "absolute",
    width: "100%",
    height: 340,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex : 10
  },
  modelDob: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius : 15
  },
  btnConfirm: {
    position: "absolute",
    bottom: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1da1f2",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
  },
  inputDob : {
    width: "100%",
    height: 60,
    display  :'flex',
    flexDirection : 'row',
    justifyContent : 'flex-start',
    alignItems  :'center',
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,
    paddingHorizontal : 10
  }
});
