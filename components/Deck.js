import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { purple } from '../Utils/colors'
import TextButton from './TextButton'
import { removeDeck } from '../Actions/index'
import { deleteDeckLocal } from '../Utils/storage'
import { connect } from 'react-redux'

class Deck extends React.Component {
    handleDelete = () => {
      const { dispatch } = this.props
      const title = this.props.navigation.getParam('title')
      deleteDeckLocal(title).then(() => {
        dispatch(removeDeck(title))
        this.props.navigation.navigate('Decks')
      })
    }

    render() {
    return(
    <View>
        <Text>
          {this.props.navigation.getParam('title')}
        </Text>
        <TextButton onPress={this.handleDelete}>Delete Deck</TextButton>
        <TouchableOpacity style={styles.iosSubmitBtn} onPress={() => this.props.navigation.navigate('Card')}>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
    </View>
   )
    }
}

const styles = StyleSheet.create(
  {
    iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  }
)

export default connect()(Deck)
