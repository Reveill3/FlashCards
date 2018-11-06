import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import TextButton from './TextButton'
import { purple, white } from '../Utils/colors'
import { loadData } from '../Utils/storage'
import { connect } from 'react-redux'
import { receiveDecks } from '../Actions/index'

class Decks extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props
    loadData().then((decksData) => {
      const parsedDecksData = JSON.parse(decksData)
      dispatch(receiveDecks(parsedDecksData))
        }
      )
  }

    render(){

    return(
    <View>
      {Object.keys(this.props.loadedDecks)
      .map(Deck =>
      <TouchableOpacity style={styles.iosSubmitBtn} onPress={() => this.props.navigation.navigate('Deck', { title: this.props.loadedDecks[Deck].title })}>
        <Text style={styles.submitBtnText}>{this.props.loadedDecks[Deck].title}</Text>
      </TouchableOpacity>
      )}
    </View>)}
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
    submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  }
)

function mapStateToProps (state){
  return {
    loadedDecks: state
  }
}

export default connect(mapStateToProps)(Decks)
