import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import SlideMovie from './SlideMovie'
import Event from './Event'

const Home = ({route, navigation}) => {
  const [userID, setUserID] = useState(route.params.userID)

  return (
    <ImageBackground source={require('../../assets/imgBackground/sky-star.jpg')} 
    style={{width : '100%', height : '100%'}}>
      <Event navigation={navigation}/>
      <SlideMovie navigation={navigation} userID={userID}/>
    </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({})