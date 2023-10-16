import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import React from 'react'
import SlideMovie from './SlideMovie'
import Event from './Event'

const Home = ({navigation}) => {
  return (
    <ImageBackground source={require('../../assets/imgBackground/sky-star.jpg')} 
    style={{width : '100%', height : '100%'}}>
      <Event navigation={navigation}/>
      <SlideMovie navigation={navigation}/>
    </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({})