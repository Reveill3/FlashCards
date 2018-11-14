import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { green } from '../Utils/colors'
import TextButton from './TextButton'
import { deleteDeckLocal } from '../Utils/storage'
import { connect } from 'react-redux'
import { removeDeck } from '../Actions/index'

class Deck extends React.Component {
    handleDelete = () => {
      const { dispatch, styles } = this.props
      const title = this.props.navigation.getParam('title')
      deleteDeckLocal(title).then(() => {
        this.props.navigation.goBack()
        dispatch(removeDeck(title))
      }
    )
    }

    render() {
        if (this.props.deck !== undefined){
  const title = this.props.deck.title
    return(
    <View style={ styles.container }>
        <Text style={ styles.deckText }>
          { title }
        </Text>
        <Text style={ styles.deckText }>
          Number of Cards: { this.props.deck.questions.length }
        </Text>
        <TextButton style={styles.deleteText} onPress={() => this.handleDelete()}>Delete Deck</TextButton>
        <TouchableOpacity style={styles.iosSubmitBtn} onPress={() => this.props.navigation.navigate('NewQuestion', { title: title })}>
        <Text >Add Question</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iosSubmitBtn} onPress={() => this.props.navigation.navigate('Card', { title: title })}>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
    </View>
) } else {return null}
    }
}

const styles = StyleSheet.create(
  {
    iosSubmitBtn: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20
  },
  container: {
      flex: 1,
      justifyContent: 'center',
  },
  deckText: {
      textAlign: 'center',
      fontSize: 24
  },
  deleteText: {
      textAlign: 'center',
      marginBottom: 50
  }

  }
)

function mapStateToProps (state, ownProps) {
  return {
    deck: state[ownProps.navigation.getParam('title')]
  }
}

export default connect(mapStateToProps)(Deck)
