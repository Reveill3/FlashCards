import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

export default class Card extends React.Component {
  render(){
    return (
      <View>
        <TouchableOpacity>
          <Text>Testing Card</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
