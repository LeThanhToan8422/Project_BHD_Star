import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

const Personal = ({navigation}) => {
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('DetailMovie')}>
        <View>
          <Text>Navigation</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default Personal

const styles = StyleSheet.create({})