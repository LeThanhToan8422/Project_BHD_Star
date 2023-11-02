import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import Toast from 'react-native-toast-message'

const Login = ({navigation}) => {
  const [email, setEmail] = useState("min@gmail.com")
  const [password, setPassword] = useState("Min28062812")

  let handlePressLogin = async() => {
    let data = await axios.post("http://10.0.2.2:8080/api/account/check-account-by-email-password", {
      email : email,
      password : password
    })
    if(data.data.user.accountContains){
      Toast.show({
        type: "success",
        text1: "Đăng Nhập Thành Công!!!",
        text2: "Welcome To BHD Star👋",
      });
      navigation.navigate("InterfaceTab", {
        user : data.data.user
      })
    }
    else{
      Toast.show({
        type: "error",
        text1: "Đăng Nhập Thất Bại!!!",
        text2: "Email Hoặc Password Không Chính Xác👋",
      });
    }
  }

  return (
    <ImageBackground
      source={require("../../assets/imgBackground/sky-star.jpg")}
      style={styles.container}
    >
      <View style={styles.formLogin}>
        <Text style={{fontSize : 35, fontWeight : 'bold', color : 'white', marginBottom : 20}}>ĐĂNG NHẬP</Text>
        <View style={styles.formContainer}>
          <TextInput style={styles.formInput} placeholder='Nhập Email...'
          value={email}
          onChangeText={setEmail}
          />
          <TextInput style={styles.formInput} placeholder='Nhập Password...'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          />
        </View>
        <View style={styles.viewRegisterForgot}>
          <TouchableOpacity>
            <Text style={{fontSize : 15}}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{fontSize : 15, color : '#1da1f2'}}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnLogin} onPress={handlePressLogin}>
          <Text style={{fontSize : 25, color : 'white', fontWeight : 'bold'}}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    display  :'flex',
    flexDirection: "row",
    justifyContent : 'center',
    alignItems :'center'
  },
  formLogin : {
    width: "80%",
    height: "50%",
    display  :'flex',
    flexDirection: "column",
    justifyContent : 'center',
    alignItems :'center',
    backgroundColor : "rgba(85,85,85, 1)",
    borderRadius : 15
  },
  formContainer: {
    width: "90%",
    height: "35%",
    display  :'flex',
    flexDirection: "column",
    justifyContent : 'space-between',
    alignItems :'center',
  },
  formInput : {
    width : '100%',
    height : 60,
    borderWidth : 1,
    borderColor  :'white',
    borderRadius : 15,
    paddingHorizontal : 10
  },
  viewRegisterForgot : {
    width : '100%',
    height : 60,
    display : 'flex',
    flexDirection : 'row',
    justifyContent  :'space-between',
    alignItems : 'center',
    paddingHorizontal : 20
  },
  btnLogin : {
    width : '90%',
    height : 60,
    display  :'flex',
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems  :'center',
    backgroundColor  :'green',
    borderRadius : 15
  }
})