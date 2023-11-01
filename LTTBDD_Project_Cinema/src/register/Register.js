import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-modern-datepicker";
import Toast from "react-native-toast-message";
import axios from "axios";

const Register = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("Ngày Sinh...");
  const [gender, setGender] = useState(true);
  const [openDate, setOpenDate] = useState(false);

  let handlePressRegister = async () => {
    let dataUserID = await axios.get("http://10.0.2.2:8080/api/user/get-userID")
    let userID = `US${dataUserID.data.userID + 1}`
    let data = await axios.post(
      "http://10.0.2.2:8080/api/user/post-user",
      {
        id : userID,
        email: email,
        name : name,
        phone : phone,
        date : dateOfBirth,
        gender : Boolean(gender)
      }
    );
    if(data.data.isInsert){
      let dataAccountID = await axios.get("http://10.0.2.2:8080/api/account/get-accountID")
      let accountID = `AC${dataAccountID.data.accountID + 1}`
      let data = await axios.post(
        "http://10.0.2.2:8080/api/account/post-account",
        {
          id : accountID,
          email: email,
          password : password,
          userID : userID,
        }
      );
      if(data.data.isInsert){
        Toast.show({
          type: "success",
          text1: "Đăng Ký Thành Công!!!",
          text2: "Vui Lòng Đăng Nhập BHD Star👋",
        });
        navigation.navigate("Login");
      }
      else{
        Toast.show({
          type: "error",
          text1: "Đăng Ký Thất Bại!!!",
          text2: "Thông Tin Đăng Ký Không Chính Xác👋",
        });
      }
    }
    else {
      Toast.show({
        type: "error",
        text1: "Đăng Ký Thất Bại!!!",
        text2: "Thông Tin Đăng Ký Không Chính Xác👋",
      });
    }
    
  };

  return (
    <ImageBackground
      source={require("../../assets/imgBackground/sky-star.jpg")}
      style={styles.container}
    >
      <View style={styles.formLogin}>
        <Text style={{ fontSize: 35, fontWeight: "bold", color : 'white', marginBottom : 20 }}>ĐĂNG KÝ</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.formInput}
            placeholder="Nhập Email..."
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Nhập Password..."
            secureTextEntry
            value={password}
            onChangeText={setPassword}
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
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.selectGender}
            >
              <Picker.Item label="Nam" value="true" />
              <Picker.Item label="Nữ" value="false" />
            </Picker>
          </View>
        </View>
        <View style={styles.viewRegisterForgot}>
          <TouchableOpacity>
            <Text style={{ fontSize: 15 }}>{`Đã có tài khoản -> `} </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ fontSize: 15, color: "#1da1f2" }}>Đăng Nhập</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnLogin} onPress={handlePressRegister}>
          <Text style={{ fontSize: 25, color: "white", fontWeight: "bold" }}>
            REGISTER
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Register;

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
