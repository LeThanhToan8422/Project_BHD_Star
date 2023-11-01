import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'

const Personal = ({route, navigation}) => {
  const [user, setUser] = useState(route.params.user)

  return (
    <ImageBackground source={require('../../assets/imgBackground/sky-star.jpg')}
    style={{width : '100%', height : '100%'}}>
    </ImageBackground>
  )
}

export default Personal

const styles = StyleSheet.create({})